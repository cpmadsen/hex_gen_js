// Make an array from two numbers (e.g. range(2,5) gives an array 2,3,4,5)
function range(start, end) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function choose (myArray) {
    const randomIndex = Math.floor(Math.random() * myArray.length);
    const randomValue = myArray[randomIndex];
    return randomValue;
}

function remove_old_hexes() {
    old_hexes = Array.from(document.getElementsByClassName('hex-center'));
    for (let i = old_hexes.length; i > 0; i--) {
        hex_for_removal = document.getElementById('hex_' + i);
        hex_label_for_removal = document.getElementById('hex_label_' + i);
        hex_for_removal.remove();
        hex_label_for_removal.remove();
    }
}

function extract_digits(str) {
    // Match the last 3 or 4 digits from the string
    const matches = str.match(/\d{3,4}$/);
    
    // Check if there are matches
    if (matches) {
        // Extract the matched digits
        const digits = matches[0];
        
        // Convert the matched digits to an array of individual digits
        const digitArray = digits.split('').map(Number);
        
        return digitArray;
    } else {
        return [];
    }
}

function find_adjacent (hex_id) {                               
    let current_hex_col = Math.ceil(hex_id / numRows);
    hex_id_as_int = parseInt(hex_id);
    num_row_count = parseInt(numRows);
    
    // If the hex is on the lower edge of the map:
    if(hex_id_as_int % num_row_count === 0) {
        if(current_hex_col % 2 === 0) { // even (sagging) column
            let neighbors = [
            document.getElementById(`hex_${hex_id_as_int - 1}`),                            // N  
            document.getElementById(`hex_${hex_id_as_int + num_row_count}`),                // NE
            null,                                                                           // SE
            null,                                                                           // S
            null,                                                                           // SW
            document.getElementById(`hex_${hex_id_as_int - numRows}`)]                      // NW
            return neighbors;
        } else {    // hex is odd
            let neighbors = [
            document.getElementById(`hex_${hex_id_as_int - 1}`),                            // N
            document.getElementById(`hex_${hex_id_as_int + num_row_count - 1}`),            // NE
            document.getElementById(`hex_${hex_id_as_int + num_row_count}`),                // SE
            null,                                                                           // S
            document.getElementById(`hex_${hex_id_as_int - numRows}`),                      // SW
            document.getElementById(`hex_${hex_id_as_int - numRows - 1}`)]                  // NW
            return neighbors;         
        }
    }

    // If the hex is on the upper edge of the map:
    if(hex_id_as_int % num_row_count === 1) {
        if(current_hex_col % 2 === 0) { // even (sagging) column
            let neighbors = [
            null,                                                                           // N  
            document.getElementById(`hex_${hex_id_as_int + num_row_count}`),                // NE
            document.getElementById(`hex_${hex_id_as_int + num_row_count + 1}`),            // SE
            document.getElementById(`hex_${hex_id_as_int + 1}`),                            // S
            document.getElementById(`hex_${hex_id_as_int - numRows + 1}`),                  // SW
            document.getElementById(`hex_${hex_id_as_int - numRows}`)]                      // NW
            return neighbors;
        } else {    // hex is odd
            let neighbors = [
            null,                                                                           // N
            null,                                                                           // NE
            document.getElementById(`hex_${hex_id_as_int + num_row_count}`),                // SE
            document.getElementById(`hex_${hex_id_as_int + 1}`),                            // S
            document.getElementById(`hex_${hex_id_as_int - numRows}`),                      // SW
            null]                                                                           // NW
            return neighbors;         
        }
    }

    // If the current hex is on an even (sagging) column:
    if(current_hex_col % 2 === 0) {
        let neighbors = [
        document.getElementById(`hex_${hex_id_as_int - 1}`),                            // N  
        document.getElementById(`hex_${hex_id_as_int + num_row_count}`),                // NE
        document.getElementById(`hex_${hex_id_as_int + num_row_count + 1}`),            // SE
        document.getElementById(`hex_${hex_id_as_int + 1}`),                            // S
        document.getElementById(`hex_${hex_id_as_int - numRows + 1}`),                  // SW
        document.getElementById(`hex_${hex_id_as_int - numRows}`)]                      // NW
        return neighbors;
    } else {    // hex is odd
        let neighbors = [
        document.getElementById(`hex_${hex_id_as_int - 1}`),                            // N
        document.getElementById(`hex_${hex_id_as_int + num_row_count - 1}`),            // NE
        document.getElementById(`hex_${hex_id_as_int + num_row_count}`),                // SE
        document.getElementById(`hex_${hex_id_as_int + 1}`),                            // S
        document.getElementById(`hex_${hex_id_as_int - numRows}`),                      // SW
        document.getElementById(`hex_${hex_id_as_int - numRows - 1}`)]                  // NW
        return neighbors;         
}   }

