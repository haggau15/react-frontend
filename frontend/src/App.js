import * as React from 'react';
import {Component, useEffect, useState} from 'react';
import './App.css';
import './api.js'
import {createRoot} from 'react-dom/client';
import {placesURL} from "./api.js";
import {json} from "react-router-dom";
import data from "bootstrap/js/src/dom/data.js";

export default function App (){
    const [json, setJson] = useState();
    const [places, setPlaces] = useState();
    let displayData;
    function pulljson(){
        fetch('http://localhost:8080/api/places',{
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                displayData=data.map(function (place){
                    setJson(data)
                    return(<p key={place.id}> {place.name}  {place.score} {JSON.parse(place.reviews[0]).text} </p>
                    )
                })
                //console.log(data)
                setPlaces(displayData);
            })
    }
    useEffect(() =>{
    pulljson();
    },[])

    function getPlacesByLowestScore(url) {
        console.log(JSON.stringify(json))
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }, body:JSON.stringify(json)
        })  .then(response => response.json())
            .then(data => {
                displayData=data.map(function (place){
                    return(<p key={place.id}>   {place.score} {JSON.parse(place.reviews[0]).text}
                            <br/>{place.name}</p>
                    )
                }
                )
                setPlaces(displayData);
            })
    }

    return (
        <div className={"App"}>
            <button onClick={() => getPlacesByLowestScore('http://127.0.0.1:5001/filter')}>Sort by lowest score</button>
            <br/>
            <>Places</>
            {places}
        </div>
    )
}


const root = createRoot(document.getElementById('root'));
root.render(
    <App />
);


