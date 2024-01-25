import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react';
import './api'
import {placesURL} from "./api";
function App() {
  const [places,setPlaces]=useState();

  const getPlaces = async () =>{
    try {
      const response = await get(placesURL);
      setPlaces(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(()=>{
    getPlaces();
  },[])
  return (
    <div className="App">

    </div>
  );
}

export default App;
