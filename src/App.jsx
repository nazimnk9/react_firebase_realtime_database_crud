import { useEffect, useState } from 'react'
import { getDatabase, ref, set, push, onValue, remove } from "firebase/database";

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
    setUser({
      name: "",
      email: "",
      phone: "",
      address: "",
      password: ""
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
    //console.log(id);
    remove(ref(db,"allinformation/"+id)).then(()=>(
      console.log("delete done")
    ))
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
              <input name='name' value={user.name} type="text" onChange={handleForm} required />
              <label>Name</label>
              <i className='bx bxs-user'></i>
            </div>
            <div className="input-box">
              <input name='email' value={user.email} type="email" onChange={handleForm} required />
              <label>E-mail</label>
              <i className='bx bxs-envelope'></i>
            </div>
            <div className="input-box">
              <input name='phone' value={user.phone} type="phone" onChange={handleForm} required />
              <label>Phone</label>
              <i className='bx bxs-phone-call'></i>
            </div>
            <div className="input-box">
              <input name='address' value={user.address} type="text" onChange={handleForm} required />
              <label>Address</label>
              <i className='bx bxs-location-plus' ></i>
            </div>
            <div className="input-box">
              <input name='password' value={user.password} type="password" onChange={handleForm} autoComplete='on' required />
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
      <div className="user-list">
        <div className="user-list-header">User List</div>
        <ol>
          {
            information.map((item, index) => (
              <li className="user-item" key={index}>
                <span>Name: {item.information_user.name}</span>
                <span>Phone: {item.information_user.phone}</span>
                <span>Email: {item.information_user.email}</span>
                <span>Address: {item.information_user.address}</span>
                <div className="user-actions">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
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
