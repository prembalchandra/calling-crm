// components/pages/training/ImportData.js

import React, { useState } from 'react';
import { FaEye, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../../MainComponents/breadcrumb/Breadcrumb';
import Pagination from '../../../MainComponents/pagination/Pagination';
import AddImportData from './AddImportData';


const importdata = [
    {
        id: 1,
        Product_name: 'Loan',
        subProduct_name: 'Home Loan',
        total: 100,
        used: 60,
        unused: 40
    },
    {
        id: 2,
        Product_name: 'Insurance',
        subProduct_name: 'Health Insurance',
        total: 120,
        used: 80,
        unused: 40
    },
    {
        id: 3,
        Product_name: 'Finance',
        subProduct_name: 'Personal Loan',
        total: 90,
        used: 50,
        unused: 40
    }
];

function ImportData() {
    const [filters, setFilters] = useState({ searchText: '' });
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const itemsPerPage = 10;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFilters({ searchText: '' });
    };

    const filteredImportData = importdata.filter(emp =>
        emp.Product_name.toLowerCase().includes(filters.searchText.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentImportData = filteredImportData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredImportData.length / itemsPerPage);

    const toggleCheckbox = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const toggleAllCheckboxes = () => {
        const currentPageIds = currentImportData.map(emp => emp.id);
        const allSelected = currentPageIds.every(id => selectedIds.includes(id));
        setSelectedIds(prev =>
            allSelected ? prev.filter(id => !currentPageIds.includes(id)) : [...new Set([...prev, ...currentPageIds])]
        );
    };

    return (
        <section className='main-content-area'>
            <Breadcrumb
                title="Import Data"
                titleIcon="bx bx-import"
                buttons={[
                    {
                        label: (
                            <Link to="/admin/Security">
                                <button type="button" className="addTaskBtn">
                                    <i className="bx bx-arrow-back"></i> Back
                                </button>
                            </Link>
                        ),
                    },
                    {
                        label: (
                            <button className="addTaskBtn" onClick={() => setShowForm(true)}>
                                <FaPlus className="mr-1" /> Add Data
                            </button>
                        )
                    },
                    {
                        label: <>Total Data : <span className="badge-length">{filteredImportData.length}</span></>,
                        className: "btn-bg-2",
                    },
                ]}
            />

            {/* Slide-In Form */}
            <div className={`slide-form-wrapper ${showForm ? 'show' : ''}`}>
                <AddImportData onClose={() => setShowForm(false)} />
            </div>
            <div className={`overlay ${showForm ? 'visible' : ''}`} onClick={() => setShowForm(false)}></div>

            <div className="row-bg mt-3">
                <div className="row align-items-center filterformpay flex-wrap">
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-1">
                        <div className='employee-search-area-box'>
                            <label className="form-label mb-0">Product Name</label>
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

                <div className='table-data-area'>
                    <div className="overflow-x-auto table-responsive table-size table-data-area">
                        <table className="table table-bordered table-striped mb-2">
                            <thead className='table-thead-data-color'>
                                <tr>
                                    <th>
                                        <input
                                            type="checkbox"
                                            onChange={toggleAllCheckboxes}
                                            checked={
                                                currentImportData.length > 0 &&
                                                currentImportData.every(emp => selectedIds.includes(emp.id))
                                            }
                                        />
                                    </th>
                                    <th>S.No.</th>
                                    <th>Product</th>
                                    <th>Sub-Product</th>
                                    <th>Total Data</th>
                                    <th>Used</th>
                                    <th>Unused</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className='table-tbody-data'>
                                {currentImportData.length > 0 ? (
                                    currentImportData.map((emp, index) => (
                                        <tr key={emp.id}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(emp.id)}
                                                    onChange={() => toggleCheckbox(emp.id)}
                                                />
                                            </td>
                                            <td>{indexOfFirstItem + index + 1}</td>
                                            <td>{emp.Product_name}</td>
                                            <td>{emp.subProduct_name}</td>
                                            <td>{emp.total}</td>
                                            <td>{emp.used}</td>
                                            <td>{emp.unused}</td>
                                            <td>
                                                <div className='d-flex align-items-center justify-content-center gap-2'>
                                                    <Link to={`/ImportdataView?user_id=${emp.id}`} className="text-dark me-2" title='Import Data View'>
                                                        <FaEye />
                                                    </Link>
                                                    
                                                    <Link to={`/Scheduleddata?user_id=${emp.id}`} className="text-dark" title='Scheduled Data'>
                                                        <span className='bx bx-calendar'></span>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center">No records found</td>
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
        </section>
    );
}

export default ImportData;
