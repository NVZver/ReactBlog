import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './article-list-item.scss';

export class ArticleListItem extends Component {

    contentStatuses = ['...more', '...less'];
    showLessLimit = 50;

    constructor(props){
        super(props);
        this.state = {
            showMore: false,
            statusText: this.contentStatuses[0]
        };
        this.handleButtonClickDelete = this.handleButtonClickDelete.bind(this);
        this.changeContentStatus = this.changeContentStatus.bind(this);
        this.getText = this.getText.bind(this);
        this.getShowMoreControl = this.getShowMoreControl.bind(this);
        this.isLargeContent = this.isLargeContent.bind(this);
    }

    handleButtonClickDelete(event){
        if(this.props.id !== undefined){
            this.props.handleDelete(this.props.id);
        }
    }

    changeContentStatus(){
        const newState = {
            showMore: !this.state.showMore,
            statusText: this.contentStatuses[+!this.state.showMore]
        };
        this.setState(newState);
    }

    getText(){
        let result = this.props.text
            .split(' ')
            .slice(0, this.showLessLimit)
            .join(' ');

        if(this.state.showMore){
            result = this.props.text;
        }
        return result;
    }

    getShowMoreControl(){
        let control = (
            <span 
                className="article-content__show-more"
                onClick={this.changeContentStatus}>
                {this.state.statusText}
            </span>
        );
        return this.isLargeContent(this.props.text) ? control : null;
    }

    isLargeContent(text){
        const wordsCount = text.split(' ').length;
        return wordsCount > this.showLessLimit;
    }

    render(){
        return (
            <div className="shadowed article">
                <div className="article-title">{this.props.title}</div>
                <div className="article-content">
                    <span>{this.getText()}</span>
                    {this.getShowMoreControl()}
                </div>
                <div className="article-actions">
                    <Link className="article-actions__item" to={`/articles/${this.props.id}/edit`}>Edit</Link>
                    <button className="article-actions__item" onClick={this.handleButtonClickDelete}>Delete</button>
                </div>
            </div>
        );
    }
}
