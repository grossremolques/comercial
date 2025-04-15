import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import IconApp from "../assets/buy-and-sell.png";

export default function Navigation() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink className="navbar-brand" to="/">
          <img
            alt=""
            src={IconApp}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Comercial - Ventas
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* <NavLink className="nav-link" to="/" style={{ color: "#198754" }}>
              <i className="bi bi-house-fill"></i> Inicio
            </NavLink> */}
            <li className="nav-item">
              <a className="nav-link" target="_blank" href="https://grossremolques.github.io/ventas/#/">Inicio</a>
            </li>
            <NavLink
              className="nav-link"
              to="/camiones"
              style={{ color: "#fd7e14" }}
            >
              <i className="bi bi-truck-front-fill"></i> Camiones
            </NavLink>
            <NavLink
              className="nav-link"
              to="/clientes"
              style={{ color: "#6610f2" }}
            >
              <i className="bi bi-person-fill"></i> Clientes
            </NavLink>
            <NavLink
              className="nav-link"
              to="/unidades-gross"
              style={{ color: "#198754" }}
            >
              <i className="bi bi-google"></i> Unidades Gross
            </NavLink>
            {/* <li className="nav-item">
              <a className="nav-link" target="_blank" href="https://grossremolques.github.io/ventas/#/clients/">Clientes</a>
            </li> */}
            <li className="nav-item">
              <a className="nav-link" target="_blank" href="https://grossremolques.github.io/ventas/#/trailers/">Unidades 0 KM</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" target="_blank" href="https://grossremolques.github.io/ventas/#/used-trailers/">Unidades Usadas</a>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
