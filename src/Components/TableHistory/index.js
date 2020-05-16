import React,{ useState }  from 'react'; 
import MaterialTable from 'material-table';

export default function TableHistory(props) {

    const { newData } = props; 

    const [dataTable, setDataTable] = React.useState({
        columns: [
          { title: 'description', field: 'description' },
          { title: 'date', field: 'date' },
          { title: 'time', field: 'time' },
        ],
        data: [],
    });

    return (

        <MaterialTable
                    title={ props.name }
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