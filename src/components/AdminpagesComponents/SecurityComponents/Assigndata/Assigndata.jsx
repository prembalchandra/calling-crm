import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import Breadcrumb from '../../../MainComponents/breadcrumb/Breadcrumb';
import Pagination from '../../../MainComponents/pagination/Pagination';
import AddassignDatafrom from './AddassignDatafrom';

const importDataList = [
    { id: 1, emp_name: 'Amana Kumar', emp_code: '7362597', emp_phonenumber: "57634765345", product_name: 'Personal Loan', schedular_name: 'Scheduler A' },
    { id: 2, emp_name: 'Amana Kumar', emp_code: '7362597', emp_phonenumber: "57634765345", product_name: 'Home Loan', schedular_name: 'Scheduler B' },
    { id: 3, emp_name: 'Amana Kumar', emp_code: '7362597', emp_phonenumber: "57634765345", product_name: 'Car Loan', schedular_name: 'Scheduler C' },
    { id: 4, emp_name: 'Amana Kumar', emp_code: '7362597', emp_phonenumber: "57634765345", product_name: 'Education Loan', schedular_name: 'Scheduler D' },
    { id: 5, emp_name: 'Amana Kumar', emp_code: '7362597', emp_phonenumber: "57634765345", product_name: 'Gold Loan', schedular_name: 'Scheduler E' },
    { id: 6, emp_name: 'Amana Kumar', emp_code: '7362597', emp_phonenumber: "57634765345", product_name: 'Business Loan', schedular_name: 'Scheduler F' },
    { id: 7, emp_name: 'Amana Kumar', emp_code: '7362597', emp_phonenumber: "57634765345", product_name: 'Personal Loan', schedular_name: 'Scheduler G' },
];

function Assigndata() {
    const [filters, setFilters] = useState({ searchText: '' });
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [modalData, setModalData] = useState(null);
    const itemsPerPage = 10;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFilters({ searchText: '' });
        setCurrentPage(1);
    };

    const filteredData = importDataList.filter(item =>
        item.product_name.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        item.schedular_name.toLowerCase().includes(filters.searchText.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const toggleCheckbox = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const toggleAllCheckboxes = () => {
        const currentIds = currentItems.map(item => item.id);
        const allSelected = currentIds.every(id => selectedIds.includes(id));
        setSelectedIds(allSelected ? selectedIds.filter(id => !currentIds.includes(id)) : [...new Set([...selectedIds, ...currentIds])]);
    };

    const handleModalData = (item) => {
        setModalData(item);
    };

    return (
        <section className='main-content-area'>
            <Breadcrumb
                title="Assign Data"
                titleIcon="bx bx-task"
                buttons={[
                    {
                        label: (
                            <Link to="/admin/ImportData">
                                <button type="button" className="addTaskBtn">
                                    <i className="bx bx-arrow-back"></i> Back
                                </button>
                            </Link>
                        ),
                    },
                    {
                        label: (
                            <button className="addTaskBtn" onClick={() => setShowForm(true)}>
                                <FaPlus className="mr-1" /> Add Schedule Data
                            </button>
                        )
                    },
                    {
                        label: <>Total Records: <span className="badge-length">{filteredData.length}</span></>,
                        className: "btn-bg-2",
                    },
                ]}
            />

            {/* Slide Form */}
            <div className={`slide-form-wrapper ${showForm ? 'show' : ''}`}>
                <AddassignDatafrom onClose={() => setShowForm(false)} />
            </div>
            <div className={`overlay ${showForm ? 'visible' : ''}`} onClick={() => setShowForm(false)}></div>

            {/* Filter & Table */}
            <div className="row-bg mt-3">
                <div className="row align-items-center filterformpay flex-wrap">
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-1">
                        <div className='employee-search-area-box'>
                            <label className="form-label mb-0">Search Product or Scheduler</label>
                            <input
                                className="input-size form-control-search"
                                name="searchText"
                                value={filters.searchText}
                                onChange={handleInputChange}
                                placeholder="Search"
                            />
                        </div>
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

                <div className='table-data-area mt-3'>
                    <div className="overflow-x-auto table-responsive table-size table-data-area">
                        <table className="table table-bordered table-striped mb-2">
                            <thead className='table-thead-data-color'>
                                <tr>
                                    <th><input type="checkbox" onChange={toggleAllCheckboxes} checked={currentItems.length > 0 && currentItems.every(item => selectedIds.includes(item.id))} /></th>
                                    <th>S.No.</th>
                                    <th>Employee Name</th>
                                    <th>Employee Code</th>
                                    <th>Mobile Number</th>
                                    <th>Assigned Product</th>
                                    <th>Assigned Sub-Product</th>
                                    <th>Source</th>
                                </tr>
                            </thead>
                            <tbody className='table-tbody-data'>
                                {currentItems.length > 0 ? (
                                    currentItems.map((item, index) => (
                                        <tr key={item.id}>
                                            <td><input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => toggleCheckbox(item.id)} /></td>
                                            <td>{indexOfFirstItem + index + 1}</td>
                                            <td>{item.emp_name}</td>
                                            <td>{item.emp_code}</td>
                                            <td>{item.emp_phonenumber}</td>
                                            <td>{item.product_name}</td>
                                            <td><Link to="#" data-bs-toggle="modal" data-bs-target="#detailsProductModal" onClick={() => handleModalData(item)}>Sub-{item.id}</Link></td>
                                            <td><Link to="#" data-bs-toggle="modal" data-bs-target="#detailsSourceModal" onClick={() => handleModalData(item)}>{item.schedular_name}</Link></td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center">No records found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    </div>
                </div>
            </div>

            {/* Sub-Product Modal */}
            <div className="modal fade" id="detailsProductModal" tabIndex="-1" aria-labelledby="detailsProductModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content" style={{ maxHeight: '90vh' }}>
                        <div className="modal-header">
                            <h5 className="modal-title">Assigned Sub-Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Sub-Product</th>
                                        <th className="text-center">Active</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {['Sub-Product 1', 'Sub-Product 2', 'Sub-Product 3'].map((label, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{label}</td>
                                            <td className="text-center"><input type="checkbox" defaultChecked /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-danger btn-sm" type="button" data-bs-dismiss="modal">Save</button>
                            <button className="btn btn-sm custom-reset" type="button" data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Source Modal */}
            <div className="modal fade" id="detailsSourceModal" tabIndex="-1" aria-labelledby="detailsSourceModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content" style={{ maxHeight: '90vh' }}>
                        <div className="modal-header">
                            <h5 className="modal-title">Schedule Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Data Type</th>
                                        <th className="text-center">Active</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {['Web', '3rd Party', 'Assign Data', 'Call Back Data', 'Old Data'].map((label, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{label}</td>
                                            <td className="text-center"><input type="checkbox" defaultChecked /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-danger btn-sm" type="button" data-bs-dismiss="modal">Save</button>
                            <button className="btn btn-sm custom-reset" type="button" data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Assigndata;
