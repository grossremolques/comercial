import { RouterProvider, createHashRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Camiones from "./pages/Camiones";
import Oportunidades from "./pages/Oportunidades";
import SeguimientoProveedores from "./pages/SeguimientoProveedores";
import Riesgos from "./pages/Riesgos";
import { CamionesProvider } from "./context/Camiones/CamionesContext";
import CamionID from "./pages/CamionID";
import CamionesHome from "./components/CamionesHome";
import Error from "./pages/Error";
import "./App.css";
import { ClientesProvider } from "./context/Clientes/ClientesContext";
import NewCamion from "./pages/NewCamion";
import { ModalContextProvider } from "./context/ModalContext";
import { useRouteError } from "react-router-dom";
import { Alert } from "react-bootstrap";
function ErrorBoundary({ message }) {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return (
    <Alert variant="danger" className="mt-5">
      {message}
    </Alert>
  );
}
function App() {
  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/camiones",
          element: (
            <CamionesProvider>
              <Camiones />
            </CamionesProvider>
          ),
          children: [
            {
              path: "/camiones",
              element: <CamionesHome />,
              errorElement: (
                <ErrorBoundary
                  message={"Problemas para leer el registro de Camiones"}
                />
              ),
            },
            {
              path: "/camiones/:id",
              element: <CamionID />,
              errorElement: (
                <ErrorBoundary
                  message={"Problemas para leer el los datos del Camión"}
                />
              ),
            },
            {
              path: "/camiones/new-camion",
              element: <NewCamion />,
              errorElement: (
                <ErrorBoundary
                  message={"Problemas para acceder al ingreso de Camiones"}
                />
              ),
            },
          ],
        },
        { path: "/oportunidades", element: <Oportunidades /> },
        { path: "/riesgos", element: <Riesgos /> },
        {
          path: "/seguimiento-proveedores",
          element: <SeguimientoProveedores />,
        },
      ],
    },
    { path: "*", element: <Error /> },
  ]);

  return (
    <ModalContextProvider>
      <AuthContextProvider>
        <ClientesProvider>
          <RouterProvider router={router} />
        </ClientesProvider>
      </AuthContextProvider>
    </ModalContextProvider>
  );
}

export default App;
