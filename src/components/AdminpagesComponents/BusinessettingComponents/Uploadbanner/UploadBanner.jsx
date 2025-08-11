// components/pages/training/UploadBanner.js

import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaUpload } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Breadcrumb from '../../../MainComponents/breadcrumb/Breadcrumb';
import Pagination from '../../../MainComponents/pagination/Pagination';
import AddBanner from './AddBanner';
import deleteLogo from '../../../../assets/Images/deleteLogo.png'

function UploadBanner() {
    const [filters, setFilters] = useState({ searchText: '' });
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalType, setModalType] = useState('');
    const [formData, setFormData] = useState({
        product_name: '',
        subProduct_name: '',
        date: '',
        banner_file: null,
    });
    const [previewUrl, setPreviewUrl] = useState('');

    const itemsPerPage = 10;

    const trainingvideo = [
        { id: 1, product_name: 'Product A', UploadBanner_name: 'Money1', date: '2024-06-01', banner_url: '/assets/images/swift-dial-logo.png' },
        { id: 2, product_name: 'Product B', UploadBanner_name: 'Money2', date: '2024-06-02', banner_url: '/assets/images/swift-dial-logo.png' },
        { id: 3, product_name: 'Product C', UploadBanner_name: 'Money3', date: '2024-06-03', banner_url: '/assets/images/swift-dial-logo.png' },
        { id: 4, product_name: 'Product D', UploadBanner_name: 'Money4', date: '2024-06-04', banner_url: '/assets/images/swift-dial-logo.png' },
        { id: 5, product_name: 'Product E', UploadBanner_name: 'Money5', date: '2024-06-05', banner_url: '/assets/images/swift-dial-logo.png' },
        { id: 6, product_name: 'Product F', UploadBanner_name: 'Money6', date: '2024-06-06', banner_url: '/assets/images/swift-dial-logo.png' },
    ];

    useEffect(() => {
        if (selectedProduct && modalType === 'edit') {
            setFormData({
                product_name: selectedProduct.product_name,
                subProduct_name: selectedProduct.UploadBanner_name,
                date: selectedProduct.date,
                banner_file: null,
            });
            setPreviewUrl(selectedProduct.banner_url);
        }
    }, [selectedProduct, modalType]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, banner_file: file }));
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        console.log('Saving product:', formData);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        console.log('Deleting:', selectedProduct);
    };

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
            <Breadcrumb
                title="Upload Banner"
                titleIcon="bx bx-upload"
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
                                <FaPlus className="mr-1" /> Add Banner
                            </button>
                        ),
                    },
                    {
                        label: <>Total Upload Banner: <span className="badge-length">{filteredList.length}</span></>,
                        className: "btn-bg-2",
                    },
                ]}
            />

            <div className={`slide-form-wrapper ${showForm ? 'show' : ''}`}>
                <AddBanner onClose={() => setShowForm(false)} />
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
                                    <th>Date</th>
                                    <th>Product</th>
                                    <th>Sub Product</th>
                                    <th>Banner</th>
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
                                        <td>{item.date}</td>
                                        <td>{item.product_name}</td>
                                        <td>{item.UploadBanner_name}</td>
                                        <td>
                                            <img src={item.banner_url} alt="Banner" width="60" />
                                        </td>
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
                                        <td colSpan="7" className="text-center">No records found</td>
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
                    <div className="modal-content">
                        <div className="modal-header bg-white z-10">
                            <h5 className="modal-title">Edit Product</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form onSubmit={handleSave}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label>Product name</label>
                                    <input type="text" name="product_name" className="form-control" value={formData.product_name} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label>Sub Product name</label>
                                    <input type="text" name="subProduct_name" className="form-control" value={formData.subProduct_name} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label>Date</label>
                                    <input type="date" name="date" className="form-control" value={formData.date} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label>Upload Banner</label>
                                    <div className="border p-4 bg-light position-relative text-center rounded" style={{ cursor: 'pointer' }}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            style={{
                                                position: 'absolute',
                                                opacity: 0,
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%'
                                            }}
                                        />
                                        <FaUpload size={20} className="mb-2" />
                                        <div>Upload file max 25px</div>
                                        <div className="text-muted">Choose or drop file</div>
                                    </div>
                                    {previewUrl && (
                                        <div className="mt-3">
                                            <label className="form-label d-block">Preview:</label>
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                style={{ maxWidth: '150px', borderRadius: '8px', border: '1px solid #ddd' }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="modal-footer bg-white z-10">
                                <button type="submit" className="btn btn-primary btn-sm" data-bs-dismiss="modal">Save</button>
                                <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            <div className="modal fade" id="Deletestatusformlabe" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header bg-white z-10">
                            <h5 className="modal-title">Delete Product</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form onSubmit={handleDelete}>
                            <div className="text-center modal-body">
                                <img
                                    src={deleteLogo}
                                    alt="deleteLogo"
                                    className='deleteLogo'
                                   
                                />
                                <p>Are you sure you want to delete <strong>{selectedProduct?.product_name}</strong>?</p>
                            </div>
                            <div className="modal-footer bg-white z-10">
                                <button type="submit" className="btn btn-danger btn-sm" data-bs-dismiss="modal">Delete</button>
                                <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UploadBanner;
