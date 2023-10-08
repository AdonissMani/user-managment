import React, { useState, useEffect } from 'react';
import EmployeeService from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

function ListEmployeeComponent() {
    const [employees, setEmployees] = useState([]);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const [searchCriteria, setSearchCriteria] = useState('firstName');
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const itemsPerPage = 5;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedEmployees = employees.slice(startIndex, endIndex);


    useEffect(() => {
        EmployeeService.getEmployees().then((res) => {
            const sortedEmployees = res.data.sort((a, b) => a.firstName.localeCompare(b.firstName)); //sorting Employee 
            setEmployees(sortedEmployees);
            setTotalPages(Math.ceil(sortedEmployees.length / itemsPerPage)); //fixing number of list to be displayed
        });
    }, []);

    const addEmployee = () => {
        navigate('/add-employee');
    };

    const editEmployee = (id) => {
        navigate(`/update-employee/${id}`);
    };

    //Deleting Employee using DELETE button
    const deleteEmployee = (id) => {
        EmployeeService.deleteEmployee(id)
            .then((res) => {
                setEmployees(employees.filter((employee) => employee.id !== id));
                alert('Employee deleted successfully');
            })
            .catch((error) => {
                console.error('Error deleting employee:', error);
                setMessage('Error deleting employee');
            });
    };

    //Navigating to Employee details using VIEW button
    const viewEmployee = (id) => {
        EmployeeService.viewEmployee(id)
            .then(res => {
                navigate(`/view-employee/${id}`)
            })
    };

    //Handling search 1.First Name 2.Last Name 3. Address
    const handleSearch = () => {
        if (searchValue.trim() === '') {
            EmployeeService.getEmployees()
                .then((res) => {
                    setEmployees(res.data);
                    setTotalPages(Math.ceil(res.data.length / itemsPerPage));
                    setCurrentPage(0);
                })
                .catch((error) => {
                    console.error('Error fetching employees:', error);
                    setMessage('Error fetching employees');
                });
        } else {
            EmployeeService.searchEmployees(searchCriteria, searchValue)
                .then((res) => {
                    setEmployees(res.data);
                    setTotalPages(Math.ceil(res.data.length / itemsPerPage));
                    setCurrentPage(0);
                })
                .catch((error) => {
                    console.error('Error searching employees:', error);
                    setMessage('Error searching employees');
                });
        }
    };

    //download hook for converting the obtained list into CSV and downloading it.
    const handleDownload = () => {
        let csvContent = 'Employee First Name,Employee Last Name,Employee Email\n';
        employees.forEach((employee) => {
            csvContent += `${employee.firstName},${employee.lastName},${employee.emailId},${employee.age},${employee.address}\n`; // content col you want to download
        });

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'employee_data.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    //updating pagination with current page number
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <div>
            <h2 className="text-center">Employee List</h2>
            <div className='row'>
                <div className='add-employee'>
                    <button className='btn btn-primary' onClick={addEmployee}>Add Employee</button>
                </div>
            </div>
            <br></br>
            <div className='row'>
                <div className='search-bar'>
                    <select
                        value={searchCriteria}
                        onChange={(e) => setSearchCriteria(e.target.value)}>
                        <option value="firstName">First Name</option>
                        <option value="lastName">Last Name</option>
                        <option value="address">Address</option>
                    </select>
                    <input
                        type="text"
                        placeholder={`Search by ${searchCriteria === "address" ? "Address" : "First Name/Last Name"}`}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button className='btn btn-primary' onClick={handleSearch}>Search</button>
                    <button className='btn-download' onClick={handleDownload}>Download</button>
                </div>
            </div>
            <br></br>
            <div className='row'>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Employee First Name</th>
                            <th>Employee Last Name</th>
                            <th>Employee Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedEmployees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.emailId}</td>
                                <td>
                                    <button style={{ marginLeft: "20px" }} onClick={() => editEmployee(employee.id)} className='btn btn-info'>
                                        Update
                                    </button>
                                    <button style={{ marginLeft: "20px" }} onClick={() => deleteEmployee(employee.id)} className='btn btn-danger'>
                                        Delete
                                    </button>
                                    <button style={{ marginLeft: "20px" }} onClick={() => viewEmployee(employee.id)} className='btn btn-view'>
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='pagination'>
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </div>
        </div>
    );
}

export default ListEmployeeComponent;
