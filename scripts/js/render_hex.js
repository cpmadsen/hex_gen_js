function render_hexagons(numCols, numRows, container_height, container_width) {
    //let max_y = window.innerHeight;
    //let max_x = max_y;

    // The container height and width is currently coming from the div 'hex_gen_iframe'.

    let max_y = container_height;
    let max_x = container_width;

    // Find which of height and width are larger; use that.
    if(max_y > max_x) {
        max_y = max_x;
    } else {
        max_x = max_y;
    }

    // Reverse-buffer the screen dimensions; makes sure no hex is placed right at screen edge.
    max_x = 0.98 * max_x;
    max_y = 0.98 * max_y;

    hexagon_size_x = max_x / numCols; //* hex_proportionality_const;
    hexagon_size_y = max_y / numRows; //* hex_proportionality_const; // to maintain hex proportions

    if(hexagon_size_x > hexagon_size_y){
        hexagon_size_y = hexagon_size_x
    } else {
        hexagon_size_x = hexagon_size_y
    }

    hexagon_size_x = 1.075 * hexagon_size_y;

    // For each row...
    for (let xCoord = 1; xCoord <= numCols; xCoord++) {
    // Fill out column with hexagons
        for (let yCoord = 1; yCoord <= numRows; yCoord++) {
            // Calculate a unique ID
            const uniqueID = (numRows) * (xCoord - 1) + yCoord;
            // Grab corresponding hexagon.
            hex_for_mods = document.getElementById('hex_' + uniqueID);

            hex_for_mods.style.visibility = 'hidden';
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

            hex_for_mods.style.left = xCoord * hexagon_size_x - hexagon_size_x*0.26*xCoord + 'px';
            // If this is an even row (2, 4, 6, etc.),
            // apply a vertical offset of half the hex width.
            if(xCoord % 2 === 0) {
                hex_for_mods.style.top = (yCoord + 0.45) * hexagon_size_y - (yCoord)*hexagon_size_y*0.085 - hexagon_size_y*0.5 + 'px';
            } else {
                hex_for_mods.style.top = (yCoord) * hexagon_size_y - (yCoord)*hexagon_size_y*0.085 - hexagon_size_y*0.5 + 'px';
            }

            hex_label = document.getElementById('hex_label_' + uniqueID);
            hex_label.style.zIndex = hex_for_mods.style.zIndex + 1;
            let current_hex_row = uniqueID % numRows;
            if (current_hex_row == 0) {
                current_hex_row = numRows;
            };
            let current_hex_col = Math.ceil(uniqueID / numRows);
            hex_label.textContent = `${padWithZeroes(current_hex_col)}${padWithZeroes(current_hex_row)}`;
            hex_label.style.fontSize = hexagon_size_y*0.25 + 'px';            
        }
    }
    
    // Setting up the lava background for the hexes to float over - turn it from hidden to visible
    const lava_background = document.getElementById('lava-gradient-box');
    lava_background.style.display = 'block'; // turns it visible; css has it 'hidden' so it doesn't show up til the button is pressed
    
    const first_hex = document.getElementById('hex_' + 1);
    const last_hex = document.getElementById('hex_' + numRows*numCols);

    // For the height and width:
    const lava_box_height = 0.98*(last_hex.offsetTop - first_hex.offsetTop);
    const lava_box_width = 0.98*(last_hex.offsetLeft - first_hex.offsetLeft); // coordinates relative to the parent
    console.log(`lava box height ${lava_box_height}px and width ${lava_box_width}px.`);

    lava_background.style.height = lava_box_height + 'px';
    lava_background.style.width = lava_box_width + 'px';
    
    lava_background.style.animation = 'smooth 5s ease-in';

    const rect = first_hex.getBoundingClientRect();
    //console.log(`Left: ${rect.left}, Top: ${rect.top}`);
    
    /*
    // To position the lava box:
    const globalTop = first_hex.getOffsetTop; // Global top coordinate
    const globalLeft = first_hex.getOffsetLeft; // Global left coordinate
    console.log(`offset top ${globalTop} and left ${globalLeft}`);
    */
    
    lava_background.style.top = first_hex.offsetHeight/2 + rect.top + 'px';
    lava_background.style.left = first_hex.offsetWidth/2 + rect.left - 221 + 'px';    // Sloppy solution 
    
    
    //lava_background.style.top = globalTop + 'px';
    //lava_background.style.left = globalLeft + 'px';



    /*
    // coordinates x = xCoord * hexagon_size_x - hexagon_size_x*0.26*xCoord + 'px';
    // coordinates y = (yCoord + 0.45) * hexagon_size_y - (yCoord)*hexagon_size_y*0.085 - hexagon_size_y*0.5 + 'px';
    
    // lava width = hex coordinates of last column - of 1st column 
    lava_background.style.width = (numCols * hexagon_size_x - hexagon_size_x*0.26*numCols) - (hexagon_size_x - hexagon_size_x*0.26) + 'px';
    // lava height = coordinates of last row - first row
    lava_background.style.height = ((numRows + 0.45) * hexagon_size_y - (numRows)*hexagon_size_y*0.085 - hexagon_size_y*0.5) - (hexagon_size_y - hexagon_size_y*0.085 - hexagon_size_y*0.5) + 'px';
    // lava left = coordinates of first column
    lava_background.style.left = (hexagon_size_x - hexagon_size_x*0.26) + 'px';
    // lava top = coordinates of first row EXCEPT left and top must be relative to the inner container or whatever, not the page itself.
    lava_background.style.top = (hexagon_size_y - hexagon_size_y*0.085 - hexagon_size_y*0.5) + 'px';
    */

    /*
    lava_takeout_height = 2 * hexagon_size_y - hexagon_size_y*0.085 - hexagon_size_y*0.5;
    lava_background.style.height = (document.getElementById('hex_gen_page').offsetHeight - lava_takeout_height) + 'px';
    
    lava_takeout_width = (2 * hexagon_size_x - hexagon_size_x*0.26); 
    lava_background.style.width = (document.getElementById('hex_gen_page').offsetWidth - lava_takeout_width) + 'px';
    
    lava_background.style.left = (1 * hexagon_size_x - hexagon_size_x*0.26) + 'px'; 
    lava_background.style.top = (1) * hexagon_size_y - (1)*hexagon_size_y*0.085 - hexagon_size_y*0.5 + 'px';
    */
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




