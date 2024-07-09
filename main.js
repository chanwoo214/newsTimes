const API_KEY = `80c8e3a6adbd41ba9dff4cc46dbc52c8`;
let news = [];
const getLatestNews = async () => {
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
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
