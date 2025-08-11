import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../../MainComponents/breadcrumb/Breadcrumb';
import Pagination from '../../../MainComponents/pagination/Pagination';
import AddVideoForm from './AddVideoForm';
import deleteLogo from '../../../../assets/Images/deleteLogo.png';

function Trainingvideo() {
    const [videos, setVideos] = useState([
        {
            id: 1,
            date_video: '2025-06-13',
            uploader_name: 'Amit Kumar',
            Product_name: 'Loan',
            subProduct_name: 'Home Loan',
            language: 'English',
            video_link: 'https://example.com/video1',
        },
        {
            id: 2,
            date_video: '2025-06-12',
            uploader_name: 'Priya Sharma',
            Product_name: 'Insurance',
            subProduct_name: 'Health Insurance',
            language: 'Hindi',
            video_link: 'https://example.com/video2',
        },
    ]);

    const [filters, setFilters] = useState({ searchText: '', date: '' });
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalType, setModalType] = useState('');
    const itemsPerPage = 10;

    const handleAddVideo = (newVideo) => {
        setVideos(prev => [...prev, { ...newVideo, id: prev.length + 1 }]);
        setShowForm(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFilters({ searchText: '', date: '' });
    };

    const filteredtrainingvideo = videos.filter(emp =>
        emp.uploader_name.toLowerCase().includes(filters.searchText.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currenttrainingvideo = filteredtrainingvideo.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredtrainingvideo.length / itemsPerPage);

    const toggleCheckbox = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const toggleAllCheckboxes = () => {
        const currentPageIds = currenttrainingvideo.map(emp => emp.id);
        const allSelected = currentPageIds.every(id => selectedIds.includes(id));
        setSelectedIds(prev =>
            allSelected
                ? prev.filter(id => !currentPageIds.includes(id))
                : [...new Set([...prev, ...currentPageIds])]
        );
    };

    return (
        <section className='main-content-area'>
            <Breadcrumb
                title='Training Video'
                titleIcon='bx bx-video'
                buttons={[
                    {
                        label: (
                            <Link to="/superadmin/Supportingtools">
                                <button type='button' className='addTaskBtn'>
                                    <i className='bx bx-arrow-back'></i> Back
                                </button>
                            </Link>
                        ),
                    },
                    {
                        label: (
                            <button className='addTaskBtn' onClick={() => setShowForm(true)}>
                                <FaPlus className='mr-1' /> Add Video
                            </button>
                        ),
                    },
                    {
                        label: (
                            <>
                                Total Videos :{' '}
                                <span className='badge-length'>{filteredtrainingvideo.length}</span>
                            </>
                        ),
                        className: 'btn-bg-2',
                    },
                ]}
            />

            <div className={`slide-form-wrapper ${showForm ? 'show' : ''}`}>
                <AddVideoForm onClose={() => setShowForm(false)} onAddVideo={handleAddVideo} />
            </div>
            <div className={`overlay ${showForm ? 'visible' : ''}`} onClick={() => setShowForm(false)}></div>

            <div className='row-bg mt-3'>
                <div className='row align-items-center filterformpay flex-wrap'>
                    <div className='col-lg-3 mb-2'>
                        <label className='form-label'>Uploader Name</label>
                        <input
                            className='form-control-search'
                            name='searchText'
                            value={filters.searchText}
                            onChange={handleInputChange}
                            placeholder='Search'
                        />
                    </div>
                    <div className='col-lg-3 mb-2'>
                        <label className='form-label'>Date</label>
                        <input
                            className='form-control-search'
                            name='date'
                            type='date'
                            value={filters.date}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='col-lg-3 d-flex gap-2 mt-4'>
                        <button className='btn btn-primary btn-sm' onClick={() => setCurrentPage(1)}>
                            <i className='bx bx-filter-alt'></i> Filter
                        </button>
                        <button className='btn btn-sm custom-reset' onClick={handleReset}>
                            <i className='bx bx-reset'></i> Reset
                        </button>
                    </div>
                </div>

                <div className='table-responsive mt-3'>
                    <table className='table table-bordered table-striped'>
                        <thead className='table-thead-data-color'>
                            <tr>
                                <th>
                                    <input
                                        type='checkbox'
                                        onChange={toggleAllCheckboxes}
                                        checked={
                                            currenttrainingvideo.length > 0 &&
                                            currenttrainingvideo.every(emp => selectedIds.includes(emp.id))
                                        }
                                    />
                                </th>
                                <th>S.no.</th>
                                <th>Date</th>
                                <th>Uploader Name</th>
                                <th>Product</th>
                                <th>Sub Product</th>
                                <th>Language</th>
                                <th>Video Link</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='table-tbody-data'>
                            {currenttrainingvideo.length > 0 ? (
                                currenttrainingvideo.map((emp, index) => (
                                    <tr key={emp.id}>
                                        <td>
                                            <input
                                                type='checkbox'
                                                checked={selectedIds.includes(emp.id)}
                                                onChange={() => toggleCheckbox(emp.id)}
                                            />
                                        </td>
                                        <td>{indexOfFirstItem + index + 1}</td>
                                        <td>{emp.date_video}</td>
                                        <td>{emp.uploader_name}</td>
                                        <td>{emp.Product_name}</td>
                                        <td>{emp.subProduct_name}</td>
                                        <td>{emp.language}</td>
                                        <td>
                                            <a href={emp.video_link} target='_blank' rel='noreferrer'>
                                                {emp.video_link}
                                            </a>
                                        </td>
                                        <td>
                                            <Link to='#' className='text-dark me-3' data-bs-toggle='modal' data-bs-target='#productModal' onClick={() => {
                                                setSelectedProduct(emp);
                                                setModalType('edit');
                                            }}>
                                                <FaEdit />
                                            </Link>
                                            <Link to='#' className='text-dark' data-bs-toggle='modal' data-bs-target='#Deletestatusformlabe' onClick={() => {
                                                setSelectedProduct(emp);
                                                setModalType('delete');
                                            }}>
                                                <FaTrash />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan='9' className='text-center'>No records found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
            </div>

            {/* Edit Modal */}
            <div className='modal fade' id='productModal' tabIndex='-1'>
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Edit Product</h5>
                            <button className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        {selectedProduct && (
                            <form className='modal-body'>
                                <div className='mb-3'>
                                    <label>Uploader Name</label>
                                    <input className='form-control' type='text' defaultValue={selectedProduct.uploader_name} />
                                </div>
                                <div className='mb-3'>
                                    <label>Product Name</label>
                                    <input className='form-control' type='text' defaultValue={selectedProduct.Product_name} />
                                </div>
                                <div className='mb-3'>
                                    <label>Sub Product Name</label>
                                    <input className='form-control' type='text' defaultValue={selectedProduct.subProduct_name} />
                                </div>
                                <div className='modal-footer'>
                                    <button className='btn btn-danger btn-sm' data-bs-dismiss='modal'>Save</button>
                                    <button className='btn btn-sm custom-reset' data-bs-dismiss='modal'>Cancel</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            <div className='modal fade' id='Deletestatusformlabe' tabIndex='-1'>
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Delete Video</h5>
                            <button className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div className='modal-body text-center'>
                            <img src={deleteLogo} alt='deleteLogo' className='deleteLogo' />
                            <p>Are you sure you want to delete <strong>{selectedProduct?.Product_name}</strong>?</p>
                        </div>
                        <div className='modal-footer sticky-bottom bg-white z-10'>
                            <button className='btn btn-danger btn-sm' type='submit' data-bs-dismiss='modal'>Delete</button>
                            <button className='btn btn-sm custom-reset' type='button' data-bs-dismiss='modal'>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Trainingvideo;
