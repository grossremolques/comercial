import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { ModalComponent } from "./ModalComponent";
import { useModal } from "../context/ModalContext";
export default function Layout() {
  const {message }= useModal()
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
          <ModalComponent
            modalId="error"
            title="🚫 Error"
            body={
              <div>
                {message}
              </div>
            }
            showButtonsClose={false}
          />
        </>
      )}
    </>
  );
}
