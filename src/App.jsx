import { RouterProvider, createHashRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Camiones from "./pages/Camiones";
import Oportunidades from "./pages/Oportunidades";
import SeguimientoProveedores from "./pages/SeguimientoProveedores";
import Riesgos from "./pages/Riesgos";
import { CamionesProvider } from "./context/Camiones/CamionesContext";
import { CamionID } from "./pages/CamiónID";
import CamionesHome from "./components/CamionesHome";
import Error from "./pages/Error"
import "./App.css";

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
            { path: "/camiones", element: <CamionesHome /> },
            { path: "/camiones/:id", element: <CamionID /> },
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
    { path: "*", element: <Error/> },
  ]);

  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
