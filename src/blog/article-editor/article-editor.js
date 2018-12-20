import React, {Component} from 'react';
import {ArticleService} from '../services/article.service';

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
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTextareaChange = this.handleTextareaChange.bind(this);
    }

    componentDidMount(){
        this.initArticle();
    }

    initArticle() {
        const articleId = this.props.match.params['id'];
        if(articleId !== undefined ){
            this.setState({ id: articleId });
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
        this.setState({
            title: article.title,
            text: article.text
        });
    }

    submit(e){
        const article = {
            id: this.state.id,
            title: this.state.title,
            text: this.state.text
        };
        if(article.id === undefined){
            this.articleService.addArticle(article);
        } else {
            this.articleService.updateArticle(article);
        }
        this.props.history.goBack();
    }

    cancel(e){
        this.props.history.goBack();
    }

    handleTitleChange(e){
        const value = e.target.value;
        this.setState({ title: value });
    }

    handleTextareaChange(e){
        const value = e.target.value;
        this.setState({ text: value });
    }

    render(){
        return (
            <div className="article-editor">
                <div className="article-editor">
                    <input type="text" value={this.state.title} onChange={this.handleTitleChange}/>
                    <textarea onChange={this.handleTextareaChange} value={this.state.text} />
                </div>
                <div className="article-editor__actions">
                    <button onClick={this.submit}>Save</button>
                    <button onClick={this.cancel}>Cancel</button>
                </div>
            </div>
        );
    }
}