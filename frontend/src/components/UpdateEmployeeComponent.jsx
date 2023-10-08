import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

function UpdateEmployeeComponent() {
    const { id } = useParams(); // Get the ID parameter from the URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        emailId: '',
        age: '',
        address: ''
    });

    useEffect(() => {
        // Load the employee data for editing when the component mounts
        EmployeeService.getEmployeeById(id).then((res) => {
            const employeeData = res.data;
            setFormData(employeeData);
        });
    }, [id]);

    // Event handler for input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Event handler for form submission
    const updateEmployee = (e) => {
        e.preventDefault();
        // You can handle the form submission logic here, e.g., send data to an API
        let updatedEmployee = { ...formData };
        EmployeeService.updateEmployee(id, updatedEmployee).then((res) => {
            navigate('/employees');
        });
        console.log('Form submitted with updated data:', updatedEmployee);

        // After updating, navigate back to the employee list
    };

    // Event handler for cancel button click
    const handleCancel = () => {
        // Navigate back to the employee list
        navigate('/employees');
        console.log('Cancel button clicked');
    };

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h3 className='text-center'>Update Employee</h3>
                        <div className='card-body'>
                            <form onSubmit={updateEmployee}>
                                <div className='form-group'>
                                    <label>First Name</label>
                                    <input
                                        type='text'
                                        name='firstName'
                                        placeholder='First Name'
                                        className='form-control'
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />

                                    <label>Last Name</label>
                                    <input
                                        type='text'
                                        name='lastName'
                                        placeholder='Last Name'
                                        className='form-control'
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />

                                    <label>Email</label>
                                    <input
                                        type='email'
                                        name='emailId'
                                        placeholder='Email'
                                        className='form-control'
                                        value={formData.emailId}
                                        onChange={handleChange}
                                    />

                                    <label>Age</label>
                                    <input
                                        type='age'
                                        name='age'
                                        placeholder='Age'
                                        className='form-control'
                                        value={formData.age}
                                        onChange={handleChange}
                                    />

                                    <label>Address</label>
                                    <input
                                        type='address'
                                        name='address'
                                        placeholder='Address'
                                        className='form-control'
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button className='btn btn-success' type='submit'>
                                    Update
                                </button>
                                <button
                                    className='btn btn-danger ml-2'
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateEmployeeComponent;
