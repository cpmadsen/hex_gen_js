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
        if the river has dead-ended itself, bakctrack and try again. 1 backtrack is allowed per hex? Then if they fail it squiggles in the parent swamp.
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


function straight_river_faces(entry) {
    let exit = 0;
    if (entry <= 3) {
        exit = entry + 3;
    } else if (entry > 3) {
        exit = entry - 3;
    }
    return exit;
}

function loose_bend_left(entry) {
    let exit = 0;
    if (entry <= 4) {
        exit = entry + 2;
    } else if (entry > 4) {
        exit = entry - 4;
    }
    return exit;
}

function loose_bend_right(entry) {
    let exit = 0;
    if (entry <= 2) {
        exit = entry + 4;
    } else if (entry > 2) {
        exit = entry - 2;
    }
    return exit;
}

function sharp_bend_left(entry) {
    let exit = 0;
    if (entry <= 5) {
        exit = entry + 1;
    } else if (entry === 6) {
        exit = 1;
    }
    return exit;
}

function sharp_bend_right(entry) {
    let exit = 0;
    if (entry === 1) {
        exit = 6;
    } else if (entry > 1) {
        exit = entry - 1;
    }
    return exit;
}


function get_river_options (hex_id, river_entry) {
    let options = Array();
    
    //straight
    let straight_exit = straight_river_faces(river_entry);
    let straight_hex = get_next_hex (hex_id, straight_exit);
    console.log(straight_hex);
    options.push(straight_hex);

    //loose bend
    if (right_turn) {
        let loose_right_exit = loose_bend_right(river_entry);
        let loose_right_hex = get_next_hex (hex_id, loose_right_exit);
        console.log(loose_right_hex);
        options.push(loose_right_hex);
    } else {
        let loose_left_exit = loose_bend_left(river_entry);
        let loose_left_hex = get_next_hex (hex_id, loose_left_exit);
        options.push(loose_left_hex);
    }

    //sharp bend
    if (right_turn) {
        let sharp_right_exit = sharp_bend_right(river_entry);
        let sharp_right_hex = get_next_hex (hex_id, sharp_right_exit);
        options.push(sharp_right_hex);
    } else {
        let sharp_left_exit = sharp_bend_left(river_entry);
        let sharp_left_hex = get_next_hex (hex_id, sharp_left_exit);
        options.push(sharp_left_hex);
    }

    return (options);
}



function river_tests(test_hex) {
    /*
    check to see that the river does not come within 1 of a desert, 
    
    check to see it is not hemmed in by multiple mountains in a row 
        (can break thru a single row of mountains, but not 2 mountains in a row ie. not a whole morph)
        save as a boolean: "broke_through_mountains" rather than find_adj_two? 
        or whenever a river hits a mountain, use find_adj and find_adj_2 to see if it breaks thru or glances off?
    
    check to see if river has broken up into woods elevation for 2 hexes already. it cannot do a third and must dismount into open if 
        possible. 
    
        If any of these checks fail, backtrack and reroll. If that fails, backtrack farther (rare case of being 'cornered'). 
    If a certain number of backtracks fail, the river either "dies on the vine" and becomes a swamp squiggle (upper right of OS), or 
            it breaks some rules and carves through over 2 woods, turning them all to open (see lower left of OS).
            */
}
