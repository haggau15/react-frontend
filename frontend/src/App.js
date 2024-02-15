import * as React from 'react';
import {Component, useEffect, useState} from 'react';
import './App.css';
import './api.js'
import {createRoot} from 'react-dom/client';
import {placesURL} from "./api.js";

export default function App (){
    const [places, setPlaces] = useState();
    let displayData;
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
                displayData=data.map(function (place){
                    return(<p key={place.id}> {place.name}  {place.score} {JSON.parse(place.reviews[0]).text} </p>
                    )
                })
                console.log(data)
                setPlaces(displayData);
            })
    }
    useEffect(() =>{
    pulljson();
    },[])
    return (
        <div className={"App"}>
            <>Places</>
            {places}
        </div>
    )
}


const root = createRoot(document.getElementById('root'));
root.render(
    <App />
);


