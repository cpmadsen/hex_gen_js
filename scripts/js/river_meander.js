// Global variables
let right_turn = true;   // all rivers take a right turn to begin with, then alternate.


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

function apply_river_segment_illus (this_hex, river_entry, segment_type, turn_direction) {
    let river_illus = this_hex.querySelector('.hex-waterway');
    let this_river_rotation = 0;

    if (segment_type == 'straight') {
        river_illus.style.background = `url(../mats/Waterways/river_1-4_1.png)`;
        this_river_rotation = find_rotation(river_entry);
        river_illus.style.transform = `rotate(${this_river_rotation}deg)`;
    } else if (segment_type == 'loose_bend') {
        if (turn_direction) {
            river_illus.style.background = `url(../mats/Waterways/river_1-5_1.png)`;
            this_river_rotation = find_rotation(river_entry);
            river_illus.style.transform = `rotate(${this_river_rotation}deg)`;
        } else {
            river_illus.style.background = `url(../mats/Waterways/river_1-3_1.png)`;
            this_river_rotation = find_rotation(river_entry);
            river_illus.style.transform = `rotate(${this_river_rotation}deg)`;
        }
    } else if (segment_type == 'sharp_bend') {
        if (turn_direction) {
            river_illus.style.background = `url(../mats/Waterways/river_1-6_1.png)`;
            this_river_rotation = find_rotation(river_entry);
            river_illus.style.transform = `rotate(${this_river_rotation}deg)`;
        } else {
            river_illus.style.background = `url(../mats/Waterways/river_1-2_1.png)`;
            this_river_rotation = find_rotation(river_entry);
            river_illus.style.transform = `rotate(${this_river_rotation}deg)`;
        }
    }

    return;
}

function test_is_valid (hex_id) {
    let test_hex = document.getElementById(`hex_${hex_id}`);
    console.log(is_valid_river_hex(test_hex));
    return;
}

function test_river_choice(hex_id, entry_face) {
    let test_hex = document.getElementById(`hex_${hex_id}`);
    //console.log(`test hex is`);
    //console.log(test_hex);
    let choice_hex = get_river_choice(test_hex, entry_face);
    console.log(`choice is:`);
    console.log(choice_hex);
    return;
}

function river_meander_TWO (prev_hex, exit_face_of_prev) { 
    //debugger;
    
    // Reset
    right_turn = true;


    // Declarations of variables
    prev_anchor_id = prev_hex.id.slice(4);  // just the ID number
    let first_hex = get_next_hex(prev_anchor_id, exit_face_of_prev); // Can return null.
    let this_entry_face = exit_to_entry_face (exit_face_of_prev);
    
    let river = Array();
    if (first_hex == null) { return; } else { river = [first_hex]; }
    let visited = new Set(); // Keep track of visited positions

    if (!is_valid_river_hex(first_hex)) {
        // add squiggle illus.
        console.log('First hex is not a valid river hex.');
        console.log(first_hex);
        return;
    } 
    
    let river_continues = true;
    while (river_continues) {          // indefinite loop
        const river_head = river[river.length - 1];
        river_head.setAttribute("entry_face", this_entry_face);         // for use later in assigning illus.
        
        // get a putative next hex to test. 
        let next_hex = get_river_choice (river_head, this_entry_face);  // saves segment type to river_head for illus. 

        let backtrack = false;
        
        if (next_hex === 'dead_end' || !is_valid_river_hex(next_hex) || visited.has(next_hex)) {                      // *** Also has to avoid doubling over itself. Collision -> knot.
            backtrack = true;    
            console.log("next hex !is_valid_river_hex"); 
            console.log(next_hex);

            // disallow this exit face for further attempts. get_river_choice checks for 'bad_choice'.    
            let river_head_test_segment_type = river_head.getAttribute("segment_type"); 
            let disallowed_face = get_exit_face_from_segment_type(river_head_test_segment_type, this_entry_face);
            let prev_bad_choice = river_head.getAttribute("bad_choice");
            if(prev_bad_choice !== null) {  river_head.setAttribute("bad_choice_2", disallowed_face);
            } else { river_head.setAttribute("bad_choice", disallowed_face); }
               
            // tries to avoid backtracking, attempts river_head's other choices first.
            for (let i = 0; i < 3; i++) {                                                       
                const new_attempt_hex = get_river_choice(river_head, this_entry_face);  // overwrites r_head's segment type
            
                if (is_valid_river_hex(new_attempt_hex) && !visited.has(new_attempt_hex)) {
                    next_hex = new_attempt_hex;
                    backtrack = false;
                    break;  // breaks the for loop, not the while loop
                }
            }

            if (backtrack) {                                        
                river.pop(); // Backtrack one step
                console.warn('Backtrack');
                if (river.length <= 1) {
                    console.log("River is trapped!"); 
                                                
                    // ADD SQUIGGLE ILLUS. to river_head, must be to first hex outside of knot 
                    // if river.length == 0, add a squiggle to what the next hex from knot would be.

                    river_continues = false;
                    console.log(river);
                    break;
                }
            }

        } else {
            // Checks have been passed. We now toggle right_turn if a bend was taken and find the next entry face.
            let river_head_segment_type = river_head.getAttribute("segment_type");
            let this_exit_face = 0;

            if (river_head_segment_type == 'straight') { 
                this_exit_face = straight_river_faces(this_entry_face);  
            } else if (river_head_segment_type == 'loose_bend') {
                if (right_turn == true) {
                    right_turn = false;
                    this_exit_face = loose_bend_right(this_entry_face);
                } else {
                    right_turn = true;
                    this_exit_face = loose_bend_left(this_entry_face);
                }
            } else if (river_head_segment_type == 'sharp_bend') {
                if (right_turn == true) {
                    right_turn = false;
                    this_exit_face = sharp_bend_right(this_entry_face);
                } else {
                    right_turn = true;
                    this_exit_face = sharp_bend_left(this_entry_face);
                }
            } else {
                console.log('Error at end of river_meander: bad segment_type.');
            }
            
            this_entry_face = exit_to_entry_face(this_exit_face); // ie. next river_head will have a correct entry_face
            
            river.push(next_hex);
            visited.add(next_hex);
            if (next_hex == null) {       
                console.log("River reached the edge.");
                console.log(river);
                river.forEach((hex) => {                // Now that run is complete, apply illustrations.
                    if (hex !== null) {
                        let this_segment_type = hex.getAttribute("segment_type"); 
                        let this_entry_face = hex.getAttribute("entry_face");
                        let this_direction = hex.getAttribute("turn_direction");
                        apply_river_segment_illus(hex, this_entry_face, this_segment_type, this_direction);
                    }
                });
                
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