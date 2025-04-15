import { useEffect, useState } from "react";
import TableComponent from "../../components/TableComponent";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ModalComponent } from "../../components/ModalComponent";
import { useUnidadesGross } from "../../context/UnidadesGross/UnidadesGrossContext";
import { useGestoria } from "../../context/Gestoria/GestoriaContext";
import { dataJoin } from "../../utils/functions";
import { useClientes } from "../../context/Clientes/ClientesContext";
export default function UnidadesGrossHome() {
  const navigate = useNavigate();
  const {clientes, getClientes} = useClientes();
  const {unidadesGross, getUnidadesGross} = useUnidadesGross()
  const {gestoria, getGestoria} = useGestoria();
  const [dataFiltered, setDataFiltered] = useState([]);
  const [dataUnified, setDataUnified] = useState([]);
  const { register, handleSubmit } = useForm();
  const handleFilter = (data) => {
    console.log(dataUnified)
    setDataFiltered(dataUnified.filter(item => {
        return item.trazabilidad.toString().includes(data.trazabilidadFilter) &&
        item.razon_social?.toLowerCase().includes(data.clienteFilter.toLowerCase()) &&
        item.modelo.toLowerCase().includes(data.modeloFilter.toLowerCase()) &&
        item.vin.toLowerCase().includes(data.vinFilter.toLowerCase())
      }))
  };
  const handleOpenCamion = (data) => {
    navigate(`/unidades-gross/${data.trazabilidad}`, {state: {grossData: data}})
  }
  const handleNewCamion = () => {
    navigate(`/camiones/new-camion`)
  }
  useEffect(() => {
    getUnidadesGross();
    getGestoria();
    getClientes();
  }, []);
  useEffect(() => {
    if(unidadesGross.length > 0 && gestoria.length > 0 && clientes.length > 0) {
      getDataUnified()
    }
  }, [unidadesGross, gestoria, clientes]);
  const getDataUnified = () => {
    const newGestoria = dataJoin(gestoria, clientes, 'id_cliente', 'id');
    const data = dataJoin(unidadesGross, newGestoria, 'trazabilidad', 'trazabilidad');
    setDataUnified(data.map(item => {
      item.id = item.trazabilidad;
      item.vin = item.vin || 'No disponible';
      item.razon_social = item.razon_social || '';
      return item;
    })) 
    setDataFiltered(data.map(item => {
      item.id = item.trazabilidad;
      return item;
    })) 
  }
  /*  */
  /* 
  
  const { camiones, getCamiones } = useCamiones();
   */
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
      name: "Cliente",
      width: "200px",
      selector: (row) => row.razon_social,
      sortable: true,
    },
    {
      name: "Modelo",
      width: "210px",
      selector: (row) => row.modelo,
      sortable: true,
    },
    {
      name: "VIN",
      width: "170px",
      selector: (row) => row.vin,
      sortable: true,
    },
    {
      name: "Largo",
      width: "120px",
      selector: (row) => row.largo,
      sortable: true,
    },
    {
      name: "Alt. baranda",
      width: "120px",
      selector: (row) => row.altura_baranda,
      sortable: true,
    },
    {
      name: "Color",
      width: "120px",
      selector: (row) => row.color_carrozado,
      sortable: true,
    },
    {
      name: "F. Entrega",
      width: "130px",
      selector: (row) => row.f_disp_estimada,
      sortable: true,
    },
  ];
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
              placeholder="Cliente"
              size="sm"
              {...register("clienteFilter")}
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
          <Form.Group as={Col}>
            <Form.Control
              type="text"
              placeholder="Color"
              size="sm"
              {...register("colorFilter")}
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
          <Col sm={"auto"}>
            <Button
              size="sm"
              variant="success"
              type="button"
              onClick={handleNewCamion}
            >
              <i className="bi bi-plus-lg"></i> Agregar
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
