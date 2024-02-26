/* start the rivers meandering from the knots and orphans above
    river_meander();
        let right_left = right;
        rotation = 0; // will be set by spawning knot/orphan.
        // Rotation will be in increments of 60 degrees. CSS can transform accordingly, eg. "transform: rotate(45deg);"

        roll for next segment to try - 
                0.597826087 straight, 
                0.3695652174 loose bend,
                0.03260869565 sharp bend 
            check to see if elevation allows this choice. If not re-roll. 
            Woods allow a 0.08695652174 chance (8.7%) of river climbing 'up' in. 

            Any bend alternates from right to left. All start right.
                Squiggles and further knots (to join rivers that collide) simply added as needed, no proportion/chance.
                Cosmetic tributaries (bifurcated straights) to be figured out once it's working.
            Use another function to determine river illus based on entrance and exit faces.

        carry forward the rotation from the previous segment. 
        and/or
        carry forward: the exit face of the previous segment becomes the entry face of this segment. 
                A function to translate rotation and faces: ie. if 134 is rotated 60 deg. to 245... exit 5 is now entry 2... 


        check to see that the river does not come within 1 of a desert, 
        check to see it is not hemmed in by multiple mountains in a row 
            (can break thru a single row of mountains, but not 2 mountains in a row ie. not a whole morph)
            save as a boolean: "broke_through_mountains" rather than find_adj_two? 
            or whenever a river hits a mountain, use find_adj and find_adj_2 to see if it breaks thru or glances off?
        check to see if river has broken up into woods elevation for 2 hexes already. it cannot do a third and must dismount into open if 
            possible. 
        If any of these checks fail, backtrack and reroll. If that fails, backtrack farther (rare case of being 'cornered'). 
        If a certain number of backtracks fail, the river either "dies on the vine" and becomes a swamp squiggle (upper right of OS), or 
                it breaks some rules and carves through over 2 woods, turning them all to open (see lower left of OS).


    */

function river_meander () {

}