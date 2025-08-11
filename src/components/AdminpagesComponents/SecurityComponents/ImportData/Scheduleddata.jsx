import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import Breadcrumb from '../../../MainComponents/breadcrumb/Breadcrumb';
import Pagination from '../../../MainComponents/pagination/Pagination';
import AddScheduleData from './AddScheduleData';

const importDataList = [
    {
        id: 1,
        product_name: 'Home Loan',
        schedular_name: 'Loan Scheduler',
        data_name: 'Home Loan Leads',
        start_date: '2025-06-01',
        end_date: '2025-06-10',
        start_time: '10:00 AM',
        end_time: '06:00 PM',
        created_date: '2025-06-12'
    },
    {
        id: 2,
        product_name: 'Health Insurance',
        schedular_name: 'Insurance Scheduler',
        data_name: 'Policy Leads',
        start_date: '2025-06-02',
        end_date: '2025-06-11',
        start_time: '09:30 AM',
        end_time: '05:30 PM',
        created_date: '2025-06-12'
    },
    {
        id: 3,
        product_name: 'Personal Loan',
        schedular_name: 'Finance Scheduler',
        data_name: 'PL Leads',
        start_date: '2025-06-03',
        end_date: '2025-06-12',
        start_time: '11:00 AM',
        end_time: '07:00 PM',
        created_date: '2025-06-12'
    }
];

function ImportdataView() {
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

    return (
        <section className='main-content-area'>
            <Breadcrumb
                title="Scheduled Data"
                titleIcon="bx bx-alarm"
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

            {/* Form Slide Over */}
            <div className={`slide-form-wrapper ${showForm ? 'show' : ''}`}>
                <AddScheduleData onClose={() => setShowForm(false)} />
            </div>
            <div className={`overlay ${showForm ? 'visible' : ''}`} onClick={() => setShowForm(false)}></div>

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
                                    <th>
                                        <input
                                            type="checkbox"
                                            onChange={toggleAllCheckboxes}
                                            checked={
                                                currentItems.length > 0 &&
                                                currentItems.every(item => selectedIds.includes(item.id))
                                            }
                                        />
                                    </th>
                                    <th>S.No.</th>
                                    <th>Product Name</th>
                                    <th>Schedular Name</th>
                                    <th>Data Name</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Created Date</th>
                                </tr>
                            </thead>
                            <tbody className='table-tbody-data'>
                                {currentItems.length > 0 ? (
                                    currentItems.map((item, index) => (
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
                                            <td>{item.schedular_name}</td>
                                            <td>{item.data_name}</td>
                                            <td>{item.start_date}</td>
                                            <td>{item.end_date}</td>
                                            <td>{item.start_time}</td>
                                            <td>{item.end_time}</td>
                                            <td>{item.created_date}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="11" className="text-center">No records found</td>
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

export default ImportdataView;
