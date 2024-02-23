import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { CiCalculator1 } from "react-icons/ci";
import Button from "react-bootstrap/Button";

export default function Dashboard() {
  const nav = useNavigate();
  const maptoAdd = () => {
    nav("/dashboard/add");
  };
  useEffect(() => {
    const handleHashChange = () => {
      console.log("hashchange event triggered");
      // Clear sessionStorage when hash changes
      sessionStorage.clear();
      console.log("sessionStorage cleared");
    };

    // Add event listener for hashchange
    window.addEventListener("hashchange", handleHashChange);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    let responseCode = sessionStorage.getItem("responseCode");
    if (responseCode !== "00") {
      nav("/");
    }
  }, [nav]);

  return (
    <div>
      <div>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand className="flex flex-row justify-center items-center gap-3">
              <CiCalculator1 className="text-4xl" />
              Tax Calculator
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="ml-auto my-2 my-lg-0 xitems-end justify-end pr-5"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link href="/dashboard">Calculator</Nav.Link>
                <Nav.Link href="/dashboard/payment">Payments</Nav.Link>
              </Nav>
              <div className="flex flex-row justify-between space-x-6">
                <Button variant="outline-success" onClick={maptoAdd}>
                  Add New
                </Button>

                <Link to="/">
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      console.log("clicked");
                      sessionStorage.clear();
                    }}
                  >
                    Logout
                  </Button>
                </Link>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}
