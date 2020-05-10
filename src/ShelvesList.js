import React, {Component} from 'react'
import BooksList from './BooksList'


export default class ShelvesList extends Component {


    render() {

        let {shelves, books, updateBookShelf, place} = this.props;

        return (

            shelves.map((shelf,shelf_id) => {

                return <div className="bookshelf" key={shelf_id}>
                    <h2 className="bookshelf-title">{shelf.heading}</h2>

                    <BooksList books={books} shelf={shelf} updateBookShelf={updateBookShelf} place={place} />

                </div>

            })


        )

    }


}