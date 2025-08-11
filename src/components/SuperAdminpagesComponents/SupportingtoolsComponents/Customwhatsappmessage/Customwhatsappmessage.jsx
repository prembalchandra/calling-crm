import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../../MainComponents/breadcrumb/Breadcrumb';
import Pagination from '../../../MainComponents/pagination/Pagination';
import AddwhatsappMessage from './AddwhatsappMessage';

// Dummy message list
const documentList = [
    { id: 1, Message_date: '2025-06-13', Message_filename: 'Interested', message_ownedname: 'Loan', subProduct_name: 'Home Loan' },
    { id: 2, Message_date: '2025-06-13', Message_filename: 'Follow-up', message_ownedname: 'Owned' },
    { id: 3, Message_date: '2025-06-13', Message_filename: 'Interested', message_ownedname: 'Loan', subProduct_name: 'Home Loan' },
    { id: 4, Message_date: '2025-06-13', Message_filename: 'Follow-up', message_ownedname: 'Owned' },
    { id: 5, Message_date: '2025-06-13', Message_filename: 'Interested', message_ownedname: 'Loan', subProduct_name: 'Home Loan' },
    { id: 6, Message_date: '2025-06-13', Message_filename: 'Follow-up', message_ownedname: 'Owned' },
    { id: 7, Message_date: '2025-06-13', Message_filename: 'Interested', message_ownedname: 'Loan', subProduct_name: 'Home Loan' },
    { id: 8, Message_date: '2025-06-13', Message_filename: 'Follow-up', message_ownedname: 'Owned' },
];

// Static message cards
const messages = [
    {
        title: 'Interested',
        message: `Hi [Name], thank you for showing interest in our service. Our team will connect with you shortly to assist further. – [App Name]`
    },
    {
        title: 'Not Interested',
        message: `Hi [Name], we tried reaching you today but couldn’t connect. Let us know a convenient time to call back. – [App Name]`
    },
    {
        title: 'Not Connected',
        message: `Hi [Name], we tried reaching you today but couldn’t connect. Let us know a convenient time to call back. – [App Name]`
    }
];

function CustomwhatsappMessage() {
    const [filters, setFilters] = useState({ searchText: '', date: '' });
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const itemsPerPage = 5;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFilters({ searchText: '', date: '' });
        setCurrentPage(1);
    };

    const filteredDocuments = documentList.filter((doc) =>
        doc.Message_filename.toLowerCase().includes(filters.searchText.toLowerCase()) &&
        (filters.date ? doc.Message_date === filters.date : true)
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDocuments = filteredDocuments.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);

    const toggleCheckbox = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const toggleAllCheckboxes = () => {
        const currentPageIds = currentDocuments.map((doc) => doc.id);
        const allSelected = currentPageIds.every((id) => selectedIds.includes(id));
        setSelectedIds((prev) =>
            allSelected ? prev.filter((id) => !currentPageIds.includes(id)) : [...new Set([...prev, ...currentPageIds])]
        );
    };

    return (
        <section className="main-content-area">
            <Breadcrumb
                title="Custom Whatsapp Message"
                titleIcon="bx bxl-whatsapp icon"
                buttons={[
                    {
                        label: (
                            <Link to="/superadmin/Supportingtools">
                                <button type="button" className="addTaskBtn">
                                    <i className="bx bx-arrow-back"></i> Back
                                </button>
                            </Link>
                        ),
                    },
                    {
                        label: (
                            <button className="addTaskBtn" onClick={() => setShowForm(true)}>
                                <FaPlus className="me-1" /> Add Message
                            </button>
                        ),
                    },
                    {
                        label: (
                            <>
                                Total Message : <span className="badge-length">{filteredDocuments.length}</span>
                            </>
                        ),
                        className: 'btn-bg-2',
                    },
                ]}
            />

            {/* Slide Form */}
            <div className={`slide-form-wrapper ${showForm ? 'show' : ''}`}>
                <AddwhatsappMessage onClose={() => setShowForm(false)} />
            </div>
            <div className={`overlay ${showForm ? 'visible' : ''}`} onClick={() => setShowForm(false)}></div>

            {/* Filter Form */}
            <div className="row-bg mt-3">
                <div className="row align-items-center filterformpay flex-wrap">
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-1">
                        <label className="form-label mb-0">Template Name</label>
                        <input
                            className="input-size form-control-search"
                            name="searchText"
                            value={filters.searchText}
                            onChange={handleInputChange}
                            placeholder="Search by Template Name"
                        />
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-1">
                        <label className="form-label mb-0">Date</label>
                        <input
                            className="input-size form-control-search"
                            name="date"
                            type="date"
                            value={filters.date}
                            onChange={handleInputChange}
                        />
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

                {/* Data Table */}
                <div className="table-data-area mt-3">
                    <div className="table-responsive table-size">
                        <table className="table table-bordered table-striped mb-2">
                            <thead className="table-thead-data-color">
                                <tr>
                                    <th>
                                        <input
                                            type="checkbox"
                                            onChange={toggleAllCheckboxes}
                                            checked={
                                                currentDocuments.length > 0 &&
                                                currentDocuments.every((doc) => selectedIds.includes(doc.id))
                                            }
                                        />
                                    </th>
                                    <th>S.No.</th>
                                    <th>Template Name</th>
                                    <th>Owned by</th>
                                    <th>Created Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="table-tbody-data">
                                {currentDocuments.length > 0 ? (
                                    currentDocuments.map((doc, index) => (
                                        <tr key={doc.id}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(doc.id)}
                                                    onChange={() => toggleCheckbox(doc.id)}
                                                />
                                            </td>
                                            <td>{indexOfFirstItem + index + 1}</td>
                                            <td>{doc.Message_filename}</td>
                                            <td>{doc.message_ownedname}</td>
                                            <td>{doc.Message_date}</td>
                                            <td>{/* Add action buttons here if needed */}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">No records found</td>
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

            {/* Message Card Section */}
            <div className="mt-3">
                <div className="d-flex justify-content-end align-items-center mb-4">
                    <Link to="/superadmin/MessageCards">
                        <button className="addTaskBtn">Show All Messages</button>
                    </Link>
                </div>
                <div className="card-container row">
                    {messages.map((msg, index) => (
                        <div key={index} className="col-md-4 mb-3">
                            <Link to="/superadmin/Employersentmsg">
                                <div className="card-box p-3 shadow-sm rounded bg-white h-100 custom-messages-card">
                                    <p className="message">{msg.message}</p>
                                    <h6 className="title  mt-2">{msg.title}</h6>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default CustomwhatsappMessage;
