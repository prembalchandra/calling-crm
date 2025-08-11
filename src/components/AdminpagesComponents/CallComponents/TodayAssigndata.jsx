import React, { useState } from 'react';
import Breadcrumb from '../../MainComponents/breadcrumb/Breadcrumb';
import Pagination from '../../MainComponents/pagination/Pagination';
import { Link } from 'react-router-dom';
// 🔹 Dummy employee data
const employees = [
    {
        id: 1,
        code: '24A14927',
        name: 'Amit Kumar',
        phone: '9876543210',
        product: 'Loan',
        source: 'Website',
        startCall: '10:00 AM',
        endCall: '10:15 AM',
        duration: '75',
        status: 'Completed',
        remark: 'Interested',
    },
    {
        id: 2,
        code: '24A14928',
        name: 'Ravi Singh',
        phone: '9876500000',
        product: 'Credit Card',
        source: 'Referral',
        startCall: '11:00 AM',
        endCall: '11:05 AM',
        duration: '5',
        status: 'Pending',
        remark: 'Call back',
    },
    {
        id: 3,
        code: '24A14929',
        name: 'Neha Sharma',
        phone: '9876512345',
        product: 'Insurance',
        source: 'Campaign',
        startCall: '12:00 PM',
        endCall: '12:20 PM',
        duration: '20',
        status: 'Completed',
        remark: 'Confirmed',
    }
];

function TodayAssigndata() {
    const [filters, setFilters] = useState({ searchText: '', product: '' });
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFilters({ searchText: '', product: '' });
        setCurrentPage(1);
    };

    const formatDuration = (minutesString) => {
        const totalMinutes = parseInt(minutesString);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        const hourPart = hours > 0 ? `${hours} ghanta${hours > 1 ? 'e' : ''}` : '';
        const minutePart = minutes > 0 ? `${minutes} min` : '';

        return `${hourPart} ${minutePart}`.trim();
    };

    const filteredEmployees = employees.filter(emp =>
        (emp.name.toLowerCase().includes(filters.searchText.toLowerCase()) ||
            emp.phone.includes(filters.searchText)) &&
        emp.product.toLowerCase().includes(filters.product.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

    const toggleCheckbox = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const toggleAllCheckboxes = () => {
        const currentPageIds = currentEmployees.map(emp => emp.id);
        const allSelected = currentPageIds.every(id => selectedIds.includes(id));
        setSelectedIds(prev =>
            allSelected
                ? prev.filter(id => !currentPageIds.includes(id))
                : [...new Set([...prev, ...currentPageIds])]
        );
    };

    return (
        <section className='main-content-area'>
            <Breadcrumb
                title="Today Assign Data"
                titleIcon="bx bxs-data"
                buttons={[
                    {
                        label: (
                            <Link to="/admin/call-log">
                                <button type="button" className="addTaskBtn">
                                    <i className="bx bx-arrow-back"></i> Back
                                </button>
                            </Link>
                        )
                    },
                    {
                        label: <>Total Calls: <span className="badge-length">{filteredEmployees.length}</span></>,
                        className: "btn-bg-2",
                    },
                    {
                        label: <>Total Min: <span className="badge-length">{filteredEmployees.reduce((sum, emp) => sum + parseInt(emp.duration), 0)}</span></>,
                        className: "btn-bg-2",
                    },
                ]}
            />

            <div className="row-bg mt-3">
                <div className="row align-items-center filterformpay flex-wrap">
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-1">
                        <div className='employee-search-area-box'>
                            <label className="form-label mb-0">Name or Phone</label>
                            <input className="input-size form-control-search" name="searchText" value={filters.searchText} onChange={handleInputChange} placeholder="Search" />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-1">
                        <div className='employee-search-area-box'>
                            <label className="form-label mb-0">Product</label>
                            <input className="input-size form-control-search" name="product" value={filters.product} onChange={handleInputChange} placeholder="Search Product" />
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
                                    <th><input type="checkbox" onChange={toggleAllCheckboxes} checked={currentEmployees.every(emp => selectedIds.includes(emp.id))} /></th>
                                    <th>S.No.</th>
                                    <th>Lead ID</th>
                                    <th>Customer Name</th>
                                    <th>Phone Number</th>
                                    <th>Product</th>
                                    <th>Source</th>
                                    <th>Start Call</th>
                                    <th>End Call</th>
                                    <th>Duration</th>
                                    <th>Status</th>
                                    <th>Remark</th>
                                </tr>
                            </thead>
                            <tbody className='table-tbody-data'>
                                {currentEmployees.length > 0 ? currentEmployees.map((emp, index) => (
                                    <tr key={emp.id}>
                                        <td><input type="checkbox" checked={selectedIds.includes(emp.id)} onChange={() => toggleCheckbox(emp.id)} /></td>
                                        <td>{indexOfFirstItem + index + 1}</td>
                                        <td>{emp.code}</td>
                                        <td>{emp.name}</td>
                                        <td>{emp.phone}</td>
                                        <td>{emp.product}</td>
                                        <td>{emp.source}</td>
                                        <td>{emp.startCall}</td>
                                        <td>{emp.endCall}</td>
                                        <td>{formatDuration(emp.duration)}</td>
                                        <td>
                                            <span className={`badge px-2 py-1 rounded-pill text-white ${emp.status === 'Completed' ? 'bg-success' : emp.status === 'Pending' ? 'bg-warning text-dark' : emp.status === 'In Progress' ? 'bg-primary' : 'bg-secondary'}`}>
                                                {emp.status}
                                            </span>
                                        </td>
                                        <td>{emp.remark}</td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="14" className="text-center">No records found</td></tr>
                                )}
                            </tbody>
                        </table>
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TodayAssigndata;
