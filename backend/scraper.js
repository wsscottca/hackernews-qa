const { chromium } = require('playwright');
const { connectToDatabase, closeDatabaseConnection } = require('./db');

/**
 * Function to scrape Hacker News articles
 */
const scrapeHackerNews = async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://news.ycombinator.com/newest');

    // Scrape the article data from the current page
    async function scrapeCurrentPage() {
        await page.waitForSelector('#hnmain tbody');

        return await page.evaluate(() => {
            // Get all the rows with articles
            const rows = Array.from(document.querySelectorAll('#hnmain tbody .athing'));
            
            // Extract data from each row
            return rows.map(row => {
                const title = row.querySelector('.titleline a')?.innerText || '';
                const url = row.querySelector('.titleline a')?.href || '';
                const site = row.querySelector('.sitebit.comhead a')?.innerText || 'N/A';
                const points = parseInt(row.nextElementSibling?.querySelector('.score')?.innerText.replace(' points', '') || '0');
                const user = row.nextElementSibling?.querySelector('.hnuser')?.innerText || 'N/A';
                const age = new Date(row.nextElementSibling?.querySelector('.age')?.getAttribute('title') || '') || '';
                
                let lastAnchor = row.nextElementSibling?.querySelectorAll('.subline a')[4]?.innerText;
                const comments = parseInt((lastAnchor === 'discuss') ? '0' : lastAnchor.replace(' comments', ''))

                return {
                    title,
                    url,
                    site,
                    points,
                    user,
                    age,
                    comments
                };
            });
        });
    }

    let articles = [];

    while (articles.length < 100) {
        // Scrape all articles from the current page
        const newArticles = await scrapeCurrentPage();

        // Add the new articles to our list
        articles = articles.concat(newArticles);

        // If we've reached our required articles break to not load the next page
        if (articles.length >= 100) break;

        // Go to the next page
        await page.click('a.morelink');
        await page.waitForURL();
    }

    // Cut any excess articles
    articles = articles.slice(0, 100);

    try {
        const db = await connectToDatabase();
        const collection = db.collection('articles');

        // Remove all old articles
        await collection.deleteMany({})
        // Then populate with new articles
        await collection.insertMany(articles);
        console.log('Articles inserted successfully');
    } catch (err) {
        console.error('Failed to insert articles', err);
    } finally {
        await closeDatabaseConnection();
        await browser.close();
    }
};

module.exports = scrapeHackerNews;
