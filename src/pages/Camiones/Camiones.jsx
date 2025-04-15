import { MainTitle } from "../../components/Titles";
import IconTitle from "../../assets/semi-camion.png";
import { Outlet } from "react-router-dom";
export default function Camiones() {
  return (
    <>
      <MainTitle title="Camiones" urlIcon={IconTitle}  mt={5} mb={4}/>
      <Outlet/>
    </>
  );
}
