import { MainTitle } from "../../components/Titles";
import IconTitle from "../../assets/clientes.png";
import { useEffect, useState } from "react";
import TableComponent from "../../components/TableComponent";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useClientes } from "../../context/Clientes/ClientesContext";
import ModalNewCliente from "../../components/ModalNewCliente";
import ModalClienteID from "../../components/ModalClienteID";
import { useModal } from "../../context/ModalContext";
export default function Clientes() {
  const [dataCliente, setDataCliente] = useState({})
  const { handleModalShow} = useModal()
   const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const {clientes, getClientes} = useClientes()
  const [dataFiltered, setDataFiltered] = useState([]);
  const handleFilter = (data) => {
    setDataFiltered(clientes.filter(item => {
        return item.id.toString().includes(data.idFilter) &&
        item.razon_social.toLowerCase().includes(data.razonSocialFilter.toLowerCase()) &&
        item.provincia.toLowerCase().includes(data.provinciaFilter.toLowerCase())
      }))
  };
  const handleNewCliente = () => {
    handleModalShow('modal-new-cliente')
  }
  
  const columns = [
    {
      name: "Código",
      width: "150px",
      selector: (row) =>
        row.id,
      sortable: true,
    },
    {
      name: "Razón Social",
      
      selector: (row) => row.razon_social,
      sortable: true,
    },
    {
      name: "CUIT",
      width: "150px",
      selector: (row) =>
        row.cuit,
      sortable: true,
    },
    {
      name: "Telefono",
      width: "200px",
      selector: (row) => row.telefono,
      sortable: true,
    },
    {
      name: "Provincia",
      width: "190px",
      selector: (row) => row.provincia,
      sortable: true,
    },
  ];
  const handleOpenCliente = (data) => {
    setDataCliente(data)
    handleModalShow('modal-clienteID')
  }
  
  useEffect(() => {
    getClientes();
    
  }, []);
  useEffect(() => {
    setDataFiltered(clientes)
  }, [clientes]);
  const handleRefreshClientes = () => {
    getClientes()
  }
  return (
    <>
      <MainTitle title="Clientes" urlIcon={IconTitle} mt={5} mb={4}/>
        <Form onSubmit={handleSubmit(handleFilter)}>
          <Row className="g-1 mb-4">
            <Form.Group as={Col} sm={2}>
              <Form.Control
                type="number"
                placeholder="Código"
                size="sm"
                {...register("idFilter")}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                type="text"
                placeholder="Razón Social"
                size="sm"
                {...register("razonSocialFilter")}
              />
            </Form.Group>
            <Form.Group as={Col} sm={3}>
              <Form.Control
                type="text"
                placeholder="Provincia"
                size="sm"
                {...register("provinciaFilter")}
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
                onClick={handleNewCliente}
              >
                <i className="bi bi-plus-lg"></i> Nuevo Cliente
              </Button>
            </Col>
          </Row>
        </Form>
        <TableComponent
          data={dataFiltered}
          columns={columns}
          handleOnRowClick={handleOpenCliente}
        />
        <ModalNewCliente handleRefreshClientes={handleRefreshClientes}/>
        <ModalClienteID handleRefreshClientes={handleRefreshClientes} dataCliente={dataCliente}/>
    </>
  );
}
