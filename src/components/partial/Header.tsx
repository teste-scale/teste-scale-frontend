/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { ReactComponent as IconTest } from "../../assets/icon-test.svg";

export const Header = () => {
  return (
    <Navbar className="primary-menu" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#">
          <IconTest className="icon-app" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto d-flex justify-content-center">
            <Nav.Link className="mx-2" href="/">
              {"Lista de Usuários"}
            </Nav.Link>
            <Nav.Link className="mx-2" href="/country-list">
              {"Lista de Países"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
