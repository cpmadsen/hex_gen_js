function assign_terrain(terrain_type, target_proportion, terrain_replace_list, elevation_type, elevation_replace_list) {        
        read_json('./data/geomorphs/' + terrain_type + '.json')
            .then(content => {
            m_geo_stock = content;
            list_of_geomorphs = Object.keys(m_geo_stock);
            number_of_geomorphs = list_of_geomorphs.length;
            
            // Set limits //
            total_num_hexes = document.getElementsByClassName('hex-center').length;
            proportion_terrain = target_proportion; // This could be a user input later on.
            let prop_hexes_of_this_morph = 0;
            let viable_hexes_for_terrain = range(1,(total_num_hexes));

            // Geomorph application to random anchor //
            for(let i = 0; prop_hexes_of_this_morph <= proportion_terrain & i < 3000; i++) {
                morph = Math.floor(Math.random() * number_of_geomorphs); 

                // Find dimensions of geomorph //
                first_row_name = Object.keys(m_geo_stock[list_of_geomorphs[morph]])[0];    
                number_rows_in_geomorph = Object.keys(m_geo_stock[list_of_geomorphs[morph]]).length;   
                number_cols_in_geomorph = m_geo_stock[list_of_geomorphs[morph]][first_row_name].length;

                // Morph name and terrain type //
                morph_name = list_of_geomorphs[morph];
                morph_name_no_suffix = morph_name.replace(/_[0-9]+$/, '');

                // Running total and percentile of terrain type //
                number_hexes_of_terrain = document.getElementsByClassName(morph_name_no_suffix).length; 
                prop_hexes_of_this_morph = number_hexes_of_terrain / total_num_hexes;   

                // Find our anchor id //
                anchor_id = Math.floor(Math.random() * viable_hexes_for_terrain.length);
                console.log(`${anchor_id} is the anchor id for ${morph_name}.`);
                let anchor_hex_row = anchor_id % numRows;
                let anchor_hex_col = Math.ceil(anchor_id / numRows);
                if(anchor_hex_col % 2 === 0) {
                    anchor_hex_col ++;  // To deal with even-row sag all morphs start on an odd column //
                }
            
                // Calculate hex IDs through the geomorph 'lattice' //
                for (let temp_col_number = 0; temp_col_number <= number_cols_in_geomorph; temp_col_number++) {
                    for (let temp_row_number = 0; temp_row_number < number_rows_in_geomorph; temp_row_number++) {                        
                        map_col = anchor_hex_col + temp_col_number;  
                        map_row = anchor_hex_row + temp_row_number;     
                        uniqueID = (numRows) * (map_col - 1) + map_row;
                        // map_col and _row are the positions on the hexmap of the particular hex being overwritten
                        // temp_col and _row are intermediaries that exist only in this nested loop
                         
                        // Pull out this hexagon ('hex_to_modify') //
                        hex_to_mod = document.getElementById('hex_' + uniqueID);
                        geo_row_value = temp_row_number + 1;
                        if(hex_to_mod != null) {
                            // Check the geomorph grid's value; if it's 1, apply it to the hexagon //
                            if(m_geo_stock[morph_name]['row_' + geo_row_value][temp_col_number] === 1) {    
                                for (i in terrain_replace_list) {       // Check: any other terrain types to replace? 
                                    terrain_to_replace = terrain_replace_list[i];
                                    if(hex_to_mod.classList.contains(terrain_to_replace)) {
                                        hex_to_mod.classList.remove(terrain_to_replace);
                                    }
                                    elevation_replace_list.forEach((elevation_to_replace) => {
                                        if(hex_to_mod.classList.contains(elevation_to_replace)){
                                            hex_to_mod.classList.remove(elevation_to_replace);
                                        }
                                    })
                                }
                                // After the check of other terrain types above, add terrain class to targetted hex //
                                hex_to_mod.classList.add(morph_name_no_suffix);
                                hex_to_mod.classList.add(elevation_type);
                                // Remove this hexagon from the list of viable choices for a new anchor (for next loop iteration)
                                viable_hexes_for_terrain.filter(k => k !== hex_to_mod);     // hex_to_mod replaces uniqueID
                }   }   }   }   
            // Recalculate the running terrain proportion to see if we should run loop again //
            number_of_terrain = document.getElementsByClassName(morph_name_no_suffix).length;
            prop_hexes_of_this_morph = number_of_terrain / total_num_hexes;
            }
        });    
}

function final_count_proportion (type_to_count) {
    let count = document.getElementsByClassName(type_to_count).length;
    let total = document.getElementsByClassName('hex-center').length;
    let final_proportion = count / total;
    return final_proportion;
}

