/**
 * Fetch articles from the backend
 * @param {number} hours - Number of hours to filter articles
 * @returns {Promise<Array>} - List of articles
 */
const getArticles = async (hours) => {
    try {
        const response = await fetch(`/api/articles?hours=${hours}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch articles:', error);
        throw error;
    }
};

export default { getArticles };
