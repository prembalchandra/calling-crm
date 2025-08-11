import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../MainComponents/breadcrumb/Breadcrumb';
import Pagination from '../../MainComponents/pagination/Pagination';

const employees = [
    {
        id: 1,
        lead_Id: '24A14927',
        customer_name: 'Employee 1',
        phone: '213065479',
        product: 'Loan',
        subProduct: 'Home Loan',
        reportingmanager: 'Ravi Kumar',
        startCall: '10:00 AM',
        endCall: '10:05 AM',
        totalDuration: '5 mins',
        remark: 'Interested'
    },
    {
        id: 2,
        lead_Id: '24A14928',
        customer_name: 'Employee 2',
        phone: '2130654745',
        product: 'Credit Card',
        subProduct: 'Platinum Card',
        reportingmanager: 'Anjali Mehta',
        startCall: '11:00 AM',
        endCall: '11:07 AM',
        totalDuration: '7 mins',
        remark: 'Call back later'
    },
    {
        id: 3,
        lead_Id: '24A14929',
        customer_name: 'Employee 3',
        phone: '2130654445',
        product: 'Insurance',
        subProduct: 'Health Insurance',
        reportingmanager: 'Sunil Verma',
        startCall: '09:15 AM',
        endCall: '09:22 AM',
        totalDuration: '7 mins',
        remark: 'Not interested'
    },
    {
        id: 4,
        lead_Id: '24A14930',
        customer_name: 'Employee 4',
        phone: '2130654735',
        product: 'Loan',
        subProduct: 'Personal Loan',
        reportingmanager: 'Ravi Kumar',
        startCall: '02:00 PM',
        endCall: '02:06 PM',
        totalDuration: '6 mins',
        remark: 'Interested'
    },
    {
        id: 5,
        lead_Id: '24A14931',
        customer_name: 'Employee 5',
        phone: '2130654746',
        product: 'Credit Card',
        subProduct: 'Gold Card',
        reportingmanager: 'Anjali Mehta',
        startCall: '01:00 PM',
        endCall: '01:04 PM',
        totalDuration: '4 mins',
        remark: 'Requested brochure'
    },
    {
        id: 6,
        lead_Id: '24A14932',
        customer_name: 'Employee 6',
        phone: '2130651234',
        product: 'Insurance',
        subProduct: 'Life Insurance',
        reportingmanager: 'Sunil Verma',
        startCall: '03:30 PM',
        endCall: '03:35 PM',
        totalDuration: '5 mins',
        remark: 'Call disconnected'
    },
    {
        id: 7,
        lead_Id: '24A14933',
        customer_name: 'Employee 7',
        phone: '2130659999',
        product: 'Loan',
        subProduct: 'Vehicle Loan',
        reportingmanager: 'Ravi Kumar',
        startCall: '04:00 PM',
        endCall: '04:10 PM',
        totalDuration: '10 mins',
        remark: 'Follow up tomorrow'
    },
    {
        id: 8,
        lead_Id: '24A14934',
        customer_name: 'Employee 8',
        phone: '2130654743',
        product: 'Credit Card',
        subProduct: 'Titanium Card',
        reportingmanager: 'Anjali Mehta',
        startCall: '05:00 PM',
        endCall: '05:06 PM',
        totalDuration: '6 mins',
        remark: 'Converted'
    },
    {
        id: 9,
        lead_Id: '24A14935',
        customer_name: 'Employee 9',
        phone: '2130651122',
        product: 'Insurance',
        subProduct: 'Travel Insurance',
        reportingmanager: 'Sunil Verma',
        startCall: '10:30 AM',
        endCall: '10:37 AM',
        totalDuration: '7 mins',
        remark: 'Requested email'
    },
    {
        id: 10,
        lead_Id: '24A14936',
        customer_name: 'Employee 11',
        phone: '2130653344',
        product: 'Loan',
        subProduct: 'Education Loan',
        reportingmanager: 'Ravi Kumar',
        startCall: '11:30 AM',
        endCall: '11:35 AM',
        totalDuration: '5 mins',
        remark: 'Needs approval'
    },
];


function Activecaller() {
    const [filters, setFilters] = useState({
        searchText: '',
        reportingmanager: '',
        product: '',
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
            reportingmanager: '',
            product: '',
        });
        setCurrentPage(1);
    };

    const filteredEmployees = employees.filter(emp => {
        const matchText = emp.customer_name.toLowerCase().includes(filters.searchText.toLowerCase());
        return matchText;
    });

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
                title="Active caller"
                titleIcon="bx bx-phone-outgoing"

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
                        label: <>Total Active caller: <span className="badge-length">{filteredEmployees.length}</span></>,
                        className: "btn-bg-2",
                    },
                ]}
            />

            <div className="row-bg mt-3">
                <div className="row align-items-center filterformpay flex-wrap">
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-1">
                        <div className='employee-search-area-box'>
                            <label className="form-label mb-0">Name</label>
                            <input className="input-size form-control-search" name="searchText" value={filters.searchText} onChange={handleInputChange} placeholder="Search by Name" />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-1">
                        <div className='employee-search-area-box'>
                            <label className="form-label mb-0">Product /Sub Product</label>
                            <input type="text" className="input-size form-control-search" name="product" value={filters.product} onChange={handleInputChange} placeholder="Search by Product" />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-1">
                        <div className='employee-search-area-box'>
                            <label className="form-label mb-0">Reporting Manager</label>
                            <input type="text" className="input-size form-control-search" name="reportingmanager" value={filters.reportingmanager} onChange={handleInputChange} placeholder="Search by Reporting Manager" />
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
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped mb-2">
                            <thead className='table-thead-data-color'>
                                <tr>
                                    <th><input type="checkbox" onChange={toggleAllCheckboxes} checked={currentEmployees.every(emp => selectedIds.includes(emp.id))} /></th>
                                    <th>S.no.</th>
                                    <th>Lead Id</th>
                                    <th>Caller Name</th>
                                    <th>Phone Number</th>
                                    <th>Product</th>
                                    <th>Sub Product</th>
                                    <th>Reporting Manager</th>
                                    <th>Start Call</th>
                                    <th>End Call</th>
                                    <th>Total Duration</th>
                                    <th>Remark</th>
                                </tr>
                            </thead>
                            <tbody className='table-tbody-data'>
                                {currentEmployees.length > 0 ? currentEmployees.map((emp, index) => (
                                    <tr key={emp.id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(emp.id)}
                                                onChange={() => toggleCheckbox(emp.id)}
                                            />
                                        </td>
                                        <td>{indexOfFirstItem + index + 1}</td>
                                        <td>{emp.lead_Id || '-'}</td>
                                        <td>{emp.customer_name || '-'}</td>
                                        <td>{emp.phone || '-'}</td>
                                        <td>{emp.product || '-'}</td>
                                        <td>{emp.subProduct || '-'}</td>
                                        <td>{emp.reportingmanager || '-'}</td>
                                        <td>{emp.startCall || '-'}</td>
                                        <td>{emp.endCall || '-'}</td>
                                        <td>{emp.totalDuration || '-'}</td>
                                        <td>{emp.remark || '-'}</td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="13" className="text-center">No records found</td></tr>
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

export default Activecaller;
