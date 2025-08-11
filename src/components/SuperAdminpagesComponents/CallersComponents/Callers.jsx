import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../MainComponents/breadcrumb/Breadcrumb';
import Pagination from '../../MainComponents/pagination/Pagination';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Callers() {
    const [filters, setFilters] = useState({
        searchText: '',
        industry: '',
    });

    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchData();
    }, [filters, currentPage]);

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/callers', {
                params: {
                    searchText: filters.searchText,
                    industry: filters.industry,
                    page: currentPage,
                    limit: itemsPerPage
                }
            });
            setEmployees(res.data.data);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.error("Error fetching data", error);
            notifyError();
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFilters({
            searchText: '',
            industry: '',
        });
        setCurrentPage(1);
    };

    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;

    const toggleCheckbox = (id) => {
        setEmployees(prevEmployees =>
            prevEmployees.map(emp =>
                emp.id === id
                    ? {
                        ...emp,
                        status: emp.status === 'Active' ? 'Inactive' : 'Active'
                    }
                    : emp
            )
        );

        const updatedEmp = employees.find(emp => emp.id === id);
        if (updatedEmp?.status === 'Active') {
            notifyError(); // Was Active, turning OFF
        } else {
            notifySuccess(); // Was Inactive, turning ON
        }
    };

    const notifySuccess = () => {
        toast.success('Status: Active ✅', {
            position: "top-right",
            autoClose: 3000,
        });
    };

    const notifyError = () => {
        toast.error('Status: Inactive ❌', {
            position: "top-right",
            autoClose: 3000,
        });
    };

    return (
        <section className='main-content-area'>
            <Breadcrumb
                title="Callers"
                titleIcon="bx bx-phone-outgoing me-2"
                buttons={[
                    {
                        label: <>Total Callers: <span className="badge-length">{employees.length}</span></>,
                        className: "btn-bg-2",
                    },
                ]}
            />

            <div className="row-bg mt-3">
                <div className="row align-items-center filterformpay flex-wrap">
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-1">
                        <div className="employee-search-area-box">
                            <label className="form-label mb-0">Search Name / Phone</label>
                            <input
                                type="text"
                                name="searchText"
                                value={filters.searchText}
                                onChange={handleInputChange}
                                placeholder="Search"
                                className="input-size form-control-search"
                            />
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-12 mb-1">
                        <div className="employee-search-area-box">
                            <label className="form-label mb-0">Search Industry</label>
                            <input
                                type="text"
                                name="industry"
                                value={filters.industry}
                                onChange={handleInputChange}
                                placeholder="Search Industry"
                                className="input-size form-control-search"
                            />
                        </div>
                    </div>

                    <div className="col-lg-3 mb-1 d-flex align-items-end gap-2">
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

                <div className="table-data-area mt-3">
                    <div className="table-responsive table-size">
                        <table className="table table-bordered table-striped">
                            <thead className="table-thead-data-color">
                                <tr>
                                    <th>S.No.</th>
                                    <th>Employee Code</th>
                                    <th>Employee Name</th>
                                    <th>Mobile Number</th>
                                    <th>Company Name</th>
                                    <th>Industry Name</th>
                                    <th>Verticals</th>
                                    <th>Address</th>
                                    <th>My Team</th>
                                    <th>Today Call</th>
                                    <th>Total Call</th>
                                    <th>Today Minutes</th>
                                    <th>Total Minutes</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="table-tbody-data">
                                {employees.length > 0 ? (
                                    employees.map((emp, index) => (
                                        <tr key={emp.id} className="position-relative">
                                            <td>{indexOfFirstItem + index + 1}</td>
                                            <td>{emp.employeeCode || 'NA'}</td>
                                            <td>
                                                <Link to={`/superadmin/Employerprofile?emp${emp.id}`} className="text-primary">
                                                    {emp.name || 'NA'}
                                                </Link>
                                            </td>
                                            <td>{emp.phone || 'NA'}</td>
                                            <td>{emp.companyName || 'NA'}</td>
                                            <td>{emp.industry || 'NA'}</td>
                                            <td>{emp.verticals || 'NA'}</td>
                                            <td>{emp.address || 'NA'}</td>
                                            <td>
                                                <Link to={`/superadmin/TeamCaller?emp=${emp.id}`} className="text-primary">
                                                    {emp.myTeam || 'NA'}
                                                </Link>
                                            </td>
                                            <td>{emp.todayCall || 'NA'}</td>
                                            <td>{emp.totalCall || 'NA'}</td>
                                            <td>{emp.todayMinutes || 'NA'}</td>
                                            <td>{emp.totalMinutes || 'NA'}</td>
                                            <td>
                                                <span className={emp.status === 'Active' ? 'table-status-btn' : 'table-status-btn-danger'}>
                                                    {emp.status || 'NA'}
                                                </span>
                                            </td>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={emp.status === 'Active'}
                                                    onChange={() => toggleCheckbox(emp.id)}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="15" className="text-center">No data found</td>
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
            <ToastContainer />
        </section>
    );
}
