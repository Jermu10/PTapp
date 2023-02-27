import {React, useState, useEffect} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button } from "@mui/material";
import AddCustomer from "./AddCustomer";

export default function Customers() {
    
    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState({firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''})
    //const gridRef = React.useRef();

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const addCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer)
        })
        .then(_ => fetchCustomers())
        .catch(err => console.error(err))
    }

    const  deleteCustomer = (link) => {
        if (window.confirm("Are you sure?")) {
        fetch(link, {method: 'DELETE'})
        .then(_ => fetchCustomers())
        .catch(err => console.error(err))
        
        }
    }

    const updateCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer)
        })
        .then(_ => fetchCustomers())
        .catch(err => console.error(err))
    }


    const columns = [
        {header: 'Firstname', field: 'firstname', sortable: true, filter: true},
        {header: 'Lastname', field: 'lastname', sortable: true, filter: true},
        {header: 'Streetaddress', field: 'streetaddress', sortable: true, filter: true},
        {header: 'Postcode', field: 'postcode', sortable: true, filter: true},
        {header: 'City', field: 'city', sortable: true, filter: true},
        {header: 'Email', field: 'email', sortable: true, filter: true},
        {header: 'Phone', field: 'phone', sortable: true, filter: true},
        {header: 'Delete', field: "id", cellRenderer: (params) => <Button color='error' onClick={() => deleteCustomer(params.value)}>Delete</Button>},
        {header: 'Update', field: "id", cellRenderer: (params) => <Button color='primary' onClick={() => updateCustomer(params.value)}>Update</Button>}
    ]   

    return(
        <div>
            <AddCustomer addCustomer={addCustomer}/>
            <h1>Customers</h1>
            <div className='ag-theme-material' style={{height: 700, width: '90%', margin: 'auto'}}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                >
                </AgGridReact>
            </div>
        </div>
    )   
}

