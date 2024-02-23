import React, { useEffect, useState } from "react";
import DashboardNavBar from "../components/common/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { SaveNewEMP } from "./common/service/apiService/allApi";
import Swal from "sweetalert2";

export default function AddNew() {
  const nav = useNavigate();
  const back = () => {
    nav("/Dashboard");
  };
  const [empName, setName] = useState("");
  const [nic, setNIC] = useState("");
  const [city, setCity] = useState("");

  const nameRegex = /^[A-Za-z ]{0,30}$/;
  const nicRegex = /^[0-9]{12}|[0-9]{9}[Vv]$/;
  const cityRegex = /^[A-Za-z ]{0,20}$/;

  useEffect(() => {
    let responseCode = sessionStorage.getItem("responseCode");
    if (responseCode !== "00") {
      nav("/");
    }
  }, [nav]);

  const saveEmp = async () => {
    const empDetails = { empName, nic, city };
    if (empName === "" || nic === "" || city === "") {
      Swal.fire({
        icon: "error",
        title: "Invalid",
        text: "Emplty colomns are not allowed",
      });
    } else {
      try {
        const response = await SaveNewEMP(empDetails);
        console.log(response.data.data);
        if (response.data.responseCode === "00") {
          Swal.fire({
            icon: "success",
            title: "Saved",
            text: "Employee ID is: " + response.data.data.empID,
          });
        } else {
          Swal.fire({
            icon: "warning",
            title: "Already Registered",
            text: "Employee ID is: " + response.data.data.empID,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <DashboardNavBar />
      <div className="flex justify-center items-center mt-40">
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title className="flex flex-row pl-4 bg-neutral-100 border rounded-lg w-full h-16 justify-between items-center">
              Registration Form
            </Card.Title>
            <Card.Text className="mt-11 pl-2">
              <div>
                <Form>
                  <Form.Group className="mb-1" controlId="formGroupName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name..."
                      value={empName}
                      onChange={(e) => setName(e.target.value)}
                      required
                      title="Only letters and spaces are allowed"
                      className={!nameRegex.test(empName) ? "is-invalid" : ""}
                    />
                  </Form.Group>

                  <Form.Group className="mb-1" controlId="formGroupNIC">
                    <Form.Label>NIC</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="NIC..."
                      value={nic}
                      onChange={(e) => setNIC(e.target.value)}
                      required
                      title="Enter a valid NIC number"
                      className={!nicRegex.test(nic) ? "is-invalid" : ""}
                    />
                  </Form.Group>

                  <Form.Group className="mb-1" controlId="formGroupCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="City..."
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      pattern="[A-Za-z ]*"
                      title="Only letters and spaces are allowed"
                      className={!cityRegex.test(city) ? "is-invalid" : ""}
                    />
                  </Form.Group>
                </Form>
              </div>
            </Card.Text>

            <div className="pl-2 flex justify-between mt-4 bg-neutral-100 p-3 rounded-md border-1">
              <Button variant="danger" onClick={back}>
                Back
              </Button>
              <Button variant="success" onClick={saveEmp}>
                Save
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
