const API_KEY = `80c8e3a6adbd41ba9dff4cc46dbc52c8`;
let newsList = [];
const getLatestNews = async () => {
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    //const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`);
    console.log("URL", url);
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render(); // only can be rendered after getting the newsList so call the function here
    console.log("data", newsList);
}

const render = () => {
    const newsHTML = newsList.map(news =>
        `<div class="row news">
                    <div class="col-lg-4">
            <img class="news-img"
                src="${news.urlToImage ||
        'img/Noimage.jpg'}" onerror="this.onerror=null; this.src='img/Noimage.jpg';" >
        </div>
        <div class="col-lg-8">
            <a class="title" target="_blank" href="${news.url}">${news.title
        }</a>
                    <p>
                        ${news.description == null || news.description == ""
            ? "내용없음"
            : news.description.length > 200
                ? news.description.substring(0, 200) + "..."
                : news.description
        }</p>
                    <div>
                        ${news.source.name || "no source"} * ${moment(news.publishedAt).fromNow()}
                    </div>
                </div>
            </div>` ).join(''); // join(') gets rid of the comma which is the separator between element in the array and concatenates the elements in the array and changes to string type

    document.getElementById('news-board').innerHTML = newsHTML;
}
const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
        inputArea.style.display = "none";
    } else {
        inputArea.style.display = "inline";
    }
};
const openNav = () => {
    document.getElementById("mySideNav").style.width = "250px";
};

const closeNav = () => {
    document.getElementById("mySideNav").style.width = "0";
};
getLatestNews();