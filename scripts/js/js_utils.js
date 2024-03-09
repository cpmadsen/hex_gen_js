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