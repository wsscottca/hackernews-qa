import React, { useState, useEffect } from 'react';
import ArticleList from './components/ArticleList';
import articleService from './services/articleService';

function App() {
    const [articles, setArticles] = useState([]);
    const [hours, setHours] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await articleService.getArticles(hours);
                setArticles(data);
            } catch (err) {
                setError('Failed to load articles. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [hours]);

    return (
        <div>
            <h1>Hacker News Articles</h1>
            <input
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="Last X hours"
            />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ArticleList articles={articles} />
        </div>
    );
}

export default App;
