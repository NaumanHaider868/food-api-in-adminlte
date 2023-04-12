import React from 'react'
import SideBar from '../../componets/SideBar'
import Navbar from '../../componets/Navbar'
import Footer from '../../componets/Footer'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
// Model Window

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


function Oders() {
    // Model Window
    const [show, setShow] = useState(false);
    const param = useParams();
    const [deliveryMens, setDeliveryMens] = useState([]);
    const [deliveryMen,setDeliveryMen] = useState();
    const handleClose = () => setShow(false);

    const handleShow = (id) => {    
        axios.get('https://foodapis.techenablers.info/api/admin/deliverymens', {
            headers: {
                Authorization: `Bearer` + localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log('deliverymens', res.data.data.deliveryMens.data);
                setDeliveryMens(res.data.data.deliveryMens.data)
            })
        console.log(id)
        setShow(true)
    }

    const getDeliveryMen = (e) => {
        console.log('DeliveryMenId', e.target.value);
        setDeliveryMen(e.target.value)
    }
    const payload = {
        order_id: deliveryMens,
        delivery_man_id : deliveryMen
    }

    const postOrder = () => {
        axios.post(`https://foodapis.techenablers.info/api/admin/order/assign`,payload,{
            headers : {
                Authorization: `Bearer` + localStorage.getItem('token')
            }
        })
        .then((res)=>{
            console.log(res,'deliver id');
            alert(res.data.errors)
        }).catch((error)=>{
            console.log(error)
        })
    }

    const [order, setOrder] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('https://foodapis.techenablers.info/api/admin/orders', {
            headers: {
                Authorization: `Bearer` + localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log('order', res.data.data.orders.data)
                setOrder(res.data.data.orders.data)
            })
    }, [])
    const editOrder = (id) => {
        navigate('/editorder/' + id)
    }
    const viewOrder = (id) => {
        navigate('/vieworder/' + id)
    }

    return (
        <div className="wrapper">

            <SideBar />
            <Navbar />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <div className="form-group">
                                <label for="cars">Delivere Man</label>
                                <select className='form-control' name="cars" id="cars"
                                        onChange={getDeliveryMen} 
                                        >
                                    {deliveryMens.map((item, i) => {
                                        return (
                                            <option key={i} value={item.id}>{item.first_name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=>{handleClose();postOrder()}}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>


            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Orders</h1>
                            </div>

                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    {/* <div className="card-header">

                                    </div> */}
                                    <div className="card-body">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Sr.#</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Customer Name</th>
                                                    <th scope="col">Location</th>
                                                    <th scope="col">Amount</th>
                                                    <th scope="col">status</th>
                                                    <th className='' scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.map((item, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td>{item.id}</td>
                                                            <td>1/1/2023</td>
                                                            <td>{item.username}</td>
                                                            <td>{item.location}</td>
                                                            <td>{item.total}</td>
                                                            <td>{item.status}</td>
                                                            <td>
                                                                <a onClick={() => viewOrder(item.id)}><i class="fas fa-eye" style={{ fontSize: '13px', cursor: 'pointer' }}></i></a>&nbsp;
                                                                <a onClick={() => editOrder(item.id)}><i class="fas fa-edit" style={{ fontSize: '13px', cursor: 'pointer' }}></i></a>
                                                                <a onClick={() => handleShow(item.id)} style={{ fontSize: '13px', cursor: 'pointer' }}>Assgin</a>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default Oders