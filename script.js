const API_KEY = "2e7c1e9dad7848f98592fb23620d5923";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    //console.log(data);
    //we want articles from that data so
    bindData(data.articles)
    // we are sending all articles to this function
}
function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");
     
    cardsContainer.innerHTML = "";
    
    //If you dont do this then your page will not get empty after reload
    // for ex : if there are already 100 cards in a page and if u have searched for smtg then the next 100 cards will
    // show below those previous 100 cards so to avoid this we empty this cardscontainer 
    articles.forEach((article) => {
        if (!article.urlToImage) return;
        //if there are no img to that url then we return
        const cardClone = newsCardTemplate.content.cloneNode(true);
        // we are deeply cloning everything under the newscardTemlate node 
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    }); //in artice date was in terms of time zone so we are converting into local time

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });//opens the article in new tab
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    // Now to select the item you clicked
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    //Removes the active class of previously clicked element
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});