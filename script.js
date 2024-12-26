const express = require('express');
const cors=require('cors')
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;

// استخدام bodyParser لتحليل البيانات في الطلبات
app.use(bodyParser.json());

// استخدام cors
app.use(cors());

const restaurants=require("./restaurants.json")



// دالة لحفظ البيانات إلى الملف
// const saveData = () => {
//     try {
//         fs.writeFileSync(dataFilePath, JSON.stringify(restaurants, null, 2), 'utf8');
//     } catch (err) {
//         console.error('Error writing to restaurants.json:', err);
//     }
// };

// GET لعرض جميع المطاعم
app.get('/restaurants', (req, res) => {
    res.json(restaurants);
});

// GET لعرض تفاصيل مطعم معين باستخدام id
app.get('/restaurants/:id', (req, res) => {
    const restaurantId = parseInt(req.params.id);
    const restaurant = restaurants.find(r => r.id === restaurantId);

    if (restaurant) {
        res.json(restaurant);
    } else {
        res.status(404).json({ message: "Restaurant not found" });
    }
});

// POST لإضافة مطعم جديد
app.post('/restaurants', (req, res) => {
    const newRestaurant = {
        id: restaurants.length > 0 ? restaurants[restaurants.length - 1].id + 1 : 1, // استخدام ID متزايد
        nom: req.body.nom,
        address: req.body.address,
        speciality: req.body.speciality,
        notation: req.body.notation,
        reviews: req.body.reviews
    };
    restaurants.push(newRestaurant);
    saveData(); // حفظ البيانات
    res.status(201).json(newRestaurant);
});

// PUT لتحديث تفاصيل مطعم معين باستخدام id  
app.put('/restaurants/:id', (req, res) => {
    const restaurantId = parseInt(req.params.id);
    const restaurant = restaurants.find(r => r.id === restaurantId);  

    if (restaurant) {
        restaurant.nom = req.body.nom;
        restaurant.address = req.body.address;
        restaurant.speciality = req.body.speciality;
        restaurant.notation = req.body.notation;
        restaurant.reviews = req.body.reviews;
        saveData(); // حفظ البيانات
        res.status(200).json(restaurant);
    } else {
        res.status(404).json({ message: "Restaurant not found" });
    }
});

// بدء تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// Search for restaurants by name or speciality
app.get('/search', (req, res) => {
    const query = req.query.q.toLowerCase();
    const results = restaurants.filter(restaurant =>
        restaurant.nom.toLowerCase().includes(query) ||
        restaurant.speciality.toLowerCase().includes(query)
    );
    res.json(results);
});
// DELETE Restaurant by ID
app.delete('/restaurants/:id', (req, res) => {
    const restaurantId = parseInt(req.params.id);
    const index = restaurants.findIndex(r => r.id === restaurantId);
  
    if (index !== -1) {
      restaurants.splice(index, 1);
      res.status(204).send(); 
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  });
  
 
  app.get('/search', (req, res) => {
    const query = req.query.q.toLowerCase();
    const results = restaurants.filter(restaurant =>
      restaurant.nom.toLowerCase().includes(query) ||
      restaurant.speciality.toLowerCase().includes(query)
    );
    res.json(results);
  });
  

