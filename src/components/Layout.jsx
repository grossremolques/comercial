import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
export default function Layout() {
  const { auth, getAuth } = useAuth();
  useEffect(() => {
    getAuth();
  }, []);
  return (
    <>
      {auth && (
        <>
          <Navigation />
          <Container>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}
