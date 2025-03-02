const API_KEY = `73014994bd1943d29b4deae2f5e5a166`;
let newsList =[];
const menus = document.querySelectorAll(".menus button");
menus.forEach((menu) => 
    menu.addEventListener("click",(event) => getNewsByCategory(event)));

let url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);

const getNews = async ()=>{//코드 리펙토링
    const response = await fetch(url);
if (!response.ok) {
    console.error("API 호출 실패:", response.status);
    return;}
const data = await response.json();
newsList = data.articles;
render();
};

const getLatestNews = async() => {
   url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);
getNews();
};

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`);
    getNews();
};

const getNewsByKeyword = async () => {
    const keyword = document.getElementById("search-input").value;
    url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`);
    getNews();
} ;

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