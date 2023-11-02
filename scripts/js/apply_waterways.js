function apply_waterways () {
    // To be accurate to the Outdoor Survival map, method is:
    /* 
    Swamps generate the rivers backwards. Each swamp can be fed by up to (2 to)3 rivers.
        Either have to have the geomorph put out a flag that the rivers can attach to (from its centre essentially, using a 2 instead of a 1)
        Or a method using find adjacent and so on to get a count of the overall size of a swamp, then find how many rivers it will spawn by its size.
        Within swamp, the rivers might join up, forming a knot in the centre, or they might all trail off at the swamp borders in a squiggle graphic.
    The rivers travel away in a mostly-straight line to a map edge. In OS, map edges are higher and swamps are lower. 
    Rivers crawl away from the swamp, preferring lower elevations to higher.
    If forced through woods adjacent to the swamp, the river lowers their elevation to open level.
        (Alt: some woods are randomly elevation 2 when generated, so river will sometimes scoot through them.)
    River randomly meanders within 3 hexes direction change.  Ie. if already going N, it might go NW or NE but not SW or SE.
    Ocasionally the river may split within the direction of travel, ie. the split is cosmetic only and the river still travels as a single river.
    Or the river actually splits off into another. Chance is quite low; happens once in OS map. (1/98 chance) (or 1/100 obviously)
    Rivers never get within one hex of a desert.
    OS has a river going from one swamp to the other, implying an elevation difference between the two. 
        Perhaps the simplest way to code this is just to iterate through the swamps, having one spawn rivers outwards before the other(s). 
    Fords have a 9/98 chance (or 1/10) to show up.


    // The Delving Deeper method could work very very similarly, just with the difference that rivers could feed down from snowcaps.
    // And rivers could end in the ocean, seas, etc.



    */
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