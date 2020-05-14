import React,{ useState,useEffect } from 'react'; 
import MaterialTable from 'material-table';
import './main.css'; 

export default function Main(){

    const [time, setTime] = useState('00:00:10');  
    const [stateTime,setStateTime] = useState(0); 

    const [finalDate,setFinalDate] = useState(new Date("January 31 1980 00:00:00")); 
    
    const [saveStartTime,setSaveStartTime] = useState(time); 

    const [dataTable, setDataTable] = React.useState({
        columns: [
          { title: 'description', field: 'description' },
          { title: 'date', field: 'date' },
          { title: 'time', field: 'time' },
        ],
        data: [],
    });

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
                

                //save(); 
                const newData = {
                    description: '',
                    date: '06/05/2020 15:44',
                    time: '20 min'
                }; 

                //setDataTable([...dataTable.data,newRow]); 

                setDataTable((prevState) => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                });

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

    function save(){

        const now = new Date; 

        const newData = {
            description: '',
            date: '',
            time: ''
        }; 

        const day = ("0" + (now.getDay() + 1)).slice(-2);
        const month = ("0" + (now.getMonth() + 1)).slice(-2);

        newData.date = day+'/'+month+'/'+now.getFullYear()+' '+now.getHours()+':'+now.getMinutes(); 

        console.log('saveStartTime: '+saveStartTime,'time: '+time)
        newData.time = difOfTime(saveStartTime,time); 

        setDataTable((prevState) => {
            const data = [...prevState.data];
            data.push(newData);
            return { ...prevState, data };
        });

        console.log('Minha tabela', dataTable.data);

        reload(); 
    }

    function valueOfInput(e){
        console.log('Value of my input: ', e); 
        setSaveStartTime(e); 
    }


    function difOfTime(date1,date2){
        
        const dt1 = new Date("January 31 1980 "+date1);
        const dt2 = new Date("January 31 1980 "+date2);

        let diffTime = Math.abs(dt1 - dt2); 
        
        let diffHours = Math.floor(  diffTime / (1000 * 60 * 60) ); 
        diffHours = ("0" + (diffHours)).slice(-2); 

        diffTime = diffTime - ( diffHours * 1000 * 60 * 60); 

        let diffMinutes = Math.floor(diffTime / (1000 * 60)); 
        diffMinutes = ("0" + (diffMinutes)).slice(-2); 

        diffTime = diffTime - ( diffMinutes * 1000 * 60 );

        let diffSeconds = Math.floor(diffTime / (1000)); 
        diffSeconds = ("0" + (diffSeconds)).slice(-2); 
        
        return diffHours+':'+diffMinutes+':'+diffSeconds; 

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
                
                {/* <table>
                
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
                            <td>Excluir</td>
                        </tr>

                        )
                    )}

                </table> */}

                <MaterialTable
                    title="Editable Example"
                    columns={dataTable.columns}
                    data={dataTable.data}
                    editable={{
                        onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                            resolve();
                            setDataTable((prevState) => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                            }, 600);
                        }),
                        onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setDataTable((prevState) => {
                                const data = [...prevState.data];
                                data[data.indexOf(oldData)] = newData;
                                return { ...prevState, data };
                                });
                            }
                            }, 600);
                        }),
                        onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                            resolve();
                            setDataTable((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                            }, 600);
                        }),
                    }}
                />

            </div>
            
        </section>
    ); 
}