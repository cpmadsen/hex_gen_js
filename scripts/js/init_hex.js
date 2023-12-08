function initialize_hexagons(number_of_hexes) {
    for (let i = 1; i <= number_of_hexes; i++) {
        // Create a new box element for each hexagon
        const hexagon = document.createElement('div');
        hexagon.className = 'hex-center'; // You can add a CSS class for styling
        //hexagon.id = 'hex_' + data[i].uniqueID
        hexagon.id = 'hex_' + i
        hexagon.style.width = '100px';
        //hexagon.style.height = 100 * hex_proportionality_const + 'px';
        hexagon.style.height = '100px';
        //hexagon.style.borderRadius = '50%'; /* Make it round */
        hexagon.style.position = 'absolute';
        
        // LABEL FOR HEX
        hex_label = document.createElement('div');
        hex_label.id = 'hex_label_' + i;
        hex_label.className = 'hex-label';
        //hex_label.textContent = 'Hex ' + i;             // TURN THIS OFF unless you want the hex-labels to be "Hex xyz". See Render Hex for alt. label.
        hex_label.textContent = i;
        hex_label.style.paddingTop = '58%';

        hexagon.appendChild(hex_label);

        // ILLUSTRATION FOR HEX
        hex_doodle = document.createElement('div');
        hex_doodle.id = 'hex_doodle_' + i;
        hex_doodle.className = 'hex-doodle';
        hex_doodle.style.width = '100px';
        hex_doodle.style.height = '100px';

        hexagon.appendChild(hex_doodle);

        // Append the hexagon div to the document body or another container
        //hex_gen_page = document.getElementById('hex_gen_page');
        //hex_gen_page.appendChild(hexagon);
        hex_layer = document.getElementById('hex_layer');           // CAN WE MOVE THIS OUTSIDE THE FOR LOOP TO SAVE TIME?
        hex_layer.appendChild(hexagon);
    }
}