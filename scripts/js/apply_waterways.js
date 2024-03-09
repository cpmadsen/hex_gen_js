// Global variables //
let swamp_hexes = Array();
let knot_candidates = Array();
let orphan_river_candidates = Array();
let final_orphan_swamps = Array();



function apply_waterways (delay) {
    // To be accurate to the Outdoor Survival map, method is:
    /* 
    OS Method
        DONE: Swamps generate the rivers backwards. Each swamp can be fed by 3 or 4 rivers.
        Within swamp, the rivers might join up, forming a knot in the centre, or they might all trail off at the swamp borders in a squiggle graphic.
        The rivers travel away in a mostly-straight line to a map edge. 
        In OS, map edges are higher and swamps are lower, so the river 'runs backwards.' 
        The rivers will NEVER go into or adjacent to deserts, and IF they go through mountains they change the tile to Open.
            If forced through woods adjacent to the swamp, the river lowers their elevation to open level.
            (Alt: some woods are randomly elevation 2 when generated, so river will sometimes scoot through them.)
            They will always end at the edge of the map [or by inference, coast.]
        DONE: Rivers mostly meander within 1 hex's direction change.  Ie. if already going N, it might go NW or NE but not SW or SE.
        DONE: The turns alternate between right and left. Always start right.
        Ocasionally the river may split within the direction of travel in smaller tributaries. 
            The split is cosmetic only and the river still travels as a single river.
        Or the river merges with another full river. Chance is quite low; happens once in OS map.     
    */

    // Resets 
    swamp_hexes = document.getElementsByClassName('swamp');
    knot_candidates = [];
    reset_waterways();

    // Placement
    find_inner_swamps();
    delay;
    assign_knots(1);   // x = knots_per_swamp, ie. x / 23 swamps //

    find_orphaned_swamp_river_candidates();
    delay;
    place_orphaned_swamp_rivers(1);     // x = rivers_per_map, ie. x / 360 hexes //
    // KNOT COUNT IS NOT YET SATISFACTORY
    // try x / 31 (+ 1 if total swamps >= 46)

}

function reset_waterways() {
    
    let swamps_to_clear = Array.from(swamp_hexes);
    swamps_to_clear.forEach((hex) => {   
        if (hex != null) {
            if (hex.classList.contains('river_knot')) {
                hex.classList.remove('river_knot');                
                let knot_illus = hex.querySelector('.hex-waterway');
                knot_illus.style.background = `url(../mats/New_Hexes/Clear.png)`;
                knot_illus.style.position = 'absolute';  
                // console.log(`River knot deleted at`);
                // console.log(hex);
            }
            if (hex.classList.contains('orphan_river')) {
                hex.classList.remove('orphan_river');                
                let knot_illus = hex.querySelector('.hex-waterway');
                knot_illus.style.background = `url(../mats/New_Hexes/Clear.png)`;
                knot_illus.style.position = 'absolute';  
                // console.log(`Orphan river deleted at`);
                // console.log(hex);
            }
        }    
    }); 
    
    all_hexes = Array.from(document.getElementsByClassName('hex-center'));
    all_hexes.forEach((hex) => {
        let water_illus = hex.querySelector('.hex-waterway');
        water_illus.style.background = `url(../mats/New_Hexes/Clear.png)`; 
        water_illus.style.position = 'absolute'; 
    });


}


function find_inner_swamps () {      // working
    for (let i = 0; i < swamp_hexes.length; i++) { 
        const target_swamp = swamp_hexes[i];     // pull out div
        hex_name = target_swamp.id;              // access "hex_xyz"
        id_number = hex_name.slice(4);  // just the ID number
        let swamp_counter = 0;
        neighboring_hexes = Array.from(find_adjacent(id_number)); 
        for (let i = 0; i < neighboring_hexes.length; i++) {
            if (neighboring_hexes[i] === null) {                     // intended behavior: knots may appear on map edge.
                swamp_counter += 1; 
                if (swamp_counter === 6) {
                    knot_candidates.push(target_swamp);
                }  
            }   
            else if (neighboring_hexes[i] != null) {
                if (neighboring_hexes[i].classList.contains('swamp')) {
                    swamp_counter += 1;
                    if (swamp_counter === 6) {
                        knot_candidates.push(target_swamp);
                    }                        
                }
            }
        }
    }
    //console.log(`Swamp river-knot candidates are: `);
    //console.log(knot_candidates);
}
    
