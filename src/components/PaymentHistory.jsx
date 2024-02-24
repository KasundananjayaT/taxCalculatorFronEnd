import React, { useEffect, useState } from "react";
import DashboardNavbar from "./common/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import _ from "lodash";

import {
  getEmpDataByName,
  getAllEmployeeSalary,
  getAllEmployeeSalaryByID,
} from "./common/service/apiService/allApi";

export default function PaymentHistory() {
  const nav = useNavigate();
  const [activeSearches, setActiveSearches] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let rsp = await getAllEmployeeSalary();
        setPaymentDetails(rsp.data.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
    let responseCode = sessionStorage.getItem("responseCode");
    if (responseCode !== "00") {
      nav("/");
    }
  }, [nav]);

  const handleItemClick = async (id) => {
    const selectedEmpID = activeSearches[id].empID;

    try {
      const res = await getAllEmployeeSalaryByID(selectedEmpID);
      const fetchedData = res.data.data;
      setPaymentDetails(fetchedData);
    } catch (error) {
      console.error("Error occurred:", error);
    }

    setActiveSearches([]); // Clear
  };

  const handleSearch = _.debounce((e) => {
    if (e.target.value === "" || e.target.value.length < 2) {
      setActiveSearches([]);
      return false;
    }
    let rsp = getEmpDataByName(e.target.value);
    rsp
      .then((response) => {
        const dataList = response.data;
        setActiveSearches(dataList.data);
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  }, 300);
  return (
    <div>
      <DashboardNavbar />
      <div className="flex justify-center mt-24 w-screen items-center">
        <Card style={{ width: "60rem" }}>
          <Card.Body>
            <Card.Title className="flex flex-row pl-4 bg-neutral-100 border rounded-lg w-full h-16 justify-between items-center">
              Payment History
              <div div className="w-60 font-medium flex flex-col p-2">
                <form className="w-[400] relative">
                  <div className="relative ">
                    <input
                      type="search"
                      placeholder="Type here"
                      className="w-full p-2 bg-white rounded-md text-sm font-normal "
                      onChange={(e) => handleSearch(e)}
                    />
                    {activeSearches.length > 0 && (
                      <div className="absolute mt-1 pl-2 bg-neutral-200 w-full left-1/2 -translate-x-1/2 flex flex-col gap-2 rounded overflow-y-auto">
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
              <div class="table-responsive h-96">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Month</th>
                      <th>Sal</th>
                      <th>Tax</th>
                      <th>Empr</th>
                      <th>Emp</th>
                      <th>EPF</th>
                      <th>ETF</th>
                      <th>TH-sal</th>
                    </tr>
                  </thead>
                  <div></div>
                  <tbody className="max-w-screen max-h-[300px] overflow-hidden">
                    {paymentDetails.length > 0 &&
                      paymentDetails.map((sal, index) => (
                        <tr key={index}>
                          <td>{sal.employee.empID}</td>
                          <td>{sal.month}</td>
                          <td>{sal.grossSalary.toFixed(2)}</td>
                          <td>{sal.deductedTax.toFixed(2)}</td>
                          <td>{sal.employeeContribution.toFixed(2)}</td>
                          <td>{sal.employerContribution.toFixed(2)}</td>
                          <td>{sal.totalEpf.toFixed(2)}</td>
                          <td>{sal.etf.toFixed(2)}</td>
                          <td>{sal.takeHomeSal.toFixed(2)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