function find_adjacent (hex_id) {                               
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

function cleanup_adjacent (target__terrain_type, disallowed_neighbors, replacement_type, disallowed_elevations, replacement_elevation) {
    console.log(`Replacing ${disallowed_neighbors}s near ${target__terrain_type}s with ${replacement_type}.`);
    let target_list = document.getElementsByClassName(target__terrain_type);
    // Iterate through div elements by their IDs
    for (let i = 0; i < target_list.length; i++) {
        const div = target_list[i];     // pull out div
        hex_name = div.id;              // access "hex_xyz"
        id_number = hex_name.slice(4);  // just the ID number

        // for each, check its 6 neighbors... 
        neighboring_hexes = Array.from(find_adjacent(id_number));
        // ... and replace unwanted types with a new type.
        disallowed_neighbors.forEach((disallowed_type) => {
            disallowed_elevations.forEach((disallowed_elevation) => {
                neighboring_hexes.forEach((hex) => {
                    if (hex != null) {
                        if (hex.classList.contains(disallowed_type)) {
                            hex.classList.remove(disallowed_type);
                            hex.classList.add(replacement_type);
                        }
                        if (hex.classList.contains(disallowed_elevation)) {
                            hex.classList.remove(disallowed_elevation);
                            hex.classList.add(replacement_elevation);
                        }
                    } 
                })
            })
        });    
}   }

// Mountains to Snowcaps
function apply_special_mountains (chance_for_snowcaps, chance_wooded_hills) {
    //console.log(`Applying snowcaps at ${chance_for_snowcaps * 100}% chance.`);
    let all_mountains = document.getElementsByClassName('mountain');
    for (let i = 0; i < all_mountains.length; i++) { 
        const target_mountain = all_mountains[i];     // pull out div
        hex_name = target_mountain.id;              // access "hex_xyz"
        id_number = hex_name.slice(4);  // just the ID number
        neighboring_hexes = Array.from(find_adjacent(id_number)); 
        let mountain_counter = 1;
        for (let i = 0; i < neighboring_hexes.length; i++) {
            if (neighboring_hexes[i] != null) {
                if (neighboring_hexes[i].classList.contains('mountain') | neighboring_hexes[i].classList.contains('snowcap')) {
                    mountain_counter += 1;
                    if (mountain_counter == 6) {
                        if (Math.random(0,1) <= chance_for_snowcaps) {
                            target_mountain.classList.remove('mountain');
                            target_mountain.classList.add('snowcap');
                            target_mountain.classList.remove('elevation_6');
                            target_mountain.classList.add('elevation_7');
                        }                        
                    }
                } else if (neighboring_hexes[i].classList.contains('wooded')) {
                    if (Math.random(0,1) <= chance_wooded_hills) {     
                        target_mountain.classList.remove('elevation_6'); // lower mountain to foothill
                        target_mountain.classList.add('elevation_5');
                        neighboring_hexes[i].classList.remove('wooded');
                        neighboring_hexes[i].classList.add('wooded_hills');
                        neighboring_hexes[i].classList.remove('elevation_3');
                        neighboring_hexes[i].classList.add('elevation_4');
                    }
                } else {
                    target_mountain.classList.remove('elevation_6'); // lower mountain to foothill
                    target_mountain.classList.add('elevation_5');
}   }   }   }   }

async function select_terrain_type(
    terrain_types,
    terrain_proportions,
    terrain_replace_list,
    elevation_classes,
    elevation_replacements,
    delay
    ){
    return new Promise((resolve) => {
        let i = 0;
   
        function terrain_application_loop() {
            this_terrain = terrain_types[i];
            this_proportion = parseFloat(terrain_proportions[i]);
            this_replacement_list = terrain_replace_list[i];
            this_elevation = elevation_classes[i];
            this_elevation_replace_list = elevation_replacements[i];

            // Apply the loop with a delay between rounds.
            setTimeout(function() {  
                if (i < terrain_types.length) {            //  if the counter is less than the # of terrain types to add,
                //    console.log(`About to apply ${this_terrain} from terrain application loop.`);
                    assign_terrain(this_terrain, this_proportion, this_replacement_list, this_elevation, this_elevation_replace_list);
                    delay;
                    i++;                                    //  increment the counter
                    terrain_application_loop();             //   do loop again.
                         } else {
                    // Any hexes that are left over and didn't get any terrain type applied?
                    // Make them into 'open' type!
                    all_hexes = Array.from(document.getElementsByClassName('hex-center'));
                    excluded_terrain_types = ["wooded", "swamp", "desert", "mountain"];
                    open_hexes = all_hexes.filter(function (element) {
                        return !excluded_terrain_types.some(function (excluded_terrain_types) {
                        return element.classList.contains(excluded_terrain_types);
                        });
                    });
                    open_hexes.map(k => k.classList.add('open'));
                    open_hexes.map(k => k.classList.add('elevation_2'));

                    delay;
                    // final count data:
                    let terrain_table = []
                    for(k in terrain_types) {
                        terrain_table.push({TerrainType: terrain_types[k], Proportion: final_count_proportion(terrain_types[k])});
                    }
                    console.table(terrain_table);  
                    delay;

                    // (type to look at, disallowed neighbors, replacement type, disallowed elevations, replacement elevation)
                    cleanup_adjacent('swamp', ["desert", "mountain"], 'wooded', ['elevation_2', 'elevation_6'], 'elevation_3');  
                    cleanup_adjacent('desert', ["wooded"], 'open', ['elevation_3'], 'elevation_2'); 
                    delay;
                    delay;
                    apply_special_mountains(.5, 1);
                    delay;
                }
            }, delay)
        }
        terrain_application_loop();
        resolve();
    });
}            
