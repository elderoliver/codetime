import React,{ useState,useEffect } from 'react'; 
import TableHistory from '../../Components/TableHistory'; 
import difOfTime from '../../Utils/difOfTime.js';
import sysdate from '../../Utils/sysdate.js'; 
import './main.css'; 

export default function Main(){

    const [time, setTime] = useState('00:00:10');  
    const [stateTime,setStateTime] = useState(0); 
    const [finalDate,setFinalDate] = useState(new Date("January 31 1980 00:00:00")); 
    const [saveStartTime,setSaveStartTime] = useState(time); 
    const [newData,setNewData] = useState(null); 

    useEffect( () => {

        if (stateTime==0){
            return
        }

        let myInterval; 
        var startDate = new Date("January 31 1980 "+time);

        myInterval = setInterval(() => {

            startDate.setSeconds(startDate.getSeconds() - 1);             
            setTime(startDate.getHours()+":"+startDate.getMinutes()+":"+startDate.getSeconds());
            
            if(startDate.getTime() == finalDate.getTime()) {
                save(); 
                clearInterval(myInterval);
            } 
            
        }, 1000);

        return () => {
            clearInterval(myInterval); 
        }

    },[stateTime]); 

    function play(){

        if (stateTime == 0){
            setStateTime(1);
        }else{ 
            setStateTime(0);
        }

    }

    function save(){

        const newData = {
            description: '',
            date: '',
            time: ''
        }; 

        newData.date = sysdate(); 
        newData.time = difOfTime(saveStartTime,time); 
        setNewData(newData);
        reload(); 
    }

    function reload(){
        setTime(saveStartTime);
        setStateTime(0); 
    }

    function valueOfInput(e){
        setSaveStartTime(e); 
    }

    return (

        <section>

            <div>
                
                <h1>CodeTime</h1>

                <button onClick={reload} className="reload">RELOAD</button>

                <input 
                    value = { time }
                    onChange = { e => setTime(e.target.value) } 
                    onBlur = { e => valueOfInput(e.target.value) } 
                />
                <button onClick={play} className="play">PLAY/PAUSE</button>
                    
                <button onClick={save} className="save">SAVE</button>

                <TableHistory 
                    newData={ newData }
                />
                
            </div>
            
        </section>
    ); 
}