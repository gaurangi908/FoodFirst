import React,{useState} from 'react'
import { Link } from 'react-router-dom'
export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/CreateUser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
    });
const json=await  response.json()
console.log(json);
if(!json.success){
  alert("invalid")
}
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <>
    <div className='container'>
    <form onSubmit={handleSubmit}>
    <div className="m-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="m-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="m-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
            </div>
            <div className="m-3">
              <label htmlFor="address" className="form-label">Address</label>
                <input type="text" className="form-control" value={credentials.geolocation} name='geolocation' onChange={onChange} aria-describedby="emailHelp" />
            </div>
  <button type="submit" className="btn btn-primary">Submit</button>
  <Link to="/Login" className="m-3 mx-1 btn btn-danger">Already a user</Link>
</form>
</div>
    </>
  )
}
