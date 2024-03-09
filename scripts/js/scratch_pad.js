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
