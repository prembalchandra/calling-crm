// components/pages/training/ImprotdataView.js

import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../../MainComponents/breadcrumb/Breadcrumb';
import Pagination from '../../../MainComponents/pagination/Pagination';

const importdataview = [
    {
        id: 1,
        importer_name: 'Loan',
        imported_data: 'Home Loan',
        date: '12/05/2025',
        total: 100,
        used: 60,
        unused: 40
    },
    {
        id: 2,
        importer_name: 'Insurance',
        imported_data: 'Health Insurance',
        date: '12/05/2025',
        total: 120,
        used: 80,
        unused: 40
    },
    {
        id: 3,
        importer_name: 'Finance',
        imported_data: 'Personal Loan',
        date: '12/05/2025',
        total: 90,
        used: 50,
        unused: 40
    }
];

function ImprotdataView() {
    const [filters, setFilters] = useState({ searchText: '' });
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFilters({ searchText: '' });
    };

    const filteredImprotdataView = importdataview.filter(emp =>
        (emp.imported_data?.toLowerCase() || '').includes(filters.searchText.toLowerCase()) ||
        (emp.importer_name?.toLowerCase() || '').includes(filters.searchText.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentImprotdataView = filteredImprotdataView.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredImprotdataView.length / itemsPerPage);

    const toggleCheckbox = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const toggleAllCheckboxes = () => {
        const currentPageIds = currentImprotdataView.map(emp => emp.id);
        const allSelected = currentPageIds.every(id => selectedIds.includes(id));
        setSelectedIds(prev =>
            allSelected ? prev.filter(id => !currentPageIds.includes(id)) : [...new Set([...prev, ...currentPageIds])]
        );
    };

    return (
        <section className='main-content-area'>
            <Breadcrumb
                title="Import Data View"
                titleIcon="bx bx-import"
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
                        label: <>Import Data View: <span className="badge-length">{filteredImprotdataView.length}</span></>,
                        className: "btn-bg-2",
                    },
                ]}
            />

            <div className="row-bg mt-3">
                <div className="row align-items-center filterformpay flex-wrap">
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-1">
                        <div className='employee-search-area-box'>
                            <label className="form-label mb-0">Search Product or Importer</label>
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
                                                currentImprotdataView.length > 0 &&
                                                currentImprotdataView.every(emp => selectedIds.includes(emp.id))
                                            }
                                        />
                                    </th>
                                    <th>S.No.</th>
                                    <th>Importer Name</th>
                                    <th>Imported Data</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Used</th>
                                    <th>Unused</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className='table-tbody-data'>
                                {currentImprotdataView.length > 0 ? (
                                    currentImprotdataView.map((emp, index) => (
                                        <tr key={emp.id}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(emp.id)}
                                                    onChange={() => toggleCheckbox(emp.id)}
                                                />
                                            </td>
                                            <td>{indexOfFirstItem + index + 1}</td>
                                            <td>{emp.importer_name}</td>
                                            <td>{emp.imported_data}</td>
                                            <td>{emp.date}</td>
                                            <td>{emp.total}</td>
                                            <td>{emp.used}</td>
                                            <td>{emp.unused}</td>
                                            <td>
                                                <div className='d-flex align-items-center justify-content-center gap-2'>
                                                    <Link to={`/edit/${emp.id}`} className="text-dark me-2" title='Import Data View'>
                                                        <FaEye />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="text-center">No records found</td>
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

export default ImprotdataView;
