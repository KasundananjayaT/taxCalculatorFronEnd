import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "./common/DashboardNavbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {
  getEmpDataByName,
  calculateSal,
} from "./common/service/apiService/allApi";
import Swal from "sweetalert2";
import _ from "lodash";

export default function Dashboard() {
  const nav = useNavigate();
  const [empID, setEMPID] = useState("");
  const [NIC, setNIC] = useState("");
  const [name, setName] = useState("");
  const [activeSearches, setActiveSearches] = useState([]);
  const [month, setMonth] = useState("");
  const [grossSalary, setGrossSalary] = useState("");
  const [Salarydetails, setSalaryDetails] = useState([]);

  const handleSearch = _.debounce((e) => {
    const inputValue = e.target.value;

    if (inputValue === "" || inputValue.length < 2) {
      setActiveSearches([]);
      return false;
    }

    let rsp = getEmpDataByName(inputValue);
    rsp
      .then((response) => {
        const dataList = response.data;
        setActiveSearches(dataList.data);
        console.log(activeSearches);
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  }, 300);

  const handleItemClick = (id) => {
    setEMPID(activeSearches[id].empID);
    setNIC(activeSearches[id].empName);
    setName(activeSearches[id].nic);
    setActiveSearches([]);
  };
  const Calculate = () => {
    const empDetails = { empID, month, grossSalary };
    if (empID === "" || month === "" || grossSalary === "") {
      Swal.fire({
        title: "Error",
        text: "Empty Column",
        icon: "error",
      });
    } else {
      calculateSal(empDetails)
        .then((response) => {
          if (response.data.responseCode === "06") {
            Swal.fire({
              title: "Error",
              text: "Already Calculated",
              icon: "error",
            });
          } else {
            Swal.fire({
              title: "Ready to save",
              icon: "warning",
              text: "are you sure?",
            }).then(() => setSalaryDetails(response.data.data));
          }
        })
        .catch((error) => {
          console.error("Error occurred:", error);
        });
    }
  };

  useEffect(() => {
    let responseCode = sessionStorage.getItem("responseCode");
    if (responseCode !== "00") {
      nav("/");
    }
  }, [nav]);

  return (
    <div>
      <DashboardNavbar />
      <div className="flex justify-center mt-24 w-screen items-center">
        <Card style={{ width: "40rem" }}>
          <Card.Body>
            <Card.Title className="flex flex-row pl-4 bg-neutral-100 border rounded-lg w-full h-16 justify-between items-center">
              Tax Calculator
              <div div className="w-60 font-medium flex flex-col p-2">
                <form className="w-[400] relative">
                  <div className="relative">
                    <input
                      type="search"
                      placeholder="Type here"
                      className="w-full p-2 bg-white rounded-md text-sm font-normal "
                      onChange={(e) => handleSearch(e)}
                    />
                    {activeSearches.length > 0 && (
                      <div className="absolute mt-1 pl-2 bg-neutral-200 w-full left-1/2 -translate-x-1/2 flex flex-col gap-2 rounded">
                        {activeSearches.map((employee, index) => (
                          <div
                            key={employee.empID}
                            className="flex flex-col w-full hover:bg-blue-400"
                            onClick={() => handleItemClick(index)}
                          >
                            <span className="text-base">{employee.empID}</span>
                            <div className="flex gap-2 text-sm">
                              <span>{employee.empName}</span>
                              <span>{employee.nic}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </Card.Title>
            <Card.Text>
              <div className="flex flex-col pl-4 w-fit">
                <label>Employee ID : {empID} </label>
                <label>Name : {name} </label>
                <label>NIC : {NIC}</label>
              </div>
            </Card.Text>
            <Card.Text>
              <form class="p-3">
                <div class="d-flex gap-3">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Enter Salary"
                    onChange={(e) => {
                      setGrossSalary(e.target.value);
                    }}
                    required
                  />
                  <select
                    class="form-select"
                    required
                    onChange={(e) => setMonth(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Select a month
                    </option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                  <Button class="btn btn-primary" onClick={Calculate}>
                    Calculate
                  </Button>
                </div>
              </form>
            </Card.Text>
            <Card.Text className="bg-neutral-100 p-4">
              <div className="text-lg">
                <table className="w-80 border border-collapse border-gray-500">
                  <tr>
                    <td className="p-2">Month</td>
                    <td className="p-2">{Salarydetails.month}</td>
                  </tr>
                  <tr>
                    <td className="p-2">Gross Salary</td>
                    <td className="p-2">{Salarydetails.grossSalary}</td>
                  </tr>
                  <tr>
                    <td className="p-2">Deducted Tax</td>
                    <td className="p-2  text-red-600">
                      {Salarydetails.deductedTax}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2">Employer Contribution</td>
                    <td className="p-2">
                      {Salarydetails.employerContribution}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2">Employee Contribution</td>
                    <td className="p-2 text-red-600">
                      {Salarydetails.employeeContribution}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2">Total EPF</td>
                    <td className="p-2 ">{Salarydetails.totalEpf}</td>
                  </tr>
                  <tr>
                    <td className="p-2">ETF</td>
                    <td className="p-2  text-red-600">{Salarydetails.etf}</td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="p-2">Take Home Salary</td>
                    <td className="p-2 font-semibold">
                      {Salarydetails.takeHomeSal}
                    </td>
                  </tr>
                </table>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
