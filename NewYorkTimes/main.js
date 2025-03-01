const API_KEY = `73014994bd1943d29b4deae2f5e5a166`;
let newsList =[];
const menus = document.querySelectorAll(".menus button");
console.log("mmm",menus);
menus.forEach(menus=>menus.addEventListener("click",(event)=>getNewsByCategory(event)));

const getLatestNews = async() => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines/sources?apiKey=${API_KEY}`
);
const response = await fetch(url);
const data = await response.json();
newsList = data.articles;
render();
console.log("news",newsList);
};

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    console.log("category",category);
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`);

    const response =  await fetch(url);
    const data = await response.json();
    console.log("Ddd",data);
    newsList = data.articles;
    render();
};

const render = () => {
    const newsHTML = newsList.map(
        (news) => ` <div class="row news">  
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
            </div>
        </div>`
        ).join(""); 
    
    document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();

//1. 버튼들에 클릭 이벤트주기
//2. 카테고리별 뉴스 가져오기
//3. 그 뉴스를 보여주기