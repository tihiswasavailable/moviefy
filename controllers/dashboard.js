const API_KEY = 'ff68920a968c2d2dd9137d7879912b95';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
const fetch = require('node-fetch');

// fetch(API_URL)
exports.renderDashboard = async (req, res) => {
    try {
        const response = await fetch('https://api.github.com/users/github'); // Example API call
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        res.render('dashboard', { data }); // Pass the fetched data to your dashboard.ejs view
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
};


    


