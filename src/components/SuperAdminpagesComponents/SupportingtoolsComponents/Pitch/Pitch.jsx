import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../../MainComponents/breadcrumb/Breadcrumb';
import Pagination from '../../../MainComponents/pagination/Pagination';

const documentList = [
    { id: 1, document_name: 'Industry 1', document_date: '2025-04-19' },
    { id: 2, document_name: 'Industry 2', document_date: '2025-04-19' },
    { id: 3, document_name: 'Industry 3', document_date: '2025-04-19' },
    { id: 4, document_name: 'Industry 4', document_date: '2025-04-19' },
    { id: 5, document_name: 'Industry 5', document_date: '2025-04-19' },
];

function Pitch() {
    const [filters, setFilters] = useState({ searchText: '', date: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFilters({ searchText: '', date: '' });
        setCurrentPage(1);
    };

    const filteredDocuments = documentList.filter((doc) =>
        doc.document_name.toLowerCase().includes(filters.searchText.toLowerCase()) &&
        (filters.date ? doc.document_date === filters.date : true)
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDocuments = filteredDocuments.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);

    return (
        <section className="main-content-area">
            <Breadcrumb
                title="Pitch"
                titleIcon="bx bx-file icon"
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
                            <>
                                Total Pitch : <span className="badge-length">{filteredDocuments.length}</span>
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
                                placeholder="Search by Name"
                            />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-1">
                        <div className="employee-search-area-box">
                            <label className="form-label mb-0">Date</label>
                            <input
                                type="date"
                                className="input-size form-control-search"
                                name="date"
                                value={filters.date}
                                onChange={handleInputChange}
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

                <div className="row mt-4">
                    {currentDocuments.map((doc) => (
                        <div className="col-md-4 mb-3" key={doc.id}>
                            <Link className="card-video-box-inner"  to="/view-all-documents">
                                <div className="custom-text-messages-card">
                                    <div className="template-card card-box">
                                        <div className="card-video-row">
                                            <div className="video-icon icon">
                                                <i className="bx bx-radar"></i>
                                            </div>
                                            <div className="video-content-bxo">
                                                <h6>{doc.document_name}</h6>
                                                <p className="video-content-inner">
                                                    <span className='uploader-by-texr'>Uploaded by:</span>
                                                    <span className="ml-1">Employer</span>
                                                </p>
                                                <p className="video-content-inner">
                                                    <span className='uploader-by-texr'>Total Pitch:</span>
                                                    <span className="ml-1">10</span>
                                                </p>
                                                <p className="video-content-inner">
                                                    <span className='uploader-by-texr'>Last Update:</span>
                                                    <span className="ml-1">{new Date(doc.document_date).toLocaleDateString('en-GB')}</span>
                                                </p>
                                                <Link to="/view-all-documents" className="mt-2 text-primary d-inline-block">
                                                    View all Document
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </section>
    );
}

export default Pitch;
