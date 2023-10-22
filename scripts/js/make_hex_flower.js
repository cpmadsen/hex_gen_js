// Create hexagon flower for Arneson cells.
function make_hex_flower(hex_size_rel_to_container){
    hex_flower_container = document.getElementById('hex_flower_container');

    // Find offset width and height of the hex flower container.
    flower_container_width = hex_flower_container.offsetWidth;
    flower_container_height = hex_flower_container.offsetHeight;

    // Use hex size rel to container to determine hex dimensions in pixels.
    hex_width_rel_to_container = hex_size_rel_to_container * flower_container_width;
    hex_height_rel_to_container = 1.2*hex_size_rel_to_container * flower_container_height;

    for (i = 1; i <= 19; i++){
    const hexagon_flower = document.createElement('div');
    hexagon_flower.className = 'hex-flower';
    hexagon_flower.classList.add('hex-invisible');
    hexagon_flower.id = 'hex_flower_' + i
    hexagon_flower.style.width = hex_width_rel_to_container + 'px';
    hexagon_flower.style.height = hex_height_rel_to_container + 'px';
    hexagon_flower.style.background = 'url(..mats/blank_hex.png)';

    nudge_x =  0.5*flower_container_width

    // Calculate left and top coordinates for central hex petal.
    // This becomes our reference point for the positioning of all other petals.
    central_hex_left = (flower_container_width / 2) - (hex_width_rel_to_container/2); 
    central_hex_top = (flower_container_height/ 2) - (hex_height_rel_to_container/2);

    // Let's arrange the hexagon flowers from top to bottom, left to right.
    if(Array.from(range(1,3)).includes(i)){
        // Hex flower is one of IDS 1 to 3; first column.
        hexagon_flower.style.left = central_hex_left + (-2)*(hex_width_rel_to_container*0.72) + 'px';
        hexagon_flower.style.top = central_hex_top + (i-2)*(hex_height_rel_to_container*0.87) + 'px';
    } 
    if(Array.from(range(4,7)).includes(i)){
        // Hex flower is one of IDS 4 to 7; second column.
        hexagon_flower.style.left = central_hex_left + (-1)*(hex_width_rel_to_container*0.72) + 'px';
        hexagon_flower.style.top = central_hex_top + (i-5.5)*(hex_height_rel_to_container*0.87) + 'px';
    }
    if(Array.from(range(8,12)).includes(i)){
        // Hex flower is in third column.
        hexagon_flower.style.left = central_hex_left + (0)*(hex_width_rel_to_container*0.72) + 'px';
        hexagon_flower.style.top = central_hex_top + (i-10)*(hex_height_rel_to_container*0.87) + 'px';
    }
    if(Array.from(range(13,16)).includes(i)){
        // Hex flower is in fourth column.
        hexagon_flower.style.left = central_hex_left + (1)*(hex_width_rel_to_container*0.72) + 'px';
        hexagon_flower.style.top = central_hex_top + (i-14.5)*(hex_height_rel_to_container*0.87) + 'px';
    }
    if(Array.from(range(17,19)).includes(i)){
        // Hex flower is in fifth column.
        hexagon_flower.style.left = central_hex_left + (2)*(hex_width_rel_to_container*0.72) + 'px';
        hexagon_flower.style.top = central_hex_top + (i-18)*(hex_height_rel_to_container*0.87) + 'px';
    }

    // Append the hexagon div to the document body or another container
    hex_flower_container.appendChild(hexagon_flower);
}
}