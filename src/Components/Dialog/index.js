import React,{useEffect,useState} from 'react'; 
import './styles.css'; 

const Dialog = ({show,description,onDescriptionChange,onYesHandler,onDeleteHandler,typeDialog}) => {

    /*const [text,setText] = useState(''); 

    useEffect(() => {
        onDescriptionChange(text); 
        //console.log(text); 
    },[text]); */

    /* const testFunction = (value) => {
        console.log(value); 
        onDescriptionChange(value); 
    } */

    return (
        <div 
            className="dialog__container"
            style={show === false ? {"display": "none"} : {"position": "absolute"} } 
        >

            <div className="dialog__box">

                <h3 className="dialog__box___title">Tap here your description for your job</h3>
                
                <input 
                    className="dialog__box___input" 
                    type='text'
                    value={description}
                    onChange= { (value) => onDescriptionChange(value.target.value) }
                />
                
                <div className="dialog__box___container_buttons">

                    <button 
                        className="dialog__box___button"
                        onClick={ () => onYesHandler() }
                    >
                        Save
                    </button>

                    {typeDialog === 'EDIT_OR_DELETE' ? (
                    
                        <button 
                            className="dialog__box___button"
                            onClick={ () => onDeleteHandler() }
                        >
                            Delete
                        </button>
                    
                    ) : ''}

                
                </div>

            </div>
            
        </div>
    )
}

export default Dialog; 