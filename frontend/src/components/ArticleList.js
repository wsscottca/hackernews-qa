import React from 'react';

/**
 * Component to display a list of articles
 * @param {Object} props - Component props
 * @param {Array} props.articles - List of articles
 */
function ArticleList({ articles }) {
    return (
        <ul>
            {articles.map(article => (
                <li key={article._id}>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
                    <p>{article.user} | {article.points} points | {article.comments} comments | {article.age}</p>
                </li>
            ))}
        </ul>
    );
}

export default ArticleList;
