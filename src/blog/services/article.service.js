const lorem = `Lorem Ipsum is simply dummy text of
    the printing and typesetting industry.
    Lorem Ipsum has been the industry's
    standard dummy text ever since the 1500s,
    when an unknown printer took a galley of
    type and scrambled it to make a type specimen book.
    It has survived not only five centuries,
    but also the leap into electronic typesetting,
    remaining essentially unchanged.
    It was popularised in the 1960s with the release of 
    Letraset sheets containing Lorem Ipsum passages,
    and more recently with desktop publishing software
    like Aldus PageMaker including versions of Lorem Ipsum.`

const articles = [
        {id: 0, title: 'Article0', text: lorem},
        {id: 1, title: 'Article1', text: lorem},
        {id: 2, title: 'Article2', text: lorem},
        {id: 3, title: 'Article3', text: lorem},
        {id: 4, title: 'Article4', text: lorem}
    ];

export class ArticleService {

    constructor() {
        if(!this.getArticles()){
            this.setArticles(articles);
        }
    }

    getArticles() {
        const result = JSON.parse(localStorage.getItem('articles'));
        return result;
    }

    setArticles(articles) {
        localStorage.setItem('articles', JSON.stringify(articles));
    }

    getArticle(id) {
        if(typeof id === 'string'){
            id = +id;
        }

        const result = this.getArticles().find(article => article.id === id);

        return result;
    }

    addArticle(article) {
        const articles = this.getArticles();
        const articleIds = articles.map(item=>+item.id);
        
        let newId = 0;
        
        if(articleIds.length !== 0){
            const maxId = Math.max(...articleIds);
            newId = maxId + 1;
        }
        
        article['id'] = newId;
        articles.push(article);
        this.setArticles(articles);
    }

    updateArticle(article) {
        const articles = this.getArticles();
        const foundArticle = articles.find(item=>{
            return item.id === +article.id
        });
        if(foundArticle){
            foundArticle.title = article.title;
            foundArticle.text = article.text;
        }
        this.setArticles(articles);
    }

    deleteArticle(id) {
        const articles = this.getArticles();
        const aticleIdx = articles.findIndex(item=>item.id===id);
        if(aticleIdx !== -1){
            articles.splice(aticleIdx ,1);
        }
        this.setArticles(articles);
    }
}
