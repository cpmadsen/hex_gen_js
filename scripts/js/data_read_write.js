function read_json(fileName) {
    return fetch(fileName) // Fetch the file using a relative path
    .then(response => response.json()) // Parse the JSON response
    .catch(error => {
        console.error('Error reading the JSON file:', error);
    });
}

function enable_downloads(save_button_id) {
    // Function to trigger the download
    function downloadData(filename, content) {
        var blob = new Blob([JSON.stringify(content)], { type: "application/json" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }
    
    // Function to display a modal dialog and prompt for a filename
    function promptForFilenameAndSave(dataToSave) {
        var filename = prompt("Enter a filename (or leave empty for 'data.json'):", "data.json");
        filename = filename.trim() || "data.json"; // Default filename if empty
        downloadData(filename, dataToSave);
    }
    
        // Attach click event to the "Save" button
    document.getElementById(save_button_id).addEventListener("click", function () {
    
        all_hexes = document.getElementsByClassName('hex-center')

        number_hexes = all_hexes.length;
   
        // Steps:
        // 1. Get unique IDS and class names for each hexagon. 
        // 2. Combine into dictionary-like object, dropping the class name of 'hex-center'.
        // 3. Drop We will save everything except 'open'.
        // =========
        // Step 1.
        all_hexagon_ids = Array.from(all_hexes).map(el => el.id);
        all_class_names = Array.from(all_hexes).map(el => el.classList.value.replace('hex-center ',''));

        // =========
        // Step 2.
        var hex_classes_to_save = {
            unique_ids: all_hexagon_ids,
            class_names: all_class_names
        };
        // =========
        // Step 3.
        const class_to_drop = 'open';
        hex_classes_to_save_f = {
            // Note: the '_' in the first filter is a common convention when we are using a method on an array
            // but are NOT concerned with the value of that element, only its index.
            unique_ids: hex_classes_to_save.unique_ids.filter((_, index) => hex_classes_to_save.class_names[index] !== class_to_drop),
            class_names: hex_classes_to_save.class_names.filter(value => value !== class_to_drop)
        };

        //hexes_mountain = Array.from(document.getElementsByClassName('hex-center mountain')).map(element => element.id);
    
        //var dataToSave = {
        //number_of_hexes: number_hexes,
        //numRows: number_hex_v.value,
        //numCols: number_hex_h.value,
        //mountain_hexes: hexes_mountain
        //};
        hex_classes_to_save_f.number_of_hexes = number_hexes;
        hex_classes_to_save_f.numRows = number_hex_v.value;
        hex_classes_to_save_f.numCols = number_hex_h.value;

        promptForFilenameAndSave(hex_classes_to_save_f);
    });
}

function enable_data_reads(load_button_id, callback) {
    // Function to handle file selection and data loading
    function handleFileSelect(event) {
        const fileInput = event.target;
        const file = fileInput.files[0]; // Get the selected file

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                // Parse the JSON data from the file and pass it to the callback function
                const loadedData = JSON.parse(e.target.result);
                callback(loadedData);
            };

            // Read the file as text
            reader.readAsText(file);
        }
    }

    // Add a click event listener to the "Load Data" button
    const loadDataButton = document.getElementById(load_button_id);
    loadDataButton.addEventListener('click', function () {
        // Trigger the file input dialog
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
    });

    // Add an event listener to the file input element
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', handleFileSelect);
}
