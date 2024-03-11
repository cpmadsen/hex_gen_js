// To retrieve data:
            // // Retrieve the div element
            // var myDiv = document.getElementById("myDiv");
            // Get the integer value stored in the data-myinteger attribute
            // var myInteger = parseInt(myDiv.getAttribute("knot_choice"));




// Global variables
let right_turn = true;   // all rivers take a right turn to begin with, then alternate.
let segment_type = 'undefined';

function river_meander (prev_hex, exit_face_of_prev) {
    //console.log(`River spawning from parent (previous) hex:`)
    //console.log(prev_hex);
    prev_anchor_id = prev_hex.id.slice(4);  // just the ID number
    //console.log(`Previous anchor id: ${prev_anchor_id}`);
    //console.log(`Exit face from previous: ${exit_face_of_prev}`);
    let this_hex = [];
    this_hex = get_next_hex(prev_anchor_id, exit_face_of_prev);
    //console.log('This river segment:')
    //console.log(this_hex);
    
    if (this_hex === null) {
        return;
    }
    
    let neighbors = [];
    neighbors = find_adjacent(this_hex.id.slice(4));
    //console.log(this_hex);
    //console.log('Find adjacent returns:')
    //console.log(neighbors);

    let river_illus = this_hex.querySelector('.hex-waterway');
    let this_river_rotation = 0;

    //console.log(`Spawning river. Exit face of knot: ${exit_face_of_prev}`);
    let river_entry = exit_to_entry_face(exit_face_of_prev);
    //console.log(`Entry face into first river hex: ${river_entry}`);
    let river_exit = 0;
    let river_type = 'undefined';

    // CALL MEANDER FROM WITHIN ANOTHER FUNCTION, spawn_river, which is incharge of saving the meanders' hexes as an array.
    // We must also be saving disallowed directions for the rivers as they go!  troubling... 

    // has river entered a swamp? Chance to trail off in a Squiggle.
    // check: has river crossed another? Form knot. 
        // A function to merge rivers that collide into a knot
        // Save entry and exit faces as hex data
        // if this_hex has a waterway, combine the 2 existing faces with the incoming 3rd face. 
        // Do some math to find the knot pattern (135, 145...) and rotate accordingly.
        // return to terminate the river.

    // checks complete. River is continuing as normal.    
    // depending on right_turn, get 3 options for this_hex 
        // use get_river_options, test to see that right_turn is in sync
    // suitability tests phase: disqualify mountains, deserts, hexes adjacent to deserts...

    // assign weights to the remaining choices. open/swamp gets the usual split, woods will get a small percentage (less than 8?) 
    // random roll
        
    // assign illus, rotation

    // post-

    let river_choice = Math.random();
    if (river_choice <= 0.597826087) {
        river_type = 'straight';
        river_exit = straight_river_faces(river_entry);
        river_illus.style.background = `url(../mats/Waterways/river_1-4_1.png)`;

    } else if (river_choice > 0.597826087 && river_choice <= 0.9673913044) {
        river_type = 'loose_bend';
        if (right_turn) {
            river_exit = loose_bend_right(river_entry);
            right_turn = false;
            river_illus.style.background = `url(../mats/Waterways/river_1-5_1.png)`;
        } else {
            river_exit = loose_bend_left(river_entry);
            right_turn = true;
            river_illus.style.background = `url(../mats/Waterways/river_1-3_1.png)`;
        }
        
    } else if (river_choice > 0.9673913044) {
        river_type = 'sharp_bend';
        if (right_turn) {
            river_exit = sharp_bend_right(river_entry);
            right_turn = false;
            river_illus.style.background = `url(../mats/Waterways/river_1-6_1.png)`;
        } else {
            river_exit = sharp_bend_left(river_entry);
            right_turn = true;
            river_illus.style.background = `url(../mats/Waterways/river_1-2_1.png)`;
        }
    }
    river_illus.style.position = 'absolute'; 
    this_river_rotation = find_rotation(river_entry);
    river_illus.style.transform = `rotate(${this_river_rotation}deg)`;

    console.log(`River segment: ${river_type}`);
    console.log(`Entry ${river_entry} exit ${river_exit}`);
    console.log(this_hex);

    river_meander(this_hex, river_exit);

}

function is_valid_river_hex (test_hex) {
    let is_valid = true; 
    if (test_hex != null) {
        // test hex is a mountain/desert?
        if (test_hex.classList.contains('mountain') || test_hex.classList.contains('snowcap') || test_hex.classList.contains('desert')) {
            is_valid = false;
        }
    
        // desert within 1 hex?
        let neighbors = [];
        neighbors = find_adjacent(test_hex.id.slice(4));
        neighbors.forEach((hex) => {        
            if (hex != null) {
                if (hex.classList.contains('desert')) {
                        //console.log(`${test_hex.id.slice(4)} is too close to desert.`);
                        is_valid = false;
                } 
           }    
        }); 
    }
   
    return is_valid;
}

