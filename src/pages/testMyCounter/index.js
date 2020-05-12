import React,{ useState, useEffect } from 'react'; 
import './main.css'; 

export default function TestMyCounter(){

    let [counter,setCounter] = useState(10); 
    let [stateTimer,setStateTimer] = useState(0); 

    function startMyCounter(){
        setStateTimer(1); 
    }

    function pauseMyCounter(){
        setStateTimer(0); 
    }

    function reloadMyCounter(){
        setStateTimer(0); 
        setCounter(10); 
    }

    useEffect( () => {

        let myInterval; 
        myInterval = setInterval(() => {
                    
            setCounter(counter--); 
            if (stateTimer==0){
                clearInterval(myInterval); 
            }   
 
        }, 1000);

        return () => {
            clearInterval(myInterval); 
        }

    },[stateTimer]); 

    return (
        <main>

            <h1>My Counter is Here: { counter }</h1>
            <h1>My state: { stateTimer }</h1>

            <button onClick={startMyCounter}>Decrement by Second</button>
            <button onClick={pauseMyCounter}>Pause</button>
            <button onClick={reloadMyCounter}>Reload</button>

        </main>
    );

}