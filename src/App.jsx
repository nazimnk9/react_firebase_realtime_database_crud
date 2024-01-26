import { useEffect, useState } from 'react'
import { getDatabase, ref, set, push, onValue } from "firebase/database";

function App() {
  const db = getDatabase();
  let [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: ""
  })
  let [information, setInformation] = useState([])
  let handleForm = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }
  // write data
  let handleSubmit = (e) => {
    e.preventDefault();
    set(push(ref(db, "allinformation")), {
      information_user: user,
    })
  }

  //read data
  useEffect(() => {
    const informationRef = ref(db, 'allinformation');
    onValue(informationRef, (snapshot) => {
      // console.log(snapshot.val());
      // const data = snapshot.val();
      // updateStarCount(postElement, data);
      let array = []
      snapshot.forEach((item) => {
        // console.log(item.val())
        array.push({ ...item.val(), id: item.key })
      })
      setInformation(array);
    });
  }, [])

  console.log(information);

  let handleDelete = (id) => {
    console.log(id);
  }

  return (
    <>
      <div className="container">
        <span className="bg-animate"></span>
        <span className="bg-animate2"></span>
        <div className="form-box register">
          <h2>Registration</h2>
          <form action="">
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
          </form>
        </div>
        <div className="info-text register">
          <h2>Please Register</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
      <div class="user-list">
        <div class="user-list-header">User List</div>
        <ol>
          {
            information.map((item, index) => (
              <li class="user-item" key={index}>
                <span>Name: {item.information_user.name}</span>
                <span>Phone: {item.information_user.phone}</span>
                <span>Email: {item.information_user.email}</span>
                <span>Address: {item.information_user.address}</span>
                <div class="user-actions">
                  <button class="edit-btn">Edit</button>
                  <button class="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </li>
            ))
          }
        </ol>
      </div>
    </>
  )
}

export default App
