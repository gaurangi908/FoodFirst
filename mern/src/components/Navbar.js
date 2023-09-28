import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export default function Navbar() {
  const [cartView,setCartView]=useState(false)
  let data=useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/Login")

  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">FoodFirst</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAlt">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>

              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/myOrder"> My Orders</Link>
                </li>
                : ""}

            </ul>
            {(!localStorage.getItem("authToken")) ?
              <div className='d-flex'>
                <Link className="btn bg-dark text-white mx-1" to="/Login">Login</Link>
                <Link className="btn bg-dark text-white mx-1" to="/CreateUser">Signup</Link>


              </div>
              :
              <div>
                <div className="btn bg-dark text-white mx-1" onClick={()=>{setCartView(true)}}>
                  Cart {"  "}
                  <Badge pill bg-danger> {data.length}</Badge>
                </div>
                {cartView? <Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
                <div className="btn bg-dark text-danger mx-1" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            }


          </div>
        </div>
      </nav>

    </div>
  )
}
