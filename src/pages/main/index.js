import React,{ useState,useEffect } from 'react'; 
import './main.css'; 

export default function Main(){

    const [time, setTime] = useState('00:00:10');  
    const [stateTime,setStateTime] = useState(0); 

    const [finalDate,setFinalDate] = useState(new Date("January 31 1980 00:00:00")); 
    
    const [saveStartTime,setSaveStartTime] = useState(time); 

    const [dataTable,setDataTable] = useState([{
        description: 'Start develop the application',
        date: '06/05/2020 15:44',
        time: '20 min'
    },{
        description: 'Start develop the application',
        date: '06/05/2020 15:44',
        time: '20 min'
    },{
        description: 'Start develop the application',
        date: '06/05/2020 15:44',
        time: '20 min'
    }]);

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
                
                const newRow = {
                    description: 'Start develop the application',
                    date: '06/05/2020 15:44',
                    time: '20 min'
                }; 

                setDataTable([...dataTable,newRow]); 
                setTime(saveStartTime); 
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

    function reload(){
        setTime(saveStartTime);
        setStateTime(0); 
    }

    function valueOfInput(e){
        console.log('Value of my input: ', e); 
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
                    
                <button className="save">SAVE</button>
                
                <table>
                
                    <tr>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>

                    { 
                        dataTable.map( (dt) => (
                        
                        <tr>
                            <td>{ dt.description }</td>
                            <td>{ dt.date }</td>
                            <td>{ dt.time }</td>
                        </tr>

                        )
                    )}

                </table>

            </div>
            
        </section>
    ); 
}