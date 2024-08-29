const app = require('./app');
const scrapeHackerNews = require('./scraper');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Start the server
        app.listen(PORT, async () => {
            console.log(`Server is running on port ${PORT}`);
        });

        // Run the scraper
        await scrapeHackerNews();
        console.log('Scraping completed and data inserted into the database');
    } catch (err) {
        console.error('Error starting server:', err);
    }
};

startServer();
