const articleListURL = 'https://gist.githubusercontent.com/vschaefer/8d26be957bbc8607f60da5dd1b251a78/raw/49ddd7c2636fb722912d91107aff55c79ddf05a8/articles.json';
let currentData = null;

document.addEventListener('DOMContentLoaded', function () {
    initArticles();
})

function initArticles() {
    const responsePromise = fetch(articleListURL); //fetch holt sich die Daten von der URL
    responsePromise.then(function(response){ //then reagiert erst wenn Response ausgeführt wurde
        const dataPromise = response.json(); //json() gibt ein Promise zurück
        dataPromise.then(function(data){ //then reagiert erst wenn data ausgeführt wurde und löst Promise auf
            currentData = data;
            renderArticleList(data.articles);
            initFilters();
        });
    });
}

function initFilters() {
    filterButtons = document.querySelectorAll('[data-js-category="keywords"] [data-js-filter]');
    filterButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            const filter = event.currentTarget.getAttribute('data-js-filter');
            const filteredArticles = filterArticles(filter);
            renderArticleList(filteredArticles);
        });
    });
}

function filterArticles(filterValue) {
    const filteredArticles = currentData.articles.filter(function(article) {
        return article.tags.keywords.includes(filterValue);
    });
    return filteredArticles;
}

function renderArticleList(articles) {
    const articleListElement = document.querySelector('[data-js-generate-articleList]');
    const cards = articles.map(function(article) {
        const tags = article.tags.keywords.map(tag => `<li>${tag}</li>`).join('');
        return `<li>
            <figure>
            <img src="./images/${article.teaserImg}">
            <figcaption>
                <h3>${article.title} </h3>
                <address>${article.author}</address>
                <ul class = "tag-list">
                    ${tags}
                    ${article.tags.modules.map(tag => `<li>${tag}</li>`).join('')}
                    ${article.tags.fileFormat.map(tag => `<li>${tag}</li>`).join('')}
                </ul>
            </figcaption>
            </figure>
        </li>`;
    }).join('');

    articleListElement.innerHTML = cards;
    console.log(cards);
}
