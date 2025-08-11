import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Breadcrumb from '../../MainComponents/breadcrumb/Breadcrumb';
import Pagination from '../../MainComponents/pagination/Pagination';

function Employeeteam() {
    const [filters, setFilters] = useState({ searchText: '' });
    const [employees, setEmployees] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const location = useLocation();
    const userIdFromQuery = new URLSearchParams(location.search).get('user_id');

    useEffect(() => {
        fetchEmployees();
    }, [filters.searchText, userIdFromQuery]);

    const fetchEmployees = async () => {
        try {
            const params = new URLSearchParams({
                user_id: userIdFromQuery,
                search: filters.searchText,
            });

            const res = await axios.get(`/teams/employeetesms?${params.toString()}`);
            setEmployees(res.data);
            console.log('Employee Data:', res.data);
        } catch (err) {
            console.error('API Error:', err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFilters({ searchText: '' });
        setCurrentPage(1);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEmployees = employees.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(employees.length / itemsPerPage);

    const toggleCheckbox = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    return (
        <section className='main-content-area'>
            <Breadcrumb
                title="Employee Team"
                titleIcon="bx bx-group"
                buttons={[
                    {
                        label: (
                            <Link to="/admin/Team">
                                <button type="button" className="addTaskBtn">
                                    <i className="bx bx-arrow-back"></i> Back
                                </button>
                            </Link>
                        )
                    },
                    {
                        label: <>Total Employee Team: <span className="badge-length">{employees.length}</span></>,
                        className: "btn-bg-2",
                    },
                ]}
            />

            <div className="row-bg mt-3">
                <div className="row align-items-center filterformpay flex-wrap">
                    <div className="col-lg-3 mb-2">
                        <label className="form-label mb-0">Name/ Phone Number</label>
                        <input
                            className="form-control-search"
                            name="searchText"
                            value={filters.searchText}
                            onChange={handleInputChange}
                            placeholder="Search"
                        />
                    </div>
                    <div className="col-lg-3 mb-2 d-flex gap-3 mt-4">
                        <button className="btn btn-primary btn-sm" onClick={() => setCurrentPage(1)}>
                            <i className="bx bx-filter-alt"></i> Filter
                        </button>
                        <button className="btn btn-sm custom-reset" onClick={handleReset}>
                            <i className="bx bx-reset"></i> Reset
                        </button>
                    </div>
                </div>

                <div className='table-data-area'>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped mb-2">
                            <thead className='table-thead-data-color'>
                                <tr>
                                    <th>S.no.</th>
                                    <th>Employee Code</th>
                                    <th>Employee Name</th>
                                    <th>Phone Number</th>
                                    <th>Total Assign Data</th>
                                    <th>Today Assign Data</th>
                                    <th>Available Data</th>
                                    <th>Today Call</th>
                                    <th>Total Call</th>
                                    <th>Today Minutes</th>
                                    <th>Total Minutes</th>
                                    <th>Refresh Data</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentEmployees.length > 0 ? currentEmployees.map((emp, index) => (
                                    <tr key={emp.id}>
                                        <td>{indexOfFirstItem + index + 1}</td>
                                        <td>{emp.code}</td>
                                        <td>
                                            <Link to={`/admin/Employerprofile?emp=${emp.name}`} className="text-primary">
                                                {emp.name}
                                            </Link>
                                        </td>
                                        <td>{emp.phone}</td>
                                        <td>50</td>
                                        <td>50 Task</td>
                                        <td>Data</td>
                                        <td>30 Calls</td>
                                        <td>{emp.calls}</td>
                                        <td>10 Mins</td>
                                        <td>{emp.minutes}</td>
                                        <td>40</td>
                                        <td>
                                            <span className="table-status-btn">Active</span>
                                        </td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(emp.id)}
                                                onChange={() => toggleCheckbox(emp.id)}
                                            />
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="14" className="text-center">No records found</td>
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

export default Employeeteam;
