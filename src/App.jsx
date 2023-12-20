import { useState } from 'react'
import { getDatabase, ref, set, push } from "firebase/database";

function App() {
  const db = getDatabase();
  let [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: ""
  })
  let handleForm = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }

  let handleSubmit = () => {
    set(push(ref(db, "allinformation")), {
      information_user: user,
    })
  }

  return (
    <>
      <div className="container">
        <span className="bg-animate"></span>
        <span className="bg-animate2"></span>
        <div className="form-box register">
          <h2>Registration</h2>
          <div className="input-box">
            <input name='name' type="text" onChange={handleForm} required />
            <label>Name</label>
            <i className='bx bxs-user'></i>
          </div>
          <div className="input-box">
            <input name='email' type="email" onChange={handleForm} required />
            <label>E-mail</label>
            <i className='bx bxs-envelope'></i>
          </div>
          <div className="input-box">
            <input name='phone' type="phone" onChange={handleForm} required />
            <label>Phone</label>
            <i className='bx bxs-phone-call'></i>
          </div>
          <div className="input-box">
            <input name='address' type="text" onChange={handleForm} required />
            <label>Address</label>
            <i className='bx bxs-location-plus' ></i>
          </div>
          <div className="input-box">
            <input name='password' type="password" onChange={handleForm} required />
            <label>Password</label>
            <i className='bx bxs-lock-alt' ></i>
          </div>
          <button className="btn" onClick={handleSubmit}>Registration</button>
        </div>
        <div className="info-text register">
          <h2>Please Register</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
    </>
  )
}

export default App
