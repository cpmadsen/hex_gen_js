/* start the rivers meandering from the knots and orphans above
    river_meander();
        let right_left = right;
        rotation = 0; // will be set by spawning knot/orphan.
        // Rotation will be in increments of 60 degrees. CSS can transform accordingly, eg. "transform: rotate(45deg);"

        roll for next segment to try - 
                0.597826087 straight, 
                0.3695652174 loose bend,        (0.9673913044 sum)
                0.03260869565 sharp bend 
            check to see if elevation allows this choice. If not re-roll. 
            Woods allow a 0.08695652174 chance (8.7%) of river climbing 'up' in. 

            Any bend alternates from right to left. All start right.
                Squiggles and further knots (to join rivers that collide) simply added as needed, no proportion/chance.
                Cosmetic tributaries (bifurcated straights) to be figured out once it's working.
            Use another function to determine river illus based on entrance and exit faces.


        


    */

// Global variables
let right_turn = true;   // all rivers take a right turn to begin with, then alternate.

function river_meander (prev_hex, exit_face_of_prev) {
    console.log(`River spawning from parent (previous) hex:`)
    console.log(prev_hex);
    prev_anchor_id = prev_hex.id.slice(4);  // just the ID number
    console.log(`Previous anchor id: ${prev_anchor_id}`);

    // test if find_adj works. This cannot be taken out or get_next_hex stops working below for some reason. 
    let neighbors = [];
    neighbors = find_adjacent(prev_anchor_id);
    console.log('Find adjacent returns:')
    console.log(neighbors);

    console.log(`Exit face from previous: ${exit_face_of_prev}`);
    let this_hex = [];
    this_hex = get_next_hex(prev_anchor_id, exit_face_of_prev);
    console.log('This river segment:')
    console.log(this_hex);

    if (this_hex === null) {
        return;
    }

    let river_illus = this_hex.querySelector('.hex-waterway');
    let this_river_rotation = 0;

    //console.log(`Spawning river. Exit face of knot: ${exit_face_of_prev}`);
    let river_entry = exit_to_entry_face(exit_face_of_prev);
    //console.log(`Entry face into first river hex: ${river_entry}`);
    let river_exit = 0;


    let river_type = 'straight';

    let river_choice = Math.random();
    if (river_choice <= 0.597826087) {
        river_exit = straight_river_faces(river_entry);

        /*

        let putative_next_hex = get_next_hex(this_hex, river_exit);   // test to make sure this is correct
        
        let suitability_for_rivers = river_tests(putative_next_hex);
        if(suitability_for_rivers === false) { break out of this if statement and re-roll river_choice. Do this x times or start re-writing terrain.}
        else {
            all the stuff below to apply river_illus etc.
        }


        */
        river_illus.style.background = `url(../mats/Waterways/river_1-4_1.png)`;
        river_illus.style.position = 'absolute'; 
        this_river_rotation = find_rotation(river_entry);
        river_illus.style.transform = `rotate(${this_river_rotation}deg)`;

    } else if (river_choice > 0.597826087 && river_choice <= 0.9673913044) {
        river_type = 'loose_bend';
        if (right_turn) {
            river_exit = loose_bend_right(river_entry);
            right_turn = false;
            river_illus.style.background = `url(../mats/Waterways/river_1-5_1.png)`;
            river_illus.style.position = 'absolute'; 
            this_river_rotation = find_rotation(river_entry);
            river_illus.style.transform = `rotate(${this_river_rotation}deg)`;
        } else {
            river_exit = loose_bend_left(river_entry);
            right_turn = true;
            river_illus.style.background = `url(../mats/Waterways/river_1-3_1.png)`;
            river_illus.style.position = 'absolute'; 
            this_river_rotation = find_rotation(river_entry);
            river_illus.style.transform = `rotate(${this_river_rotation}deg)`;
        }
        
    } else if (river_choice > 0.9673913044) {
        river_type = 'sharp_bend';
        if (right_turn) {
            river_exit = sharp_bend_right(river_entry);
            right_turn = false;
            river_illus.style.background = `url(../mats/Waterways/river_1-6_1.png)`;
            river_illus.style.position = 'absolute'; 
            this_river_rotation = find_rotation(river_entry);
            river_illus.style.transform = `rotate(${this_river_rotation}deg)`;
        } else {
            river_exit = sharp_bend_left(river_entry);
            right_turn = true;
            river_illus.style.background = `url(../mats/Waterways/river_1-2_1.png)`;
            river_illus.style.position = 'absolute'; 
            this_river_rotation = find_rotation(river_entry);
            river_illus.style.transform = `rotate(${this_river_rotation}deg)`;
        }
    }
    console.log(`River segment: ${river_type}`);
    console.log(`Entry ${river_entry} exit ${river_exit}`);

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
