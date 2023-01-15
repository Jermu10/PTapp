import { Button } from "@mui/material";
import {React, Select, DatePicker, useEffect, useState} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";




export default function AddCustomer(props) {

    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        streetaddress: '',
        postcode: '',
        city: '',
    });



    const [open, setOpen] = useState(false);
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleInputChange = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
    }

    const addCustomer = () => {
        props.addCustomer(customer);
        handleClose();
    }


    return(
        <div>
        <Button variant="outlined" style={{margin:10}}onClick={handleClickOpen}>
          Add customer
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New customer</DialogTitle>
          <DialogContent>
            <TextField
                autoFocus
                name="firstname"
                value={customer.firstname}
                margin="dense"
                label="First name"
                type="text"
                fullWidth
                variant="standard"
                onChange={e => handleInputChange(e)}
            />
            <TextField
                name="lastname"
                value={customer.lastname}
                margin="dense"
                label="Last name"
                type="text"
                fullWidth
                variant="standard"
                onChange={e => handleInputChange(e)}
            />
            <TextField
                name="email"
                value={customer.email}
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                variant="standard"
                onChange={e => handleInputChange(e)}
            />
            <TextField
                name="phone"
                value={customer.phone}
                margin="dense"
                label="Phone number"
                type="number"
                fullWidth
                variant="standard"
                onChange={e => handleInputChange(e)}
            />
            <TextField
                name="streetaddress"
                value={customer.streetaddress}
                margin="dense"
                label="Street address"
                type="text"
                fullWidth
                variant="standard"
                onChange={e => handleInputChange(e)}
            />
            <TextField
                name="postcode"
                value={customer.postcode}
                margin="dense"
                label="Postcode"
                type="number"
                fullWidth
                variant="standard"
                onChange={e => handleInputChange(e)}
            />
            <TextField
                name="city"
                value={customer.city}
                margin="dense"
                label="City"
                type="text"
                fullWidth
                variant="standard"
                onChange={e => handleInputChange(e)}
            />
        </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={addCustomer}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
};
