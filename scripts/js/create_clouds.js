function create_clouds(container_height) {
    console.log('Clouds are made!')

    // Create container for clouds - this allows us to NOT resize the viewing window
    // for the hexmap based on cloud position.
    const cloud_container = document.createElement('div');
    cloud_container.className = 'cloud-container';

    for (let i = 1; i <= 6; i++) {
    // Create a new box element for each cloud
    const cloud = document.createElement('div');
    cloud.className = 'cloud'; // You can add a CSS class for styling
    cloud.id = 'cloud_' + i;

    // Random stuff
    size_modifier = Math.floor(Math.random() * 3) + 1;
    speed_modifier = Math.floor(Math.random() * 3) + 1;
    cloud_image = Math.floor(Math.random() * 3) + 1;

    cloud.style.width = 200 + 25*(size_modifier - 2) + 'px';
    cloud.style.height = 200 + 25*(size_modifier - 2) + 'px';
    cloud.style.position = 'absolute';
    cloud.style.animation = 'float ' + speed_modifier * 60 + 's linear infinite';
    cloud.style.background = 'url(../mats/clouds/cloud_' + cloud_image + '.png)';
    cloud.style.backgroundSize = 'cover';
    
    cloud.style.left = range(-300,-150)[Math.floor(Math.random() * 151)] + 'px';
    cloud.style.top = range(1,container_height)[Math.floor(Math.random() * container_height)] + 'px';
    // Append the hexagon div to the document body or another container
    cloud_container.appendChild(cloud);
    }
    document.body.appendChild(cloud_container);
}