// components/pages/training/Designation.js

import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Breadcrumb from '../../../MainComponents/breadcrumb/Breadcrumb';
import Pagination from '../../../MainComponents/pagination/Pagination';
import Adddesignationfrom from './Adddesignationfrom';
import deleteLogo from '../../../../assets/Images/deleteLogo.png'

function Designation() {
    const [filters, setFilters] = useState({ searchText: '' });
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [selectedDesignation, setSelectedDesignation] = useState(null);
    const [modalType, setModalType] = useState('');
    const [editValue, setEditValue] = useState('');
    const itemsPerPage = 10;

    // Replace with API call later
    const designations = [
        { id: 1, designation_name: 'Manager' },
        { id: 2, designation_name: 'Team Lead' },
        { id: 3, designation_name: 'Developer' },
        { id: 4, designation_name: 'Designer' },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFilters({ searchText: '' });
    };

    const filteredDesignations = designations.filter(d =>
        d.designation_name.toLowerCase().includes(filters.searchText.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDesignations = filteredDesignations.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredDesignations.length / itemsPerPage);

    const toggleCheckbox = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const toggleAllCheckboxes = () => {
        const currentPageIds = currentDesignations.map(d => d.id);
        const allSelected = currentPageIds.every(id => selectedIds.includes(id));
        setSelectedIds(allSelected
            ? selectedIds.filter(id => !currentPageIds.includes(id))
            : [...new Set([...selectedIds, ...currentPageIds])]
        );
    };

    const openEditModal = (designation) => {
        setSelectedDesignation(designation);
        setEditValue(designation.designation_name);
        setModalType('edit');
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        // 🛠️ Add actual update API call here
        console.log('Updated designation:', editValue);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        // 🛠️ Add actual delete API call here
        console.log('Deleted designation:', selectedDesignation?.id);
    };

    return (
        <section className='main-content-area'>
            <Breadcrumb
                title="Create Designation"
                titleIcon="bx bxs-id-card icon"
                buttons={[
                    {
                        label: (
                            <Link to="/admin/Businesssetting">
                                <button type="button" className="addTaskBtn">
                                    <i className="bx bx-arrow-back"></i> Back
                                </button>
                            </Link>
                        )
                    },
                    {
                        label: (
                            <button className="addTaskBtn" onClick={() => setShowForm(true)}>
                                <FaPlus className="mr-1" /> Add Designation
                            </button>
                        )
                    },
                    {
                        label: <>Total Designations: <span className="badge-length">{filteredDesignations.length}</span></>,
                        className: "btn-bg-2"
                    }
                ]}
            />

            <div className={`slide-form-wrapper ${showForm ? 'show' : ''}`}>
                <Adddesignationfrom onClose={() => setShowForm(false)} />
            </div>
            <div className={`overlay ${showForm ? 'visible' : ''}`} onClick={() => setShowForm(false)}></div>

            <div className="row-bg mt-3">
                <div className="row align-items-center filterformpay flex-wrap">
                    <div className="col-lg-3 mb-2">
                        <label className="form-label mb-0">Search Designation</label>
                        <input
                            className="input-size form-control-search"
                            name="searchText"
                            value={filters.searchText}
                            onChange={handleInputChange}
                            placeholder="Search"
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

                <div className="table-data-area">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped mb-2">
                            <thead className="table-thead-data-color">
                                <tr>
                                    <th>S.no.</th>
                                    <th>Designation</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="table-tbody-data">
                                {currentDesignations.length > 0 ? currentDesignations.map((d, index) => (
                                    <tr key={d.id}>
                                       
                                        <td>{indexOfFirstItem + index + 1}</td>
                                        <td>{d.designation_name}</td>
                                        <td className='d-flex align-items-center gap-2 justify-content-center'>
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(d.id)}
                                                onChange={() => toggleCheckbox(d.id)}/>
    
                                            <Link
                                                to="#"
                                                className="text-dark"
                                                data-bs-toggle="modal"
                                                data-bs-target="#designationModal"
                                                onClick={() => openEditModal(d)}
                                            >
                                                <FaEdit />
                                            </Link>
                                            <Link
                                                to="#"
                                                className="text-dark"
                                                data-bs-toggle="modal"
                                                data-bs-target="#deleteModal"
                                                onClick={() => {
                                                    setSelectedDesignation(d);
                                                    setModalType('delete');
                                                }}
                                            >
                                                <FaTrash />
                                            </Link>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="4" className="text-center">No records found</td></tr>
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

            {/* Edit Modal */}
            <div className="modal fade" id="designationModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <form onSubmit={handleEditSubmit}>
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Designation</h5>
                                <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <label className="form-control-label">Designation Name</label>
                                <input
                                    className="form-control-search form-control"
                                    type="text"
                                    required
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary btn-sm" type="submit" data-bs-dismiss="modal">Save</button>
                                <button className="btn btn-sm custom-reset" type="button" data-bs-dismiss="modal">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <form onSubmit={handleDelete}>
                            <div className="modal-header">
                                <h5 className="modal-title">Delete Designation</h5>
                                <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="text-center modal-body">
                                <img
                                    src={deleteLogo}
                                    alt="deleteLogo"
                                    className='deleteLogo'
                                   
                                />
                                <p>
                                    Are you sure you want to delete <strong>{selectedDesignation?.designation_name}</strong>?
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-danger btn-sm" type="submit" data-bs-dismiss="modal">Delete</button>
                                <button className="btn btn-sm custom-reset" type="button" data-bs-dismiss="modal">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Designation;
