// src/UserManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [phone, setPhone] = useState('');
    //const [userId, setUserId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    // Fetch users from the API
    const fetchUsers = async () => {
        const response = await axios.post('http://localhost/api/api.php', { action: 'read' });
        setUsers(response.data);
    };

    // Add or update user
    const handleSubmit = async (e) => {
        e.preventDefault();
        const action = isEditing ? 'update' : 'create';
        await axios.post('http://localhost/api/api.php', {
            action,
            //id: userId,
            name,
            email,
            dob,
            phone
        });
        resetForm();
        fetchUsers();
    };

    // Delete user
    const handleDelete = async (id) => {
        await axios.post('http://localhost/api/api.php', { action: 'delete', id });
        fetchUsers();
    };

    // Prepare to edit user
    const handleEdit = (user) => {
        //setUserId(user.id);
        setName(user.name);
        setEmail(user.email);
        setDob(user.dob);
        setPhone(user.phone);
        setIsEditing(true);
        setShowDialog(true);
    };

    // Reset form fields
    const resetForm = () => {
        setName('');
        setEmail('');
        setDob('');
        setPhone('');
        //setUserId(null);
        setIsEditing(false);
        setShowDialog(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>User Management</h1>
            <button onClick={() => setShowDialog(true)}>Add User</button>

            {showDialog && (
                <div className="dialog">
                    <h2>{isEditing ? 'Edit User' : 'Add User'}</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} required />
                        <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
                        <button type="button" onClick={resetForm}>Cancel</button>
                    </form>
                </div>
            )}

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date of Birth</th>
                        <th>Phone</th>
                        <th>Modify</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.dob}</td>
                            <td>{user.phone}</td>
                            <td><button onClick={() => handleEdit(user)}>Modify</button></td>
                            <td><button onClick={() => handleDelete(user.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;