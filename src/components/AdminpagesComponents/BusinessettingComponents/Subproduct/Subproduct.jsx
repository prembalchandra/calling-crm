// components/pages/training/Subproduct.js

import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Breadcrumb from '../../../MainComponents/breadcrumb/Breadcrumb';
import Pagination from '../../../MainComponents/pagination/Pagination';
import AddSubproduct from './AddSubproduct';
import deleteLogo from '../../../../assets/Images/deleteLogo.png'

function Subproduct() {
    const [filters, setFilters] = useState({ searchText: '' });
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalType, setModalType] = useState('');
    const itemsPerPage = 10;

    // Dummy Data
    const trainingvideo = [
        { id: 1, product_name: 'Product A', Subproduct_name: 'Money1' },
        { id: 2, product_name: 'Product B', Subproduct_name: 'Money1' },
        { id: 3, product_name: 'Product C', Subproduct_name: 'Money1' },
        { id: 4, product_name: 'Product D', Subproduct_name: 'Money1' },
        { id: 5, product_name: 'Product E', Subproduct_name: 'Money1' },
        { id: 6, product_name: 'Product F', Subproduct_name: 'Money1' },
    ];

    // Filter logic
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFilters({ searchText: '' });
    };

    const filteredList = trainingvideo.filter(item =>
        item.product_name.toLowerCase().includes(filters.searchText.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentList = filteredList.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredList.length / itemsPerPage);

    const toggleCheckbox = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const toggleAllCheckboxes = () => {
        const ids = currentList.map(item => item.id);
        const allSelected = ids.every(id => selectedIds.includes(id));
        setSelectedIds(allSelected ? selectedIds.filter(id => !ids.includes(id)) : [...new Set([...selectedIds, ...ids])]);
    };

    return (
        <section className='main-content-area'>
            {/* Breadcrumb */}
            <Breadcrumb
                title="Sub Product"
                titleIcon="bx bxs-layer icon"
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
                                <FaPlus className="mr-1" /> Add Sub Product
                            </button>
                        ),
                    },
                    {
                        label: <>Total Sub Product: <span className="badge-length">{filteredList.length}</span></>,
                        className: "btn-bg-2",
                    },
                ]}
            />

            <div className={`slide-form-wrapper ${showForm ? 'show' : ''}`}>
                <AddSubproduct onClose={() => setShowForm(false)} />
            </div>
            <div className={`overlay ${showForm ? 'visible' : ''}`} onClick={() => setShowForm(false)}></div>

            <div className="row-bg mt-3">
                <div className="row align-items-center filterformpay flex-wrap">
                    <div className="col-lg-3 mb-2">
                        <label className="form-label mb-0">Search Sub Product</label>
                        <input
                            className="input-size form-control-search"
                            name="searchText"
                            value={filters.searchText}
                            onChange={handleInputChange}
                            placeholder="Search"
                        />
                    </div>
                    <div className="col-lg-3 mb-2">
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

                {/* Table Section */}
                <div className='table-data-area'>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped mb-2">
                            <thead className="table-thead-data-color">
                                <tr>
                                    <th>
                                        <input
                                            type="checkbox"
                                            onChange={toggleAllCheckboxes}
                                            checked={currentList.length > 0 && currentList.every(item => selectedIds.includes(item.id))}
                                        />
                                    </th>
                                    <th>S.no.</th>
                                    <th>Product</th>
                                    <th>Sub Product</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="table-tbody-data">
                                {currentList.length > 0 ? currentList.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(item.id)}
                                                onChange={() => toggleCheckbox(item.id)}
                                            />
                                        </td>
                                        <td>{indexOfFirstItem + index + 1}</td>
                                        <td>{item.product_name}</td>
                                        <td>{item.Subproduct_name}</td>
                                        <td>
                                            <Link
                                                to="#"
                                                className="text-dark me-3"
                                                data-bs-toggle="modal"
                                                data-bs-target="#productModal"
                                                onClick={() => {
                                                    setSelectedProduct(item);
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
                                                    setSelectedProduct(item);
                                                    setModalType('delete');
                                                }}
                                            >
                                                <FaTrash />
                                            </Link>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">No records found</td>
                                    </tr>
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

            {/* Edit Modal */}
            <div className="modal fade" id="productModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content" style={{ maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
                        <div className="modal-header sticky-top bg-white z-10">
                            <h5 className="modal-title">Edit Product</h5>
                            <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {selectedProduct && (
                            <form onSubmit={(e) => { e.preventDefault(); }} className="flex-grow-1 d-flex flex-column">
                                <div className="modal-body overflow-auto">
                                    <div className="add-company-form">
                                        <div className="row">
                                            <div className="col-12 mb-3">
                                                <label className="form-control-label">Product name</label>
                                                <input
                                                     className="input-size form-control-search"
                                                    type="text"
                                                    name="Product_name"
                                                    required
                                                    placeholder="Enter Product name"
                                                    defaultValue={selectedProduct.product_name}
                                                />
                                            </div>
                                            <div className="col-12 mb-3">
                                                <label className="form-control-label"> Sub Product name</label>
                                                <input
                                                     className="input-size form-control-search"
                                                    type="text"
                                                    name="subProduct_name"
                                                    required
                                                    placeholder="Enter Product name"
                                                    defaultValue={selectedProduct.Subproduct_name}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer sticky-bottom bg-white z-10">
                                    <button className="btn btn-primary btn-sm" type="submit" data-bs-dismiss="modal">Save</button>
                                    <button className="btn btn-sm custom-reset" type="button" data-bs-dismiss="modal">Cancel</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            <div className="modal fade" id="Deletestatusformlabe" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content d-flex flex-column" style={{ maxHeight: '90vh' }}>
                        <div className="modal-header sticky-top bg-white z-10">
                            <h5 className="modal-title">Delete Product</h5>
                            <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form className="flex-grow-1 d-flex flex-column">
                            <div className="modal-body text-center overflow-auto">
                                <img
                                    src={deleteLogo}
                                    alt="deleteLogo"
                                    className='deleteLogo'
                                />
                                <p className="fs-6">
                                    Are you sure you want to delete{' '}
                                    <strong>{selectedProduct?.product_name}</strong>?
                                </p>
                            </div>
                            <div className="modal-footer sticky-bottom bg-white z-10">
                                <button className="btn btn-danger btn-sm" type="submit" data-bs-dismiss="modal">Delete</button>
                                <button className="btn btn-sm custom-reset" type="button" data-bs-dismiss="modal">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Subproduct;