function assign_knots (knots_per_swamp) {
    // For every 23 swamps on the map, we place one knot (default: 3 rivers.)
    // We round to the nearest integer, and if result is 0 then we apply just one.
    // We place the knots inside of swamp clusters using our list of candidates.
    // We make sure that knots are not within 3 hexes of each other using nested find_adjacent and find_adjacent_two (inefficient...?)

    let knot_count = Math.round((swamp_hexes.length * knots_per_swamp) / 23);
    if (knot_count === 0) { knot_count = 1; }
    console.log(`Knot count: ${knot_count}`);
    
    let knots_placed = 0;
    let is_allowed = true;

    let previous_hex = null;
    let availableHexes = knot_candidates;

    while (knots_placed < knot_count) {
        is_allowed = true;  // reset
        
        availableHexes = knot_candidates.filter(hex => hex !== previous_hex); // Filter out the previously selected hex
        if (availableHexes.length === 0) { // All hexes have been selected at least once, so reset the process or break the loop.
            break;
        }

        //delay;
        // console.log(`Available hexes: ${availableHexes.length}`);
        let swamp_chooser_float = Math.random() * availableHexes.length;
        // console.log(`Float: ${swamp_chooser_float}`);
        let swamp_choice_int = Math.floor(swamp_chooser_float);
        // console.log(`Int: ${swamp_choice_int}`);
        let hex_to_mod = availableHexes[swamp_choice_int]; // choose random inner swamp
        let anchor_id = hex_to_mod.id.slice(4);  // just the ID number
        
        let surrounding_three = Array();
        find_adjacent_two(anchor_id).forEach((hex) => {
            if (hex != null) {
                find_adjacent(parseInt(hex.id.replace('hex_',''))).forEach((hex) => {
                    if (hex != null) {
                    surrounding_three.push(hex.id);
                    }
              });

            }
        });
        surrounding_three = surrounding_three.filter((v, i) => surrounding_three.indexOf(v) === i); // eliminate duplicates
        // console.log(surrounding_three);

        let surrounding_three_hexes = [];
        surrounding_three.forEach((hex) => {
            let target = document.getElementById(hex);
            surrounding_three_hexes.push(target);
        });

        // console.log(surrounding_three_hexes);

        surrounding_three_hexes.forEach((hex) => {        
            if (hex != null) {
                if (hex.classList.contains('river_knot')) {
                    is_allowed = false;
                    // console.log(`Knot disallowed at`); 
                    // console.log(hex_to_mod); 
                    // console.log(`because of `);
                    // console.log(hex);
                }
            }    
        }); 
        
        if (is_allowed) {

            /*
            let number_knot_rivers = 3;
            let roll = Math.random();
            let weight_two = 0.1;
            let weight_four = 0.9;
            if (roll <= weight_two) {number_knot_rivers = 2;} else if (roll >= weight_four) {number_knot_rivers = 4;} 

            if (number_knot_rivers === 2) {

            }
            */
            let knot_selector = Math.random() * 4;
            let knot_selector_int = Math.ceil(knot_selector);
            let knot_choice = 135;

            switch (knot_selector_int) {
                case 1:
                    knot_choice = 135;
                    break;
                case 2:
                    knot_choice = 134;
                    break;
                case 3:
                    knot_choice = 145;
                    break;
                case 4:
                    knot_choice = 1245;
                    break;    

                default: 
                    console.log("Not a valid knot selection integer");
            } 
            // console.log(`Knot placed at:`); 
            // console.log(hex_to_mod);

            hex_to_mod.classList.add('river_knot');
            hex_to_mod.setAttribute("knot_type", knot_choice); // data

            // To retrieve data:
            // // Retrieve the div element
            // var myDiv = document.getElementById("myDiv");
            // Get the integer value stored in the data-myinteger attribute
            // var myInteger = parseInt(myDiv.getAttribute("knot_choice"));

            let knot_illus = hex_to_mod.querySelector('.hex-waterway');
            switch (knot_choice) {
                case 135:
                    knot_illus.style.background = `url(../mats/Waterways/River_Knot_135.png)`;
                    knot_illus.style.position = 'absolute';  
                    break;
                case 134:
                    knot_illus.style.background = `url(../mats/Waterways/River_Knot_134.png)`;
                    knot_illus.style.position = 'absolute';
                    break;
                case 145:
                    knot_illus.style.background = `url(../mats/Waterways/River_Knot_145.png)`;
                    knot_illus.style.position = 'absolute';
                    break;
                case 1245:
                    knot_illus.style.background = `url(../mats/Waterways/River_Knot_1245.png)`;
                    knot_illus.style.position = 'absolute';
                    break;
                default: 
                    console.log("Not a valid knot choice, going with default type: 135");
                    knot_illus.style.background = `url(../mats/Waterways/River_Knot_135.png)`;
                    knot_illus.style.position = 'absolute';  
            } 
            
            let rotation = random_rotation();
            knot_illus.style.transform = `rotate(${rotation}deg)`;

            // Get digits of knot as array
            let exit_faces_string = knot_choice.toString();
            let exit_faces_array = extract_digits(exit_faces_string);
            // Iterate through, for each exit face generate a river
            for(let i = 0; i < exit_faces_array.length; i++) {
                
                let face = exit_faces_array[i];
                let final_face = rotate_face(face, rotation);
                // console.log(`Final face: ${final_face}`);
                right_turn = true; // reset 
                river_meander(hex_to_mod, final_face);

            }

            previous_hex = hex_to_mod; 
            availableHexes = knot_candidates.filter(hex => hex !== hex_to_mod);

            knots_placed += 1;
        }
    }
}

