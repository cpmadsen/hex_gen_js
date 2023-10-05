function assign_terrain(terrain_type, target_proportion, terrain_replace_list){
    read_json('./data/geomorphs/' + terrain_type + '.json')
        .then(content => {
        // Assign the content to your object
        m_geo_stock = content;
        // How many JSON dictionaries are in our m_geo_stock?
        list_of_geomorphs = Object.keys(m_geo_stock);
        number_of_geomorphs = list_of_geomorphs.length;

        console.log('Working on applying ' + terrain_type);

        // Set limits //
        proportion_terrain = target_proportion; // This could be a user input later on.
        num_hexes_of_this_morph = 0;
        total_num_hexes = document.getElementsByClassName('hex-center').length;
        prop_hexes_of_this_morph = 0;
        let viable_hexes_for_terrain = range(1,(numRows*numCols));

        for(let i = 0; prop_hexes_of_this_morph <= proportion_terrain & i < 80; i++) {

            for (let morph = 0; morph < number_of_geomorphs; morph++) {

            first_col_name = Object.keys(m_geo_stock[list_of_geomorphs[morph]])[0];
            number_rows_in_geomorph = m_geo_stock[list_of_geomorphs[morph]][first_col_name].length;
            number_cols_in_geomorph = Object.keys(m_geo_stock[list_of_geomorphs[morph]]).length;

            morph_name = list_of_geomorphs[morph];
            morph_name_no_suffix = morph_name.replace(/_[0-9]+$/, '');

            //for(let i = 0; prop_hexes_of_this_morph <= proportion_mountains; i++) {

                number_hexes_of_terrain = document.getElementsByClassName(morph_name_no_suffix).length;
                prop_hexes_of_this_morph = number_hexes_of_terrain / total_num_hexes;

                if(prop_hexes_of_this_morph <= proportion_terrain) {

                anchor_id = Math.floor(Math.random() * viable_hexes_for_terrain.length);
                
                directions = ['horizontal','vertical'];
                //let direction = 'unknown';
                let direction = 'vertical';
                //direction = directions[Math.floor(Math.random() * directions.length)];
                // Calculate hex ID for this iteration of the loop.
                // These loops' start and end integers are relative to the dimensions of the geomorph file.
                for (let col_number = 1; col_number <= number_cols_in_geomorph; col_number++) {
                    for (let row_number = 1; row_number < number_rows_in_geomorph; row_number++) {

                        anchor_hex = document.getElementById('hex_' + anchor_id);

                        anchor_hex_row = anchor_id % numRows;
                        anchor_hex_col = Math.ceil(anchor_id / numRows);

                        map_col = col_number + anchor_hex_col - 1;
                        map_row = row_number + anchor_hex_row - 1;

                        if(direction == 'vertical'){
                            uniqueID = (numRows) * (map_col - 1) + map_row;
                        }
                        //if(direction == 'horizontal'){
                        //    uniqueID = (numRows) * (row_num_hex - 1) + col_num_hex;
                        //}
                        //if(direction == 'diagonal'){
                        //    // Haven't figured this one out yet...
                        //}

                        // Pull out this hexagon.
                        hex_to_mod = document.getElementById('hex_' + uniqueID);

                        // Check that this hexagon exists!
                        if(hex_to_mod != null) {
                        if(m_geo_stock[morph_name]['col_' + col_number][row_number] === 1){
                            // Any other terrain types to replace? If so, remove here.
                            for (i in terrain_replace_list) {
                                terrain_to_replace = terrain_replace_list[i];
                                console.log('Looking to replace ' + terrain_to_replace + ' with ' + morph_name_no_suffix);
                                if(hex_to_mod.classList.contains(terrain_to_replace)){
                                    console.log('Overwrote ' + terrain_to_replace + ' with ' + morph_name_no_suffix + ' for ' + hex_to_mod.id);
                                    hex_to_mod.classList.remove(terrain_to_replace);
                                }
                            }
                            // Assign this type of geometry
                            hex_to_mod.classList.add(morph_name_no_suffix);
                            viable_hexes_for_terrain.filter(k => k !== anchor_id);
                        }
                    }
                    }
                }
            }
        number_of_terrain = document.getElementsByClassName(morph_name_no_suffix).length;
        prop_hexes_of_this_morph = number_of_terrain / total_num_hexes;
    }
        }
    });
}


function select_terrain_type(){
    //assign_mountains();
    //assign_terrain('open', target_proportion = 0.6);
    //assign_terrain('swamp', target_proportion = 0.1, terrain_replace_list = ['open']);
    console.log('starting wooded application');
    assign_terrain('wooded', target_proportion = 0.2, terrain_replace_list = ['open','swamp']);
    console.log('starting desert application');
    assign_terrain('desert', target_proportion = 0.2, terrain_replace_list = ['open','wooded','swamp']);
    console.log('starting mountain application');
    assign_terrain('mountain', target_proportion = 0.1, terrain_replace_list = ['open','wooded','swamp','desert']);
}