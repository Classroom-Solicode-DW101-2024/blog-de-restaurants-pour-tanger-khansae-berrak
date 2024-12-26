document.addEventListener('DOMContentLoaded', () => {
    const adminRestaurantList = document.getElementById('admin-restaurant-list');
    
    // Fetch restaurants for admin
    function fetchAdminRestaurants() {
      fetch('http://localhost:3001/restaurants')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Admin API Response:', data);
  
          const restaurants = Array.isArray(data) ? data : [];
          adminRestaurantList.innerHTML = '';
  
          if (restaurants.length === 0) {
            adminRestaurantList.innerHTML = '<p>No restaurants found.</p>';
          } else {
            restaurants.forEach(restaurant => {
              const row = document.createElement('tr');
              row.innerHTML = `
                <td>${restaurant.id}</td>
                <td>${restaurant.nom}</td>
                <td>${restaurant.speciality}</td>
                <td><img src="${restaurant.cover}" alt="${restaurant.nom}" width="100"></td>
                <td><a href="${restaurant.linkPDF}" target="_blank">View PDF</a></td>
                <td><button class="delete-btn" data-id="${restaurant.id}">Delete</button></td>
              `;
              adminRestaurantList.appendChild(row);
            });
  
            // Attach delete functionality
            document.querySelectorAll('.delete-btn').forEach(button => {
              button.addEventListener('click', handleDeleteRestaurant);
            });
          }
        })
        .catch(error => {
          console.error('Error fetching restaurants for admin:', error);
          adminRestaurantList.innerHTML = '<p>Failed to load restaurants. Please try again later.</p>';
        });
    }
  
    // Delete a restaurant
    function handleDeleteRestaurant(event) {
      const restaurantId = event.target.getAttribute('data-id');
      console.log('Deleting restaurant with ID:', restaurantId);
  
      fetch(`http://localhost:3001/restaurants/${restaurantId}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to delete restaurant with id ${restaurantId}`);
          }
          return response.json();
        })
        .then(() => {
          console.log(`Restaurant with ID ${restaurantId} deleted successfully.`);
          fetchAdminRestaurants(); // Refresh the list
        })
        .catch(error => {
          console.error(`Error deleting restaurant with ID ${restaurantId}:`, error);
          alert('Failed to delete the restaurant. Please try again.');
        });
    }
  
    // Initial fetch for admin
    fetchAdminRestaurants();
  });
  