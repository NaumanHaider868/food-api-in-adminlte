import React from 'react'
import Navbar from '../../../componets/Navbar'
import SideBar from '../../../componets/SideBar'
import Footer from '../../../componets/Footer'
import { useState, useEffect } from 'react'
import api from '../../services/ApiUrl'
import { Link, useNavigate } from 'react-router-dom'
import InputMask from 'react-input-mask'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddDeliveryMen() {
    const [email, setEmail] = useState();
    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [status, setStatus] = useState(false);
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [confirm_password,setConfirmPassword]=useState()
    const [other, setOther] = useState('');
    const [phone, setPhone] = useState();
    const navigate = useNavigate();

    const [alert, setAlert] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let payload = {
            email: email,
            phone: phone,
            first_name: first_name,
            last_name: last_name,
            password: password,
            password_confirmation: confirm_password,
            other_details: other,
            username: username,
            status: status
        }
        api.post('/deliverymens', payload)
            .then((res) => {
                console.log(res, 'add deliveryman')
                navigate('/deliveryman')
                toast.success(res.data.messages[0])
            })
            .catch((error) => {
                console.log(error)
                setAlert(error.response.data.errors)
                document.querySelector('#alert-message').style.display = 'block';
                setTimeout(() => {
                    document.querySelector('#alert-message').style.display = 'none';
                }, 3000);
            })
    }
    const handleGeneralChange = (e) => {
        const isChecked = e.target.checked;
        setStatus(isChecked);
    };

    return (
        <div className='wrapper'>
            <Navbar />
            <SideBar />
            <div className='wrapper'>
                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className='pl-1'>Add Delivery Man</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <Link to='/deliveryman' className="breadcrumb-item"><a href="#">Delivery Man</a></Link>
                                        <li className="breadcrumb-item active">Add Delivery Man</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className='content'>
                        <div className='container-fluid'>
                            <div class="card">

                                <div className='alert alert-danger' id='alert-message'>
                                    {
                                        alert.map((err, index) => {
                                            return (
                                                <div className='valid'>
                                                    <p className='valid-p alert-danger' key={index}>{err}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <div className='row'>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Email</label>
                                                    <input type="email" placeholder='email' className="form-control" name={email} onChange={(e) => setEmail(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>First Name</label>
                                                    <input type="text" placeholder='First Name' className="form-control" name={first_name} onChange={(e) => setFirstName(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Last Name</label>
                                                    <input type="text" placeholder='Last Name' className="form-control" name={last_name} onChange={(e) => setLastName(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>User Name</label>
                                                    <input type="text" placeholder='User Name' className="form-control" name={username} onChange={(e) => setUserName(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Phone</label>
                                                    <InputMask mask='(9999) 999-9999' placeholder='Phone' type="phone" className="form-control" name={phone} onChange={(e) => setPhone(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Password</label>
                                                    <input type="password" placeholder='Password' className="form-control" name={password} onChange={(e) => setPassword(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Confiram Password</label>
                                                    <input type="password" placeholder='Confiram Password' className="form-control" name={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'></div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <label>Other Details</label>
                                                    <textarea className="form-control" name={other} onChange={(e) => setOther(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'></div>
                                            <div className='col-sm-6'>
                                                <div className="form-group">
                                                    <input type='checkbox' style={{ paddingTop: '4px' }} name={status} onChange={handleGeneralChange} />&nbsp;&nbsp;
                                                    <label for="cars">Active</label><br />
                                                </div>
                                            </div>
                                            

                                            

                                            <div className="card-footer" style={{ background: '#fff' }}>
                                                <button type="submit" className="btn btn-success">Add Delivery Man</button>
                                            </div>

                                        </div>


                                    </div>
                                </form>

                            </div>


                        </div>
                    </section>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AddDeliveryMen