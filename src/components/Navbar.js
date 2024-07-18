// import React from 'react';
// import { Link } from "react-router-dom";

// export default function Navbar() {
//     return (
//         <div>
//             <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//                 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarNavDropdown">
//                     <ul className="navbar-nav">
//                         <li className="nav-item active">
//                             <Link className="nav-link" to="/">Home</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/signup">SignUp</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/login">Login</Link>
//                         </li>
//                     </ul>
//                 </div>
//             </nav>
//         </div>
//     );
// }
// import React from 'react';
// import { Link } from 'react-router-dom';
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';

// export default function CustomNavbar() {
//     return (
//         <Navbar bg="dark" variant="dark" expand="lg">
//             <div className="container-fluid">
//                 <Navbar.Brand href="/" className='fs-4 text-white'>FOODIEHUB</Navbar.Brand>
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav">
//                     <Nav className="me-auto">
//                         <Nav.Link as={Link} to="/" className='fs-6'>Home</Nav.Link>
//                     </Nav>
//                     <Nav>
//                         <Nav.Link as={Link} to="/createuser" className='btn bg-white text-dark mx-1'>SignUp</Nav.Link>
//                         <Nav.Link as={Link} to="/login" className='btn bg-white text-dark mx-1'>Login</Nav.Link>
//                     </Nav>
//                 </Navbar.Collapse>
//             </div>
//         </Navbar>
//     );
// }
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Cart from '../screens/Cart';
import Container from 'react-bootstrap/Container';
import Modal from '../Modal';
import { useCart } from './ContextReducer';
export default function CustomNavbar() {
    const navigate = useNavigate();
    const data = useCart();
    const [cartView, setCartView] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login')
    }
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand>FOODIEHUB</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {
                            localStorage.getItem('authToken') ?
                                <Nav >
                                    <Nav.Link as={Link} to="/myorder">My Orders</Nav.Link>
                                </Nav> : ""
                        }
                    </Nav>
                    {
                        (!localStorage.getItem('authToken')) ?
                            <Nav>
                                <Nav.Link as={Link} to="/createuser" className='btn btn-light mr-2'>SignUp</Nav.Link>
                                <Nav.Link as={Link} to="/login" className='btn btn-light'>Login</Nav.Link>
                            </Nav> :
                            <Nav>
                                <Nav.Link as={Link} to="/" onClick={() => {
                                    { setCartView(true) }
                                }}>My Cart {" "}
                                    <Badge pill bg="danger" className='m-1'>
                                        {data.length}
                                    </Badge></Nav.Link>

                                <Nav>
                                    {cartView ? <Modal onClose={() => { setCartView(false) }}><Cart /></Modal> : null}
                                    <Nav.Link as={Link} to="/login" className='btn btn-light' onClick={handleLogout}>Logout</Nav.Link>
                                </Nav>
                            </Nav>

                    }

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
