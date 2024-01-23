function render_hexagons(numCols, numRows, container_height, container_width, current_zoom = 1, rerender = false) {

    // Within the container (which is set to take up a % of screen size), we use a nested loop to fill out an imaginary grid 
    // with "hex-centers", which are actually top-left anchors for the hex .pngs, and these anchors are set to a pixel in the container
    // which is later scaled according to user zoom (mousewheel). 
    
    /*
    let max_y = container_height * current_zoom;
    let max_x = container_width * current_zoom;

    // Find which of height and width are larger; use that.
    if(max_y > max_x) {
        max_y = max_x;
    } else {
        max_x = max_y;
    }

    // Reverse-buffer the screen dimensions; makes sure no hex is placed right at screen edge.
    max_x = 0.98 * max_x;
    max_y = 0.98 * max_y;

    // Find the mid-point of the container; we'll zoom in and out based on that point.
    if(current_zoom == 1){
        mid_y = 0;
        mid_x = 0;
    } else {
        mid_y = 0.5 * (max_y / 2);
        mid_x = 0.5 * max_x / 2;
    } 

    // Calculate hexagon dimensions (width and height) based on how many rows and cols of hexagons 
    // will be fit into max X and Y dimensions of container.
    hexagon_size_x = max_x / numCols;
    hexagon_size_y = max_y / numRows;

    //if(hexagon_size_x > hexagon_size_y){
    //    hexagon_size_y = hexagon_size_x
    //} else {
    //    hexagon_size_x = hexagon_size_y
    //}

    // Hexagon width must always be slightly larger than hexagon height, for the PNG to not get cut off.
    hexagon_size_x = 1.075 * hexagon_size_y;

    // Rounding may help with reducing artifacts when the hexes render.
    hexagon_size_x = Math.round(hexagon_size_x);
    hexagon_size_y = Math.round(hexagon_size_y);
    */

    // Trying out constant hex size, with the zoom code in add_mouse_ef handling all scaling. 
    hexagon_size_x = 50;
    hexagon_size_y = 46;

    // Determine gutter width (margin on left and right of hex map)
    hex_map_width = hexagon_size_x * numCols;
    hex_map_height = hexagon_size_y * numRows;

    // Find amount of empty space on both sides; divide by 2.
    //horizontal_buffer = (max_x - hex_map_width) / 2 - hexagon_size_x/2;
    //vertical_buffer = (max_y - hex_map_height) / 2;

    // For each row...
    for (let xCoord = 1; xCoord <= numCols; xCoord++) {
    // Fills out column with hexagons, from top to bottom, left to right in terms of columns
        for (let yCoord = 1; yCoord <= numRows; yCoord++) {
            // Calculate a unique ID
            const uniqueID = (numRows) * (xCoord - 1) + yCoord;
            // Grab corresponding hexagon.
            hex_for_mods = document.getElementById('hex_' + uniqueID);

            if(rerender == false){
            hex_for_mods.style.visibility = 'hidden';
            }
            hex_for_mods.style.width = hexagon_size_x + 'px';
            hex_for_mods.style.height = hexagon_size_y + 'px';

            //hex_for_mods.style.zIndex = yCoord * 2;
            // Every odd row.
            if(xCoord % 2 == 1){
                hex_for_mods.style.zIndex = yCoord * 2;
            }
            // Every even row.
            if(xCoord % 2 == 0){
                hex_for_mods.style.zIndex = (yCoord) * 2 + 1;
            }

            //hex_for_mods.style.left = (xCoord-1) * hexagon_size_x - hexagon_size_x*0.26*xCoord - horizontal_buffer + 'px';
            //hex_for_mods.style.left = (xCoord-1) * hexagon_size_x - hexagon_size_x*0.26*xCoord + hexagon_size_y*2 + 'px';
            hex_for_mods.style.left = (xCoord-1) * hexagon_size_x - hexagon_size_x*0.26*xCoord + 50 + 'px';
            
            // If this is an even row (2, 4, 6, etc.),
            // apply a vertical offset of half the hex width.
            if(xCoord % 2 === 0) {
                //hex_for_mods.style.top = (yCoord + 0.45) * hexagon_size_y - (yCoord)*hexagon_size_y*0.085 - hexagon_size_y - vertical_buffer + 'px';
                //hex_for_mods.style.top = (yCoord + 0.45) * hexagon_size_y - (yCoord)*hexagon_size_y*0.085 + hexagon_size_y/4 + 'px';
                hex_for_mods.style.top = (yCoord + 0.45 - 0.5) * hexagon_size_y - (yCoord)*hexagon_size_y*0.085 + 10 + 'px';
            } else {
                //hex_for_mods.style.top = (yCoord) * hexagon_size_y - (yCoord)*hexagon_size_y*0.085 - hexagon_size_y - vertical_buffer + 'px';
                //hex_for_mods.style.top = (yCoord) * hexagon_size_y - (yCoord)*hexagon_size_y*0.085 + hexagon_size_y/4 + 'px';
                hex_for_mods.style.top = (yCoord - 0.5) * hexagon_size_y - (yCoord)*hexagon_size_y*0.085 + 10 + 'px';
            }

            // Hex Labels
            hex_label = document.getElementById('hex_label_' + uniqueID);
            hex_label.style.zIndex = hex_for_mods.style.zIndex + 2;
            let current_hex_row = uniqueID % numRows;
            if (current_hex_row == 0) {
                current_hex_row = numRows;
            };
            let current_hex_col = Math.ceil(uniqueID / numRows);
            hex_label.textContent = `${padWithZeroes(current_hex_col)}${padWithZeroes(current_hex_row)}`;

            // THE ABOVE IS FOR THE HEX LABEL TO DISPLAY NICELY AS COL/ROW. 
            // When debugging it can be useful to switch this off and turn on the "Hex xyz" label found in init_hex.
            
            hex_label.style.fontSize = hexagon_size_y*0.25 + 'px'; 
            
            // Hex Illustrations
            hex_illus = document.getElementById('hex_doodle_' + uniqueID);
            hex_illus.style.zIndex = hex_for_mods.style.zIndex + 1;
            hex_illus.style.width = hexagon_size_x + 'px';
            hex_illus.style.height = hexagon_size_y + 'px';
        }
    }
}

function padWithZeroes(value) {
    // Convert the value to a string
    let stringValue = value.toString();

    // Determine how many zeroes to add
    let zeroesToAdd = 2 - stringValue.length;

    // Add the required number of zeroes to the left of the value
    if (zeroesToAdd > 0) {
        for (let i = 0; i < zeroesToAdd; i++) {
            stringValue = '0' + stringValue;
        }
    }

    return stringValue;
}

/* Some Chat code that will give finer control over hex-label size.
// Get references to the container and text elements
const container = document.getElementById('');
const label_text = document.getElementsByClassName('hex-label');

// Function to adjust font size based on container size
function adjustFontSize() {
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Set the font size based on container width, height, or a combination of both
    const fontSize = Math.min(containerWidth, containerHeight) * 0.1; // Adjust the scaling factor as needed

    // Apply the new font size to the text element
    text.style.fontSize = fontSize + 'px';
}

// Initial font size adjustment
adjustFontSize();

// Add an event listener to handle font size adjustments when the window is resized
window.addEventListener('resize', adjustFontSize);
*/




