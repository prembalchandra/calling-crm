import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Panimages3 from '../../../../assets/Images/pan.png'
import Adharimages1 from '../../../../assets/Images/adhar1.png'
import Adharimages2 from '../../../../assets/Images/adhar2.png'


const TabsSection = () => {
  const permissions = [
    'Add/Delete/Deactivate Staff',
    'Assign Staff',
    'Designation',
    'Password Change',
    'Data Import',
    'Assign Data',
    'Refresh Data',
    'Data Scheduling',
    'Import Data',
    'Add Product'
  ];

  const [formData, setFormData] = useState({
    permanentAddress: '1/25, 3rd floor, near KBM Electronics, Lalita Park, Laxmi Nagar, New Delhi, Delhi, 110092',
    currentAddress: '1/25, 3rd floor, near KBM Electronics, Lalita Park, Laxmi Nagar, New Delhi, Delhi, 110092',
    bloodGroup: 'B+',
    gender: 'Male',
    dob: '1997-01-08',
    maritalStatus: 'Unmarried',
    physicallyChallenge: 'No',
    fatherName: 'Sanoj Kumar',
    motherName: 'Rani Devi',
    spouseName: 'Pooja'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="row-bg ">
      <Tabs defaultActiveKey="about" id="tabs-section" className="">
        <Tab eventKey="about" title={<><i className="bx bx-user"></i> About</>}>
          <p className="description-content">
            Lorem Ipsum has been the industry's standard dummy text...
          </p>
        </Tab>

        <Tab eventKey="personal" title={<><i className="bx bx-id-card"></i> Personal Info</>}>
          <div className="">
            <div className="mb-3">
              <div className='employee-search-area-box'>
                <label className='form-label mb-0'>Permanent Address</label>
                <input
                  type="text"
                  className="input-size form-control-search"
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <div className='employee-search-area-box'>
                <label className='form-label mb-0'>Current Address</label>
                <input
                  type="text"
                  className="input-size form-control-search"
                  name="currentAddress"
                  value={formData.currentAddress}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-3 mb-3">
                <div className='employee-search-area-box'>
                  <label className='form-label mb-0'>Blood Group</label>
                  <input
                    type="text"
                    className="input-size form-control-search"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-3 mb-3">
                <div className='employee-search-area-box'>
                  <label className='form-label mb-0'>Gender</label>
                  <input
                    type="text"
                    className="input-size form-control-search"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-3 mb-3">
                <div className='employee-search-area-box'>
                  <label className='form-label mb-0'>D.O.B.</label>
                  <input
                    type="date"
                    className="input-size form-control-search"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-3 mb-3">
                <div className='employee-search-area-box'>
                  <label className='form-label mb-0'>Marital Status</label>
                  <input
                    type="text"
                    className="input-size form-control-search"
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className='employee-search-area-box'>
                  <label className='form-label mb-0'>Physically Challenge</label>
                  <input
                    type="text"
                    className="input-size form-control-search"
                    name="physicallyChallenge"
                    value={formData.physicallyChallenge}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-3 mb-3">
                <div className='employee-search-area-box'>
                  <label className='form-label mb-0'>Father Name</label>
                  <input
                    type="text"
                    className="input-size form-control-search"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-3 mb-3">
                <div className='employee-search-area-box'>
                  <label className='form-label mb-0'>Mother Name</label>
                  <input
                    type="text"
                    className="input-size form-control-search"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-3 mb-3">
                <div className='employee-search-area-box'>
                  <label className='form-label mb-0'>Spouse Name</label>
                  <input
                    type="text"
                    className="input-size form-control-search"
                    name="spouseName"
                    value={formData.spouseName}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </Tab>

        <Tab eventKey="documents" title={<><i className="bx bx-file"></i> Documents</>}>
          <div className='employes-documen-box'>
            <div className='employes-document-row'>
              <div className='employes-document-imges'>
                <img src={Adharimages1}  alt="Adhar Front" className="images-box" />
              </div>
              <div className='employes-document-imges'>
                <img src={Adharimages2} alt="Adhar Front" className="images-box" />
              </div>
              <div className='employes-document-imges'>
                <img src={Panimages3} alt="Adhar Front" className="images-box" />
              </div>
            </div>
          </div>
        </Tab>

        <Tab eventKey="permissions" title={<><i className="bx bx-lock"></i> Permissions</>}>
          <ul className="permission-checkboxes p-0 list-unstyled mt-0">
            {permissions.map((item, idx) => (
              <li key={idx} className="permission-checkboxes mt-0">
                <label className="permission-checkbox d-flex align-items-center gap-2">
                  <input type="checkbox" />
                  <span>
                    <span className="me-2">{idx + 1}.</span> {item}
                  </span>
                </label>
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-end">
            <a href="/admin/adminpermissions">View all</a>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default TabsSection;
