import React,{ useState,useEffect }  from 'react'; 
import MaterialTable from 'material-table';

export default function TableHistory(props) {

    const [dataTable, setDataTable] = React.useState({
        columns: [
          { title: 'Description', field: 'description' },
          { title: 'Date', field: 'date' },
          { title: 'Time', field: 'time' },
        ],
        data: [],
    });

    useEffect(() => {

        if (props.newData != null){
            setDataTable((prevState) => {
                const data = [...prevState.data];
                data.push(props.newData);
                return { ...prevState, data };
            });
        }
        
    },[props.newData]); 

    return (

        <MaterialTable
                    title={ '' }
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

    ); 
}