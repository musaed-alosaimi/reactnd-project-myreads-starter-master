import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './css/App.css';
import {getAll, get, update, search} from './BooksAPI'
import ShelvesList from './ShelvesList'
import Book from "./Book";
import {Route, Link, Switch} from "react-router-dom";
import Header from './Header'
import BookDetails from './BookDetails'
import { debounce } from 'throttle-debounce';


class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */

        library: {

            shelves: [{id: 1, name: "currentlyReading", heading: "Currently Reading"}, {
                id: 2,
                name: "wantToRead",
                heading: "Want To Read"
            }, {id: 3, name: "read", heading: "Read"}],

            books: []

        },

        store: {

            books: [],

            searchValue: ''

        },

        CurrentBook: {},

        CurrentURLState: ''

    }

    async componentDidMount() {

        // Save books in the app's state


        // Save books in the library
        getAll().then((result) => {

            this.setState((CurrentState) => {

                return {library: {shelves: CurrentState.library.shelves, books: result}};

            });

            return;

        }).catch(ErrorMessage => console.log(ErrorMessage));


    }

    updateBookShelf = (newShelf, book, place) => {

        if (place === 'library') {

            this.setState((CurrentState) => {

                let updatedBooks = CurrentState.library.books.map((currentBook) => {
                    if(currentBook.id === book.id){
                        book.shelf = newShelf;
                        currentBook = book;
                    }
                    return currentBook;
                });

                return {library: {shelves: CurrentState.library.shelves, books: updatedBooks}};

            })

            update(book, newShelf).then(() => {
                console.log("Book is updated");
            }).catch((ErrorMessage) => {

                console.log("The book is not updated : " + ErrorMessage);
            });

        } else {

            this.setState((CurrentState) => {

                let storeBooks = CurrentState.store.books;
                let updatedStoreBooks = storeBooks.map((currentBook) => {

                    if (currentBook.id === book.id) {
                        currentBook = book;
                    }

                    return currentBook;

                })

                let libraryBooks = CurrentState.library.books;

                if (book.shelf === "none" || book.shelf === undefined) {

                    book.shelf = newShelf;

                    return {
                        library: {
                            shelves: CurrentState.library.shelves,
                            books: [...libraryBooks, book]
                        }, store: {books: updatedStoreBooks}
                    };

                } else {

                    book.shelf = newShelf;

                    let updatedLibraryBooks = libraryBooks.map((currentBook, index) => {

                        if (currentBook.id === book.id) {
                            currentBook = book;
                        }


                        return currentBook;

                    })

                    let updatedStoreBooks = storeBooks.map((currentBook) => {

                        if (currentBook.id === book.id) {
                            currentBook = book;
                        }

                        return currentBook;

                    })

                    console.log(updatedStoreBooks);

                    return {
                        library: {
                            shelves: CurrentState.library.shelves,
                            books: updatedLibraryBooks
                        }, store: {books: updatedStoreBooks}

                    }

                }


            })

            update(book, newShelf).then(() => {
                console.log("Book is updated");
            }).catch((ErrorMessage) => {

                console.log("The book is not updated : " + ErrorMessage);
            });

        }

    }


    setBookDetails = (bookURLValue) => {

        if (bookURLValue !== null) {

            get(bookURLValue).then(result => {
                let book = result;
                this.setState({CurrentBook: book, CurrentURLState: bookURLValue});
            })


        }

        return "";

    }

    searchForBook = (SearchText) => {

        this.setState((CurrentState) => ({store: {books: CurrentState.store.books, searchValue: SearchText}}));


        if (SearchText.trim() === "") {

            this.setState((CurrentState) => ({store: {books: []}}));

            console.log(this.state.store.books);


            return '';
        }

         search(SearchText).then((result) => {

            result = Array.isArray(result) ? result : [];

            this.setState( (CurrentState) => {

                    let LibrarySearch = CurrentState.library.books.filter((book) => (book.title.includes(SearchText)));

                    // to update the store objects to have "shelf" property
                    result.map((storeBook, index) => {
                        LibrarySearch.map(libraryBook => {

                            if (libraryBook.id === storeBook.id) {
                                result[index].shelf = libraryBook.shelf;
                                console.log(result[index]);
                            }

                            return "";
                        })

                        return "";
                    })

                console.log(result);

                return {store: {books: result}}

                }
            )


        });

    }

    render() {

        return (

                <div className="app">

                    <Route path='/Search'>

                        <div className="search-books">
                            <div className="search-books-bar">
                                <Link to='/'>
                                    <button className="close-search">Close</button>
                                </Link>
                                <div className="search-books-input-wrapper">
                                    {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                                    <input type="text" placeholder="Search by title or author"
                                           value={this.state.store.searchValue}
                                           onChange={(event) => {this.searchForBook(event.target.value)}}/>

                                </div>
                            </div>
                            <div className="search-books-results">
                                <ol className="books-grid">

                                    {this.state.store.books.map((book, book_id) => {

                                        return <Book book={book} book_id={book_id}
                                                     updateBookShelf={this.updateBookShelf}
                                                     place='store' key={book_id}/>

                                    })}

                                </ol>
                            </div>
                        </div>

                    </Route>

                    <Route path='/' exact>

                        <div className="list-books">
                            <Header/>
                            <div className="list-books-content">
                                <div>

                                    <ShelvesList shelves={this.state.library.shelves} books={this.state.library.books}
                                                 updateBookShelf={this.updateBookShelf} place='library'/>

                                </div>
                            </div>
                            <div className="open-search">
                                <Link to='/Search'>
                                    <button>Add a book</button>
                                </Link>
                            </div>
                        </div>

                    </Route>


                    <Route path={`/book`}>

                        <Header/>

                        <BookDetails book={this.state.CurrentBook}
                                     imageURL={this.state.CurrentBook.imageLinks === undefined ? '' : this.state.CurrentBook.imageLinks.thumbnail}
                                     rating={this.state.CurrentBook.ratingCount === undefined ? "No Rating" : `${this.state.CurrentBook.ratingCount} / 10`}
                                     setBookDetails={this.setBookDetails}/>

                    </Route>

                </div>

        )
    }
}

export default BooksApp
