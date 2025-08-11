import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Breadcrumb from '../../../MainComponents/breadcrumb/Breadcrumb';
import Pagination from '../../../MainComponents/pagination/Pagination';
import AddPrivacypolicy from './AddPrivacypolicy';

const Statuss = [
  {
    id: 1,
    Status_name: 'Data Use Policy',
    uploadedDate: '2025-06-01',
    policyName: 'Privacy Policy A',
    fileUrl: '/files/privacy-policy-a.pdf',
  },
  {
    id: 2,
    Status_name: 'Terms Update Notice',
    uploadedDate: '2025-06-15',
    policyName: 'Privacy Policy B',
    fileUrl: '/files/privacy-policy-b.pdf',
  },
  {
    id: 3,
    Status_name: 'User Consent Info',
    uploadedDate: '2025-06-18',
    policyName: 'Privacy Policy C',
    fileUrl: '/files/privacy-policy-c.pdf',
  },
];

function Privacypolicy() {
  const [filters, setFilters] = useState({ searchText: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const itemsPerPage = 10;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({ searchText: '' });
  };

  const toggleCheckbox = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleAllCheckboxes = () => {
    const allIds = currentStatus.map((d) => d.id);
    setSelectedIds((prev) =>
      prev.length === allIds.length ? [] : allIds
    );
  };

  const filteredStatus = Statuss.filter((d) =>
    d.Status_name.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStatus = filteredStatus.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStatus.length / itemsPerPage);

  return (
    <section className="main-content-area">
      <Breadcrumb
        title="Privacy Policy"
        titleIcon="bx bx-lock icon"
        buttons={[
          {
            label: (
              <Link to="/admin/Setting">
                <button type="button" className="addTaskBtn">
                  <i className="bx bx-arrow-back"></i> Back
                </button>
              </Link>
            ),
          },
          {
            label: (
              <button className="addTaskBtn" onClick={() => setShowForm(true)}>
                <FaPlus className="mr-1" /> Add Privacy Policy
              </button>
            ),
          },
          {
            label: (
              <>
                Total Privacy Policy:{' '}
                <span className="badge-length">{filteredStatus.length}</span>
              </>
            ),
            className: 'btn-bg-2',
          },
        ]}
      />

      {/* Slide Form */}
      <div className={`slide-form-wrapper ${showForm ? 'show' : ''}`}>
        <AddPrivacypolicy onClose={() => setShowForm(false)} />
      </div>
      <div
        className={`overlay ${showForm ? 'visible' : ''}`}
        onClick={() => setShowForm(false)}
      ></div>

      {/* Filter and Table */}
      <div className="row-bg mt-3">
        <div className="row align-items-center filterformpay flex-wrap">
          <div className="col-lg-3 mb-2">
            <label className="form-label mb-0">Name</label>
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
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setCurrentPage(1)}
              >
                <i className="bx bx-filter-alt"></i> Filter
              </button>
              <button className="btn btn-sm custom-reset" onClick={handleReset}>
                <i className="bx bx-reset"></i> Reset
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="table-data-area">
          <div className="table-responsive">
            <table className="table table-bordered table-striped mb-2">
              <thead className="table-thead-data-color">
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      onChange={toggleAllCheckboxes}
                      checked={
                        currentStatus.length > 0 &&
                        currentStatus.every((d) => selectedIds.includes(d.id))
                      }
                    />
                  </th>
                  <th>S.no.</th>
                  <th>Name</th>
                  <th>Uploaded Date</th>
                  <th>Policy Name (Download)</th>
                </tr>
              </thead>
              <tbody className="table-tbody-data">
                {currentStatus.length > 0 ? (
                  currentStatus.map((d, index) => (
                    <tr key={d.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(d.id)}
                          onChange={() => toggleCheckbox(d.id)}
                        />
                      </td>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>{d.Status_name}</td>
                      <td>{d.uploadedDate}</td>
                      <td>
                        <Link
                          to={d.fileUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {d.policyName}
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
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

export default Privacypolicy;
