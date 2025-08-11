import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Breadcrumb from '../../MainComponents/breadcrumb/Breadcrumb';
import Pagination from '../../MainComponents/pagination/Pagination';
import TeamEditFrom from  './TeamEditFrom';
import deleteLogo from '../../../assets/Images/deleteLogo.png';

function Team() {
  const [filters, setFilters] = useState({
    searchText: '',
    designation: '',
    manager: '',
    employeeType: '',
    product: '',
  });

  const [employees, setEmployees] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editEmployeeData, setEditEmployeeData] = useState(null);

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  useEffect(() => {
    fetchEmployees();
  }, [filters]);

  const fetchEmployees = async () => {
    try {
      const activeFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, val]) => val !== '')
      );
      const queryParams = new URLSearchParams(activeFilters).toString();
      const res = await axios.get(`http://localhost:5000/api/teams?${queryParams}`);
      setEmployees(res.data);
      const highCallers = res.data.filter(emp => emp.calls > 9).map(emp => emp.id);
      setSelectedIds(highCallers);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({
      searchText: '',
      designation: '',
      manager: '',
      employeeType: '',
      product: '',
    });
    setCurrentPage(1);
  };

  const toggleCheckbox = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/teams/${selectedEmployee.id}`);
      fetchEmployees();
      setSelectedEmployee(null);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const currentEmployees = employees.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(employees.length / itemsPerPage);

  return (
    <section className='main-content-area'>
      <Breadcrumb
        title="Team"
        titleIcon="bx bx-group"
        buttons={[
          {
            label: (
              <>
                <FaPlus className="mr-1" /> Add Team
              </>
            ),
            className: "addTaskBtn",
            link: "/add-team"
          },
          {
            label: <>Total Employee: <span className="badge-length">{employees.length}</span></>,
            className: "btn-bg-2",
          },
        ]}
      />

      <div className="row-bg mt-3">
        {/* Filters */}
        <div className="row align-items-center filterformpay flex-wrap">
          {[
            { label: "Name/Phone", name: "searchText", placeholder: "Search" },
            { label: "Designation", name: "designation", placeholder: "Search Designation" },
            { label: "Product", name: "product", placeholder: "Search Product" }
          ].map(({ label, name, placeholder }) => (
            <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-1" key={name}>
              <label className="form-label mb-0">{label}</label>
              <input className="input-size form-control-search" name={name} value={filters[name]} onChange={handleInputChange} placeholder={placeholder} />
            </div>
          ))}

          {/* Selects */}
          <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-1">
            <label className="form-label mb-0">Reporting Manager</label>
            <select className=" input-size-form-control-search" name="manager" value={filters.manager} onChange={handleInputChange}>
              <option value="">Select</option>
              <option value="Manager 1">Manager 1</option>
              <option value="Manager 2">Manager 2</option>
            </select>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-1">
            <label className="form-label mb-0">Type of Employee</label>
            <select className=" input-size-form-control-search" name="employeeType" value={filters.employeeType} onChange={handleInputChange}>
              <option value="">Select</option>
              <option value="Permanent">Permanent</option>
              <option value="Contractual">Contractual</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-1">
            <div className="d-flex mt-4 gap-3 align-items-center">
              <button className="btn btn-primary btn-sm" onClick={fetchEmployees}><i className="bx bx-filter-alt"></i> Filter</button>
              <button className="btn btn-sm custom-reset" onClick={handleReset}><i className="bx bx-reset"></i> Reset</button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="table-data-area">
          <div className="overflow-x-auto table-responsive table-size table-data-area">
            <table className="table table-bordered table-striped mb-2">
              <thead className='table-thead-data-color'>
                <tr>
                  <th>S.no.</th>
                  <th>Employee Code</th>
                  <th>Employee Name</th>
                  <th>Type</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Designation</th>
                  <th>Address</th>
                  <th>Manager</th>
                  <th>Product</th>
                  <th>Total Calls</th>
                  <th>Minutes</th>
                  <th>Team</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className='table-tbody-data'>
                {currentEmployees.length > 0 ? currentEmployees.map((emp, index) => (
                  <tr key={emp.id}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>{emp.code}</td>
                    <td><Link to={`/admin/Employerprofile?emp=${emp.name}`} className="text-primary">{emp.name}</Link></td>
                    <td>{emp.type}</td>
                    <td>{emp.phone}</td>
                    <td>{emp.email}</td>
                    <td>{emp.designation || 'Agent'}</td>
                    <td>{emp.address || 'Laxmi Nagar'}</td>
                    <td>{emp.manager || 'Manager 1'}</td>
                    <td>{emp.product || 'Product'}</td>
                    <td>{emp.calls}</td>
                    <td>{emp.minutes}</td>
                    <td><Link to={`/admin/Employeeteam?user_id=${emp.code}`} className="text-primary">{emp.team}</Link></td>
                    <td>
                      <span className={selectedIds.includes(emp.id) ? 'table-status-btn' : 'table-status-btn-danger'}>
                        {selectedIds.includes(emp.id) ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className='d-flex gap-1 align-items-center'>
                      <input className='input-check-box-inner' type="checkbox" checked={selectedIds.includes(emp.id)} onChange={() => toggleCheckbox(emp.id)} />
                      <span className="text-dark" style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setEditEmployeeData(emp);
                          setShowEditForm(true);
                        }}><FaEdit /></span>
                      <span className="text-dark" style={{ cursor: 'pointer' }}
                        data-bs-toggle="modal" data-bs-target="#deleteModal"
                        onClick={() => setSelectedEmployee(emp)}><FaTrash /></span>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="15" className="text-center">No records found</td></tr>
                )}
              </tbody>
            </table>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <div className="modal fade" id="deleteModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <form>
              <div className="modal-header">
                <h5 className="modal-title">Delete Team Member</h5>
                <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body text-center">
                <img src={deleteLogo} alt="deleteLogo" className='deleteLogo' />
                <p>Are you sure you want to delete <strong>{selectedEmployee?.name}</strong>?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger btn-sm" type="button" data-bs-dismiss="modal" onClick={handleDeleteConfirm}>Delete</button>
                <button className="btn btn-sm custom-reset" type="button" data-bs-dismiss="modal">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Slide Edit Form */}
      {showEditForm && (
        <>
         <div className="overlay visible" onClick={() => setShowEditForm(false)}></div>
          <TeamEditFrom data={editEmployeeData}onClose={() => setShowEditForm(false)}onUpdated={fetchEmployees}/>
         </>
       
      )}
    </section>
  );
}

export default Team;
