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
                    key={article.id}
                     id={article.id}
                  title={article.title}
                   text={article.text}
           handleDelete={this.handleDelete}/>);
    }

    render() {
        return (
            <div className="articles">
                <div className="shadowed  articles-header">
                    <div className="articles-header__title">Articles</div>
                    <button onClick={this.handleAdd}>Add</button>
                </div>
                <div className="articles-list">
                    {this.createActicleItemsList(this.state.articles)}
                </div>
                
            </div>
        );
    }
}
