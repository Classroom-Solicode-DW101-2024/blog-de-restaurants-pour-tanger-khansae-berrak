
const detailsContainer = document.getElementById('restaurant-details');
const imageContainer = document.getElementById('restaurant-image');

   async function fetchRestaurantDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const restaurantId = urlParams.get('id');
        const response = await fetch(`http://localhost:3001/restaurants/${restaurantId}`)
        const restaurant = await response.json();
        imageContainer.innerHTML = `
        <div class="card">
        <div class="card-left">
          <img src="${restaurant.cover || 'default-image.jpg'}" alt="${restaurant.nom}">
        </div>
        <div class="card-right">
          <h1>${restaurant.nom}</h1>
          <p><strong>Address:</strong> ${restaurant.address || 'Not available'}</p>
          <p><strong>Speciality:</strong> ${restaurant.speciality}</p>
          <p><strong>Rating:</strong> ${restaurant.notation}/5</p>
          <div class="reviews">
            <h3>Reviews:</h3>
            <ul>
              ${restaurant.reviews.map(review => `<li>${review}</li>`).join('') || '<li>No reviews available</li>'}
            </ul>
          </div>
      
          <a href="${restaurant.linkPDF}" class="menu-btn">View Menu</a>
        </div>
      </div>
      
          
        `;
      
    }

    fetchRestaurantDetails()
    

  

 
       
        
     
