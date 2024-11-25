import { useLocation } from "react-router-dom";
import { useCamiones } from "../context/Camiones/CamionesContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useClientes } from "../context/Clientes/ClientesContext";
import { TemplateFormCamion } from "../templates/Camiones";
import { Button, Alert, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useModal } from "../context/ModalContext";
import { ModalComponent } from "../components/ModalComponent";
import LoadingIcon from "../components/LoaderIcon";

export default function CamionID({}) {
  const { handleModalShow, handleModalClose } = useModal();
  const { getClienteById } = useClientes();
  const { atributos, getAtributos, getCamionById, updateCamion } =
    useCamiones();
  const [cliente, setCliente] = useState({});
  const location = useLocation();
  const { camionData } = location.state || {};
  if (!camionData) {
    const id = location.pathname.replace("/camiones/", "");
    getCamionById(id);
    console.log(id);
  }

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    watch,
    setValue,
  } = useForm({
    defaultValues: camionData,
  });

  useEffect(() => {
    if (camionData?.id_cliente) {
      getClienteById(camionData.id_cliente)
        .then((data) => {
          setCliente(data);
          setValue("razon_social", data.razon_social); // Actualiza el estado con los datos del cliente
        })
        .catch((error) => {
          console.error("Error obteniendo cliente:", error);
        });
    }
    getAtributos();
  }, []);

  const onSubmit = async (data) => {
    const isEmpty = Object.keys(dirtyFields).length < 1;
    if (isEmpty) {
      handleModalShow("modal-info");
    } else {
      handleModalShow("modal-loading");
      const dataUpdate = {};
      for (let item in dirtyFields) {
        if (dirtyFields[item]) {
          dataUpdate[item] = data[item];
        }
      }
      const response = await updateCamion(dataUpdate, camionData.trazabilidad);
      if (response.status === 200) {
        handleModalShow("modal-success");
      } else {
        handleModalShow("modal-error");
      }
      console.log(response);
    }
  };
  return (
    <>
      {camionData ? (
        <>
          <Row className="mt-4 text-start g-1">
            <Col>
              <Card bg="light">
                <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted">
                    Trazabilidad:{" "}
                    <span style={{ fontWeight: "400" }}>
                      {" "}
                      {camionData?.trazabilidad
                        .toString()
                        .replace(/(\d{1})(\d{4})(\d{2})/, "$1.$2-$3")}
                    </span>
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card bg="light">
                <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted">
                    Registrado por:{" "}
                    <span style={{ fontWeight: "400" }}>
                      {" "}
                      {camionData?.registrado_por}
                    </span>
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card bg="light">
                <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted">
                    Fecha de creación:{" "}
                    <span style={{ fontWeight: "400" }}>
                      {" "}
                      {camionData?.fecha_creacion}
                    </span>
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <TemplateFormCamion
            atributos={atributos}
            register={register}
            camionData={camionData}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
          <ModalComponent
            modalId="modal-info"
            title="ℹ️ Información"
            body={
              <div>
                <p>No hay nada para actualizar</p>
              </div>
            }
            showButtonsClose={true}
          />
          <ModalComponent
            modalId="modal-loading"
            title="Procesando"
            body={<LoadingIcon />}
            showButtonsClose={false}
          />
          <ModalComponent
            modalId="modal-success"
            title="✅ Proceso exitoso"
            body={
              <div>
                <p>Se han actualizado exitosamente</p>
              </div>
            }
            showButtonsClose={true}
            variantBtn="success"
            nameButton={"Ir a Camiones"}
            handleOnClick={() => {
              handleModalClose();
              navigate("/camiones");
            }}
          />
        </>
      ) : (
        <Alert
          variant="warning"
          style={{ maxWidth: "500px", margin: "auto", marginTop: "50px" }}
        >
          Trazabilidad no encontrada
          <br />
          <Link className="alert-link" to="/camiones">
            {" "}
            Regresar al listado
          </Link>
        </Alert>
      )}
    </>
  );
}
