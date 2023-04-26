import React from 'react'
import Navbar from '../../componets/Navbar'
import SideBar from '../../componets/SideBar'
import Footer from '../../componets/Footer'
import { useState, useEffect } from 'react'
import axios from '../services/ApiUrl'
import { Link } from 'react-router-dom'
import { PaginationControl } from 'react-bootstrap-pagination-control';
// import { getAdminCategorie, getAdminCategorieSearch } from '../services/ApiUrl'

function ViewCategories() {
    const [search, setSearch] = useState([])
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();

    const [categorie, setCategorie] = useState([]);
    useEffect(() => {

        axios.get(`categories?page=${page}`).then((res) => {
            console.log(res.data.data);
            setCategorie(res.data.data.categories.data)
            setTotalPage(res.data.data.categories.total)
        })
    }, [page])
    const getSearch = (e) => {
        e.preventDefault();
        axios.get(`https://foodapis.techenablers.info/api/admin/categories?keyword=${search}`, {
            headers: {
                Authorization: `Bearer` + localStorage.getItem('token')
            }
        }).then((res) => {
            console.log(res.data.data.categories.data);
            setCategorie(res.data.data.categories.data)
        })
    }
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
                                    <h1>Categories</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <Link to='/admin' className="breadcrumb-item"><a href="#">Admin Dashboard</a></Link>
                                        <li className="breadcrumb-item active">Categories</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </section>

                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">

                                        <div className="card-body">
                                            <Link to='/addcategorie'><button className='btn btn-success'>Add Categorie</button></Link>
                                            <br /><br />
                                            <div className="input-group">
                                                <input type="search" className="form-control form-control-lg" placeholder="Type your keywords here" onChange={(e) => setSearch(e.target.value)} />
                                                <div className="input-group-append">
                                                    <button type="submit" className="btn btn-lg btn-success" onClick={getSearch} >
                                                        <i className="fa fa-search"></i>
                                                    </button>
                                                </div>
                                            </div><br />
                                            <table className="table" style={{ marginBottom: '30px' }}>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Sr.#</th>
                                                        <th scope="col">Name</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {categorie.map((item, i) => {
                                                        return (
                                                            <>
                                                                <tr key={i}>
                                                                    <td>{((page - 1) * 10) + i + 1}</td>
                                                                    <td>{item.name}</td>
                                                                </tr>

                                                            </>
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

export default ViewCategories