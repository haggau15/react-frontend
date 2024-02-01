import * as React from 'react';
import {Component, useEffect, useState} from 'react';
import './App.css';
import './api.js'
import {createRoot} from 'react-dom/client';
import {placesURL} from "./api.js";


export default function App (){
  const [places, setPlaces] = useState();

    function pulljson(){
        fetch('http://localhost:8080/api/places',{
            method: 'GET',
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
        return;
    }
    useEffect(() =>{
    pulljson();
    },[])
    return (
        <div className={"App"}>
            lkm
        </div>
    )
}


const root = createRoot(document.getElementById('root'));
root.render(
    <App />
);


