function assign_strongholds(this_SH_terrain, stronghold_chance) {
    const target_hexes = Array.from(document.getElementsByClassName(this_SH_terrain));
    let running_total_SHs = 0;
    let running_total_SH_prop = 0;  
    var previous_hex = null;
    var availableHexes = target_hexes;

    while (running_total_SH_prop < stronghold_chance) {
        availableHexes = target_hexes.filter(hex => hex !== previous_hex); // Filter out the previously selected hex
        if (availableHexes.length === 0) { // All hexes have been selected at least once, so reset the process or break the loop.
            break;
        }

        var randomIndex = Math.floor(Math.random() * availableHexes.length);
        const hex_to_mod = availableHexes[randomIndex];
        anchor_id = hex_to_mod.id.slice(4);  // just the ID number
       
        surrounds = find_adjacent_two(anchor_id);
        immediate_surrounds = find_adjacent(anchor_id);
        
        let is_allowed = true;
        surrounds.forEach((hex) => {        
            if (hex != null) {
                if (hex.classList.contains('open_stronghold') | 
                    hex.classList.contains('wooded_stronghold') |
                    hex.classList.contains('wooded_hills_stronghold') |
                    hex.classList.contains('desert_stronghold') | 
                    hex.classList.contains('mountain_stronghold') |
                    hex.classList.contains('swamp_stronghold')
                    ) {
                        //console.log(`${anchor_id} is too close to other SHs.`);
                        is_allowed = false;
                } 
           }    
        }); 
        
        immediate_surrounds.forEach((hex) => {        
            if (hex != null) {
                if (hex.classList.contains('open_town') | 
                    hex.classList.contains('wooded_town') |
                    hex.classList.contains('wooded_hills_town') |
                    hex.classList.contains('desert_town') | 
                    hex.classList.contains('mountain_town') |
                    hex.classList.contains('swamp_town')
                    ) {
                        //console.log(`${anchor_id} is too close to a town.`);
                        is_allowed = false;
                } 
           }    
        }); 

        if (is_allowed) {
            hex_to_mod.classList.remove(this_SH_terrain);
            hex_to_mod.classList.add(`${this_SH_terrain}_stronghold`); 
            //console.log(`${anchor_id} is now a SH`);
            previous_hex = hex_to_mod; 
            availableHexes = target_hexes.filter(hex => hex !== previous_hex);     
            running_total_SHs_as_array = Array.from(document.getElementsByClassName(`${this_SH_terrain}_stronghold`));
            running_total_SHs = running_total_SHs_as_array.length;
            //console.log(`Running total SHs: ${running_total_SHs}`);
            running_total_SH_prop = running_total_SHs / target_hexes.length;
            //console.log(`${running_total_SH_prop} < ${stronghold_chance}`);   
        }
    }
}


