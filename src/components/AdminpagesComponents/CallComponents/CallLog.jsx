import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Breadcrumb from '../../MainComponents/breadcrumb/Breadcrumb';
import Pagination from '../../MainComponents/pagination/Pagination';

function CallLog() {
    const [filters, setFilters] = useState({
        name: '',
        phonenumber: '',
    });

    const [employees, setEmployees] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    useEffect(() => {
        fetchData();
    }, [filters, currentPage]);

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/call-log', {
                params: {
                    searchText: filters.name,           // ✅ matches backend
                    phonenumber: filters.phonenumber,   // ✅ matches backend
                    page: currentPage,
                    limit: itemsPerPage
                }
            });

            const data = res.data?.data || [];
            const total = res.data?.totalPages || 1;
            const count = res.data?.count || 0;

            setEmployees(data);
            setTotalPages(total);
            setTotalCount(count);
        } catch (error) {
            console.error("Error fetching data", error);
            setEmployees([]);
            setTotalPages(1);
            setTotalCount(0);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        setCurrentPage(1);
    };

    const handleReset = () => {
        setFilters({ name: '', phonenumber: '' });
        setCurrentPage(1);
        setSelectedIds([]);
    };

    return (
        <section className="main-content-area">
            <Breadcrumb
                title="Call Log"
                titleIcon="bx bxs-phone-incoming"
                buttons={[
                    {
                        label: <>Total Call Log: <span className="badge-length">{totalCount}</span></>,
                        className: "btn-bg-2",
                    }
                ]}
            />

            <div className="row-bg mt-3">
                <div className="row align-items-center filterformpay flex-wrap">
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-1">
                        <div className='employee-search-area-box'>
                        <label className="form-label mb-0">Name</label>
                        <input
                            className="input-size form-control-search"
                            name="name"
                            value={filters.name}
                            onChange={handleInputChange}
                            placeholder="Type name"
                        />
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-1">
                          <div className='employee-search-area-box'>
                        <label className="form-label mb-0">Phone Number</label>
                        <input
                            className="input-size form-control-search"
                            name="phonenumber"
                            value={filters.phonenumber}
                            onChange={handleInputChange}
                            placeholder="Enter phone number"
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

                <div className="table-data-area">
                    <div className="overflow-x-auto table-responsive table-size">
                        <table className="table table-bordered table-striped mb-2">
                            <thead className="table-thead-data-color">
                                <tr>
                                    
                                    <th>S.no.</th>
                                    <th>Employee Code</th>
                                    <th>Employee Name</th>
                                    <th>My Team</th>
                                    <th>Phone Number</th>
                                    <th>Total Assign Data</th>
                                    <th>Today Assign Data</th>
                                    <th>Available Data</th>
                                    <th>Today Call</th>
                                    <th>Total Call</th>
                                    <th>Today Minutes</th>
                                    <th>Total Minutes</th>
                                </tr>
                            </thead>
                            <tbody className="table-tbody-data">
                                {employees.length > 0 ? (
                                    employees.map((emp, index) => (
                                        <tr key={emp.id}>
                                            
                                            <td>{indexOfFirstItem + index + 1}</td>
                                            <td>{emp.code}</td>
                                            <td>
                                                <Link to={`/admin/Employerprofile?emp=${emp.name}`} className="text-primary">
                                                    {emp.name}
                                                </Link>
                                            </td>
                                            <td>{emp.team || '—'}</td>
                                            <td>{emp.mobile}</td>
                                            <td>{emp.totalAssignData || 0}</td>
                                            <td>
                                                <Link to={`/admin/TodayAssigndata?user_id=${emp.id}`} className="text-primary">
                                                    {emp.todayAssignData || 0} Task
                                                </Link>
                                            </td>
                                            <td>{emp.availableData || 0}</td>
                                            <td>
                                                <Link to={`/admin/CallLogemployee?user_id=${emp.id}`} className="text-primary">
                                                    {emp.calls || 0}
                                                </Link>
                                            </td>
                                            <td>{emp.total_calls || 0}</td>
                                            <td>{emp.today_minutes || 0}</td>
                                            <td>{emp.total_minutes || 0}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="13" className="text-center">No records found</td>
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

export default CallLog;
