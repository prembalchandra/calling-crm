import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Breadcrumb from '../../MainComponents/breadcrumb/Breadcrumb';
import Pagination from '../../MainComponents/pagination/Pagination';

function CallReporting() {
  const [filters, setFilters] = useState({
    searchText: '',
    product: '',
  });

  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({ searchText: '', product: '' });
    setCurrentPage(1);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/call-log', {
        params: {
          searchText: filters.searchText,
          product: filters.product,
        },
      });

       console.log(res , 'bsdjhfbdjhfb djsh')

      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.data)
        ? res.data.data
        : [];

      setEmployees(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setEmployees([]); 
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters, currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentEmployees = Array.isArray(employees)
    ? employees.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const totalPages = Math.ceil(employees.length / itemsPerPage);

  return (
    <section className="main-content-area">
      <Breadcrumb
        title="Call Reporting"
        titleIcon="bx bx-phone-outgoing"
        buttons={[
          {
            label: (
              <>
                Total Call Reporting: <span className="badge-length">{employees.length}</span>
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
              <label className="form-label mb-0">Product</label>
              <input
                type="text"
                className="input-size form-control-search"
                name="product"
                value={filters.product}
                onChange={handleInputChange}
                placeholder="Search by Product"
              />
            </div>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-1">
            <div className="d-flex mt-4 gap-3 align-items-center">
              <button className="btn btn-primary btn-sm" onClick={fetchData}>
                <i className="bx bx-filter-alt"></i> Filter
              </button>
              <button className="btn btn-sm custom-reset" onClick={handleReset}>
                <i className="bx bx-reset"></i> Reset
              </button>
            </div>
          </div>
        </div>

        <div className="table-data-area mt-3">
          <div className="table-responsive">
            <table className="table table-bordered table-striped mb-2">
              <thead className="table-thead-data-color">
                <tr>
                  <th>S.no.</th>
                  <th>Lead Id</th>
                  <th>Customer Name</th>
                  <th>Phone Number</th>
                  <th>Product</th>
                  <th>Sub Product</th>
                  <th>Assign to</th>
                  <th>Reporting Manager</th>
                  <th>Start Call</th>
                  <th>End Call</th>
                  <th>Total Duration</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody className="table-tbody-data">
                {currentEmployees.length > 0 ? (
                  currentEmployees.map((emp, index) => (
                    <tr key={emp.id || index}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>{emp.lead_Id || 'NA'}</td>
                      <td>
                        <Link
                          to={`/admin/Employerprofile??emp/${emp.customer_name}`}
                          className="text-primary"
                        >
                          {emp.customer_name || 'NA'}
                        </Link>
                      </td>
                      <td>{emp.phone || 'NA'}</td>
                      <td>{emp.product || 'NA'}</td>
                      <td>{emp.sub_product || 'NA'}</td>
                      <td>{emp.assign_to || 'NA'}</td>
                      <td>{emp.reporting_manager || 'NA'}</td>
                      <td>{emp.start_call || 'NA'}</td>
                      <td>{emp.end_call || 'NA'}</td>
                      <td>{emp.total_duration || 'NA'}</td>
                      <td>{emp.remark || 'NA'}</td>
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

export default CallReporting;
