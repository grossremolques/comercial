import IconChasis from "../assets/chasis.png";
import IconDatos from "../assets/producto.png";
import { Form, Card, Row, Col, InputGroup, Button } from "react-bootstrap";
import { SubTitle } from "../components/Titles";
import { LabelComponent, TextWarningForm } from "../components/TextWarningForm";
import { useEffect } from "react";
import { useClientes } from "../context/Clientes/ClientesContext";
import { useState } from "react";
import ModalNewCliente from "../components/ModalNewCliente";
import { useModal } from "../context/ModalContext";
const formaChasis = [
  "l016",
  "l012_1",
  "l012_2",
  "l019",
  "l102",
  "l001",
  "l064",
  "w002",
  "w035",
  "w036",
  "l076",
  "h076",
  "hc",
  "hc01",
  "l042_1",
  "l042_2",
  "r079",
  "l043",
  "l044",
  "a",
  "b",
  "c",
  "d",
];
const marcarChasis = [
  "elm_c",
  "elm_d",
  "elm_e",
  "elm_f",
  "elm_g",
  "elm_h",
  "elm_i",
  "elm_aa",
  "elm_ab",
  "elm_p",
  "elm_r",
  "elm_s",
  "elm_t",
  "elm_j",
];
const zeroValues = {
  "S1-D1 CARROCERÍA": ["l012_2", "l076", "h076", "r079", "l043", "l044"],
  "S1-D1 (CHICO) CARROCERÍA": [
    "l012_2",
    "w002",
    "l076",
    "h076",
    "hc01",
    "l042_1",
    "l042_2",
  ],
  "S1-D2 CARROCERÍA": ["w002", "l076", "h076", "hc01", "r079", "l043", "l044"],
  "S1-D1 SEMI": ["l012_2", "w002", "hc", "hc01", "l043", "l044"],
  "S1-D2 SEMI": ["w002", "hc", "hc01", "l043", "l044"],
};
export function TemplateFormCamion({
  atributos,
  register,
  handleSubmit,
  onSubmit,
  errors,
  watch,
  setValue,
}) {
  const { handleModalShow } = useModal();
  const [dimensiones, setDimensiones] = useState(false);
  const { getClientes, clientes } = useClientes();
  useEffect(() => {
    getClientes();
    setDimensiones(watch("dimensiones"));
  }, []);
  const onError = (data) => {
    console.log(data);
  };
  useEffect(() => {
    const valores =
      watch("carroceria") === "No"
        ? { carrozado: "N/A", peso: "0", largo: "0", largo_cuchetin: "0" }
        : { carrozado: "", peso: "", largo: "", largo_cuchetin: "" };
    Object.entries(valores).forEach((item) => setValue(item[0], item[1]));
  }, [watch("carroceria")]);
  useEffect(() => {
    if (watch("objeto_considerable") === "No") {
      setValue("kg_objeto_considerable", "0");
    } else {
      setValue("kg_objeto_considerable", "");
    }
  }, [watch("objeto_considerable")]);
  useEffect(() => {
    if (zeroValues[watch("parametro")]) {
      zeroValues[watch("parametro")].forEach((item) => setValue(item, "0"));
    }
  }, [watch("parametro")]);
  const formattedCuit = () => {
    const cuit = watch("cuit_cliente").replace(/-/g, ""); // Elimina guiones existentes
    const format = cuit.replace(/(\d{2})(\d{8})(\d{1})/, "$1-$2-$3"); // Formatea el CUIT
    setValue("cuit_cliente", format);
  };
  const handleFindCliente = () => {
    let cliente;
    if (watch("id_cliente") === "") {
      formattedCuit()
      cliente = clientes.find((item) => item.cuit === watch("cuit_cliente"));
    } else {
      cliente = clientes.find((item) => item.id == watch("id_cliente"));
    }

    setValue("razon_social", cliente?.razon_social || "Cliente no encontrado");
  };
  const handleDimensions = () => {
    setDimensiones(!dimensiones);
    setValue("dimensiones", !dimensiones);
  };
  useEffect(() => {
    if (!dimensiones) {
      formaChasis.map((item) => setValue(item, ""));
    }
  }, [dimensiones]);
  const handleRefreshClientes = () => {
    getClientes();
  };
  
  return (
    <>
      {atributos.length > 0 && (
        <>
          <Form className="mt-3" onSubmit={handleSubmit(onSubmit, onError)}>
            <Row className="g-2">
              <Row className="g-1">
                <Col sm={3}>
                  <SubTitle title="Datos Generales" urlIcon={IconDatos} />
                </Col>
                <Col sm={9} className="ms-auto">
                  <InputGroup size="sm">
                    <InputGroup.Text>Cliente</InputGroup.Text>
                    <Form.Control
                      placeholder="Código"
                      type="number"
                      {...register("id_cliente", {
                        required: true,
                        onChange: handleFindCliente,
                      })}
                    />
                    <Form.Control
                      placeholder="CUIT"
                      type="text"
                      maxLength={13}
                      {...register("cuit_cliente", {
                        required: true,
                        onChange: handleFindCliente,
                        maxLength: 13,
                        minLength: 13
                      })}
                    />
                    <Form.Control
                      placeholder="Razón Social"
                      type="text"
                      readOnly
                      {...register("razon_social", { required: true })}
                    />
                    <Button
                      className=""
                      variant="outline-info"
                      onClick={() => {
                        handleModalShow("modal-new-cliente");
                      }}
                    >
                      <i className="bi bi-plus-lg"></i>
                    </Button>
                  </InputGroup>
                  <div className="form-text text-primary">
                    Puede buscar por código o por CUIT. Se prioriza el codigo,
                    si está vacío se buscará por el CUIT
                  </div>
                </Col>
              </Row>
              <Col sm={3}>
                <Card>
                  <Card.Body className="text-start">
                    <Card.Title style={{ fontSize: "17px" }}>
                      Datos del Camión
                    </Card.Title>
                    <Row className="g-1">
                      <Form.Group as={Col} sm={12}>
                        <LabelComponent label={"Marca"} required />
                        <Form.Select
                          size="sm"
                          {...register("marca", {
                            required: true,
                          })}
                        >
                          <option value="">Seleccione</option>
                          {atributos.map((atributo) => (
                            <option key={atributo.marca} value={atributo.marca}>
                              {atributo.marca}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Row>
                    <Row className="g-1 mt-2">
                      <Form.Group as={Col}>
                        <LabelComponent label={"Modelo"} required />
                        <Form.Control
                          size="sm"
                          type="text"
                          {...register("modelo", {
                            required: true,
                          })}
                        />
                      </Form.Group>
                      <Form.Group as={Col} sm={4}>
                        <LabelComponent label={"Año"} required />
                        <Form.Control
                          size="sm"
                          type="text"
                          {...register("anno", { required: true })}
                        />
                      </Form.Group>
                    </Row>
                    <Row className="g-1 mt-2">
                      <Form.Group as={Col} sm={7}>
                        <LabelComponent label={"VIN"} required />
                        <Form.Control
                          size="sm"
                          type="text"
                          {...register("vin", { required: true })}
                        />
                      </Form.Group>
                      <Form.Group as={Col} sm={5}>
                        <LabelComponent label={"Dominio"} required />
                        <Form.Control
                          size="sm"
                          type="text"
                          {...register("dominio", { required: true })}
                        />
                      </Form.Group>
                    </Row>
                    <Row className="g-1 mt-2">
                      <Form.Group as={Col}>
                        <LabelComponent label={"Ejes"} required />
                        <Form.Select
                          size="sm"
                          {...register("ejes", { required: true })}
                        >
                          <option value="">Seleccione</option>
                          {atributos.map(
                            (atributo) =>
                              atributo.ejes &&
                              atributo.ejes != "" && (
                                <option
                                  key={atributo.ejes}
                                  value={atributo.ejes}
                                >
                                  {atributo.ejes}
                                </option>
                              )
                          )}
                        </Form.Select>
                      </Form.Group>
                      <Col className="d-flex align-items-end" sm={"auto"}>
                        <Button
                          variant={dimensiones ? "primary" : "secondary"}
                          type="button"
                          size="sm"
                          onClick={handleDimensions}
                        >
                          {dimensiones
                            ? "Quitar Dimensiones"
                            : "Agregar Dimensiones"}
                        </Button>
                      </Col>
                      <Form.Select
                        className="d-none"
                        size="sm"
                        {...register("dimensiones")}
                      >
                        <option value={false}>No</option>
                        <option value={true}>Sí</option>
                      </Form.Select>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={9}>
                <Card>
                  <Card.Body className="text-start">
                    <Card.Title style={{ fontSize: "17px" }}>
                      Información técnica
                    </Card.Title>
                    <Row className="g-1">
                      <Form.Group as={Col} sm={"auto"}>
                        <LabelComponent label={"Uso Actual"} required />
                        <Form.Select
                          size="sm"
                          {...register("uso_actual", {
                            required: { value: true },
                            disabled: !dimensiones,
                          })}
                        >
                          <option value="">Seleccione</option>
                          {atributos.map(
                            (atributo) =>
                              atributo.uso_actual &&
                              atributo.uso_actual != "" && (
                                <option
                                  key={atributo.uso_actual}
                                  value={atributo.uso_actual}
                                >
                                  {atributo.uso_actual}
                                </option>
                              )
                          )}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group as={Col} sm={"auto"}>
                        <LabelComponent label={"Frenos"} required />
                        <Form.Select
                          size="sm"
                          {...register("frenos", {
                            required: true,
                            disabled: !dimensiones,
                          })}
                        >
                          <option value="">Seleccione</option>
                          {atributos.map(
                            (atributo) =>
                              atributo.frenos &&
                              atributo.frenos != "" && (
                                <option
                                  key={atributo.frenos}
                                  value={atributo.frenos}
                                >
                                  {atributo.frenos}
                                </option>
                              )
                          )}
                        </Form.Select>
                      </Form.Group>
                      <Col>
                        <LabelComponent label={"Tara"} required />
                        <InputGroup size="sm">
                          <InputGroup.Text>Total</InputGroup.Text>
                          <Form.Control
                            type="number"
                            {...register("tara_total", {
                              required: true,
                              disabled: !dimensiones,
                            })}
                          />
                          <InputGroup.Text>Eje deltr</InputGroup.Text>
                          <Form.Control
                            type="number"
                            {...register("tara_eje_delantero", {
                              required: true,
                              disabled: !dimensiones,
                            })}
                          />
                        </InputGroup>
                      </Col>
                      <Col>
                        <LabelComponent label={"Suspensión"} required />
                        <InputGroup size="sm">
                          <InputGroup.Text>Deltr</InputGroup.Text>
                          <Form.Select
                            {...register("suspension_delantera", {
                              required: true,
                              disabled: !dimensiones,
                            })}
                          >
                            <option value="">Seleccione</option>
                            {atributos.map(
                              (atributo) =>
                                atributo.suspension &&
                                atributo.suspension != "" && (
                                  <option
                                    key={atributo.suspension}
                                    value={atributo.suspension}
                                  >
                                    {atributo.suspension}
                                  </option>
                                )
                            )}
                          </Form.Select>
                          <InputGroup.Text>Tras</InputGroup.Text>
                          <Form.Select
                            {...register("suspension_trasera", {
                              required: true,
                              disabled: !dimensiones,
                            })}
                          >
                            <option value="">Seleccione</option>
                            {atributos.map(
                              (atributo) =>
                                atributo.suspension &&
                                atributo.suspension != "" && (
                                  <option
                                    key={atributo.suspension}
                                    value={atributo.suspension}
                                  >
                                    {atributo.suspension}
                                  </option>
                                )
                            )}
                          </Form.Select>
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row className="g-1 mt-2">
                      <Col>
                        <LabelComponent label={"Trocha"} required />
                        <InputGroup size="sm">
                          <InputGroup.Text>Eje deltr</InputGroup.Text>
                          <Form.Control
                            type="number"
                            {...register("trocha_eje_delantero", {
                              required: true,
                              disabled: !dimensiones,
                            })}
                          />
                          <InputGroup.Text>Eje tras</InputGroup.Text>
                          <Form.Control
                            type="number"
                            {...register("trocha_eje_trasero", {
                              required: true,
                              disabled: !dimensiones,
                            })}
                          />
                        </InputGroup>
                      </Col>
                      <Col sm={"auto"}>
                        <LabelComponent label={"Llantas"} required />
                        <InputGroup size="sm">
                          <InputGroup.Text>Tipo</InputGroup.Text>
                          <Form.Select
                            {...register("tipo_llanta", {
                              required: true,
                              disabled: !dimensiones,
                            })}
                          >
                            <option value="">Seleccione</option>
                            {atributos.map(
                              (atributo) =>
                                atributo.tipo_llanta &&
                                atributo.tipo_llanta != "" && (
                                  <option
                                    key={atributo.tipo_llanta}
                                    value={atributo.tipo_llanta}
                                  >
                                    {atributo.tipo_llanta}
                                  </option>
                                )
                            )}
                          </Form.Select>
                          <InputGroup.Text>Med.</InputGroup.Text>
                          <Form.Select
                            {...register("medida_llanta", {
                              required: true,
                              disabled: !dimensiones,
                            })}
                          >
                            <option value="">Seleccione</option>
                            {atributos.map(
                              (atributo) =>
                                atributo.medida_llanta &&
                                atributo.medida_llanta != "" && (
                                  <option
                                    key={atributo.medida_llanta}
                                    value={atributo.medida_llanta}
                                  >
                                    {atributo.medida_llanta}
                                  </option>
                                )
                            )}
                          </Form.Select>
                        </InputGroup>
                      </Col>
                      <Form.Group as={Col} sm={"auto"}>
                        <LabelComponent label={"Puente cardan"} required />
                        <Form.Select
                          size="sm"
                          {...register("puente_cardan", {
                            required: true,
                            disabled: !dimensiones,
                          })}
                        >
                          <option value="">Seleccione</option>
                          {atributos.map(
                            (atributo) =>
                              atributo.si_no &&
                              atributo.si_no != "" && (
                                <option
                                  key={atributo.si_no}
                                  value={atributo.si_no}
                                >
                                  {atributo.si_no}
                                </option>
                              )
                          )}
                        </Form.Select>
                      </Form.Group>
                    </Row>
                    <Row className="g-1 mt-2">
                      <Form.Group as={Col}>
                        <LabelComponent label={"Depresión chasis"} required />
                        <Form.Select
                          size="sm"
                          {...register("depresion_chasis", {
                            required: true,
                            disabled: !dimensiones,
                          })}
                        >
                          <option value="">Seleccione</option>
                          {atributos.map(
                            (atributo) =>
                              atributo.si_no &&
                              atributo.si_no != "" && (
                                <option
                                  key={atributo.si_no}
                                  value={atributo.si_no}
                                >
                                  {atributo.si_no}
                                </option>
                              )
                          )}
                        </Form.Select>
                      </Form.Group>
                      <Col sm={6}>
                        <LabelComponent
                          label={"Grúa u objeto considerable"}
                          required
                        />
                        <InputGroup size="sm">
                          <InputGroup.Text>¿Posee?</InputGroup.Text>
                          <Form.Select
                            size="sm"
                            {...register("objeto_considerable", {
                              required: true,
                              disabled: !dimensiones,
                            })}
                          >
                            <option value="">Seleccione</option>
                            {atributos.map(
                              (atributo) =>
                                atributo.si_no &&
                                atributo.si_no != "" && (
                                  <option
                                    key={atributo.si_no}
                                    value={atributo.si_no}
                                  >
                                    {atributo.si_no}
                                  </option>
                                )
                            )}
                          </Form.Select>
                          <InputGroup.Text>Peso</InputGroup.Text>
                          <Form.Control
                            type="number"
                            placeholder="kg"
                            disabled={watch("objeto_considerable") === "No"}
                            {...register("kg_objeto_considerable", {
                              required: true,
                              disabled: !dimensiones,
                            })}
                          />
                        </InputGroup>
                      </Col>
                      <Form.Group as={Col} sm={3}>
                        <LabelComponent label={"Color Chasis"} required />
                        <Form.Control
                          type="text"
                          placeholder="Color"
                          size="sm"
                          {...register("color_chasis", {
                            required: true,
                            disabled: !dimensiones,
                          })}
                        />
                      </Form.Group>
                    </Row>
                    <Row className="g-1 mt-2">
                      <Col>
                        <LabelComponent label={"Carrocerías"} required />
                        <InputGroup size="sm">
                          <InputGroup.Text>¿Posee?</InputGroup.Text>
                          <Form.Select
                            size="sm"
                            {...register("carroceria", {
                              required: true,
                              disabled: !dimensiones,
                            })}
                          >
                            <option value="">Seleccione</option>
                            {atributos.map(
                              (atributo) =>
                                atributo.si_no &&
                                atributo.si_no != "" && (
                                  <option
                                    key={atributo.si_no}
                                    value={atributo.si_no}
                                  >
                                    {atributo.si_no}
                                  </option>
                                )
                            )}
                          </Form.Select>
                          <InputGroup.Text>Carrozado</InputGroup.Text>
                          <Form.Control
                            type="text"
                            placeholder="describa el carrozado"
                            disabled={watch("carroceria") === "No"}
                            {...register("carrozado", {
                              required: true,
                              disabled: !dimensiones,
                            })}
                          />
                          <InputGroup.Text>Peso</InputGroup.Text>
                          <Form.Control
                            type="number"
                            placeholder="kg"
                            disabled={watch("carroceria") === "No"}
                            {...register("peso", {
                              required: true,
                              disabled: !dimensiones,
                            })}
                          />
                          <InputGroup.Text>Largo</InputGroup.Text>
                          <Form.Control
                            type="number"
                            placeholder="mm"
                            disabled={watch("carroceria") === "No"}
                            {...register("largo", {
                              required: true,
                              disabled: !dimensiones,
                            })}
                          />
                          <InputGroup.Text>Largo cuchetin</InputGroup.Text>
                          <Form.Control
                            type="number"
                            placeholder="mm"
                            disabled={watch("carroceria") === "No"}
                            {...register("largo_cuchetin", {
                              required: true,
                              disabled: !dimensiones,
                            })}
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="g-2 mt-4">
              <Row className="g-1">
                <Col sm={4}>
                  <SubTitle
                    title="Dimensiones (REG-CO-0016)"
                    urlIcon={IconChasis}
                  />
                </Col>
                <Col sm={"auto"} className="ms-auto">
                  <Row className="g-1">
                    <LabelComponent
                      label={"Forma de Chasis"}
                      required
                      column="sm"
                      sm={"auto"}
                    />
                    <Col sm={"auto"}>
                      <Form.Select
                        size="sm"
                        {...register("parametro", {
                          required: true,
                          disabled: !dimensiones,
                        })}
                      >
                        <option value="">Seleccione</option>
                        {atributos.map(
                          (atributo) =>
                            atributo.parametro &&
                            atributo.parametro != "" && (
                              <option
                                key={atributo.parametro}
                                value={atributo.parametro}
                              >
                                {atributo.parametro}
                              </option>
                            )
                        )}
                      </Form.Select>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Col sm={7}>
                <Card>
                  <Card.Body className="text-start">
                    <Card.Title style={{ fontSize: "17px" }}>
                      Según forma de chasis
                    </Card.Title>
                    <Row className="g-1">
                      {formaChasis.map((item) => {
                        const isDisabled = (
                          zeroValues[watch("parametro")] || []
                        ).includes(item);
                        return (
                          <Form.Group as={Col} sm={2} key={item}>
                            <LabelComponent
                              label={item.toLocaleUpperCase().replace("_", ".")}
                              required
                            />
                            <Form.Control
                              type="number"
                              placeholder="mm"
                              size="sm"
                              {...register(item, {
                                required: true,
                                disabled: !dimensiones || isDisabled,
                              })}
                            />
                          </Form.Group>
                        );
                      })}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={5}>
                <Card>
                  <Card.Body className="text-start">
                    <Card.Title style={{ fontSize: "17px" }}>
                      Elementos a marcar y acotar en chasis
                    </Card.Title>
                    <Row className="g-1">
                      {marcarChasis.map((item) => (
                        <Form.Group as={Col} sm={3} key={item}>
                          <LabelComponent
                            label={item.toLocaleUpperCase().replace("ELM_", "")}
                            required
                          />
                          <Form.Control
                            type="number"
                            placeholder="mm"
                            size="sm"
                            {...register(item, {
                              required: true,
                              disabled: !dimensiones,
                            })}
                          />
                        </Form.Group>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              {/* <Col sm="12" className="text-start">
                <Form.Label className="text-primary">
                  <i className="bi bi-file-earmark-arrow-down-fill"></i> Escanee
                  el REG-CO-0016 e ingréselo
                </Form.Label>
                <Form.Control size="sm" type="file" {...register("reg_016")} />
              </Col> */}
            </Row>
            {errors && (
              <TextWarningForm
                message={
                  'Todos los campos son obligatorios, si el dato no aplica, indique con "N/A" o "0" (si es un campo numérico)'
                }
              />
            )}
            <Row className="my-3 text-end">
              <Col sm="auto">
                <Button
                  type="submit"
                  variant="primary"
                  onSubmit={handleSubmit(onSubmit, onError)}
                >
                  Guardar
                </Button>
              </Col>
            </Row>
          </Form>
          <ModalNewCliente handleRefreshClientes={handleRefreshClientes} />
        </>
      )}
    </>
  );
}
