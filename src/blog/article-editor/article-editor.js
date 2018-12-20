import React, {Component} from 'react';
import {ArticleService} from '../services/article.service';
import {ArticleForm} from '../article-form/article-form';

import './article-editor.scss';

export class ArticleEditor extends Component {

    articleService = new ArticleService();

    constructor(props){
        super(props);
        this.state = {
            id: undefined,
            title: '',
            text: ''
        };

        this.initArticle = this.initArticle.bind(this);
        this.submit = this.submit.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount(){
        this.initArticle();
    }

    initArticle() {
        const articleId = this.props.match.params['id'];
        if(articleId !== undefined ){
            const article = this.getArticle(articleId);
            if(article){
                this.setArticle(article);
            }
        }
    }

    getArticle(id){
        return this.articleService.getArticle(id); 
    }
    
    setArticle(article){
        this.setState({...article});
    }

    submit(e){
        const article = {
            id: this.state.id,
            title: e.title,
            text: e.text
        };

        this.articleService.updateArticle(article);
        this.props.history.goBack();
    }

    cancel(e){
        this.props.history.goBack();
    }

    render(){
        return (
            <div className="article-editor">
                <ArticleForm 
                    header="Update article"
                    title={this.state.title}
                    text={this.state.text}
                    onSubmit={this.submit}
                    onCancel={this.cancel}
                />
            </div>
        );
    }
}