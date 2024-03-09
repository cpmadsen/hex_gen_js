/*
        let putative_next_hex = get_next_hex(this_hex, river_exit);  
        let suitable_for_rivers = river_tests(putative_next_hex);
        if(!suitable_for_rivers) { break out of this if statement and re-roll river_choice. Do this x times or start re-writing terrain.}
        else {
            all the stuff below to apply river_illus etc.
        }

        new plan
        test adjacent hexes for suitability
        then apply a weighted chance to the eligible options (same %s)
            60 straight, 37 loose bend, 3 sharp bend
            8.7% chance of cutting into woods from open... // this one may require more thought. See how it looks
                Then a 3 in 5 chance of going thru woods again, if choice is between woods and open
                Then it MUST exit woods. ie. cannot go thru a third woods tile. If it can't reach open, backtrack.
            The chances expand to fill 100%. So if the options are 4 mountains and 1 woods, 8.69% --> 100%.
                chance / Sum of chances
        if the river has dead-ended itself, bakctrack and try again. the bad option is not allowable. 
        Then if all attempts fail it squiggles in the parent swamp.
        save the river segments as hexes in an array so that extensive backtracking is possible
        river must eventually get to a swamp or null
            exceptions: trailing off in a squiggle, cutting through mountains (altho we will try without that for now, since morphs are pre-cut)


        */


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

function is_valid_river_hex (test_hex) {
    let is_valid = true; 
    if (test_hex != null) {
        // test hex is a mountain?
        if (test_hex.classList.contains('mountain') || test_hex.classList.contains('desert')) {
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

function get_river_choice (from_hex, entry_face) {          
    let hex_id = from_hex.id.slice(4);
    let options = [];
    options = get_river_options (hex_id, entry_face);

    let weighted_options = [
        {value: options[0], probability: 0},        // straight
        {value: options[1], probability: 0},        // loose bend
        {value: options[2], probability: 0}         // sharp bend
    ];
    
    // assign probs to the options depending on if they are open/swamp or woods
    if (weighted_options[0].value.classList.contains('open') || weighted_options[0].value.classList.contains('swamp')) {
        weighted_options[0].probability = 59.7826087;          
    } 
    if (weighted_options[1].value.classList.contains('open') || weighted_options[1].value.classList.contains('swamp')) {
        weighted_options[1].probability = 36.95652174;
    } 
    if (weighted_options[2].value.classList.contains('open') || weighted_options[2].value.classList.contains('swamp')) {
        weighted_options[2].probability = 3.260869565;
    }  
    weighted_options.forEach(option => {
        if (option.value.classList.contains('wooded') || option.value.classList.contains('wooded_hills')) {
            option.probability = 8.695652174;
        } else {
            // Handle other values if needed, but default probability is already 0.
            // else if woods_river_count == 2 && option.value.classList.contains('open') or swamp, probability is 1.
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
    if (choice <= weighted_options[0].probability) {return weighted_options[0].value;} 
    else if (choice <= weighted_options[1].probability) {return weighted_options[1].value;} 
    else {return weighted_options[2].value;}
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