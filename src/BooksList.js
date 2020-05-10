import React, {Component} from 'react'
import Book from './Book'

export default class BooksList extends Component{

    render() {

        let {books, shelf, updateBookShelf, place} = this.props;

        return(

            <div className="bookshelf-books">
                <ol className="books-grid">

                    {books.map((book,book_id) => {

                        if(shelf.name === book.shelf) {

                            return <Book book={book} book_id={book_id} updateBookShelf={updateBookShelf} place={place} key={book_id} />

                        }

                        return "";
                    })}

                </ol>
            </div>

        )


    }


}