import { useCamiones } from "../context/Camiones/CamionesContext";
import { useEffect, useState } from "react";
import TableComponent from "./TableComponent";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
export default function CamionesHome() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { camiones, getCamiones } = useCamiones();
  const [dataFiltered, setDataFiltered] = useState([]);
  useEffect(() => {
    getCamiones();
  }, []);
  useEffect(() => {
    setDataFiltered(camiones)
  }, [camiones]);
  const columns = [
    {
      name: "Trazabilidad",
      width: "150px",
      selector: (row) =>
        row.trazabilidad
          .toString()
          .replace(/(\d{1})(\d{4})(\d{2})/, "$1.$2-$3"),
      sortable: true,
    },
    {
      name: "Marca",
      width: "200px",
      selector: (row) => row.marca,
      sortable: true,
    },
    {
      name: "Modelo",
      selector: (row) => row.modelo,
      sortable: true,
    },
    {
      name: "VIN",
      width: "190px",
      selector: (row) => row.vin,
      sortable: true,
    },
    {
      name: "Dominio",
      width: "120px",
      selector: (row) => row.dominio,
      sortable: true,
    },
  ];
  const handleFilter = (data) => {
    setDataFiltered(camiones.filter(item => {
        return item.trazabilidad.toString().includes(data.trazabilidadFilter) &&
        item.marca.toLowerCase().includes(data.marcaFilter.toLowerCase()) &&
        item.modelo.toLowerCase().includes(data.modeloFilter.toLowerCase()) &&
        item.vin.toLowerCase().includes(data.vinFilter.toLowerCase()) &&
        item.dominio.toLowerCase().includes(data.dominioFilter.toLowerCase())
      }))
  };
  const handleOpenCamion = (data) => {
    navigate(`/camiones/${data.trazabilidad}`, {state: {camionData: data}})
  }
  return (
    <>
      <Form onSubmit={handleSubmit(handleFilter)} className="my-3">
        <Row className="g-1">
          <Form.Group as={Col} sm={2}>
            <Form.Control
              type="text"
              placeholder="Trazabilidad"
              size="sm"
              {...register("trazabilidadFilter")}
            />
          </Form.Group>
          <Form.Group as={Col} sm={2}>
            <Form.Control
              type="text"
              placeholder="Marca"
              size="sm"
              {...register("marcaFilter")}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control
              type="text"
              placeholder="Modelo"
              size="sm"
              {...register("modeloFilter")}
            />
          </Form.Group>
          <Form.Group as={Col} sm={2}>
            <Form.Control
              type="text"
              placeholder="Vin"
              size="sm"
              {...register("vinFilter")}
            />
          </Form.Group>
          <Form.Group as={Col} sm={2}>
            <Form.Control
              type="text"
              placeholder="Dominio"
              size="sm"
              {...register("dominioFilter")}
            />
          </Form.Group>
          <Col sm={"auto"}>
            <Button
              size="sm"
              variant="primary"
              type="submit"
              onSubmit={handleSubmit(handleFilter)}
            >
              <i className="bi bi-funnel-fill"></i> Filtrar
            </Button>
          </Col>
        </Row>
      </Form>
      <TableComponent
        data={dataFiltered}
        columns={columns}
        handleOnRowClick={handleOpenCamion}
      />
    </>
  );
}
