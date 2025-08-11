// components/pages/training/Createproduct.js

import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Breadcrumb from '../../../MainComponents/breadcrumb/Breadcrumb';
import Pagination from '../../../MainComponents/pagination/Pagination';
import AddproductFrom from './AddproductFrom';
import deleteLogo from '../../../../assets/Images/deleteLogo.png'

function Createproduct() {
    const [filters, setFilters] = useState({ searchText: '' });
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalType, setModalType] = useState('');
    const itemsPerPage = 10;

    const trainingvideo = [
        { id: 1, product_name: 'Product A' },
        { id: 2, product_name: 'Product B' },
        { id: 3, product_name: 'Product C' },
        { id: 4, product_name: 'Product D' },
        { id: 5, product_name: 'Product E' },
        { id: 6, product_name: 'Product F' },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFilters({ searchText: '' });
    };

    const filteredtrainingvideo = trainingvideo.filter(emp =>
        emp.product_name.toLowerCase().includes(filters.searchText.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currenttrainingvideo = filteredtrainingvideo.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredtrainingvideo.length / itemsPerPage);

    const toggleCheckbox = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const toggleAllCheckboxes = () => {
        const currentPageIds = currenttrainingvideo.map(emp => emp.id);
        const allSelected = currentPageIds.every(id => selectedIds.includes(id));
        setSelectedIds(prev =>
            allSelected ? prev.filter(id => !currentPageIds.includes(id)) : [...new Set([...prev, ...currentPageIds])]
        );
    };

    return (
        <section className='main-content-area'>
            <Breadcrumb
                title="Create Product"
                titleIcon="bx bx bx-cart icon"
                buttons={[
                    {
                        label: (
                            <Link to="/admin/Businesssetting">
                                <button type="button" className="addTaskBtn">
                                    <i className="bx bx-arrow-back"></i> Back
                                </button>
                            </Link>
                        ),
                    },
                    {
                        label: (
                            <button className="addTaskBtn" onClick={() => setShowForm(true)}>
                                <FaPlus className="mr-1" /> Add Product
                            </button>
                        )
                    },
                    {
                        label: <>Total Product: <span className="badge-length">{filteredtrainingvideo.length}</span></>,
                        className: "btn-bg-2",
                    },
                ]}
            />

            <div className={`slide-form-wrapper ${showForm ? 'show' : ''}`}>
                <AddproductFrom onClose={() => setShowForm(false)} />
            </div>
            <div className={`overlay ${showForm ? 'visible' : ''}`} onClick={() => setShowForm(false)}></div>

            <div className="row-bg mt-3">
                <div className="row align-items-center filterformpay flex-wrap">
                    <div className="col-lg-3 mb-2">
                        <label className="form-label mb-0">Search Product</label>
                        <input
                           className="input-size form-control-search"
                            name="searchText"
                            value={filters.searchText}
                            onChange={handleInputChange}
                            placeholder="Search"
                        />
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-1">
                        <div className="d-flex mt-4 gap-3 align-items-center">
                            <button className="btn btn-primary btn-sm" onClick={() => setCurrentPage(1)}>
                                <i className="bx bx-filter-alt"></i> Filter
                            </button>
                            <button className="btn btn-sm custom-reset" onClick={handleReset}>
                                <i className="bx bx-reset"></i> Reset
                            </button>
                        </div>
                    </div>
                </div>

                <div className='table-data-area'>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped mb-2">
                            <thead className="table-thead-data-color">
                                <tr>
                                    <th>
                                        <input
                                            type="checkbox"
                                            onChange={toggleAllCheckboxes}
                                            checked={currenttrainingvideo.length > 0 && currenttrainingvideo.every(emp => selectedIds.includes(emp.id))}
                                        />
                                    </th>
                                    <th>S.no.</th>
                                    <th>Product</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="table-tbody-data">
                                {currenttrainingvideo.length > 0 ? currenttrainingvideo.map((emp, index) => (
                                    <tr key={emp.id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(emp.id)}
                                                onChange={() => toggleCheckbox(emp.id)}
                                            />
                                        </td>
                                        <td>{indexOfFirstItem + index + 1}</td>
                                        <td>{emp.product_name}</td>
                                        <td>
                                            <Link
                                                to="#"
                                                className="text-dark me-3"
                                                data-bs-toggle="modal"
                                                data-bs-target="#productModal"
                                                onClick={() => {
                                                    setSelectedProduct(emp);
                                                    setModalType('edit');
                                                }}
                                            >
                                                <FaEdit />
                                            </Link>
                                            <Link
                                                to="#"
                                                className="text-dark"
                                                data-bs-toggle="modal"
                                                data-bs-target="#Deletestatusformlabe"
                                                onClick={() => {
                                                    setSelectedProduct(emp);
                                                    setModalType('delete');
                                                }}
                                            >
                                                <FaTrash />
                                            </Link>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="4" className="text-center">No records found</td></tr>
                                )}
                            </tbody>
                        </table>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
            <div className="modal fade" id="productModal" tabIndex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content" style={{ maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
                        <div className="modal-header" style={{ position: 'sticky', top: 0, zIndex: 10, background: '#fff' }}>
                            <h5 className="modal-title">Edit Product</h5>
                            <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        {selectedProduct && (
                            <form onSubmit={(e) => { e.preventDefault(); }} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <div className="modal-body" style={{ overflowY: 'auto' }}>
                                    <div className="add-company-form">
                                        <div className="row">
                                            <div className="col-12 mb-3">
                                                <label className="form-control-label">Product name</label>
                                                <input
                                                    className="form-control-search form-control"
                                                    type="text"
                                                    name="Product_name"
                                                    required
                                                    placeholder="Enter Product name"
                                                    defaultValue={selectedProduct.product_name}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer" style={{ position: 'sticky', bottom: 0, zIndex: 10, background: '#fff' }}>
                                    <button className="btn btn-primary btn-sm" type="submit" data-bs-dismiss="modal">Save</button>
                                    <button className="btn btn-sm custom-reset" type="button" data-bs-dismiss="modal">Cancel</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            <div
                className="modal fade"
                id="Deletestatusformlabe"
                aria-hidden="true"
                aria-labelledby="Deletestatusformlabe"
                tabIndex="-1"
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div
                        className="modal-content"
                        style={{ maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
                    >
                        <div
                            className="modal-header"
                            style={{ position: 'sticky', top: 0, zIndex: 10, background: '#fff' }}
                        >
                            <h5 className="modal-title">Delete Product</h5>
                            <button
                                className="btn-close"
                                type="button"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <form style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                            <div className="modal-body text-center" style={{ overflowY: 'auto' }}>
                                <img
                                    src={deleteLogo}
                                    alt="deleteLogo"
                                    className='deleteLogo'
                                   
                                />
                                <div className="add-company-form">
                                    <p className="fs-6">
                                        Are you sure you want to delete{' '}
                                        <strong>{selectedProduct?.product_name}</strong>?
                                    </p>
                                </div>
                            </div>
                            <div
                                className="modal-footer"
                                style={{ position: 'sticky', bottom: 0, zIndex: 10, background: '#fff' }}
                            >
                                <button
                                    className="btn btn-danger btn-sm"
                                    type="submit"
                                    data-bs-dismiss="modal"
                                >
                                    Delete
                                </button>
                                <button
                                    className="btn btn-sm custom-reset"
                                    type="button"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Createproduct;
