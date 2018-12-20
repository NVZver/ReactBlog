import React, {Component} from 'react';
import {ArticleListItem} from './article-list-item';
import {ArticleForm} from '../article-form/article-form';
import {ArticleService} from '../services/article.service.js';
import './articles-list.scss';

export class ArticlesList extends Component {
    articleService = new ArticleService();

    constructor(props){
        super(props);
        this.state = {
            articles: [],
            displayedArticles: [],
            search: ''
        }
        this.getArticles = this.getArticles.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.addArticle = this.addArticle.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    componentDidMount(){
        this.getArticles();
    }

    getArticles(){
        const articles = this.articleService.getArticles();
        this.setState({
            articles: [...articles],
            displayedArticles: [...articles]
        });
    }

    handleDelete(id){
        this.deleteArticle(id);
    }

    handleSearchChange(e){
        const value = e.target.value;
        this.setState({ 
            search: value,
            displayedArticles:this.searchArticles(value)
        });
    }

    searchArticles(search) {
        const regEx = new RegExp(search, 'gi');
        return this.state.articles
                .filter(article=> regEx.test(article.title) || regEx.test(article.text))
    }

    deleteArticle(id){
        this.articleService.deleteArticle(id);
        this.getArticles();
    }

    createActicleItemsList(articles){
        articles = articles || [];
        console.log(articles);
        return articles
                .sort((a, b)=>new Date(b.created) - new Date(a.created))
                .map( article => <ArticleListItem 
                    key={article.id}
                     id={article.id}
                  title={article.title}
                   text={article.text}
                created={article.created}
           handleDelete={this.handleDelete}/>);
    }

    addArticle(article){
        this.articleService.addArticle(article);
        this.getArticles();
    }

    render() {
        return (
            <div className="articles">

                <div className="shadowed articles-header">
                    <div className="articles-header__title">Articles</div>
                    <input 
                        type="text"
                        className="articles-search"
                        placeholder="Search"
                        value={this.state.searach}
                        onChange={this.handleSearchChange}/>
                </div>

                <div className="articles-list">
                    {this.createActicleItemsList(this.state.displayedArticles)}
                </div>

                <ArticleForm
                    header="New article"
                    onSubmit={this.addArticle}/>
            </div>
        );
    }
}
