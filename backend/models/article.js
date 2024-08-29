const { ObjectId } = require('mongodb');

/**
 * Article object
 */
const Article = {
    id: ObjectId,
    title: String,
    url: String,
    site: String,
    points: Number,
    user: String,
    age: Date,
    comments: Number,
    createdAt: Date,
};

module.exports = Article;