function get_river_choice (this_hex, entry_face) {          
    let hex_id = this_hex.id.slice(4);
    let options = [];
    options = get_river_options (hex_id, entry_face);

    let weighted_options = [
        {value: options[0], probability: 0},        // straight
        {value: options[1], probability: 0},        // loose bend
        {value: options[2], probability: 0}         // sharp bend
    ];
    
    // assign probs to the options depending on if they are open/swamp or woods
    if (weighted_options[0].value === null || weighted_options[0].value.classList.contains('open') || weighted_options[0].value.classList.contains('swamp')) {
        weighted_options[0].probability = 59.7826087;          
    } 
    if (weighted_options[1].value === null || weighted_options[1].value.classList.contains('open') || weighted_options[1].value.classList.contains('swamp')) {
        weighted_options[1].probability = 36.95652174;
    } 
    if (weighted_options[2].value === null || weighted_options[2].value.classList.contains('open') || weighted_options[2].value.classList.contains('swamp')) {
        weighted_options[2].probability = 3.260869565;
    }  
    weighted_options.forEach(option => {
        if(option.value != null) {
            if (option.value.classList.contains('wooded') || option.value.classList.contains('wooded_hills')) {
                option.probability = 8.695652174;                                               
                // NB this does not differentiate between wooded straight, loose or sharp bends. Ie. odds are 50/50 
                // Rather the difference is handled with a count of woods tiles the river has traversed through. 
                // In effect, kicking the river out of the woods after max. two hexes.
            } else {
                // Handle other values if needed, but default probability is already 0.
                // else if woods_river_count == 2 && option.value.classList.contains('open') or swamp, probability is 1.
            }
        }
    });
    
    // weight the probabilities such that they total 1.
    let total_probabilities = weighted_options[0].probability + weighted_options[1].probability + weighted_options[2].probability;
    weighted_options.forEach(option => {
        let temp_prob = option.probability;
        option.probability = temp_prob / total_probabilities;
    });
    //console.log(weighted_options);

    // Choose one of the options.
    let choice = Math.random();
    if (choice <= weighted_options[0].probability) {
        segment_type = 'straight';                  // Change segment type in river_meander so that it can be illustrated.
        return weighted_options[0].value; }         // return next hex.
    else if (choice > weighted_options[0].probability && choice <= weighted_options[1].probability) {
        segment_type = 'loose_bend';
        return weighted_options[1].value; } 
    else {
        segment_type = 'sharp_bend';
        return weighted_options[2].value; }    
}


function apply_river_segment_illus (this_hex, river_entry, segment_type) {
    let river_illus = this_hex.querySelector('.hex-waterway');
    let this_river_rotation = 0;
    let river_exit = 0;

    if (segment_type == 'straight') {
        river_exit = straight_river_faces(river_entry);
        river_illus.style.background = `url(../mats/Waterways/river_1-4_1.png)`;
        river_illus.style.position = 'absolute';
        this_river_rotation = find_rotation(river_entry);
        river_illus.style.transform = `rotate(${this_river_rotation}deg)`;
    } else if (segment_type == 'loose_bend') {
        if (right_turn) {
            river_exit = loose_bend_right(river_entry);
            //right_turn = false;
            console.log('right turn is now false, apply illus.');
            river_illus.style.background = `url(../mats/Waterways/river_1-5_1.png)`;
            this_river_rotation = find_rotation(river_entry);
            river_illus.style.transform = `rotate(${this_river_rotation}deg)`;
        } else {
            river_exit = loose_bend_left(river_entry);
            //right_turn = true;
            console.log('right turn is now true, apply illus.');
            river_illus.style.background = `url(../mats/Waterways/river_1-3_1.png)`;
            this_river_rotation = find_rotation(river_entry);
            river_illus.style.transform = `rotate(${this_river_rotation}deg)`;
        }
    } else if (segment_type == 'sharp_bend') {
        if (right_turn) {
            river_exit = sharp_bend_right(river_entry);
            //right_turn = false;
            console.log('right turn is now false, apply illus.');
            river_illus.style.background = `url(../mats/Waterways/river_1-6_1.png)`;
            this_river_rotation = find_rotation(river_entry);
            river_illus.style.transform = `rotate(${this_river_rotation}deg)`;
        } else {
            river_exit = sharp_bend_left(river_entry);
            //right_turn = true;
            console.log('right turn is now true, apply illus.');
            river_illus.style.background = `url(../mats/Waterways/river_1-2_1.png)`;
            this_river_rotation = find_rotation(river_entry);
            river_illus.style.transform = `rotate(${this_river_rotation}deg)`;
        }
    }
    // save river entry and exit as hex data
    //this_hex.setAttribute("river_entry", river_entry); // data
    //this_hex.setAttribute("river_exit", river_exit);

    return;
}

function test_is_valid (hex_id) {
    let test_hex = document.getElementById(`hex_${hex_id}`);
    console.log(is_valid_river_hex(test_hex));
    return;
}

