import React, {Component} from 'react';
import './article-form.scss';

export class ArticleForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            title: '',
            text: ''
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount(){
        this.setState((state, props)=>({
            title: props.title,
            text: props.text
        }));
    }

    handleTitleChange(e){
        const title = e.target.value;
        this.setState({
            title: title
        });
    }

    handleTextChange(e){
        const text = e.target.value;
        this.setState({
            text: text
        });
    }

    handleSubmit(){
        const newState = {
            title: this.state.title,
            text: this.state.text
        };
        this.reset();
        this.props.onSubmit(newState);
    }

    handleCancel(){
        this.reset();
        if(typeof this.props.onCancel === 'function'){
            this.props.onCancel();
        }
    }

    reset(){
        this.setState({
            title: '',
            text: ''
        });
    }

    render(){
        return (
            <div className="shadowed article-form">
                <div className="article-form-header">
                    {this.props.header}
                </div>
                <div className="article-form-control">
                    <input
                        type="text"
                        className="article-form-controls__item"
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                    />
                    <textarea
                        className="article-form-controls__item"
                        value={this.state.text}
                        onChange={this.handleTextChange}
                    />
                </div>
                <div className="article-form__actions">
                    <button 
                        className="article-form__button article-form__button--save"
                        onClick={this.handleSubmit}>Save</button>
                    <button 
                        className="article-form__button"
                        onClick={this.handleCancel}>Cancel</button>
                </div>
            </div>
        )
   }
}