import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Breadcrumb from '../../MainComponents/breadcrumb/Breadcrumb';
import Pagination from '../../MainComponents/pagination/Pagination';

function Employers() {
    const [filters, setFilters] = useState({
        searchText: '',
        industry: '',
        location: '',
    });

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

     useEffect(() => {
        fetchEmployees();
    }, [filters,currentPage]); // refetch on page change

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/api/employers', {
                params: {
                
                    page: filters.currentPage,
                    limit: filters.itemsPerPage,
                    sortBy: 'createdAt',
                    sortOrder: 'DESC'
                }
            });

            const { data, totalPages } = res.data;
            setEmployees(data || []);
            setTotalPages(totalPages || 1);
        } catch (err) {
            console.error('API error:', err);
            setEmployees([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };

   
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleFilter = () => {
        setCurrentPage(1);
        fetchEmployees();
    };

    const handleReset = () => {
        setFilters({ searchText: '', industry: '', location: '' });
        setCurrentPage(1);
        fetchEmployees();
    };

    const toggleCheckbox = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const toggleAllCheckboxes = () => {
        const currentPageIds = employees.map(emp => emp.id);
        const allSelected = currentPageIds.every(id => selectedIds.includes(id));
        setSelectedIds(prev =>
            allSelected ? prev.filter(id => !currentPageIds.includes(id)) : [...new Set([...prev, ...currentPageIds])]
        );
    };

    return (
        <section className='main-content-area'>
            <Breadcrumb
                title="Employers"
                titleIcon="bx bx-group"
                buttons={[
                    {
                        label: <>Total Employee Team: <span className="badge-length">{employees.length}</span></>,
                        className: "btn-bg-2",
                    },
                ]}
            />

            <div className="row-bg mt-3">
                <div className="row align-items-center filterformpay flex-wrap">
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-1">
                        <div className="employee-search-area-box">
                            <label className="form-label mb-0">Name / Mobile Number</label>
                            <input className="input-size form-control-search" name="searchText" value={filters.searchText} onChange={handleInputChange} placeholder="Search" />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-1">
                        <div className="employee-search-area-box">
                            <label className="form-label mb-0">Search Industry</label>
                            <input className="input-size form-control-search" name="industry" value={filters.industry} onChange={handleInputChange} placeholder="Search Industry" />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-1">
                        <div className="employee-search-area-box">
                            <label className="form-label mb-0">Address / State / City</label>
                            <input className="input-size form-control-search" name="location" value={filters.location} onChange={handleInputChange} placeholder="Search Location" />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-1">
                        <div className="d-flex mt-4 gap-3 align-items-center">
                            <button className="btn btn-primary btn-sm" onClick={handleFilter}>
                                <i className="bx bx-filter-alt"></i> Filter
                            </button>
                            <button className="btn btn-sm custom-reset" onClick={handleReset}>
                                <i className="bx bx-reset"></i> Reset
                            </button>
                        </div>
                    </div>
                </div>

                <div className="table-data-area mt-3">
                    {loading ? (
                        <p className="text-center">Loading...</p>
                    ) : (
                        <div className="overflow-x-auto table-responsive">
                            <table className="table table-bordered table-striped mb-2">
                                <thead className='table-thead-data-color'>
                                    <tr>
                                        <th><input type="checkbox" onChange={toggleAllCheckboxes} checked={employees.every(emp => selectedIds.includes(emp.id))} /></th>
                                        <th>S.no.</th>
                                        <th>Employee Code</th>
                                        <th>Employee Name</th>
                                        <th>Phone Number</th>
                                        <th>Email ID</th>
                                        <th>Industry</th>
                                        <th>Address</th>
                                        <th>State</th>
                                        <th>City</th>
                                        <th>No. of Callers</th>
                                        <th>Active Callers</th>
                                        <th>Status</th>
                                        <th>View</th>
                                    </tr>
                                </thead>
                                <tbody className='table-tbody-data'>
                                    {employees.length > 0 ? (
                                        employees.map((emp, index) => (
                                            <tr key={emp.id}>
                                                <td><input type="checkbox" checked={selectedIds.includes(emp.id)} onChange={() => toggleCheckbox(emp.id)} /></td>
                                                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                <td>{emp.code || 'NA'}</td>
                                                <td><Link to={`/superadmin/Employerprofile?emp${emp.id}`} className="text-primary">{emp.name || 'NA'}</Link></td>
                                                <td>{emp.phone || 'NA'}</td>
                                                <td>{emp.email || 'NA'}</td>
                                                <td>{emp.industry || 'NA'}</td>
                                                <td>{emp.address || 'NA'}</td>
                                                <td>{emp.state || 'NA'}</td>
                                                <td>{emp.city || 'NA'}</td>
                                                <td><Link to={`/superadmin/NoCaller?emp=${emp.id}`}>{emp.noOfCallers ?? 'NA'}</Link></td>
                                                <td><Link to={`/superadmin/Activecaller?emp=${emp.id}`}>{emp.activeCallers ?? 'NA'}</Link></td>
                                                <td><span className={emp.status === 'Active' ? 'table-status-btn' : 'table-status-btn-danger'}>{emp.status || 'NA'}</span></td>
                                                <td><Link to={`/superadmin/Employersview?emp=${emp.id}`} className='text-dark fs-6'><span className='bx bxs-show icon-color'></span></Link></td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="14" className="text-center">No records found</td></tr>
                                    )}
                                </tbody>
                            </table>

                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Employers;
