const cards = document.querySelector(".cards");
const category = document.querySelector('.category');
const categorySpan = document.querySelectorAll('.category span')
const url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=73d4c10da7544086bbe42b38067d73e4";

const urlmovie = 'https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=73d4c10da7544086bbe42b38067d73e4';

const urlBusiness = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=73d4c10da7544086bbe42b38067d73e4";

const urlTech = "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=73d4c10da7544086bbe42b38067d73e4"

async function dataRequest(url){
    try{
      const response = await fetch(url);
      const data = response.json();
      return data;    
    }
    catch(error){
        console.log(error)
    }
}

function urlRequest(url){
    dataRequest(url).then(data => {
        data.articles.forEach(news => {
            cards.innerHTML += `
    
                            <div class="card">
                                <div class="image">
                                    <img src="${news.urlToImage}" alt="">
                                </div>
                                <div class="info">
                                    <div>
                                        <p class="title">${news.title}</p>
                                        <p class = "description">${news.description}</p>
                                        <p class="time">
                                            <span>${news.publishedAt.replace("Z", "").split("T")[0]}</span>
                                            <span>${news.publishedAt.replace("Z", "").split("T")[1]}</span>
                                        </p>
                                    </div>
                                    <div class="others">
                                        <span class="source">${news.source.name}</span>
                                        <a class="url"    href="">Read Article -></a>
                                    </div>
                                    
                                </div>
                                
                            </div>            
            `
        });
    });
    
}
category.addEventListener("click",event=>{
    if(event.target.tagName === "SPAN"){
        cards.innerHTML = "";
        urlRequest(event.target.dataset.id);
        categorySpan.forEach(item=>{
            item.classList.remove("active")
        })
        event.target.classList.add("active");
    }
})

