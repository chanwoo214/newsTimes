const API_KEY = `80c8e3a6adbd41ba9dff4cc46dbc52c8`;
let newsList = [];
const menus = document.querySelectorAll(".menus button, .side-menu-list button")//bringing all the buttons in menus tab querySelectorAll does this
console.log("buttons", menus)
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)));

let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
//let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`);

const getNews = async () => {
    try {
        const response = await fetch(url);

        const data = await response.json();
        if (response.status === 200) {
            if (data.articles.length ===0){
                throw new Error ("No results found");
            }
            newsList = data.articles;
            render();
        }   else {
            throw new Error (data.message);
        }

    } catch (error) {
        errorRender(error.message);
    }

};

const getLatestNews = async () => {
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    //url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`);
    getNews();
}

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`);
    //url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`);
    getNews();
};

const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    let searchInput = document.getElementById("search-input");

    inputArea.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            getNewsByKeyword();
        }
    });

    if (inputArea.style.display === "inline") {
        inputArea.style.display = "none";
    } else {
        inputArea.style.display = "inline";
    }

    //clears the input search box when cursor clicks 
    searchInput.addEventListener("focus", function () {
        searchInput.value = "";
    });
};

const getNewsByKeyword = async () => {
    const keyword = document.getElementById("search-input").value;
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`);
    //url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}`);
    getNews();
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
            </div>` ).join('');

    document.getElementById('news-board').innerHTML = newsHTML;
};

const errorRender = (errorMessage) => {
  const errorHTML =  ` <div class="alert alert-danger" role="alert">
 ${errorMessage}
</div>`

document.getElementById("news-board").innerHTML = errorHTML;
}

getLatestNews();

const openNav = () => {
    document.getElementById("mySideNav").style.width = "250px";
};

const closeNav = () => {
    document.getElementById("mySideNav").style.width = "0";
};
