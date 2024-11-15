import { useCamiones } from "../context/Camiones/CamionesContext";
import { useEffect, useState } from "react";
import TableComponent from "../components/TableComponent";
import { MainTitle } from "../components/Titles";
import IconTitle from "../assets/semi-camion.png";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import CamionesHome from "../components/CamionesHome";
import { Outlet } from "react-router-dom";
export default function Camiones() {
  
  return (
    <div className="mt-4 text-center">
      <MainTitle title="Camiones" urlIcon={IconTitle} />
      <Outlet/>
    </div>
  );
}
