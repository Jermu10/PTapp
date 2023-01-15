import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Trainings from "./Trainings";
import Customers from "./Customers";



export default function NavBar() {
    return(
        <div>
            <BrowserRouter>
                <Link to='/'>Home</Link>
                <Link to='/trainings'>Trainings</Link>
                <Link to='/customers'>Customers</Link>

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/trainings' element={<Trainings />} />
                <Route path='/customers' element={<Customers />} />
            </Routes>

            </BrowserRouter>
        </div>
    )
};