function find_adjacent_two (hex_id) {                               
    let current_hex_col = Math.ceil(hex_id / numRows);
    hex_id_as_int = parseInt(hex_id);
    num_row_count = parseInt(numRows);
    
    // if the current hex is on an even (sagging) column:
    if(current_hex_col % 2 === 0) {
        let neighbors = [
        document.getElementById(`hex_${hex_id_as_int - 1}`),                            // N  
        document.getElementById(`hex_${hex_id_as_int + num_row_count}`),                // NE
        document.getElementById(`hex_${hex_id_as_int + num_row_count + 1}`),            // SE
        document.getElementById(`hex_${hex_id_as_int + 1}`),                            // S
        document.getElementById(`hex_${hex_id_as_int - numRows + 1}`),                  // SW
        document.getElementById(`hex_${hex_id_as_int - numRows}`),                      // NW
        document.getElementById(`hex_${hex_id_as_int - 2}`),
        document.getElementById(`hex_${hex_id_as_int + num_row_count - 1}`),   
        document.getElementById(`hex_${hex_id_as_int + (2 * num_row_count) - 1}`),
        document.getElementById(`hex_${hex_id_as_int + (2 * num_row_count)}`),
        document.getElementById(`hex_${hex_id_as_int + (2 * num_row_count) + 1}`),             
        document.getElementById(`hex_${hex_id_as_int + num_row_count + 2}`), 
        document.getElementById(`hex_${hex_id_as_int + 2}`),                           
        document.getElementById(`hex_${hex_id_as_int - numRows + 2}`),
        document.getElementById(`hex_${hex_id_as_int - (2 * numRows) - 1}`),
        document.getElementById(`hex_${hex_id_as_int - (2 * numRows)}`),
        document.getElementById(`hex_${hex_id_as_int - (2 * numRows) + 1}`),                  
        document.getElementById(`hex_${hex_id_as_int - numRows - 1}`)
        ]
        return neighbors;
    } else {    // hex is odd
        let neighbors = [
        document.getElementById(`hex_${hex_id_as_int - 1}`),                            // N
        document.getElementById(`hex_${hex_id_as_int + num_row_count - 1}`),            // NE
        document.getElementById(`hex_${hex_id_as_int + num_row_count}`),                // SE
        document.getElementById(`hex_${hex_id_as_int + 1}`),                            // S
        document.getElementById(`hex_${hex_id_as_int - numRows}`),                      // SW
        document.getElementById(`hex_${hex_id_as_int - numRows - 1}`),                  // NW
        document.getElementById(`hex_${hex_id_as_int - 2}`),
        document.getElementById(`hex_${hex_id_as_int + num_row_count - 2}`),   
        document.getElementById(`hex_${hex_id_as_int + (2 * num_row_count) - 1}`),
        document.getElementById(`hex_${hex_id_as_int + (2 * num_row_count)}`),
        document.getElementById(`hex_${hex_id_as_int + (2 * num_row_count) + 1}`),             
        document.getElementById(`hex_${hex_id_as_int + num_row_count + 1}`), 
        document.getElementById(`hex_${hex_id_as_int + 2}`),                           
        document.getElementById(`hex_${hex_id_as_int - numRows + 1}`),
        document.getElementById(`hex_${hex_id_as_int - (2 * numRows) - 1}`),
        document.getElementById(`hex_${hex_id_as_int - (2 * numRows)}`),
        document.getElementById(`hex_${hex_id_as_int - (2 * numRows) + 1}`),                  
        document.getElementById(`hex_${hex_id_as_int - numRows - 2}`)
        ] 
        return neighbors;         
}   }

