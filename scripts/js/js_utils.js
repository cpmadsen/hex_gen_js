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

function exit_to_entry_face (exit, rotation) {
    // Account for rotation (positive is clockwise):
    let face_increment = rotation / 60;
    let final_exit = (exit + face_increment) % 6;
    // if (final_exit === 0) {final_exit = }
    let next_entry = 0;
    if (final_exit <= 3) {
        next_entry = final_exit + 3;
    } else {
        next_entry = final_exit - 3;
    }
    return next_entry;

}