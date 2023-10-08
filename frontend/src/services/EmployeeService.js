import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/employees";

class EmployeeService {

    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    updateEmployee(employeeId, updatedEmployee){
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, updatedEmployee);
    }
    
    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    viewEmployee(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    searchEmployees(searchCriteria, searchValue) {
        const searchUrl = `${EMPLOYEE_API_BASE_URL}/${searchCriteria}?${searchCriteria}=${searchValue}`;
        return axios.get(searchUrl);
    }
}

export default new EmployeeService();