function random_rotation () {
    let randomizer = Math.random() * 6;
    random_int = Math.floor(randomizer);
    let rotation = 60 * random_int;
    return rotation;
}

function rotate_face (face, rotation) { 
    let face_increment = rotation / 60;
    let final_face = (face + face_increment) % 6;
    if (final_face === 0) {final_face = 6;}
    return final_face;
}

function find_rotation (entry_face) {
    // All river illustrations assume origin is 1. We take the actual origin and return the necessary rotation for the illus.
    let rotation = (entry_face - 1) * 60;
    return rotation;
}

function exit_to_entry_face (exit) {  
    let next_entry = 0;
    if (exit <= 3) {
        next_entry = exit + 3;
    } else {
        next_entry = exit - 3;
    }
    return next_entry;
}



function get_next_hex (prev_hex_id, exit_face) {
    let neighbors = find_adjacent(prev_hex_id);
    let face_hex_match = exit_face - 1;
    let next_hex = neighbors[face_hex_match];
    return next_hex;
}

function get_all_other_faces (hex_id, entry_face) {
    let neighbors = find_adjacent(hex_id);
    let face_hex_match = entry_face - 1;
    let entry_hex = neighbors[face_hex_match];
    console.log(entry_hex);
    let other_faces = neighbors.filter(hex => hex !== entry_hex);
    return other_faces;
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

function is_valid_river_hex (test_hex) {
    let is_valid = true; 

    if (test_hex == 'dead_end') { is_valid = false; }

    if (test_hex != null && test_hex !== 'dead_end') {
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


function get_river_options (hex_id, river_entry) {
    let options = Array();
    
    //straight
    let straight_exit = straight_river_faces(river_entry);
    let straight_hex = get_next_hex (hex_id, straight_exit);
    options.push(straight_hex);

    //loose bend
    if (right_turn) {
        let loose_right_exit = loose_bend_right(river_entry);
        let loose_right_hex = get_next_hex (hex_id, loose_right_exit);
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

function get_river_choice (this_hex, entry_face) {          
    let hex_id = this_hex.id.slice(4);
    let options = [];
    options = get_river_options (hex_id, entry_face);   // array of hexes

    let weighted_options = [
        {value: options[0], probability: 0},        // straight
        {value: options[1], probability: 0},        // loose bend
        {value: options[2], probability: 0}         // sharp bend
    ];
    
    // assign probs to the options depending on if they are open/swamp or woods
    if (weighted_options[0].value !== undefined) {
        if (weighted_options[0].value === null || weighted_options[0].value.classList.contains('open') || weighted_options[0].value.classList.contains('swamp')) {
            weighted_options[0].probability = 59.7826087;          
        } 
    }
    if (weighted_options[1].value !== undefined) {
        if (weighted_options[1].value === null || weighted_options[1].value.classList.contains('open') || weighted_options[1].value.classList.contains('swamp')) {
            weighted_options[1].probability = 36.95652174;
        } 
    }
    if (weighted_options[2].value !== undefined) {
        if (weighted_options[2].value === null || weighted_options[2].value.classList.contains('open') || weighted_options[2].value.classList.contains('swamp')) {
            weighted_options[2].probability = 3.260869565;
        }  
    }
    weighted_options.forEach(option => {
        if(option.value !== undefined && option.value !== null) {
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
    
    // Check to see if any of these otions have been disallowed.
    let straight_exit = straight_river_faces(entry_face);
    let loose_right_exit = 0;
    let loose_left_exit = 0;
    let sharp_right_exit = 0;
    let sharp_left_exit = 0;

    if (right_turn) {
        loose_right_exit = loose_bend_right(entry_face);
        sharp_right_exit = sharp_bend_right(entry_face);
    } else {
        loose_left_exit = loose_bend_left(entry_face);
        sharp_left_exit = sharp_bend_left(entry_face);
    }   

    let bad_face_choice = parseInt(this_hex.getAttribute("bad_choice"));
    let bad_face_choice_2 = parseInt(this_hex.getAttribute("bad_choice_2"));
    if (bad_face_choice !== null) {     // then compare the putative choices to the bad choices and see if there are any matches.
        if (straight_exit === bad_face_choice) {weighted_options[0].probability = 0;} 
        else if (loose_right_exit === bad_face_choice || loose_left_exit === bad_face_choice) {weighted_options[1].probability = 0;} 
        else if (sharp_right_exit === bad_face_choice || sharp_left_exit === bad_face_choice) {weighted_options[2].probability = 0;}
    }
    if (bad_face_choice_2 !== null) {
        if (straight_exit === bad_face_choice_2) {weighted_options[0].probability = 0;} 
        else if (loose_right_exit === bad_face_choice_2 || loose_left_exit === bad_face_choice_2) {weighted_options[1].probability = 0;} 
        else if (sharp_right_exit === bad_face_choice_2 || sharp_left_exit === bad_face_choice_2) {weighted_options[2].probability = 0;}
    }

    // weight the probabilities such that they total 1.
    let total_probabilities = weighted_options[0].probability + weighted_options[1].probability + weighted_options[2].probability;
    weighted_options.forEach(option => {
        let temp_prob = option.probability;
        option.probability = temp_prob / total_probabilities;
    });
    //console.log(weighted_options);

    if (total_probabilities === 0) {
        console.warn("Error in get_river_choice: no probability above 0.");
        return 'dead_end';
    }

    // Choose one of the options.
    let segment_type = 'undefined';

    let turn_direction = 'left';
    if (right_turn) { turn_direction = 'right'; }
    //console.log(turn_direction);

    let choice = Math.random();
    if (choice <= weighted_options[0].probability) {
        segment_type = 'straight';                  // Change segment type to reflect choice.
        this_hex.setAttribute("segment_type", segment_type); // data saved for the illustrations in later fxn.
        this_hex.setAttribute("saved_right_turn", turn_direction); // saved for illustrations.
        return weighted_options[0].value; }         // return next hex (arrived at by this segment type).
    else if (choice > weighted_options[0].probability && choice <= weighted_options[1].probability) {
        segment_type = 'loose_bend';
        this_hex.setAttribute("segment_type", segment_type); 
        this_hex.setAttribute("saved_right_turn", turn_direction);
        return weighted_options[1].value; } 
    else {
        segment_type = 'sharp_bend';
        this_hex.setAttribute("segment_type", segment_type); 
        this_hex.setAttribute("saved_right_turn", turn_direction);
        return weighted_options[2].value; } 
}




function get_exit_face_from_segment_type (segment_type, entry_face) {
    let exit_face = 0;
    if (segment_type == 'straight') {
        exit_face = straight_river_faces(entry_face);   
    } else if (segment_type == 'loose_bend') {
        if (right_turn) {
            exit_face = loose_bend_right(entry_face);
        } else {
            exit_face = loose_bend_left(entry_face);
        }
    } else if (segment_type == 'sharp_bend') {
        if (right_turn) {
            exit_face = sharp_bend_right(entry_face);
        } else {
            exit_face = sharp_bend_left(entry_face);
        }
    } else {
        console.log("Problem in get_exit_face_from_segment_type: no match to given segment type.")
    }
    return exit_face;
}