import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './css/book.css'

export default class Book extends Component {


    state = {

        selectValue: this.props.book.shelf === undefined ? "none" : this.props.book.shelf

    }

    changeBookShelf = (newShelf) => {

        this.setState({selectValue: newShelf});

        this.props.updateBookShelf(newShelf, this.props.book, this.props.place);

    }

    render() {

        let {book} = this.props;

        let imageURL = book.imageLinks === undefined ? '' : book.imageLinks.thumbnail;

        return <li>

            <div className="book">
                <div className="book-top" >
                    <Link to={{pathname: `/book/${book.id}`}}>
                        <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${imageURL})`
                        }} ></div>
                    </Link>
                    <div className="book-shelf-changer">

                        <select defaultValue={this.state.selectValue}
                                onChange={(event) => this.changeBookShelf(event.target.value)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors !== undefined &&
                <div className="book-authors">{book.authors.join(', ')}</div>
                }
            </div>
        </li>


    }


}