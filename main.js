let news = [];
const getLatestNews = async () => {
    const url = new URL(`https://noona-times-v2.netlify.app/top-headlines`);
    console.log("URL", url);
    const response = await fetch(url);
    const data = await response.json();
    news = data.articles;
    console.log("data", news);
}
getLatestNews();

// for (let i = 0; i < 20; i++) {
//     console.log("after", i);
// }
