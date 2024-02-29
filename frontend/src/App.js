import * as React from 'react';
import {Component, useEffect, useState} from 'react';
import './App.css';
import './api.js'
import {createRoot} from 'react-dom/client';
import {placesURL} from "./api.js";
import {json} from "react-router-dom";

export default function App (){
    const [requestData, setRequestData]= useState("")
    const [json, setJson] = useState(); //Contains the raw content from the database
    const [places, setPlaces] = useState(); //Contains sorted and formatted data
    let displayData;
    function getJson(){
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
                    return(<p key={place.id}> <h2>{place.name}</h2>  Score:{place.score} <br/> {JSON.parse(place.reviews[0]).text} </p>
                    )
                })
                setPlaces(displayData);
            })
    }
    useEffect(() =>{
        getJson();
    },[])

    function sortPlaces(url) {
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }, body:JSON.stringify(json)
        })  .then(response => response.json())
            .then(data => {
                displayData=data.map(function (place){
                    return(<p key={place.id}> <h2>{place.name}</h2>  Score:{place.score} <br/> {JSON.parse(place.reviews[0]).text}</p>
                    )
                })
                setPlaces(displayData);
            })
    }
    const handleChange = (event) => {
        setRequestData(event.target.value);
    };

    function handleClick() {
        setRequestData("");
        fetch('http://localhost:8080/api/request/publish?message='+requestData)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Optional: Do something with the response if needed
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    }

    return (
        <div className={"App"}>
            <button onClick={() => sortPlaces('http://127.0.0.1:5001/filter/low')}>Sort by lowest score</button>
            <button onClick={() => sortPlaces('http://127.0.0.1:5001/filter/high')}>Sort by highest score</button>
            <button onClick={() => sortPlaces('http://127.0.0.1:5001/filter/comments/low\n')}>Sort by worst reviews</button>
            <button onClick={() => sortPlaces('http://127.0.0.1:5001/filter/comments/high\n')}>Sort by best reviews</button>


            <br/>
            <input type="text" value={requestData} onChange={handleChange}/>
            <button onClick={handleClick}>Send</button>
            <>Places</>
            {places}
        </div>
    )
}


const root = createRoot(document.getElementById('root'));
root.render(
    <App />
);


