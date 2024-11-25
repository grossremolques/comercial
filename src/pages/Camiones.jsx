import { MainTitle } from "../components/Titles";
import IconTitle from "../assets/semi-camion.png";
import { Outlet } from "react-router-dom";
export default function Camiones() {
  return (
    <div className="mt-4 text-center">
      <MainTitle title="Camiones" urlIcon={IconTitle} />
      <Outlet/>
    </div>
  );
}