// Towns is just a copy-paste of assign_SHs... there's obviously a more concise way to do this, 
//but for now I don't feel like splitting assign_SHs into sub-functions //
function assign_towns(this_town_terrain, town_chance) {
    const target_hexes = Array.from(document.getElementsByClassName(this_town_terrain));
    let running_total_towns = 0;
    let running_total_town_prop = 0;  
    var previous_hex = null;
    var availableHexes = target_hexes;

    while (running_total_town_prop < town_chance) {
        availableHexes = target_hexes.filter(hex => hex !== previous_hex); // Filter out the previously selected hex
        if (availableHexes.length === 0) { // All hexes have been selected at least once, so reset the process or break the loop.
            break;
        }

        var randomIndex = Math.floor(Math.random() * availableHexes.length);
        const hex_to_mod = availableHexes[randomIndex];
        anchor_id = hex_to_mod.id.slice(4);  // just the ID number
       
        surrounds = find_adjacent_two(anchor_id);
        immediate_surrounds = find_adjacent(anchor_id);
        
        let is_allowed = true;
        surrounds.forEach((hex) => {    // note: inverse of assign_strongholds: towns must be farther       
            if (hex != null) {
                if (hex.classList.contains('open_town') | 
                    hex.classList.contains('wooded_town') |
                    hex.classList.contains('wooded_hills_town') |
                    hex.classList.contains('desert_town') | 
                    hex.classList.contains('mountain_town') |
                    hex.classList.contains('swamp_town')
                    ) {
                        //console.log(`${anchor_id} is too close to other towns.`);
                        is_allowed = false;
                } 
           }    
        }); 
        
        immediate_surrounds.forEach((hex) => {        
            if (hex != null) {
                if (hex.classList.contains('open_stronghold') | 
                    hex.classList.contains('wooded_stronghold') |
                    hex.classList.contains('wooded_hills_stronghold') |
                    hex.classList.contains('desert_stronghold') | 
                    hex.classList.contains('mountain_stronghold') |
                    hex.classList.contains('swamp_stronghold')
                    ) {
                        //console.log(`${anchor_id} is too close to a SH.`);
                        is_allowed = false;
                } 
           }    
        }); 

        if (is_allowed) {
            hex_to_mod.classList.remove(this_town_terrain);
            hex_to_mod.classList.add(`${this_town_terrain}_town`); 
            //console.log(`${anchor_id} is now a town`);
            previous_hex = hex_to_mod; // Update the previousHex
            availableHexes = target_hexes.filter(hex => hex !== previous_hex);     
            let running_total_towns_as_array = Array.from(document.getElementsByClassName(`${this_town_terrain}_town`));
            running_total_towns = running_total_towns_as_array.length;
            //console.log(`Running total towns: ${running_total_towns}`);
            running_total_town_prop = running_total_towns / target_hexes.length;
            //console.log(`Running town proportion = ${running_total_town_prop}`);    
            //console.log(`${running_total_town_prop} < ${town_chance}`); 
        }
    }
}
 
function delete_features(terrain_types) {
    let previous_strongholds = [];
    let previous_towns = [];
        for (let i = 0; i < terrain_types.length; i++) {
            let terrain = terrain_types[i];
            //console.log(`removing settlements from ${terrain}`);
            previous_strongholds = Array.from(document.getElementsByClassName(`${terrain}_stronghold`));  
            if (previous_strongholds.length > 0) {
                    console.log(`removing strongholds from ${terrain}`);
                    for (let i = 0; i < previous_strongholds.length; i++) {
                        let hex = previous_strongholds[i];
                        hex.classList.remove(`${terrain}_stronghold`);
                        hex.classList.add(terrain);
                        console.log(`removed SH from ${previous_strongholds[i].id}`);
                    }
                }
            previous_towns = Array.from(document.getElementsByClassName(`${terrain}_town`));  
            if (previous_towns.length > 0) {
                    console.log(`removing towns from ${terrain}`);
                    for (let i = 0; i < previous_towns.length; i++) {
                        let hex = previous_towns[i];
                        hex.classList.remove(`${terrain}_town`);
                        hex.classList.add(terrain);
                        console.log(`removed town from ${previous_towns[i].id}`);
                    }
                }
        delay;
    }
}

// Apply strongholds and towns, using probabilities from index. //
async function apply_strongholds (
    on_which_terrain_types, 
    chance_for_SH,
    chance_for_town, 
    delay
    ) {
        return new Promise((resolve) => {
            total_num_hexes = document.getElementsByClassName('hex-center').length;
            let counter = 0;

            // Delete old strongholds and towns. //
            delete_features(on_which_terrain_types);
            delay;

            function stronghold_application_loop() {
                this_terrain = on_which_terrain_types[counter];
                SH_proportion = chance_for_SH[counter];
                town_proportion = chance_for_town[counter];
                // Apply the loop with a delay between rounds.
                setTimeout(function() {  
                    delay;
                    if (counter < on_which_terrain_types.length) {            
                        console.log(`Applying settlements to ${this_terrain}...`)
                        assign_strongholds(this_terrain, SH_proportion);
                        assign_towns(this_terrain, town_proportion);
                        delay;
                        counter++;                                 
                        stronghold_application_loop();               
                    }
                }, delay)
            }
            stronghold_application_loop();
            resolve();
        });
    }     