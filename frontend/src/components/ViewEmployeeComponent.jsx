import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

function ViewEmployeeComponent() {
    const { id } = useParams();
    const [employee, setEmployee] = useState({});

    useEffect(() => {
        // Fetch employee data by ID when the component mounts
        EmployeeService.getEmployeeById(id)
            .then((res) => {
                setEmployee(res.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [id]); // Include id in the dependency array to re-fetch when id changes

    return (
        <div className='employee-detail'>
            <br></br>
            <div className='card col-md-6 offset-md-3'>
                <h3 className='text-center'>Employee Detail</h3>
                <div className='card-body'>
                    {/* <div className='avatar-box'>
                        <img
                            src={`path_to_avatar/${employee.avatarFileName}`} // Replace with the actual path to the avatar
                            alt='Avatar'
                            className='avatar'
                        />
                    </div> */}
                    <table className='table'>
                        <tbody>
                            <tr>
                                <td><strong>ID:</strong></td>
                                <td>{employee.id}</td>
                            </tr>
                            <tr>
                                <td><strong>First Name:</strong></td>
                                <td>{employee.firstName}</td>
                            </tr>
                            <tr>
                                <td><strong>Last Name:</strong></td>
                                <td>{employee.lastName}</td>
                            </tr>
                            <tr>
                                <td><strong>Email:</strong></td>
                                <td>{employee.emailId}</td>
                            </tr>
                            <tr>
                                <td><strong>Age:</strong></td>
                                <td>{employee.age}</td>
                            </tr>
                            <tr>
                                <td><strong>Address:</strong></td>
                                <td>{employee.address}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewEmployeeComponent;
