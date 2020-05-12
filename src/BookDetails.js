import React, {Component} from 'react'
import LoadingSpinner from "./LoadingSpinner";



export default class BookDetails extends Component{


    getBookValueURL = () => {

        let urlText = new URLSearchParams(window.location.pathname);
        let params = urlText.keys().next().value.substring(1).toString().split('/');
        let bookValue = params[1];

        return bookValue;
    }


    newDetails = false;

    componentDidMount() {

        this.newDetails = false;
        setTimeout(this.props.setBookDetails(this.getBookValueURL()),2000);
        this.newDetails = true;
    }


    render(){



        let {book, imageURL, rating} = this.props;

        if(this.newDetails) {

            return <div id='book-details'>

                <div className="book-left">
                    <div className='book-title'>{book.title}</div>
                    <div className="book-cover" style={{backgroundImage: `url(${imageURL})`}}></div>
                </div>

                <div className='book-right'>

                    <div className='authors'>
                        {book.authors !== undefined &&
                        <div className="book-authors">{book.authors.join(', ')}</div>
                        }
                    </div>

                    <div className='description'>

                        {book.description}

                    </div>

                    <div className='rating'>{"Rating : " + rating}</div>
                </div>


            </div>

        }else{
            return <div id='book-details'><br/><br/><LoadingSpinner/></div>
        }


    }



}