function find_orphaned_swamp_river_candidates () {
    // If swamp hexes are on the edge of the map then they receive a single river.
    // Create list of 'orphaned' swamps. find_adjacent with at least 1 null hex neighbor.
    // If the list is larger than zero, spawn a single river.
    // If there are multiple orphaned swamps, use find_adjacent and hex coordinate math to determine if they are discontinuous 
    // and apply one river to each. 

    orphan_river_candidates = Array();   // reset 
    final_orphan_swamps = Array();   // reset
    let swamps_to_triple_check = Array();

    let swamps_to_check = Array.from(swamp_hexes);
    swamps_to_check.forEach((hex) => {        
        if (hex != null) {
            hex_name = hex.id;              // access "hex_xyz"
            id_number = hex_name.slice(4);  // just the ID number
            let swamp_counter_one = 0;
            let neighboring_hexes_one = Array.from(find_adjacent(id_number)); 
            for (let i = 0; i < neighboring_hexes_one.length; i++) {
                if (neighboring_hexes_one[i] != null) {
                    if (neighboring_hexes_one[i].classList.contains('swamp')) {
                    swamp_counter_one += 1;
                    if (swamp_counter_one > 2) {
                            // console.log(`Hex ${hex_name} is not an orphan.`);
                            break;
                        }                        
                    }
                }    
            }
            if(swamp_counter_one <= 2) {
                orphan_river_candidates.push(hex);
            }
        }    
    }); 
    //console.log(`First pass swamp river candidates are: `);
    //console.log(orphan_river_candidates);

    let swamps_to_double_check = Array.from(orphan_river_candidates);
    swamps_to_double_check.forEach((hex) => {        
        if (hex != null) {
            hex_name = hex.id;              // access "hex_xyz"
            id_number = hex_name.slice(4);  // just the ID number
            let swamp_counter_two = 0;
            let neighboring_hexes_two = Array.from(find_adjacent_two(id_number)); 
            for (let i = 0; i < neighboring_hexes_two.length; i++) {
                if (neighboring_hexes_two[i] != null) {
                    if (neighboring_hexes_two[i].classList.contains('swamp')) {
                    swamp_counter_two += 1;
                    if (swamp_counter_two > 4) {
                            // console.log(`Hex ${hex_name} is not an orphan.`);
                            break;
                        }                        
                    }
                }    
            }
            if(swamp_counter_two <= 4) {
                swamps_to_triple_check.push(hex);
            }
        }    
    }); 
    //console.log(`2nd pass swamp river candidates are: `);
    //console.log(swamps_to_triple_check);

    // Check within 3 hexes for 6 or more swamps. If so, disqualify.
    swamps_to_triple_check.forEach((hex) => {
        let is_allowed = true;
        let triple_check_swamp_count = 0;
        let surrounding_three = Array();
        
        if (hex != null) {
            let anchor_id = hex.id.slice(4);  // just the ID number
            find_adjacent_two(anchor_id).forEach((hex) => {
                if (hex != null) {
                    find_adjacent(parseInt(hex.id.replace('hex_',''))).forEach((hex) => {
                        if (hex != null) {
                            surrounding_three.push(hex.id);
                        }
                    });
                }
            });
        }    
                        
        surrounding_three = surrounding_three.filter((v, i) => surrounding_three.indexOf(v) === i); // eliminate duplicates
        // console.log(surrounding_three);

        let surrounding_three_hexes = [];
        surrounding_three.forEach((hex) => {
            let target = document.getElementById(hex);
            surrounding_three_hexes.push(target);
        });
        // console.log(surrounding_three_hexes);

        surrounding_three_hexes.forEach((hex) => {        
            if (hex != null) {
                if (hex.classList.contains('swamp')) {
                    triple_check_swamp_count += 1;
                    // console.log(`Knot disallowed at`); 
                    // console.log(hex_to_mod); 
                    // console.log(`because of `);
                    // console.log(hex);
                    if (triple_check_swamp_count > 5) {
                        is_allowed = false;
                    }
                }
            }    
        }); 

        if (is_allowed) {
            final_orphan_swamps.push(hex);
        }
        
    }); 
    
    console.log(`Final swamp river candidates are: `);
    console.log(final_orphan_swamps);
}



