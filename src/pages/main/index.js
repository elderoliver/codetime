import React,{ useState } from 'react'; 
import './main.css'; 

export default function Main(){

    const [time, setTime] = useState('00:00:10');  


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

    function play(){
        var startDate = new Date("January 31 1980 "+time);
        var finalDate = new Date("January 31 1980 00:00:00");
        var i = setInterval(function(){
            startDate.setSeconds(startDate.getSeconds() - 1);             
            setTime(startDate.getHours()+":"+startDate.getMinutes()+":"+startDate.getSeconds());
            if(startDate.getTime() == finalDate.getTime()) {
                
                const newRow = {
                    description: 'Start develop the application',
                    date: '06/05/2020 15:44',
                    time: '20 min'
                }; 
                setDataTable([...dataTable,newRow]); 
                clearInterval(i);

            }
        }, 1000);
    }

    return (

        <section>

            <div>
                
                <h1>CodeTime</h1>

                    <button className="reload">RELOAD</button>
                    <input 
                        value = { time }
                        onChange = { e => setTime(e.target.value) } 
                    />
                    <button onClick={play} className="play">>PLAY/PAUSE</button>
                    
                    <button className="save">>SAVE</button>
                

                <table>
                
                    <tr>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>

                    {/* <tr>
                        <td>Start develop the application</td>
                        <td>06/05/2020 15:44</td>
                        <td>20 min</td>
                    </tr>
                    <tr>
                        <td>Debug application</td>
                        <td>06/05/2020 17:00</td>
                        <td>20 min</td>
                    </tr> */}

                    { dataTable.map( (dt) => (
                        
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