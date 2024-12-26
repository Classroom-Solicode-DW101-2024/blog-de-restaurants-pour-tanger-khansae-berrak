app.get('/restaurants/:id', (req, res) => {
    const restaurantId = parseInt(req.params.id);
    const restaurant = restaurants.find(r => r.id === restaurantId);

    if (restaurant) {
        res.json(restaurant);
    } else {
        res.status(404).json({ message: "Restaurant not found" });
    }
});