function place_orphaned_swamp_rivers(rivers_per_map) {
    let orphan_count = Math.round(rivers_per_map / 360);
    if (orphan_count === 0) { orphan_count = 1; }
    //console.log(`Orphaned swamp river maximum: ${orphan_count}`);
    
    let orphans_placed = 0;
    let is_allowed = true;
    let previous_hex = null;
    let availableHexes = final_orphan_swamps;

    while (orphans_placed < orphan_count) {
    // for (let i = 0; knots_placed < knot_count; i++) {
        is_allowed = true;  // reset
        
        availableHexes = final_orphan_swamps.filter(hex => hex !== previous_hex); // Filter out the previously selected hex
        if (availableHexes.length === 0) { // All hexes have been selected at least once, so reset the process or break the loop.
            console.log("No possible orphans to spawn a river in.");
            break;
        }

        //delay;
        // console.log(`Available hexes: ${availableHexes.length}`);
        let swamp_chooser_float = Math.random() * availableHexes.length;
        // console.log(`Float: ${swamp_chooser_float}`);
        let swamp_choice_int = Math.floor(swamp_chooser_float);
        // console.log(`Int: ${swamp_choice_int}`);
        let hex_to_mod = availableHexes[swamp_choice_int]; // choose random inner swamp
        let anchor_id = hex_to_mod.id.slice(4);  // just the ID number
        
        let surrounding_three = Array();
        find_adjacent_two(anchor_id).forEach((hex) => {
            if (hex != null) {
                find_adjacent(parseInt(hex.id.replace('hex_',''))).forEach((hex) => {
                    if (hex != null) {
                    surrounding_three.push(hex.id);
                    }
              });

            }
        });
        surrounding_three = surrounding_three.filter((v, i) => surrounding_three.indexOf(v) === i); // eliminate duplicates
        // console.log(surrounding_three);

        let surrounding_three_hexes = [];
        surrounding_three.forEach((hex) => {
            let target = document.getElementById(hex);
            surrounding_three_hexes.push(target);
        });

        // console.log(surrounding_three_hexes);

        surrounding_three_hexes.forEach((hex) => {        
            if (hex != null) {
                if (hex.classList.contains('river_knot')) {
                    is_allowed = false;
                    // console.log(`Knot disallowed at`); 
                    // console.log(hex_to_mod); 
                    // console.log(`because of `);
                    // console.log(hex);
                }
            }    
        }); 
        
        if (is_allowed) {

            console.log(`Orphan river placed at:`); 
            console.log(hex_to_mod);

            hex_to_mod.classList.add('river_orphan');

            let orphan_id = hex_to_mod.id.slice(4);
            let orphan_neighbors = Array.from(find_adjacent(orphan_id));
            
            
            let possible_orphan_origins = Array();
            for (let i = 0; i <= 5; i++) {
                if (orphan_neighbors[i] === null) {
                    let off_map_direction = i + 1;
                    possible_orphan_origins.push(off_map_direction);
                }
            }
            console.log(`possible orphan origins: ${possible_orphan_origins}`); // working
            
            // randomly select one of the options
            let random_index = Math.floor(Math.random() * possible_orphan_origins.length);
            let off_map_hex_dir = possible_orphan_origins[random_index];
            console.log(`off map hex direction: ${off_map_hex_dir}`);   // working

            // THIS BLOCK IS NOT WORKING
            /*
            need to get null direction, use it as entry face, get a valid direction, call for a river illus using the 2.


            let opposite_dir = exit_to_entry_face(off_map_hex_dir);
            let off_map_hex = ... and that's the problem, it's null.  So really we need to spawn a river, then overwrite the hex illus. with it bent in a random direction off-map.

            // set that option as the origin of a river
            // make sure river is progressing into map, not off-map
            right_turn = true; // reset 
            river_meander(off_map_hex, opposite_dir);
            */



            //let knot_illus = hex_to_mod.querySelector('.hex-waterway');
            //knot_illus.style.background = `url(../mats/Waterways/river_token.png)`;
            //knot_illus.style.position = 'absolute';  

            previous_hex = hex_to_mod; 
            availableHexes = knot_candidates.filter(hex => hex !== hex_to_mod);

            orphans_placed += 1;

            // let face = exit_faces_array[i];  // A new method to find the edge face ie. where exactly it goes off map
            // let final_face = rotate_face(face, rotation);
            // console.log(`Final face: ${final_face}`);
            
        }
    }
}



    function apply_paths () {
    // Some paths run across mutliple morphs of different types, clearly linking several settlements or fords.
    // Paths can travel across open or desert but will not render as anything in those hex types.
    // That's to stay true to OS. Other rulesets, e.g. JG or ACKS, will have roads that are clearly visible on open terrain (toggle on/off.)
    // Paths seem to be able to persist over up to 6 changes between terrain types.
    // They either aim at the next ford ahead or they just come (invisibly) to a river and stop (within open expanses).
    // Paths can be of three types, 
    //  1) relatively straight 
    //  2) gently curved
    //  3) meandering. (squiggly)
    // That said even straight paths might have a bend (single curve).

    // Paths may not cross Snowcaps.

}