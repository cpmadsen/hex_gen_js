function read_in_terrain_data(){
    var m_geo_stock = {
        'goop': [0]
    };
    var number_of_geomorphs = 0; 
    var cols_in_geomorph = 0; 
    var first_col_name = 0;
    var number_rows_in_geomorph = 0;

    // Call the read_json function and update m_geo_stock when the promise resolves
    read_json('./data/geomorphs/mountain.json')
        .then(content => {
        // Assign the content to your object
        m_geo_stock = content;
        console.log(m_geo_stock); // Check the updated object
        console.log(Object.keys(m_geo_stock));
        console.log(Object.keys(m_geo_stock).length);
        // How many JSON dictionaries are in our m_geo_stock?
        number_of_geomorphs = Object.keys(m_geo_stock).length;

        // How many columns are in any of these? What are they?
        cols_in_geomorph = Object.keys(m_geo_stock.mountain);
        number_cols_in_geomorph = cols_in_geomorph.length;
        first_col_name = Object.keys(m_geo_stock.mountain)[0];
        number_rows_in_geomorph = m_geo_stock.mountain[first_col_name].length;
        });
}