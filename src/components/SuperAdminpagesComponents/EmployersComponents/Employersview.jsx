import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../MainComponents/breadcrumb/Breadcrumb';
import Pagination from '../../MainComponents/pagination/Pagination';

function Team() {
    const [filters, setFilters] = useState({
        searchText: '',
        phonenumber: '',
    });

    const [employees, setEmployees] = useState([]); 
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/employers', {
                    params: filters,
                });

                console.log('API Response:', res.data); 
                setEmployees(Array.isArray(res.data.data) ? res.data.data : []);
            } catch (err) {
                console.error('Error fetching employees:', err);
                setEmployees([]); 
            }
        };

        fetchEmployees();
    }, [filters]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
        setCurrentPage(1);
    };

    const handleReset = () => {
        setFilters({
            searchText: '',
            phonenumber: '',
        });
        setCurrentPage(1);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEmployees = employees.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(employees.length / itemsPerPage);

    const toggleCheckbox = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const toggleAllCheckboxes = () => {
        const currentPageIds = currentEmployees.map((emp) => emp.id);
        const allSelected = currentPageIds.every((id) => selectedIds.includes(id));
        setSelectedIds((prev) =>
            allSelected
                ? prev.filter((id) => !currentPageIds.includes(id))
                : [...new Set([...prev, ...currentPageIds])]
        );
    };

    return (
        <section className="main-content-area">
            <Breadcrumb
                title="{emp.name || 'NA'}Team View"
                titleIcon="bx bx-group"
                buttons={[
                    {
                        label: (
                            <Link to="/superadmin/Employers">
                                <button type="button" className="addTaskBtn">
                                    <i className="bx bx-arrow-back"></i> Back
                                </button>
                            </Link>
                        ),
                    },
                    {
                        label: (
                            <>
                                Total Employee: <span className="badge-length">{employees.length}</span>
                            </>
                        ),
                        className: 'btn-bg-2',
                    },
                ]}
            />

            <div className="row-bg mt-3">
                <div className="row align-items-center filterformpay flex-wrap">
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-1">
                        <div className="employee-search-area-box">
                            <label className="form-label mb-0">Name</label>
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
                        <div className="employee-search-area-box">
                            <label className="form-label mb-0">Mobile Number</label>
                            <input
                                className="input-size form-control-search"
                                name="phonenumber"
                                value={filters.phonenumber}
                                onChange={handleInputChange}
                                placeholder="Search Mobile Number"
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

                <div className="table-data-area mt-3">
                    <div className="table-responsive mt-3">
                        <table className="table table-bordered table-striped">
                            <thead className="table-thead-data-color">
                                <tr>
                                    <th>
                                        <input
                                            type="checkbox"
                                            onChange={toggleAllCheckboxes}
                                            checked={
                                                currentEmployees.length > 0 &&
                                                currentEmployees.every((emp) => selectedIds.includes(emp.id))
                                            }
                                        />
                                    </th>
                                    <th>S.no.</th>
                                    <th>Employee Code</th>
                                    <th>Employee Name</th>
                                    <th>Mobile Number</th>
                                    <th>Company Name</th>
                                    <th>Today Assign Data</th>
                                    <th>Available Data</th>
                                    <th>Total Call</th>
                                    <th>Today Minutes</th>
                                    <th>Total Minutes</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody className="table-tbody-data">
                                {currentEmployees.length > 0 ? (
                                    currentEmployees.map((emp, index) => (
                                        <tr key={emp.id}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(emp.id)}
                                                    onChange={() => toggleCheckbox(emp.id)}
                                                />
                                            </td>
                                            <td>{indexOfFirstItem + index + 1}</td>
                                            <td>{emp.code || '-'}</td>
                                            <td>{emp.name || '-'}</td>
                                            <td>{emp.phone || '-'}</td>
                                            <td>{emp.company || '-'}</td>
                                            <td>{emp.todayAssignData || 0}</td>
                                            <td>{emp.availableData || 0}</td>
                                            <td>{emp.totalCall || 0}</td>
                                            <td>{emp.todayMinutes || 0}</td>
                                            <td>{emp.totalMinutes || 0}</td>
                                            <td>
                                                <span
                                                    className={
                                                        emp.status === 'Active'
                                                            ? 'table-status-btn'
                                                            : 'table-status-btn-danger'
                                                    }
                                                >
                                                    {emp.status || 'NA'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="12" className="text-center">
                                            No records found
                                        </td>
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

export default Team;
