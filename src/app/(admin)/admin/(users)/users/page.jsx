// // /app/(admin)/admin/(users)/users/page.jsx

'use client';
import React, { useEffect, useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import ModalWrapper from '@/app/(admin)/_common/modal/modal';
import { handelAsyncErrors } from '@/helpers/asyncErrors';
import Breadcrumb from '@/app/(admin)/_common/Breadcrumb';

function UsresPage() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [itemsPerPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState('');
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editData, setEditData] = useState({
    registerusername: '',
    email: '',
    phoneNumber: '',
    role: ''
  });

  async function fetchContacts() {
    const response = await fetch(`/api/v1/otpuser/getallusers?page=${currentPage}&limit=${itemsPerPage}`);
    const data = await response.json();

    return handelAsyncErrors(async () => {
      if (response.ok && data.status === 200) {
        setContacts(data.users);
        setTotalResults(data.totalResult);
        setFilteredContacts(data.users);
      } else {
        toast.error(data.message || 'Failed to fetch Contacts');
      }
      setLoading(false);
    });
  }

  useEffect(() => {
    fetchContacts();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = contacts.filter(contact =>
        (contact.registerusername?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
        (contact.email?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
        (contact.phoneNumber || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(contacts);
    }
  }, [contacts, searchQuery]);  

  const handleConfirm = async () => {
    const response = await fetch(`/api/v1/otpuser/delete/${deleteItem}`, { method: 'DELETE' });
    const data = await response.json();
    return handelAsyncErrors(async () => {
      if (response.ok && data.status === 200) {
        fetchContacts();
        toast.success(data.message || 'Contact deleted successfully');
        setIsOpen(false);
      } else {
        toast.error(data.message || 'Failed to delete contact');
      }
    });
  };

  const handleDelete = (id) => {
    setIsOpen(true);
    setDeleteItem(id);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEdit = (contact) => {
    setIsEditOpen(true);
    setEditItem(contact._id);
    setEditData({
      registerusername: contact.registerusername || '',
      email: contact.email || '',
      phoneNumber: contact.phoneNumber || '',
      role: contact.role || 'user'
    });
  };

  const handleEditSubmit = async () => {
    const response = await fetch(`/api/v1/otpuser/update/${editItem}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editData),
    });
    const data = await response.json();

    return handelAsyncErrors(async () => {
      if (response.ok && data.status === 200) {
        fetchContacts();
        toast.success(data.message || 'Contact updated successfully');
        setIsEditOpen(false);
      } else {
        toast.error(data.message || 'Failed to update contact');
      }
    });
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="admin-packages">
      <ModalWrapper
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
      />
      <div className="package_header">
      <Breadcrumb path="/admin/users" />
      <div className="search-users-input">
          <input
            type="text"
            placeholder="Search by Name, Email, or Phone Number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h2>Edit User</h2>
            <label htmlFor="registerusername">Name:</label>
            <input
              type="text"
              name="registerusername"
              value={editData.registerusername}
              onChange={handleEditChange}
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={editData.email}
              onChange={handleEditChange}
            />
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={editData.phoneNumber}
              onChange={handleEditChange}
            />
            <label htmlFor="role">Role:</label>
            <select name="role" value={editData.role} onChange={handleEditChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button onClick={handleEditSubmit}>Save Changes</button>
            <button onClick={() => setIsEditOpen(false)} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      )}


      {error && <div className="error">{error}</div>}
      <div className="admin-packages-table-container">
        <table className="admin-packages-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="loading">Loading...</td>
              </tr>
            ) : filteredContacts.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">No Contacts Available</td>
              </tr>
            ) : (
              filteredContacts.map(contact => (
                <tr key={contact._id}>
                  <td data-label="ID">{contact._id}</td>
                  <td data-label="Name">{contact.registerusername || 'N/A'}</td> {/* Handle Null Values */}
                  <td data-label="Email">{contact.email || 'N/A'}</td> {/* Handle Null Values */}
                  <td data-label="Phone Number">{contact.phoneNumber || 'N/A'}</td> {/* Handle Null Values */}
                  <td data-label="Role">{contact.role}</td> {/* New Role Field */}
                  <td data-label="Actions">
                    <span className="actions">
                      <FaEdit className="action-icon edit" title="Edit" onClick={() => handleEdit(contact)} />
                      <FaTrashAlt className="action-icon delete" title="Delete" onClick={() => handleDelete(contact._id)} />
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          {'<<'}
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          {'<'}
        </button>
        <span className="pagination-info">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          {'>'}
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          {'>>'}
        </button>
      </div>
    </div>
  );
}

export default UsresPage;
