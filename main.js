//const API_KEY = `80c8e3a6adbd41ba9dff4cc46dbc52c8`;
let newsList = [];
const menus = document.querySelectorAll(".menus button, .side-menu-list button")//bringing all the buttons in menus tab querySelectorAll does this
console.log("buttons", menus)
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)));


const getLatestNews = async () => {
    //const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`);
    console.log("URL", url);
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render(); // only can be rendered after getting the newsList so call the function here
    console.log("data", newsList);
}

const getNewsByCategory = async (event) => {
    // to know which category has been selected, we need to call the event
    const category = event.target.textContent.toLowerCase();
    //console.log("category", category);
    // in order to get news, we need url of those news
    //const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`);
    const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`);
    const response = await fetch(url);
    const data = await response.json();
    //console.log("ddd", data)
    newsList = data.articles; // before rendering, we need put those articles into the data
    render();
};

const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
        inputArea.style.display = "none";
    } else {
        inputArea.style.display = "inline";
    }
};

const getNewsByKeyword = async () => {
    // get keyword from the input box which is the value inside the search-input box
    const keyword = document.getElementById("search-input").value;
    //console.log("ggg", keyword);
    //const url = new URL (`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`);
    const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}`);
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    //console.log("news",data)
    render();
};

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
getLatestNews();

const openNav = () => {
    document.getElementById("mySideNav").style.width = "250px";
};

const closeNav = () => {
    document.getElementById("mySideNav").style.width = "0";
};
