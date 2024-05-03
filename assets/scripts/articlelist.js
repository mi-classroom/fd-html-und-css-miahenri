const articleListURL = 'https://gist.githubusercontent.com/vschaefer/8d26be957bbc8607f60da5dd1b251a78/raw/49ddd7c2636fb722912d91107aff55c79ddf05a8/articles.json';

document.addEventListener('DOMContentLoaded', function () {
    createArticles();
})

function createArticles() {
    const responsePromise = fetch(articleListURL); //fetch holt sich die Daten von der URL
    responsePromise.then(function(response){ //then reagiert erst wenn Response ausgeführt wurde
        const dataPromise = response.json(); //json() gibt ein Promise zurück
        dataPromise.then(function(data){ //then reagiert erst wenn data ausgeführt wurde und löst Promise auf
            renderArticleList(data.articles);
        });
    });
}

function renderArticleList(articles) {
    articleListElement = document.querySelector('[data-js-generate-articleList]');
    const cards = articles.map(function(article) {
        return `<li>
            <figure>
            <img src="./images/${article.teaserImg}">
            <figcaption>
                <h3>${article.title} </h3>
                <address>${article.author}</address>
            </figcaption>
            </figure>
        </li>`;
    }).join('');

    articleListElement.innerHTML = cards;
    console.log(cards);

    // const authors = articles.map(function(article) {
    //     console.log(article);
    //     return `<li>${article.author}</li>`;
    // }).join('');
    // articleListElement.innerHTML = authors;
    // console.log(authors);
}
