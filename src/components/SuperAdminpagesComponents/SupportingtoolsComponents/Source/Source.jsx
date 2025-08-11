// components/pages/training/Document.js

import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../../MainComponents/breadcrumb/Breadcrumb';
import Pagination from '../../../MainComponents/pagination/Pagination';
import AddsourceFrom from './AddsourceFrom';

const documentList = [
  { id: 1, source_data: 'Website' },
  { id: 2, source_data: 'LinkedIn' },
  { id: 3, source_data: 'Facebook' },
  { id: 4, source_data: 'Referral' },
];

function Source() {
  const [filters, setFilters] = useState({ searchText: '' });
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const itemsPerPage = 10;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({ searchText: '' });
    setCurrentPage(1);
  };

  const filteredDocuments = documentList.filter((doc) =>
    doc.source_data.toLowerCase().includes(filters.searchText.toLowerCase())
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
        title="Document"
        titleIcon="bx bxs-file-doc icon"
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
                <FaPlus className="me-1" /> Add Source
              </button>
            ),
          },
          {
            label: (
              <>
                Total Source : <span className="badge-length">{filteredDocuments.length}</span>
              </>
            ),
            className: 'btn-bg-2',
          },
        ]}
      />


      <div className={`slide-form-wrapper ${showForm ? 'show' : ''}`}>
        <AddsourceFrom onClose={() => setShowForm(false)} />
      </div>
      <div
        className={`overlay ${showForm ? 'visible' : ''}`}
        onClick={() => setShowForm(false)}
      ></div>

      <div className="row-bg mt-3">
        <div className="row align-items-center filterformpay flex-wrap">
          <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-2">
            <div className="employee-search-area-box">
              <label className="form-label mb-0">Search Source</label>
              <input
                className="input-size form-control-search"
                name="searchText"
                value={filters.searchText}
                onChange={handleInputChange}
                placeholder="Search by source"
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-2 mt-4 d-flex gap-2">
            <button className="btn btn-primary btn-sm" onClick={() => setCurrentPage(1)}>
              <i className="bx bx-filter-alt"></i> Filter
            </button>
            <button className="btn btn-sm custom-reset" onClick={handleReset}>
              <i className="bx bx-reset"></i> Reset
            </button>
          </div>
        </div>

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
                  <th>Source Data</th>
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
                      <td>{doc.source_data}</td>
                      <td>
                        <input type="checkbox" />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">
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

export default Source;
