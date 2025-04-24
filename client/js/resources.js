const resourcesBox = document.getElementById('resources-box');
const resourceContainer = document.getElementById('resource-container');


resourcesBox.addEventListener('click', () => {

  if (resourceContainer.style.display === 'block') {
    resourceContainer.style.display = 'none';
  } else {
    fetch('http://localhost:3000/games/resources')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch resources');
        }
        return response.json();
      })
      .then(resources => {
        console.log("Fetched resources:", resources);
        if (resources.length === 0) {
          resourceContainer.innerHTML = '<p>No resources available at the moment.</p>';
        } else {

          const resourceList = resources.map(url => {
            return `<div class="resource-item"><a href="${url}" target="_blank">${url}</a></div>`;
          }).join('');          
          

          resourceContainer.innerHTML = resourceList;
        }


        resourceContainer.style.display = 'block';
      })
      .catch(error => {
        console.error(error);
        resourceContainer.innerHTML = '<p>Failed to load resources. Please try again later.</p>';
        resourceContainer.style.display = 'block'; 
      });
  }
});
