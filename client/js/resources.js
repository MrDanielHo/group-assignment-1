// Select the resources box and container in your HTML
const resourcesBox = document.getElementById('resources-box');
const resourceContainer = document.getElementById('resource-container');

// Add an event listener for the click event on the "Resources" box
resourcesBox.addEventListener('click', () => {
  // Check if the container is already visible
  if (resourceContainer.style.display === 'block') {
    resourceContainer.style.display = 'none'; // Hide the container if it's already visible
  } else {
    // Show the container and fetch resources
    fetch('http://localhost:3000/games/resources')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch resources');
        }
        return response.json();
      })
      .then(resources => {
        // Check if there are any resources
        if (resources.length === 0) {
          resourceContainer.innerHTML = '<p>No resources available at the moment.</p>';
        } else {
          // Create a list of resources and add them to the container
          const resourceList = resources.map(resource => {
            return `<div class="resource-item"><a href="${resource.resource_url}" target="_blank">${resource.resource_url}</a></div>`;
          }).join('');
          
          // Inject the list of resources into the container
          resourceContainer.innerHTML = resourceList;
        }

        // Show the resource container
        resourceContainer.style.display = 'block';
      })
      .catch(error => {
        console.error(error);
        resourceContainer.innerHTML = '<p>Failed to load resources. Please try again later.</p>';
        resourceContainer.style.display = 'block'; // Ensure container is shown in case of error
      });
  }
});
