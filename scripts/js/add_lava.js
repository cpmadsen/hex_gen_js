function add_lava(numCols, numRows){
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

// lava_background.style.animation = 'smooth 5s ease-in';
lava_background.style.animation = 'marquee 3s linear infinite';

const rect = first_hex.getBoundingClientRect();

lava_background.style.top = first_hex.offsetHeight/2 + rect.top + 'px';
lava_background.style.left = first_hex.offsetWidth/2 + rect.left - 221 + 'px';    // Sloppy solution 
}