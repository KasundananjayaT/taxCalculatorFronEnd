import axios from "axios";
const ServerLoc =
  "https://api-end-point-tax-spring-app-tax.azuremicroservices.io/";

const Login_URL = ServerLoc + "api/v1/login/validUser";
const Change_PW_URL = ServerLoc + "api/v1/login/changePassword";
const FIND_EMP_NAME = ServerLoc + "api/v1/emp/getEmployeeByName";
const Calculate_Salary = ServerLoc + "api/v1/calculate/salary";
const SaveNewEMPLINK = ServerLoc + "api/v1/emp/saveEmp";
const EmployeeAllDetails = ServerLoc + "api/v1/calculate/getSalaryofAllemp";
const EmployeeAllDetailsBYIDLink =
  ServerLoc + "api/v1/calculate/getSalaryofEmp";

export const validUser = (uname, pword) => {
  const url = `${Login_URL}/${uname}/${pword}`;
  return axios.get(url);
};

export const saveNewPwd = (pwc) => {
  return axios.put(Change_PW_URL, pwc);
};

export const getEmpDataByName = (name) => {
  const url = `${FIND_EMP_NAME}/${name}`;
  return axios.get(url);
};
export const calculateSal = (details) => {
  return axios.post(Calculate_Salary, details);
};
export const SaveNewEMP = (empDetails) => {
  return axios.post(SaveNewEMPLINK, empDetails);
};
export const getAllEmployeeSalary = () => {
  return axios.get(EmployeeAllDetails);
};
export const getAllEmployeeSalaryByID = (EMPID) => {
  const url = `${EmployeeAllDetailsBYIDLink}/${EMPID}`;
  return axios.get(url);
};
