import React from 'react'
import Navbar from '../../componets/Navbar'
import SideBar from '../../componets/SideBar'
import Footer from '../../componets/Footer'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditOwner() {
    const [email, setEmail] = useState();
    const [username, setUserName] = useState();
    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [status, setStatus] = useState();
    // const [last_login, setLastLogin] = useState();
    // const [other_details, setOtherDetails] = useState();
    const [password, setPassword] = useState();
    const [ownerData, setOwnerData] = useState();


    const param = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`https://foodapis.techenablers.info/api/admin/owners/${param.id}`, {
            headers: {
                Authorization: `Bearer` + localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log(res.data.data.shop);
                setEmail(res.data.data.shop.email);
                setFirstName(res.data.data.shop.first_name);
                setLastName(res.data.data.shop.last_name);
                setStatus(res.data.data.shop.status)
                setUserName(res.data.data.shop.username)
                setOwnerData(res.data.data.shop.user_meta.phone);
            })
    }, []);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('status', status);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('phone',ownerData);
        formData.append('password',password)
        axios.post(`https://foodapis.techenablers.info/api/admin/owners/${param.id}`,formData,{
            headers : {
                Authorization : `Bearer` + localStorage.getItem('token')
            }
        })
        .then((res)=>{
            console.log(res)
            if(res.success !== false){
                navigate('/owner')
            }
        }).catch((error)=>{
            console.log(error,'error')
            alert(error.response.data.errors)
        })
    }
    return (
        <div className='wrapper'>
            <Navbar />
            <SideBar />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className='pl-1'>Edit Owner</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Edit Owner</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='content'>
                    <div className='container-fluid'>
                        <div class="card card-dark">
                            <div class="card-header">
                                <h3 class="card-title">Quick Example</h3>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="card-body">
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input type="text" className="form-control" value={email} placeholder="Customer Name" onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>User Name</label>
                                                <input type="text" className="form-control" value={username} placeholder="User Name" onChange={(e) => setUserName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>First Name</label>
                                                <input type="text" className="form-control" value={first_name} placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label>Last Name</label>
                                                <input type="text" className="form-control" value={last_name} placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label for="cars">Status</label>
                                                <select className='form-control' name="cars" id="cars" value={status} onChange={(e) => setStatus(e.target.value)}>
                                                    <option value="New">0</option>
                                                    <option value="InProccess">1</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card">
                                                {/* <div className='car-header'>
                                                    <h1 className='card-title'>Order Items</h1>
                                                </div> */}
                                                <div className="card-body">

                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Phone</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>{ownerData}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                    <div className="card-footer" style={{ background: '#fff' }}>
                                        <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#343a40', borderColor: '#343a40' }}>Update</button>
                                    </div>
                                </div>
                            </form>

                        </div>


                    </div>
                </section>

            </div>
            <Footer />
        </div>
    )
}

export default EditOwner