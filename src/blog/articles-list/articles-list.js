import React, {Component} from 'react';
import {ArticleListItem} from './article-list-item';
import {ArticleService} from '../services/article.service.js';
import './articles-list.scss';

export class ArticlesList extends Component {
    articleService = new ArticleService();

    constructor(props){
        super(props);
        this.state = {
            articles: []
        }
        this.getArticles = this.getArticles.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    componentDidMount(){
        this.getArticles();
    }

    getArticles(){
        this.setState({
            articles: this.articleService.getArticles()
        });
    }

    handleDelete(id){
        this.deleteArticle(id);
    }
    
    handleAdd(){
        const url = `${this.props.match.path}/add`;
        this.props.history.push(url);
    }

    deleteArticle(id){
        const newArticles = [...this.state.articles];
        const articleId = newArticles.findIndex(article=>article.id === id);
        if(articleId !== -1){
            newArticles.splice(articleId, 1);
            this.setState({articles: newArticles});
        }
    }

    createActicleItemsList(articles){
        articles = articles || [];
        return articles.map( article => <ArticleListItem 
                    className="article"
                    key={article.id}
                     id={article.id}
                  title={article.title}
                   text={article.text}
           handleDelete={this.handleDelete}/>);
    }

    render() {
        return (
            <div className="articles">
                <button onClick={this.handleAdd}>Add</button>
                {this.createActicleItemsList(this.state.articles)}
            </div>
        );
    }
}
