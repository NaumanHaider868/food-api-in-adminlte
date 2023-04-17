import React, { useState, useEffect } from 'react'
import Navbar from '../../componets/Navbar'
import SideBar from '../../componets/SideBar'
import Footer from '../../componets/Footer'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { PaginationControl } from 'react-bootstrap-pagination-control';

function Shops() {
    //pagination
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState();

    const [shops, setShops] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getShop();
        // getSearch()
    }, [page]);

    const getShop = () => {
        axios.get(`https://foodapis.techenablers.info/api/admin/shops?page=${page}`, {
            headers: {
                Authorization: `Bearer` + localStorage.getItem('token')
            }
        })
            .then((resp) => {
                console.log('shop data', resp);
                setShops(resp.data.data.shops.data)
                setTotalPage(resp.data.data.shops.total)
            })
    }

    const editShop = (id) => {
        navigate('/editshop/' + id)
    }
    const deleteProduct = (id) => {
        console.log(id);
        axios.delete(`https://foodapis.techenablers.info/api/admin/shops/${id}`, {
            headers: {
                Authorization: `Bearer` + localStorage.getItem('token')
            }
        })
            .then((res) => {
                getShop()
                console.log('delete', res)
                alert(res.data.messages)
            })
    }

    const [search, setSearch] = useState();
    const getSearch = (e) => {
        // setSearch(e.target.value)
        e.preventDefault();
        axios.get(`https://foodapis.techenablers.info/api/admin/shops?keyword=${search}`, {
            headers: {
                Authorization: `Bearer` + localStorage.getItem('token')
            }
        })
            .then((res) => {
                // console.log(res,'search')
                setShops(res.data.data.shops.data);
            })
    }
    const viewProduct = (id) => {
        navigate('/viewshop/'+id)
    }
    return (
        <div>
            <Navbar />
            <SideBar />

            <div className='wrapper'>
                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Shops</h1>
                                </div>

                            </div>
                        </div>
                    </section>

                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <Link to='/addshop'><button className='btn btn-success'>Add Shop</button></Link>
                                            <br /><br />
                                            <div className="input-group">
                                                <input type="search" className="form-control form-control-lg" placeholder="Type your keywords here" onChange={(e) => setSearch(e.target.value)} />
                                                <div className="input-group-append">
                                                    <button type="submit" className="btn btn-lg btn-success" onClick={getSearch}>
                                                        <i className="fa fa-search"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <table className="table" style={{ marginBottom: '30px' }}>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Sr.#</th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Phone</th>
                                                        <th scope="col">Address</th>
                                                        <th className='' scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {shops.map((item, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{((page - 1) * 10) + i + 1}</td>
                                                                <td>1/1/2023</td>
                                                                <td>{item.name}</td>
                                                                <td>{item.phone}</td>
                                                                <td>{item.address}</td>
                                                                <td>
                                                                    <i class="fas fa-edit" onClick={() => editShop(item.id)} style={{ fontSize: '13px', cursor: 'pointer' }}></i> <i class="fas fa-trash" onClick={() => deleteProduct(item.id)} style={{ fontSize: '13px', cursor: 'pointer' }}></i> <i class="fas fa-eye" onClick={() => viewProduct(item.id)} style={{ fontSize: '13px', cursor: 'pointer' }}></i>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                            <PaginationControl
                                                page={page}
                                                total={totalPage}
                                                limit={10}
                                                changePage={(page) => {
                                                    setPage(page);
                                                }}
                                                ellipsis={1}
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Shops