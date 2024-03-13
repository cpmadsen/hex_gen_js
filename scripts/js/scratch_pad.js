// THIS IS A WORKSPACE, NOT EVER FINSIHED CODE, NEVER CALLED BY index.html



// Define the grid dimensions and obstacles
const gridSize = 10;
const obstacles = [[2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [7, 3], [7, 4], [7, 5], [6, 5], [5, 5], [5, 6]];
                                                                // == HEX GRID, MORPHS

// Function to check if a position is valid                                     // == is_valid_river_hex,   DONE
function isValidPosition(x, y) {
    return x >= 0 && x < gridSize && y >= 0 && y < gridSize && !obstacles.some(([ox, oy]) => ox === x && oy === y);
}                                                          // == IF TARGET_HEX != NULL AND !CONTAIN MOUNTAIN, ETC.

// Function to get a random valid direction                                     // == river_choice , DONE
function getRandomDirection() {
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]; // Right, Left, Down, Up
    const randomIndex = Math.floor(Math.random() * directions.length);
    return directions[randomIndex];
}                                                       

// Main function to move the snake
function moveSnake() {
    const snake = [[0, 0]]; // Start position                       // == knot or orphan [or snowcap, etc.] that spawned it 
    let [dx, dy] = getRandomDirection();

    while (true) {          // indefinite loop
        const [headX, headY] = snake[snake.length - 1];
        const nextX = headX + dx;                                      // x and y replaced with hex or hex_id, find_adj[n] or something
        const nextY = headY + dy;

        if (!isValidPosition(nextX, nextY)) {
            // If hitting an obstacle or boundary, backtrack
            let backtrack = true;                                   // DECLARES BACKTRACK WITHIN THE CHECK
            for (let i = 0; i < 4; i++) {                           
                const [nx, ny] = getRandomDirection();              // TRIES TO AVOID BACKTRACKING
                if (isValidPosition(headX + nx, headY + ny)) {
                    dx = nx;
                    dy = ny;
                    backtrack = false;
                    break;  // breaks the for loop, not the while loop
                }
            }
            if (backtrack) {                                        // ACTUALLY BACKTRACKS WITHIN ARRAY
                snake.pop(); // Backtrack one step
                if (snake.length === 0) {
                    console.log("Snake is trapped!");                               // == SQUIGGLE
                    break;
                }
            }
        } else {
            snake.push([nextX, nextY]);
            if (nextX === 0 || nextX === gridSize - 1 || nextY === 0 || nextY === gridSize - 1) {       // COULD REPLACE NEXT_HEX == NULL
                console.log("Snake reached the edge!");
                break;
            }
        }
    }

    return snake;
}

// Example usage
const snakePath = moveSnake();
console.log(snakePath);        // == RENDER THE RIVER WITH WATERWAY ILLUS.






function river_meander_TWO (prev_hex, exit_face_of_prev) {
    
    prev_anchor_id = prev_hex.id.slice(4);  // just the ID number
    let this_hex = get_next_hex(prev_anchor_id, exit_face_of_prev);
    if (this_hex === null) { return; }
    let entry_face = exit_to_entry_face (exit_face_of_prev);
    
    const river = [this_hex];
    console.log(river);
    

    while (true) {          // indefinite loop
        const river_head = river[river.length - 1];
        let next_hex = get_river_choice (this_hex, entry_face);
        let exit_face = get_exit_face (foo);    // NOT DONE. Important for illus. stage and for next iteration.

        if (!is_valid_river_hex(river_head)) {
            // If hitting an obstacle or boundary, backtrack
            let backtrack = true;                                   // DECLARES BACKTRACK WITHIN THE CHECK
            for (let i = 0; i < 4; i++) {                           
                const new_attempt_hex = get_river_choice(this_hex, entry_face);              // TRIES TO AVOID BACKTRACKING. instead of x random checks, could disqualify options (save as data for the hex?)
                if (is_valid_river_hex(new_attempt_hex)) {
                    next_hex = new_attempt_hex;
                    backtrack = false;
                    break;  // breaks the for loop, not the while loop
                }
            }
            if (backtrack) {                                        // ACTUALLY BACKTRACKS WITHIN ARRAY
                river.pop(); // Backtrack one step
                if (river.length === 0) {
                    console.log("Snake is trapped!"); 
                    console.log(river);                              // == SQUIGGLE
                    // ADD SQUIGGLE ILLUS.!!!! must be to first hex outside of knot, ie. 
                    break;
                }
            }
        } else {
            river.push([next_hex]);
            if (next_hex === null) {       // COULD REPLACE NEXT_HEX == NULL
                console.log("Snake reached the edge!");
                console.log(river);
                break;
            }
        }
    }

    return river;
}





function river_meander_TWO_old (prev_hex, exit_face_of_prev) { 
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
        // squiggle?
        console.log('Not a valid river hex.');
        //console.log(this_hex);
        return;
    } else {
        console.log('Valid river hex to start:');
        console.log(this_hex);
    }
    
    //let river_continues = true;
    while (river_continues) {          // indefinite loop
    //for (let i = 0; i < 50; i++) {    
        //entry_face = exit_to_entry_face(exit_face);
        //console.log(`at beginning of while loop, entry face is ${entry_face}`);
        
        // try turning this off. Should be redundant.
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
        // Can save deauthorized choices as data within the hexes themselves, then clean the hexes up between river calls.

        if (!is_valid_river_hex(river_head)) {                      // Has to avoid doubling over itself.
            // If hitting an obstacle or boundary, backtrack
            let backtrack = true;                                   
            // let disallowed_face = exit_to_entry_face (entry_face); // intended: remember that this direction doesn't work. Don't try again.
            // hex.data = disallowed_face
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
                if (river.length <= 1) {
                    console.log("River is trapped!"); 
                    console.log(river);                              // == SQUIGGLE
                    // ADD SQUIGGLE ILLUS.!!!! must be to first hex outside of knot, ie. 
                    river_continues = false;
                    break;
                }
            }
        } else {
            
            // Now that testing is complete, apply illustrations.
            /*
            let label = this_hex.querySelector('.hex-label');
            console.log(`Applying illustration to segment:`);
            console.log(label);
            console.log(this_hex);
            console.log(this_entry_face);
            console.log(segment_type);
            apply_river_segment_illus(this_hex, this_entry_face, segment_type);
            */  // Replace all of this with a single function that goes through the 
            

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
            
            // Save these exits and entries as data into the hex. 

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
