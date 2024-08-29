const { connectToDatabase } = require('../db');

/**
 * Get articles from the database
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getArticles = async (req, res) => {
    const { hours } = req.query;
    const filter = hours ? { age: { $gte: new Date(Date.now() - hours * 60 * 60 * 1000) } } : {};

    console.log(filter)

    try {
        const db = await connectToDatabase();
        const collection = db.collection('articles');
        const articles = await collection.find(filter).toArray();
        console.log(articles[articles.length - 1])
        res.json(articles);
    } catch (err) {
        console.error('Failed to get articles', err);
        res.status(500).send('Internal Server Error');
    }
};
