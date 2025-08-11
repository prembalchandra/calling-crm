import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../MainComponents/breadcrumb/Breadcrumb';
import Pagination from '../../MainComponents/pagination/Pagination';

// Dummy data
const dummyEmployees = [
    {
        id: 1,
        employeeCode: "EMP001",
        name: "Ravi Kumar",
        phone: "9876543210",
        companyName: "ABC Pvt Ltd",
        designation: "Manager",
        industry: "Finance",
        product: "Product A",
        manager: "Suresh",
        employeeType: "Permanent",
        verticals: "Sales",
        address: "Delhi",
        todayCall: 5,
        totalCall: 50,
        todayMinutes: 30,
        totalMinutes: 500,
        status: "Active"
    },
    // Add more employees as needed
];

function Callers() {
    const [filters, setFilters] = useState({
        searchText: '',
        industry: '',
    });

    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

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

    const filteredEmployees = dummyEmployees.filter(emp =>
        (emp.name?.toLowerCase().includes(filters.searchText.toLowerCase()) ||
            emp.phone?.includes(filters.searchText)) &&
        emp.industry?.toLowerCase().includes(filters.industry.toLowerCase())
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
            allSelected ? prev.filter(id => !currentPageIds.includes(id)) : [...new Set([...prev, ...currentPageIds])]
        );
    };

    return (
        <section className='main-content-area'>
            <Breadcrumb
                title="Team Caller"
                titleIcon="bx bx-group me-2"
                buttons={[
                     {
                        label: (
                            <Link to="/superadmin/Callers">
                                <button type="button" className="addTaskBtn">
                                    <i className="bx bx-arrow-back"></i> Back
                                </button>
                            </Link>
                        ),
                    },
                    {
                        label: <>Total Tema Callers: <span className="badge-length">{filteredEmployees.length}</span></>,
                        className: "btn-bg-2",
                    },
                ]}
            />

            <div className="row-bg mt-3">
                {/* Filters */}
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

                {/* Table */}
                <div className="table-data-area mt-3">
                    <div className="table-responsive table-size">
                        <table className="table table-bordered table-striped">
                            <thead className="table-thead-data-color">
                                <tr>
                                    <th>
                                        <input
                                            type="checkbox"
                                            onChange={toggleAllCheckboxes}
                                            checked={currentEmployees.every(emp => selectedIds.includes(emp.id))}
                                        />
                                    </th>
                                    <th>S.No.</th>
                                    <th>Employee Code</th>
                                    <th>Employee Name</th>
                                    <th>Mobile Number</th>
                                    <th>Company Name</th>
                                    <th>Industry Name</th>
                                    <th>Verticals</th>
                                    <th>Address</th>
                                    <th>Today Call</th>
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
                                            <td>{emp.employeeCode ?? "NA"}</td>
                                            <td> <Link  to={`/superadmin/Employerprofile?emp${emp.id}`}>{emp.name ?? "NA"}</Link></td>
                                            <td>{emp.phone ?? "NA"}</td>
                                            <td>{emp.companyName ?? "NA"}</td>
                                            <td>{emp.industry ?? "NA"}</td>
                                            <td>{emp.verticals ?? "NA"}</td>
                                            <td>{emp.address ?? "NA"}</td>
                                           
                                            <td>{emp.todayCall ?? 0}</td>
                                            <td>{emp.totalCall ?? 0}</td>
                                            <td>{emp.todayMinutes ?? 0}</td>
                                            <td>{emp.totalMinutes ?? 0}</td>
                                            <td>
                                                <span className="table-status-btn">
                                                    {emp.status ?? "NA"}
                                                </span>
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
        </section>
    );
}

export default Callers;
