import { RouterProvider, createHashRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Camiones from "./pages/Camiones/Camiones";
import { CamionesProvider } from "./context/Camiones/CamionesContext";
import CamionID from "./pages/Camiones/CamionID";
import CamionesHome from "./pages/Camiones/CamionesHome";
import Error from "./pages/Error";
import "./App.css";
import { ClientesProvider } from "./context/Clientes/ClientesContext";
import NewCamion from "./pages/Camiones/NewCamion";
import { ModalContextProvider } from "./context/ModalContext";
import { useRouteError } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Clientes from "./pages/Clientes/Clientes";
import UnidadesGross from "./pages/Gross/Unidades";
import UnidadesGrossHome from "./pages/Gross/UnidadesGrossHome";
import { UnidadesGrossProvider } from "./context/UnidadesGross/UnidadesGrossContext";
import { GestoriaProvider } from "./context/Gestoria/GestoriaContext";
import UnidadesGrossID from "./pages/Gross/UnidadesGrossID";
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
        { path: "/clientes", element: <Clientes /> },
        {
          path: "/unidades-gross",
          element: (
            <GestoriaProvider>
              <UnidadesGrossProvider>
                <UnidadesGross />
              </UnidadesGrossProvider>
            </GestoriaProvider>
          ),
          children: [
            { path: "/unidades-gross", element: <UnidadesGrossHome /> },
            { path: "/unidades-gross/:id", element: <UnidadesGrossID /> },
          ],
        }
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
