import { MainTitle } from "../../components/Titles";
import IconTitle from "../../assets/letra-gross-icon.png";
import { Outlet } from "react-router-dom";
export default function UnidadesGross() {
  return (
    <>
      <MainTitle title="Unidades Gross" urlIcon={IconTitle}  mt={5} mb={4}/>
      <Outlet/>
    </>
  );
}
