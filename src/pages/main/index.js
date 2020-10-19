import React,{ useState,useEffect } from 'react'; 
import Dialog from '../../Components/Dialog'; 
import difOfTime from '../../Utils/difOfTime.js';
import sysdate from '../../Utils/sysdate.js'; 
import { FiSave } from 'react-icons/fi';
import { FiPlay } from 'react-icons/fi'; 
import { FiPause } from 'react-icons/fi'; 
import { FiRefreshCcw } from 'react-icons/fi'; 
import { FiCalendar } from 'react-icons/fi'; 
import { FiWatch } from 'react-icons/fi'; 
import { FiEdit } from 'react-icons/fi'; 
import clock from '../../assets/clock.svg'; 
import './style.css'; 

export default function Main(){

    const [time, setTime] = useState('00:20:00');  
    const [stateTime,setStateTime] = useState(0); 
    const [finalDate,setFinalDate] = useState(new Date("January 31 1980 00:00:00")); 
    const [saveStartTime,setSaveStartTime] = useState(time); 
    
    const [description,setDescription] = useState(''); 
    const [showDialog,setShowDialog] = useState(false); 

    const [list,setList] = useState([]); 
    const [rowList,setRowList] = useState({ description: '',date: '',time: ''}); 
    
    const [typeDialog,setTypeDialog] = useState('INSERT'); 
    const [idItem,setIdItem] = useState(); 

    const [playing,setPlaying] = useState(false);

    function noscroll() {
        window.scrollTo( 0, 0 );
    }

    /* useEffect(() => {
        if (showDialog) {
            window.onscroll = function () { window.scrollTo(0, 0); };
            //window.addEventListener( 'scroll', noscroll );
            document.documentElement.style.overflow = 'hidden';  
            document.body.scroll = "no"; 
        } else {
            //window.removeEventListener( 'scroll', noscroll );
            document.documentElement.style.overflow = 'auto';
            document.body.scroll = "yes";
        }
    },[showDialog]); */

    useEffect(() => {
        if (stateTime == 0){
            setPlaying(false); 
        } else {
            setPlaying(true); 
        }
    },[stateTime]); 

    useEffect( () => {

        if (stateTime==0){
            return
        }

        let myInterval; 
        var startDate = new Date("January 31 1980 "+time);

        myInterval = setInterval(() => {

            startDate.setSeconds(startDate.getSeconds() - 1);    
            
            let hours,minutes,seconds; 

            if ( startDate.getHours()+"".length === 0 ){
                hours = "0"+startDate.getHours(); 
            } else {
                hours = startDate.getHours(); 
            }

            if ( startDate.getMinutes()+"".length === 0 ){
                minutes = "0"+startDate.getMinutes(); 
            } else {
                minutes = startDate.getMinutes(); 
            }

            if ( startDate.getSeconds()+"".length === 0 ){
                seconds = "0"+startDate.getSeconds(); 
            } else {
                seconds = startDate.getSeconds()
            }

            setTime(hours+":"+minutes+":"+seconds);
            
            if(startDate.getTime() == finalDate.getTime()) {
                save(true); 
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

    function save(finalTime){

        setStateTime(0);
        setPlaying(false); 
        setTypeDialog('INSERT'); 
        setDescription(''); 

        let calcTime;

        if (finalTime == true) {
            calcTime = difOfTime(saveStartTime,'00:00:00');
        }else {
            calcTime = difOfTime(saveStartTime,time);
        }

        setRowList((prevState) => {
            let newState = prevState; 
            newState.date = sysdate(); 
            newState.time = calcTime; 
            return newState; 
        });  

        setShowDialog(true); 

    }

    function reload(){
        setTime(saveStartTime);
        setStateTime(0); 
    }

    function valueOfInput(e){
        setSaveStartTime(e); 
    }


    const functionAcepted = () => {


        if (typeDialog === 'INSERT') {

            setRowList((prevState) => {
                let newState = prevState; 
                newState.description = description; 
                return prevState; 
            })
    
            setList((prevState) => {
                let data = [...prevState];
                data.push(rowList);
                return data;
            }); 
    
    
            setRowList({
                description: '',
                date: '',
                time: ''
            }); 

        } else if (typeDialog === 'EDIT_OR_DELETE') {

            setList((prevState) => {
                let data = [...prevState];
                let item = data[idItem]; 
                item.description = description; 
                data[idItem] = item; 
                return data;
            }); 

        }

        reload();
        setShowDialog(false); 

        return null; 

    }

    const editItem = (index) => {
        setTypeDialog('EDIT_OR_DELETE'); 
        setIdItem(index);
        setDescription(list[index].description); 
        setShowDialog(true); 
    }

    const deleteItem = () => {

        setList((prevState) => {
            let data = [...prevState];
            data.splice(idItem,1);
            return data;
        });

        setShowDialog(false); 
    }

    return (

        <>

            <Dialog 
                show={ showDialog }
                typeDialog = { typeDialog }
                onDescriptionChange = { setDescription }
                onYesHandler = { functionAcepted } 
                onDeleteHandler = { deleteItem }
                description = { description }
                idItem = { idItem }
            />

            <header className="header__codetime">
                
                <h1 className="header__codetime_title">CODETIME</h1>

                <img 
                    className="header__codetime__logo" 
                    src={clock} 
                    alt="clock" 
                />
                
            </header>

            <main className="content">
    
                <section className="content__timer">
                    
                    <button 
                        onClick={reload} 
                        className="content__timer___button__action"
                    >
                        <FiRefreshCcw />
                    </button>

                    <input 
                        value = {time}
                        onChange = { e => setTime(e.target.value) } 
                        onBlur = { e => valueOfInput(e.target.value) }
                        className="content__timer___button__input" 
                    />
                    
                    <button 
                        onClick={play} 
                        className="content__timer___button__action"  
                    >    
                        { playing === true ? 
                            <FiPause /> : <FiPlay />
                        }

                    </button>
                    
                    <button 
                        onClick={save} 
                        className="content__timer___button__action"
                    >
                        <FiSave />
                    </button>

                </section>
                

                { list.length > 0 ? ( <ul className="list__assignments">
                    {
                        list.map((item,index) => {
                            return(
                                <li 
                                    key={index} 
                                    className="list__assignments___item"
                                    onClick={() => editItem(index)}
                                >
                                    <div>
                                        <FiCalendar />
                                        <p>{item.date}</p>
                                    </div>
                                    <div>
                                        <FiWatch />
                                        <p>{item.time}</p>
                                    </div>
                                    <div>
                                        <FiEdit />
                                        <p>{item.description}</p>
                                    </div>
                                </li>
                            )
                        }).reverse()
                    }
                </ul> ) : ''}
                

            </main>

        </>

    ); 
}