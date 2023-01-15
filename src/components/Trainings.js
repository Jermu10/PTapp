import {React, useState, useEffect} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddTraining from "./AddTraining";
import { Button } from "@mui/material";

export default function Trainings() {
    
    const [trainings, setTrainings] = useState([]);
    const [training, setTraining] = useState({activity: '', date: '', duration: '', customerFirstname: '', customerLastname: ''})
    //const gridRef = React.useRef();

    useEffect(() => {
        fetchTrainings();
    }, []); 

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const addTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(training)
        }).then(_ => fetchTrainings())
        .catch(err => console.error(err))        
    }

    const deleteTraining = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch('https://customerrest.herokuapp.com/api/trainings/' + link, { method: 'DELETE' })
            .then(_ => fetchTrainings())
            .catch(err => console.error(err))
            
        }
    }



    const columns = [
        {header: 'Activity', field: 'activity', sortable: true, filter: true},
        {header: 'Date', field: 'date', sortable: true, filter: true},
        {header: 'Duration', field: 'duration', sortable: true, filter: true},
        {header: 'Customer', field: 'customerFirstname', sortable: true, filter: true},
        {header: 'Customer', field: 'customerLastname', sortable: true, filter: true},
        {header: 'Delete', field: "id", cellRenderer: (params) => <Button color='error' onClick={() => deleteTraining(params.value)}>Delete</Button>}
    ]


    

    return(
        <div>

            <AddTraining addTraining={addTraining}/>
            <h1>Trainings</h1>
            <div className='ag-theme-material' style={{height: 700, width: '90%', margin: 'auto'}}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columns}
                />
                </div>
        </div>
    )
};
