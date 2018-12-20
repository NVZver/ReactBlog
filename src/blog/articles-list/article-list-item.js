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
            <div className="article">
                <div className="article-title">
                    <Link to={`/articles/${this.props.id}/edit`}>
                        {this.props.title} 
                    </Link>
                </div>
                <div className="article-content">{this.props.text}</div>
                <div className="article-actions">
                    <button onClick={this.handleButtonClickDelete}>Delete</button>
                </div>
            </div>
        );
    }
}