function test_river_choice(hex_id, entry_face) {
    let test_hex = document.getElementById(`hex_${hex_id}`);
    console.log(`test hex is`);
    console.log(test_hex);
    let choice_hex = get_river_choice(test_hex, entry_face);
    console.log(`choice is:`);
    console.log(choice_hex);
    return;
}




function river_meander_TWO (prev_hex, exit_face_of_prev) { 
    prev_anchor_id = prev_hex.id.slice(4);  // just the ID number
    let this_hex = get_next_hex(prev_anchor_id, exit_face_of_prev); // Can return null.
    if (this_hex == null) { return; }
    let this_entry_face = exit_to_entry_face (exit_face_of_prev);
    let this_exit_face = exit_face_of_prev;

    let river = Array();
    if (this_hex != null) {
        river = [this_hex];
    } else { return; }
    //console.log('River is:');
    //console.log(river);
    
    if (!is_valid_river_hex(this_hex)) {
        // squiggle
        console.log('Not a valid river hex.');
        //console.log(this_hex);
        return;
    } else {
        console.log('Valid river hex:');
        console.log(this_hex);
    }
    
    //let river_continues = true;
    //while (river_continues) {          // indefinite loop
    for (let i = 0; i < 50; i++) {    

        //entry_face = exit_to_entry_face(exit_face);
        //console.log(`at beginning of while loop, entry face is ${entry_face}`);
        
        
        // try turning this off
        if (river.length === 0) {
            // squiggle
            return;
        }
        
        const river_head = river[river.length - 1];
        
        //console.log('river head:');
        //console.log(river_head);
        let next_hex = get_river_choice (this_hex, this_entry_face);
        console.log('after get_river_choice, next hex is:');
        console.log(next_hex);

        // List of options
        let this_id = this_hex.id.slice(4);
        let neighboring_hexes = get_river_options(this_id, this_entry_face);

        if (!is_valid_river_hex(river_head)) {                      // Has to avoid doubling over itself.
            // If hitting an obstacle or boundary, backtrack
            let backtrack = true;                                   
            // let disallowed_face = exit_to_entry_face (entry_face); // intended: remember that this direction doesn't work. Don't try again.
            for (let i = 0; i < 4; i++) {                           
                const new_attempt_hex = get_river_choice(this_hex, this_entry_face);              // TRIES TO AVOID BACKTRACKING. instead of x random checks, could disqualify options (save as data for the hex?)
                if (is_valid_river_hex(new_attempt_hex)) {
                    next_hex = new_attempt_hex;
                    backtrack = false;
                    break;  // breaks the for loop, not the while loop
                }
                /*
                if (i >= 4) {
                    river_continues = false;
                    break;
                }
                */
            }

            if (backtrack) {                                        // ACTUALLY BACKTRACKS WITHIN ARRAY
                river.pop(); // Backtrack one step
                console.log('BACKTRACK!!!');
                if (river.length === 0) {
                    console.log("River is trapped!"); 
                    console.log(river);                              // == SQUIGGLE
                    // ADD SQUIGGLE ILLUS.!!!! must be to first hex outside of knot, ie. 
                    river_continues = false;
                    break;
                }
            }
        } else {
            
            // Now that testing is complete, apply illustrations.
            let label = this_hex.querySelector('.hex-label');
            console.log(`Applying illustration to segment:`);
            console.log(label);
            console.log(this_hex);
            console.log(this_entry_face);
            console.log(segment_type);
            apply_river_segment_illus(this_hex, this_entry_face, segment_type);
            

            // Update values for the next iteration of the while loop.
            this_hex = next_hex; 
            
            
            if (segment_type == 'straight') { 
                this_exit_face = straight_river_faces(this_entry_face);  
            } else if (segment_type == 'loose_bend') {
                if (right_turn == true) {
                    right_turn = false;
                    this_exit_face = loose_bend_right(this_entry_face);
                } else {
                    right_turn = true;
                    this_exit_face = loose_bend_left(this_entry_face);
                }
            } else if (segment_type == 'sharp_bend') {
                if (right_turn == true) {
                    right_turn = false;
                    this_exit_face = sharp_bend_right(this_entry_face);
                } else {
                    right_turn = true;
                    this_exit_face = sharp_bend_left(this_entry_face);
                }
            } else {
                console.log('Error in river bend selection.');
            }
            //console.log(`during segment type check at end of while loop, exit face is ${exit_face}`);

            this_entry_face = exit_to_entry_face(this_exit_face);
            //console.log(`then entry face becomes ${entry_face}`);
            

            river.push(next_hex);
            if (next_hex === null) {       
                console.log("River reached the edge.");
                console.log(river);
                break;
            }
        }
    }

    return river;
}


function test_river_TWO(hex_id, exit_face) {
    let test_hex = document.getElementById(`hex_${hex_id}`);
    //console.log(`Anchor is`);
    //console.log(test_hex);
    river_meander_TWO(test_hex, exit_face);
    return;
}