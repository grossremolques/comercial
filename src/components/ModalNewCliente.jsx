import { ModalComponent } from "./ModalComponent";
import { Form, Row, Col, Button } from "react-bootstrap";
import { LabelComponent } from "./TextWarningForm";
import { useForm } from "react-hook-form";
import { useClientes } from "../context/Clientes/ClientesContext";
import { useEffect, useState } from "react";
export default function ModalNewCliente() {
    const {provincias, getProvincias} = useClientes();
useEffect(() => {
    getProvincias()
},[])
  const { register, handleSubmit, getValues, formState: {errors}, watch } = useForm();
  /* const onSubmit = (data) => {};
  const onError = (data) => {
    // Implementación de la lógica para manejar los errores de validación
    console.error("Error:", data);
  }; */
  const handleClick = () => {
    console.log('errores',errors)
    console.log(getValues())
  };
  const handleLocalidad = () => {
  }
  return (
    <ModalComponent
      modalId="modal-new-cliente"
      title="🆕 Nuevo Cliente"
      nameButton="Guardar"
      handleOnClick={handleClick}
      showButtonsClose
      body={
        <Form onSubmit={handleSubmit}>
          <Row className="g-1">
            <Form.Group as={Col} sm="12">
              <LabelComponent label={"Razón Social"} required />
              <Form.Control
                size="sm"
                type="text"
                {...register("razon_social", {
                  required: true,
                })}
              />
            </Form.Group>
            <Form.Group as={Col} sm="12">
              <LabelComponent label={"CUIT"} required />
              <Form.Control
                size="sm"
                type="text"
                {...register("cuit", {
                  required: true,
                })}
              />
            </Form.Group>
            <Form.Group as={Col} sm="12">
              <LabelComponent label={"Dirección"} required />
              <Form.Control
                size="sm"
                type="text"
                placeholder="Dirección + Calle"
                {...register("direccion", {
                  required: true,
                })}
              />
            </Form.Group>
            <Form.Group as={Col} sm="12">
              <LabelComponent label={"Provincia"} required />
              <Form.Select
                size="sm"
                {...register("provincia", {
                  required: true,
                  onChange: handleLocalidad
                })}
              >
                <option value="">Seleccione</option>
                {provincias.map((item) => (
                  <option key={item.provincia} value={item.provincia}>
                    {item.provincia}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} sm="8">
              <LabelComponent label={"Localidad"} required />
              <Form.Control
                size="sm"
                type="text"
                {...register("localidad", {
                  required: true,
                })}
              />
            </Form.Group>
            <Form.Group as={Col} sm="4">
              <LabelComponent label={"Código Postal"} required />
              <Form.Control
                size="sm"
                type="number"
                {...register("cod_postal", {
                  required: true,
                })}
              />
            </Form.Group>
            <Form.Group as={Col} sm="5">
              <LabelComponent label={"Telefono"} required />
              <Form.Control
                size="sm"
                type="text"
                {...register("telefono", {
                  required: true,
                })}
              />
            </Form.Group>
            <Form.Group as={Col} sm="7">
              <LabelComponent label={"Email"}/>
              <Form.Control
                size="sm"
                type="text"
                {...register("email")}
              />
            </Form.Group>
            <Col className="d-none">
                <Button type='submit' onSubmit={handleSubmit}></Button>
            </Col>
          </Row>
        </Form>
      }
    />
  );
}
