import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";


export default function LoadingSpinner(){

    return <div><FontAwesomeIcon className="fa fa-spinner fa-spin" icon={faSpinner} style={{height: 50,width: 100}}/></div>

}