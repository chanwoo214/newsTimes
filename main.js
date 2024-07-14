//const API_KEY = `80c8e3a6adbd41ba9dff4cc46dbc52c8`;
let newsList = [];
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;
let totalPages = 1;

const menus = document.querySelectorAll(".menus button, .side-menu-list button")//bringing all the buttons in menus tab querySelectorAll does this
console.log("buttons", menus)
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)));

//let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=${pageSize}`);




const getNews = async () => {
    try {
        url.searchParams.set("page", page); //=> &page=page
        //url.searchParams.set("pageSize", pageSize);

        const response = await fetch(url);
        const data = await response.json();
        //console.log("ddd", data.totalResults);
        if (response.status === 200) {
            if (data.totalResults === 0) {
                page = 0;
                totalPages = 0;
                paginationRender();
                throw new Error("No results found");
            }

            newsList = data.articles;
            totalPages = Math.ceil(data.totalResults / pageSize);
            console.log("pagesize", pageSize);
            console.log("totalPages", totalPages);
            console.log("totalresults",data.totalResults)
            render();
            paginationRender();
        } else {
            page = 0;
            totalPages = 0;
            paginationRender();
            throw new Error(data.message);
        }

    } catch (error) {
        errorRender(error.message);
        page = 0;
        totalPages =0;
        paginationRender();
    }

};

const getLatestNews = async () => {
    //url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`);
    await getNews();
}

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    //url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`);
    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`);
    await getNews();
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
    //url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`);
    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}`);
    await getNews();
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


const paginationRender = () => {
    let paginationHTML = '';
    const pageGroup = Math.ceil(page / 5);
    const lastPage = pageGroup * 5;
    if (lastPage > totalPages) {
        lastPage = totalPages;
    }
    const firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

    if (page > 1) {
        paginationHTML = `<li class="page-item" onclick="moveToPage(1)">
                            <a class="page-link" href='#js-bottom'>&lt;&lt;</a>
                          </li>
                          <li class="page-item" onclick="moveToPage(${page - 1})">
                            <a class="page-link" href='#js-bottom'>&lt;</a>
                          </li>`;
      }
      for (let i = firstPage; i <= lastPage; i++) {
        paginationHTML += `<li class="page-item ${i == page ? "active" : ""}" >
                            <a class="page-link" href='#js-bottom' onclick="moveToPage(${i})" >${i}</a>
                           </li>`;
      }
    
      if (page < totalPages) {
        paginationHTML += `<li class="page-item" onclick="moveToPage(${page + 1})">
                            <a  class="page-link" href='#js-program-detail-bottom'>&gt;</a>
                           </li>
                           <li class="page-item" onclick="moveToPage(${totalPages})">
                            <a class="page-link" href='#js-bottom'>&gt;&gt;</a>
                           </li>`;
      }
    document.querySelector(".pagination").innerHTML = paginationHTML;

};

const moveToPage = (pageNum) => {
    //console.log("movetopage", pageNum);
    page = pageNum;
    window.scrollTo({ top: 0, behavior: "smooth" });
    getNews();
}

const errorRender = (errorMessage) => {
    const errorHTML = ` <div class="alert alert-danger" role="alert">
 ${errorMessage}
</div>`

    document.getElementById("news-board").innerHTML = errorHTML;
};

const openNav = () => {
    document.getElementById("mySideNav").style.width = "250px";
};

const closeNav = () => {
    document.getElementById("mySideNav").style.width = "0";
};

getLatestNews();
