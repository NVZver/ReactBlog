import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './article-list-item.scss';

export class ArticleListItem extends Component {

    constructor(props){
        super(props);
        this.handleButtonClickDelete = this.handleButtonClickDelete.bind(this);
    }

    handleButtonClickDelete(event){
        if(this.props.id !== undefined){
            this.props.handleDelete(this.props.id);
        }
    }

    render(){
        return (
            <div className="shadowed article">
                <div className="article-title">{this.props.title}</div>
                <div className="article-content">{this.props.text}</div>
                <div className="article-actions">
                    <Link className="article-actions__item" to={`/articles/${this.props.id}/edit`}>Edit</Link>
                    <button className="article-actions__item" onClick={this.handleButtonClickDelete}>Delete</button>
                </div>
            </div>
        );
    }
}
