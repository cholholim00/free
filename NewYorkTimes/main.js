 const API_KEY = `73014994bd1943d29b4deae2f5e5a166`;
let news =[]
const getLatestNews = async() => {
  const url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&pageSize=10`
);
const response = await fetch(url);
const data = await response.json();
newsList = data.articles;
render();
console.log("news",newsList);
};

const render = () => {
    const newsHTML = newsList.map(
        news => ` <div class="row news">  
            <div class="col-lg-4">
                <img class="news-img-size" 
                src= ${news.urlToImage} />
            </div>
            <div class="col-lg-8">
                <h2>${news.title}</h2>
                <p>
                   ${news.description}
                </p>
                <div>
                    ${news.source.name} * ${news.publishedAt}
                </div>
            </div>`
        ).join(""); 
        console.log("html",newsHTML);
    
    document.getElementById("news-board").innerHTML = newsHTML;
};


getLatestNews();