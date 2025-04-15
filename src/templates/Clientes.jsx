import { Form, Row, Col, Button } from "react-bootstrap";
import { TextWarningForm, LabelComponent } from "../components/TextWarningForm";
import { useState, useEffect } from "react";
import { useClientes } from "../context/Clientes/ClientesContext";
export default function TemplateFormCliente({
  register,
  handleSubmit,
  errors,
  watch,
  disabledCUIT,
  setValue
}) {
    const { provincias, getProvincias, getLocalidades } = useClientes();
    useEffect(() => {
        getProvincias();
      }, []);
    useEffect(() => {
        handleLocalidad();
    }, [watch('cod_postal')]);
    const [localidades, setLocalidades] = useState([]);
    const handleLocalidad = async () => {
        const codPostal = watch("cod_postal");
        if(codPostal) {
           const localidades = await getLocalidades(codPostal)
            setLocalidades(localidades); 
        }
        
      };
    const formattedCuit = () => {
        const cuit = watch("cuit").replace(/-/g, ""); // Elimina guiones existentes
        const format = cuit.replace(/(\d{2})(\d{8})(\d{1})/, "$1-$2-$3"); // Formatea el CUIT
        setValue("cuit", format);
      };
      const formattedTel = () => {
        const value = watch("telefono");
        const tel = value.replace(/-/g, ""); // Elimina guiones existentes
        if (value.startsWith("11")) {
          setValue("telefono", tel.replace(/(\d{2})(\d{4})(\d{3})/, "$1-$2-$3")); // Formatea el TELEFONO
        } else {
          setValue("telefono", tel.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")); // Formatea el TELEFONO
        }
      };
  return (
    <Form onSubmit={handleSubmit}>
      <Row className="g-1">
        <Form.Group as={Col} sm="3">
          <LabelComponent label={"Código YAVÚ"} />
          <Form.Control
            size="sm"
            type="number"
            autoComplete="off"
            {...register("id")}
          />
        </Form.Group>
        <Form.Group as={Col} sm="9">
          <LabelComponent label={"Razón Social"} required />
          <Form.Control
            size="sm"
            type="text"
            autoComplete="off"
            {...register("razon_social", {
              required: {
                value: true,
                message: "Ingrese la razón social",
              },
              maxLength: 55,
            })}
          />
          {errors.razon_social && (
            <TextWarningForm message={errors.razon_social.message} />
          )}
        </Form.Group>
        <Form.Group as={Col} sm="7">
          <LabelComponent label={"CUIT"} required />
          <Form.Control
            size="sm"
            type="text"
            autoComplete="off"
            maxLength={13}
            disabled={disabledCUIT}
            {...register("cuit", {
              required: {
                value: true,
                message: "Ingrese el CUIT",
              },
              onChange: formattedCuit,
              minLength: {
                value: 13,
                message: "El CUIT debe tener 11 digitos",
              },
              maxLength: {
                value: 13,
                message: "El CUIT debe tener 11 digitos",
              },
            })}
          />
          {errors.cuit && <TextWarningForm message={errors.cuit.message} />}
        </Form.Group>
        <Form.Group as={Col} sm="5">
          <LabelComponent label={"Retención"} required />
          <Form.Select
            size="sm"
            autoComplete="off"
            {...register("retencion", {
              required: {
                value: true,
                message: "Seleccione una opción",
              },
            })}
          >
            <option value=""></option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </Form.Select>
          {errors.retencion && (
            <TextWarningForm message={errors.retencion.message} />
          )}
        </Form.Group>
        <Form.Group as={Col} sm="8">
          <LabelComponent label={"Provincia"} required />
          <Form.Select
            size="sm"
            autoComplete="off"
            {...register("provincia", {
              required: {
                value: true,
                message: "Seleccione la provincia",
              },
              onChange: handleLocalidad,
            })}
          >
            <option value="">Seleccione</option>
            {provincias.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Form.Select>
          {errors.provincia && (
            <TextWarningForm message={errors.provincia.message} />
          )}
        </Form.Group>
        <Form.Group as={Col} sm="4">
          <LabelComponent label={"Código Postal"} required />
          <Form.Control
            size="sm"
            type="number"
            autoComplete="off"
            {...register("cod_postal", {
              required: {
                value: true,
                message: "Ingrese el código postal",
              },
            })}
          />
          {errors.cod_postal && (
            <TextWarningForm message={errors.cod_postal.message} />
          )}
        </Form.Group>
        <Form.Group as={Col} sm="12">
          <LabelComponent label={"Localidad"} required />
          <Form.Select
            size="sm"
            autoComplete="off"
            {...register("localidad", {
              required: {
                value: true,
                message: "Seleccione la localidad",
              },
            })}
          >
            <option value="">Seleccione</option>
            {localidades.map((item) => (
              <option key={item.localidad} value={item.localidad}>
                {item.localidad}
              </option>
            ))}
          </Form.Select>
          {errors.localidad && (
            <TextWarningForm message={errors.localidad.message} />
          )}
        </Form.Group>
        <Form.Group as={Col} sm="12">
          <LabelComponent label={"Dirección"} required />
          <Form.Control
            size="sm"
            type="text"
            autoComplete="off"
            placeholder="Dirección + Calle"
            {...register("direccion", {
              required: {
                value: true,
                message: "Ingrese la dirección",
              },
            })}
          />
          {errors.direccion && (
            <TextWarningForm message={errors.direccion.message} />
          )}
        </Form.Group>
        
        
        
        <Form.Group as={Col} sm="5">
          <LabelComponent label={"Telefono"} required />
          <Form.Control
            size="sm"
            type="text"
            autoComplete="off"
            maxLength={12}
            {...register("telefono", {
              required: {
                value: true,
                message: "Ingrese el número de telefono",
              },
              onChange: formattedTel,
              minLength: 12,
              maxLength: 12,
            })}
          />
          {errors.telefono && (
            <TextWarningForm message={errors.telefono.message} />
          )}
        </Form.Group>
        <Form.Group as={Col} sm="7">
          <LabelComponent label={"Email"} />
          <Form.Control
            autoComplete="off"
            size="sm"
            type="email"
            placeholder="email@example.com"
            {...register("email")}
          />
        </Form.Group>
        <Col className="d-none">
          <Button type="submit" onSubmit={handleSubmit}></Button>
        </Col>
      </Row>
    </Form>
  );
}
