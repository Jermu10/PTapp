import { Button } from "@mui/material";
import {React, Select, DatePicker, useEffect, useState} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";

export default function Addtraining(props) {
    const [customers, setCustomers] = useState([]);
    const [training, setTraining] = useState({date: '', duration: '', activity: '', customer: props.link})
    
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    }
  
    const handleClose = () => {
      setOpen(false);
    }


    const handleInputChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    }


    const addTraining = () => {
        props.addTraining(training);
        handleClose();
    }

    useEffect(() => {
        fetchCustomers();
    }, [])

    const fetchCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
            .then((response) => response.json())
            .then((data) => setCustomers(data.content));
    }

        const customerOptions =
        customers.map(customer => ({ label: customer.firstname + " " + customer.lastname }))

  
    return (
      <div>
        <Button variant="outlined" style={{margin:10}}onClick={handleClickOpen}>
          Add training
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add training</DialogTitle>
          <DialogContent>
          <TextField autoFocus margin="dense"
           name="date" 
           value={training.date} onChange={handleInputChange} label="Date (YYYY-MM-DD)" fullWidth 
           />
            <TextField margin="dense" 
            name="duration" 
            value={training.duration} 
            onChange={handleInputChange} 
            label="Duration" fullWidth 
            />
            <TextField 
            margin="dense" 
            name="activity" 
            value={training.activity} 
            onChange={handleInputChange} 
            label="Activity" 
            fullWidth 
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={addTraining}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
}