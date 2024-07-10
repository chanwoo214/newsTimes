//const API_KEY = `80c8e3a6adbd41ba9dff4cc46dbc52c8`;
let newsList = [];
const getLatestNews = async () => {
    //const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    const url = new URL(` https://codingnoona-project3.netlify.app/top-headlines?country=kr`);
    console.log("URL", url);
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render(); // only can be rendered after getting the newsList so call the function here
    console.log("data", newsList);
}
getLatestNews();

const render = () => {
    const newsHTML = newsList.map(news => `
         <div class="row news">
                <div class="col-lg-4">
                    <img class="news-img-size" src="${news.urlToImage}">
                </div>
                <div class="col-lg-8">
                    <h2>${news.title}</h2>
                    <p>
                        ${news.description}
                    </p>
                    <div>
                        ${news.source.name} * ${news.publishedAt}
                    </div>
                </div>
            </div>` ).join(''); // join(') gets rid of the comma which is the separator between element in the array and concatenates the elements in the array and changes to string type

    document.getElementById('news-board').innerHTML = newsHTML;
}