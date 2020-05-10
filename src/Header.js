import React from 'react'
import {Link} from 'react-router-dom'

export default function Header() {

    return <Link to='/'>
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
    </Link>


}