import { Form, Card, Row, Col, InputGroup, Button } from "react-bootstrap";
import { LabelComponent } from "../components/TextWarningForm";
import { SubTitle } from "../components/Titles";
import IconDatos from "../assets/producto.png";
import { useUnidadesGross } from "../context/UnidadesGross/UnidadesGrossContext";
import { useEffect } from "react";
import IconSemi from "../assets/remolque.png";
import IconAcc from "../assets/accesorios.png";
import IconSider from "../assets/sider.png";
import IconCarroceria from "../assets/carroceria.png";
export default function TemplateFormUnidadGross({
  register,
  handleSubmit,
  onSubmit,
  errors,
  watch,
  data,
}) {
  const { atributosGross, getAtributos } = useUnidadesGross();
  useEffect(() => {
    getAtributos();
  }, []);
  const onError = (data) => {
    console.log(data);
  };

  return (
    <>
      {atributosGross.length > 0 && (
        <Form className="mt-3" onSubmit={handleSubmit(onSubmit, onError)}>
          <Row className="g-2">
            <SubTitle title="Datos Generales" urlIcon={IconDatos} />
            <Row className="g-1">
              <Col sm={10}>
                <Card>
                  <Card.Body className="text-start">
                    <Card.Title style={{ fontSize: "17px" }}>
                      Características generales de la unidad
                    </Card.Title>
                    <Row className="g-1 mb-2">
                      <Form.Group as={Col} sm={"auto"}>
                        <LabelComponent label={"Modelo"} required />
                        <Form.Select
                          size="sm"
                          {...register("modelo", {
                            required: true,
                          })}
                        >
                          <option value="">Seleccione</option>
                          
                          {atributosGross.map(
                            (atributo) =>
                              atributo.modelos!='' && (
                                <option
                                  key={atributo.modelos}
                                  value={atributo.modelos}
                                >
                                  {atributo.modelos}
                                </option>
                              )
                          )}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group as={Col} sm={""}>
                        <LabelComponent label={"Largo"} required />
                        <Form.Control
                          size="sm"
                          type="text"
                          {...register("largo", {
                            required: true,
                          })}
                        />
                      </Form.Group>
                      <Form.Group as={Col} sm={""}>
                        <LabelComponent label={"Ancho"} required />
                        <Form.Control
                          size="sm"
                          type="text"
                          {...register("ancho", {
                            required: true,
                          })}
                        />
                      </Form.Group>
                      <Form.Group as={Col} sm={""}>
                        <LabelComponent label={"Alt. Baranda"} required />
                        <Form.Control
                          size="sm"
                          type="text"
                          {...register("altura_baranda", {
                            required: true,
                          })}
                        />
                      </Form.Group>
                      <Form.Group as={Col} sm={"auto"}>
                        <LabelComponent label={"Cumbrera lateral"} required />
                        <Form.Select
                          size="sm"
                          {...register("cumbrera_lateral", {
                            required: true,
                          })}
                        >
                          <option value="">Seleccione</option>
                          {atributosGross.map(
                            (atributo) =>
                              atributo.cumbrera_lateral && (
                                <option
                                  key={atributo.cumbrera_lateral}
                                  value={atributo.cumbrera_lateral}
                                >
                                  {atributo.cumbrera_lateral}
                                </option>
                              )
                          )}
                        </Form.Select>
                      </Form.Group>
                    </Row>
                    <Row className="g-1 mb-2">
                      <Form.Group as={Col} sm={"auto"}>
                        <LabelComponent label={"Piso"} required />
                        <Form.Select
                          size="sm"
                          {...register("piso", {
                            required: true,
                          })}
                        >
                          <option value="">Seleccione</option>
                          {atributosGross.map(
                            (atributo) =>
                              atributo.piso && (
                                <option
                                  key={atributo.piso}
                                  value={atributo.piso}
                                >
                                  {atributo.piso}
                                </option>
                              )
                          )}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group as={Col} sm={"auto"}>
                        <LabelComponent label={"Espesor"} required />
                        <Form.Select
                          size="sm"
                          {...register("espesor", {
                            required: true,
                          })}
                        >
                          <option value="">Seleccione</option>
                          {atributosGross.map(
                            (atributo) =>
                              atributo.espesor && (
                                <option
                                  key={atributo.espesor}
                                  value={atributo.espesor}
                                >
                                  {atributo.espesor}
                                </option>
                              )
                          )}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group as={Col} sm={"auto"}>
                        <LabelComponent label={"Material"} required />
                        <Form.Select
                          size="sm"
                          {...register("material", {
                            required: true,
                          })}
                        >
                          <option value="">Seleccione</option>
                          {atributosGross.map(
                            (atributo) =>
                              atributo.material && (
                                <option
                                  key={atributo.material}
                                  value={atributo.material}
                                >
                                  {atributo.material}
                                </option>
                              )
                          )}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group as={Col} sm={"auto"}>
                        <LabelComponent label={"Puerta Trasera"} required />
                        <Form.Select
                          size="sm"
                          {...register("puerta_trasera", {
                            required: true,
                          })}
                        >
                          <option value="">Seleccione</option>
                          {atributosGross.map(
                            (atributo) =>
                              atributo.puerta_trasera && (
                                <option
                                  key={atributo.puerta_trasera}
                                  value={atributo.puerta_trasera}
                                >
                                  {atributo.puerta_trasera}
                                </option>
                              )
                          )}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group as={Col}>
                        <LabelComponent
                          label={"Cant Puerta laterales"}
                          required
                        />
                        <Form.Control
                          size="sm"
                          type="number"
                          {...register("cant_puertas_laterales", {
                            required: true,
                          })}
                        />
                      </Form.Group>
                      <Form.Group as={Col} sm={"auto"}>
                        <LabelComponent label={"Arcos Centrales"} required />
                        <Form.Select
                          size="sm"
                          {...register("arcos_centrales", {
                            required: true,
                          })}
                        >
                          <option value="">Seleccione</option>
                          {atributosGross.map(
                            (atributo) =>
                              atributo.arcos && (
                                <option
                                  key={atributo.arcos}
                                  value={atributo.arcos}
                                >
                                  {atributo.arcos}
                                </option>
                              )
                          )}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group as={Col} sm={"auto"}>
                        <LabelComponent label={"Arcos Extremos"} required />
                        <Form.Select
                          size="sm"
                          {...register("arcos_extremos", {
                            required: true,
                          })}
                        >
                          <option value="">Seleccione</option>
                          {atributosGross.map(
                            (atributo) =>
                              atributo.arcos && (
                                <option
                                  key={atributo.arcos}
                                  value={atributo.arcos}
                                >
                                  {atributo.arcos}
                                </option>
                              )
                          )}
                        </Form.Select>
                      </Form.Group>
                    </Row>
                    <Row className="g-1">
                      <Col sm={"auto"}>
                        <LabelComponent
                          label={"Seguros en puertas/barandas"}
                          required
                        />
                        <InputGroup size="sm">
                          <InputGroup.Text>Lateral</InputGroup.Text>
                          <Form.Select
                            size="sm"
                            {...register("seg_lat", {
                              required: true,
                            })}
                          >
                            <option value="">Seleccione</option>
                            {atributosGross.map(
                              (atributo) =>
                                atributo.si_no && (
                                  <option
                                    key={atributo.si_no}
                                    value={atributo.si_no}
                                  >
                                    {atributo.si_no}
                                  </option>
                                )
                            )}
                          </Form.Select>
                          <InputGroup.Text>Trasero</InputGroup.Text>
                          <Form.Select
                            size="sm"
                            {...register("seg_tras", {
                              required: true,
                            })}
                          >
                            <option value="">Seleccione</option>
                            {atributosGross.map(
                              (atributo) =>
                                atributo.si_no && (
                                  <option
                                    key={atributo.si_no}
                                    value={atributo.si_no}
                                  >
                                    {atributo.si_no}
                                  </option>
                                )
                            )}
                          </Form.Select>
                        </InputGroup>
                      </Col>
                      <Col sm={"auto"}>
                        <LabelComponent label={"Kit de acoples"} required />
                        <InputGroup size="sm">
                          <InputGroup.Text>Tipo</InputGroup.Text>
                          <Form.Select
                            size="sm"
                            {...register("kit_acople", {
                              required: true,
                            })}
                          >
                            <option value="">Seleccione</option>
                            {atributosGross.map(
                              (atributo) =>
                                atributo.kit_acople && (
                                  <option
                                    key={atributo.kit_acople}
                                    value={atributo.kit_acople}
                                  >
                                    {atributo.kit_acople}
                                  </option>
                                )
                            )}
                          </Form.Select>
                          <InputGroup.Text>Adicional</InputGroup.Text>
                          <Form.Control
                            size="sm"
                            type="number"
                            placeholder="mm"
                            {...register("kit_acople_adicional_fijo", {
                              required: true,
                            })}
                          />
                        </InputGroup>
                      </Col>
                      <Form.Group as={Col}>
                        <LabelComponent label={"Tipo Cabezal"} required />
                        <Form.Select
                          size="sm"
                          {...register("tipo_cabezal", {
                            required: true,
                          })}
                        >
                          <option value="">Seleccione</option>
                          {atributosGross.map(
                            (atributo) =>
                              atributo.tipo_cabezal && (
                                <option
                                  key={atributo.tipo_cabezal}
                                  value={atributo.tipo_cabezal}
                                >
                                  {atributo.tipo_cabezal}
                                </option>
                              )
                          )}
                        </Form.Select>
                      </Form.Group>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={2} className="ms-auto">
                <Card>
                  <Card.Body className="text-start">
                    <Card.Title style={{ fontSize: "17px" }}>
                      Opciones de colores
                    </Card.Title>
                    <Row className="g-1">
                      <Form.Group as={Col} sm={"12"} className="mb-1">
                        <LabelComponent label={"Carrozado"} required />
                        <Form.Select
                          size="sm"
                          {...register("color_carrozado", {
                            required: true,
                          })}
                        >
                          <option value="">Seleccione</option>
                          {atributosGross.map(
                            (atributo) =>
                              atributo.color && (
                                <option
                                  key={atributo.color}
                                  value={atributo.color}
                                >
                                  {atributo.color}
                                </option>
                              )
                          )}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group as={Col} sm={"12"} className="mb-1">
                        <LabelComponent label={"Franja"} required />
                        <Form.Select
                          size="sm"
                          {...register("color_franja", {
                            required: true,
                          })}
                        >
                          <option value="">Seleccione</option>
                          {atributosGross.map(
                            (atributo) =>
                              atributo.color && (
                                <option
                                  key={atributo.color}
                                  value={atributo.color}
                                >
                                  {atributo.color}
                                </option>
                              )
                          )}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group as={Col} sm={"12"}>
                        <LabelComponent label={"Lona"} required />
                        <Form.Select
                          size="sm"
                          {...register("color_lona", {
                            required: true,
                          })}
                        >
                          <option value="">Seleccione</option>
                          {atributosGross.map(
                            (atributo) =>
                              atributo.lona && (
                                <option
                                  key={atributo.lona}
                                  value={atributo.lona}
                                >
                                  {atributo.lona}
                                </option>
                              )
                          )}
                        </Form.Select>
                      </Form.Group>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Row>
          {(data.tipo === "Acoplado" || data.tipo === "Semirremolque") && (
            <>
              <Row className="g-2 mt-3">
                <SubTitle
                  title="Acoplados y Semiremolques"
                  urlIcon={IconSemi}
                />
                <Row className="g-1">
                  <Card>
                    <Card.Body className="text-start">
                      <Card.Title style={{ fontSize: "17px" }}>
                        Características
                      </Card.Title>
                      <Row className="g-1">
                        <Form.Group as={Col} sm={"auto"}>
                          <LabelComponent
                            label={"Cajón Herramientas"}
                            required
                          />
                          <Form.Select
                            size="sm"
                            {...register("cajon", {
                              required: true,
                            })}
                          >
                            <option value="">Seleccione</option>
                            {atributosGross.map(
                              (atributo) =>
                                atributo.cajon && (
                                  <option
                                    key={atributo.cajon}
                                    value={atributo.cajon}
                                  >
                                    {atributo.cajon}
                                  </option>
                                )
                            )}
                          </Form.Select>
                        </Form.Group>
                        <Col>
                          <LabelComponent label={"Boquillas"} required />
                          <InputGroup size="sm">
                            <InputGroup.Text>Estándar</InputGroup.Text>
                            <Form.Control
                              size="sm"
                              type="number"
                              placeholder="mm"
                              {...register("boq_st", {
                                required: true,
                              })}
                            />
                            <InputGroup.Text>Oculta</InputGroup.Text>
                            <Form.Control
                              size="sm"
                              type="number"
                              placeholder="mm"
                              {...register("boq_oculta", {
                                required: true,
                              })}
                            />
                          </InputGroup>
                        </Col>
                        <Form.Group as={Col} sm={"auto"}>
                          <LabelComponent label={"Porta auxilio"} required />
                          <Form.Select
                            size="sm"
                            {...register("porta_auxilio", {
                              required: true,
                            })}
                          >
                            <option value="">Seleccione</option>
                            {atributosGross.map(
                              (atributo) =>
                                atributo.porta_auxilio && (
                                  <option
                                    key={atributo.porta_auxilio}
                                    value={atributo.porta_auxilio}
                                  >
                                    {atributo.porta_auxilio}
                                  </option>
                                )
                            )}
                          </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} sm={"auto"}>
                          <LabelComponent label={"Suspensión"} required />
                          <Form.Select
                            size="sm"
                            {...register("suspension", {
                              required: true,
                            })}
                          >
                            <option value="">Seleccione</option>
                            {atributosGross.map(
                              (atributo) =>
                                atributo.suspension && (
                                  <option
                                    key={atributo.suspension}
                                    value={atributo.suspension}
                                  >
                                    {atributo.suspension}
                                  </option>
                                )
                            )}
                          </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} sm={"auto"}>
                          <LabelComponent label={"Ojal o Perno rey"} required />
                          <Form.Select
                            size="sm"
                            {...register("ojal_perno_rey", {
                              required: true,
                            })}
                          >
                            <option value="">Seleccione</option>
                            {atributosGross.map(
                              (atributo) =>
                                atributo.ojal_perno_rey && (
                                  <option
                                    key={atributo.ojal_perno_rey}
                                    value={atributo.ojal_perno_rey}
                                  >
                                    {atributo.ojal_perno_rey}
                                  </option>
                                )
                            )}
                          </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} sm={"auto"}>
                          <LabelComponent label={"Cilindro"} required />
                          <Form.Select
                            size="sm"
                            {...register("cilindro", {
                              required: true,
                            })}
                          >
                            <option value="">Seleccione</option>
                            {atributosGross.map(
                              (atributo) =>
                                atributo.cilindro && (
                                  <option
                                    key={atributo.cilindro}
                                    value={atributo.cilindro}
                                  >
                                    {atributo.cilindro}
                                  </option>
                                )
                            )}
                          </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} sm={"auto"}>
                          <LabelComponent label={"Divisor de cono"} required />
                          <Form.Select
                            size="sm"
                            {...register("divisor_cono", {
                              required: true,
                            })}
                          >
                            <option value="">Seleccione</option>
                            {atributosGross.map(
                              (atributo) =>
                                atributo.si_no && (
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
                        <Form.Group as={Col} sm={"auto"}>
                          <LabelComponent label={"Peso bruto total"} required />
                          <Form.Select
                            size="sm"
                            {...register("pbt_trabajo", {
                              required: true,
                            })}
                          >
                            <option value="">Seleccione</option>
                            {atributosGross.map(
                              (atributo) =>
                                atributo.pbt_trabajo && (
                                  <option
                                    key={atributo.pbt_trabajo}
                                    value={atributo.pbt_trabajo}
                                  >
                                    {atributo.pbt_trabajo}
                                  </option>
                                )
                            )}
                          </Form.Select>
                        </Form.Group>
                      </Row>
                    </Card.Body>
                  </Card>
                </Row>
              </Row>
              <Row className="g-2 mt-3">
                <SubTitle title="Accesorios" urlIcon={IconAcc} />
                <Row className="g-1">
                  <Col sm={4}>
                    <Card>
                      <Card.Body className="text-start">
                        <Card.Title style={{ fontSize: "17px" }}>
                          Llantas
                        </Card.Title>
                        <Row className="g-1">
                          <Col>
                            <LabelComponent label={"Llantas"} required />
                            <InputGroup size="sm">
                              <InputGroup.Text>Acero</InputGroup.Text>
                              <Form.Control
                                size="sm"
                                type="number"
                                placeholder="mm"
                                {...register("llantas_acero", {
                                  required: true,
                                })}
                              />
                              <InputGroup.Text>Aluminio</InputGroup.Text>
                              <Form.Control
                                size="sm"
                                type="number"
                                placeholder="mm"
                                {...register("llantas_aluminio", {
                                  required: true,
                                })}
                              />
                            </InputGroup>
                          </Col>
                          <Form.Group as={Col} sm={"auto"}>
                            <LabelComponent label={"Medidas"} required />
                            <Form.Select
                              size="sm"
                              {...register("medidas", {
                                required: true,
                              })}
                            >
                              <option value="">Seleccione</option>
                              {atributosGross.map(
                                (atributo) =>
                                  atributo.medidas && (
                                    <option
                                      key={atributo.medidas}
                                      value={atributo.medidas}
                                    >
                                      {atributo.medidas}
                                    </option>
                                  )
                              )}
                            </Form.Select>
                          </Form.Group>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm={8}>
                    <Card>
                      <Card.Body className="text-start">
                        <Card.Title style={{ fontSize: "17px" }}>
                          Adicionales
                        </Card.Title>
                        <Row className="g-1">
                          <Form.Group as={Col}>
                            <LabelComponent label={"Levanta eje"} required />
                            <Form.Select
                              size="sm"
                              {...register("levanta_eje", {
                                required: true,
                              })}
                            >
                              <option value="">Seleccione</option>
                              {atributosGross.map(
                                (atributo) =>
                                  atributo.si_no && (
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
                          <Form.Group as={Col}>
                            <LabelComponent
                              label={"Cajón adicional"}
                              required
                            />
                            <Form.Control
                              type="number"
                              placeholder="mm"
                              size="sm"
                              {...register("cajon_adicional", {
                                required: true,
                              })}
                            />
                          </Form.Group>
                          <Form.Group as={Col}>
                            <LabelComponent label={"Bulón largo"} required />
                            <Form.Select
                              size="sm"
                              {...register("bulon_largo", {
                                required: true,
                              })}
                            >
                              <option value="">Seleccione</option>
                              {atributosGross.map(
                                (atributo) =>
                                  atributo.si_no && (
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
                          <Form.Group as={Col}>
                            <LabelComponent label={"Rampa"} required />
                            <Form.Select
                              size="sm"
                              {...register("rampa", {
                                required: true,
                              })}
                            >
                              <option value="">Seleccione</option>
                              {atributosGross.map(
                                (atributo) =>
                                  atributo.si_no && (
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
                          <Form.Group as={Col}>
                            <LabelComponent
                              label={"Traba de puerta"}
                              required
                            />
                            <Form.Select
                              size="sm"
                              {...register("traba_puerta", {
                                required: true,
                              })}
                            >
                              <option value="">Seleccione</option>
                              {atributosGross.map(
                                (atributo) =>
                                  atributo.suspension && (
                                    <option
                                      key={atributo.suspension}
                                      value={atributo.suspension}
                                    >
                                      {atributo.suspension}
                                    </option>
                                  )
                              )}
                            </Form.Select>
                          </Form.Group>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Row>
            </>
          )}
          {data.carrozado.toLowerCase().includes("sider") && (
            <Row className="g-2 mt-3">
              <SubTitle
                title="Características para Siders"
                urlIcon={IconSider}
              />
              <Row className="g-1">
                <Col sm={6}>
                  <Card>
                    <Card.Body className="text-start">
                      <Card.Title style={{ fontSize: "17px" }}>Lona</Card.Title>
                      <Row className="g-1">
                        <Form.Group as={Col}>
                          <LabelComponent label={"Logo"} required />
                          <Form.Select
                            size="sm"
                            {...register("lona_con_logo", {
                              required: true,
                            })}
                          >
                            <option value="">Seleccione</option>
                            {atributosGross.map(
                              (atributo) =>
                                atributo.si_no && (
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
                        <Form.Group as={Col}>
                          <LabelComponent label={"Color"} required />
                          <Form.Select
                            size="sm"
                            {...register("lona_color_lateral", {
                              required: true,
                            })}
                          >
                            <option value="">Seleccione</option>
                            {atributosGross.map(
                              (atributo) =>
                                atributo.lona_color_lateral && (
                                  <option
                                    key={atributo.lona_color_lateral}
                                    value={atributo.lona_color_lateral}
                                  >
                                    {atributo.lona_color_lateral}
                                  </option>
                                )
                            )}
                          </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col}>
                          <LabelComponent label={"Estira lona"} required />
                          <Form.Select
                            size="sm"
                            {...register("estira_lona", {
                              required: true,
                            })}
                          >
                            <option value="">Seleccione</option>
                            {atributosGross.map(
                              (atributo) =>
                                atributo.estira_lona && (
                                  <option
                                    key={atributo.estira_lona}
                                    value={atributo.estira_lona}
                                  >
                                    {atributo.estira_lona}
                                  </option>
                                )
                            )}
                          </Form.Select>
                        </Form.Group>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={6}>
                  <Card>
                    <Card.Body className="text-start">
                      <Card.Title style={{ fontSize: "17px" }}>
                        Ventilados y tipo de techo
                      </Card.Title>
                      <Row className="g-1">
                        <Col sm={"8"}>
                          <LabelComponent label={"Ventilados"} required />
                          <InputGroup size="sm">
                            <InputGroup.Text>Cantidad</InputGroup.Text>
                            <Form.Control
                              type="number"
                              {...register("ventilados_cant", {
                                required: true,
                              })}
                            />
                            <InputGroup.Text>
                              Luz entre ventilados
                            </InputGroup.Text>
                            <Form.Control
                              type="number"
                              {...register("ventilados_ubic_alt", {
                                required: true,
                              })}
                            />
                          </InputGroup>
                        </Col>
                        <Form.Group as={Col}>
                          <LabelComponent label={"Techo"} required />
                          <Form.Select
                            size="sm"
                            {...register("techo", {
                              required: true,
                            })}
                          >
                            <option value="">Seleccione</option>
                            {atributosGross.map(
                              (atributo) =>
                                atributo.techo && (
                                  <option
                                    key={atributo.techo}
                                    value={atributo.techo}
                                  >
                                    {atributo.techo}
                                  </option>
                                )
                            )}
                          </Form.Select>
                        </Form.Group>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Row>
          )}
          {data.tipo === "Carrocería" && (
            <Row className="g-2 mt-3">
              <SubTitle
                title="Características para Carrocerías"
                urlIcon={IconCarroceria}
              />
              <Row className="g-1">
                <Col sm={2}>
                  <Card>
                    <Card.Body className="text-start">
                      <Card.Title style={{ fontSize: "17px" }}>
                        Datos de camión
                      </Card.Title>
                      <Row className="g-1">
                        <Col sm={12} className="mb-1">
                          <LabelComponent label={"Camión"} required />
                          <InputGroup size="sm">
                            <Form.Select
                              size="sm"
                              {...register("id_camion", {
                                required: true,
                              })}
                            >
                              <option value="">Seleccione</option>
                              {[].map(
                                (atributo) =>
                                  atributo.si_no && (
                                    <option
                                      key={atributo.si_no}
                                      value={atributo.si_no}
                                    >
                                      {atributo.si_no}
                                    </option>
                                  )
                              )}
                            </Form.Select>
                            <Button
                              size="sm"
                              variant="outline-info"
                              type="button"
                            >
                              <i className="bi bi-plus-lg"></i>
                            </Button>
                          </InputGroup>
                        </Col>
                        <Form.Group as={Col}>
                          <LabelComponent label={"Centro de Eje"} required />
                          <Form.Control
                            size="sm"
                            type="number"
                            {...register("centro_eje", {
                              required: true,
                            })}
                          />
                        </Form.Group>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={10}>
                  <Card>
                    <Card.Body className="text-start">
                      <Card.Title style={{ fontSize: "17px" }}>
                        Adicionales
                      </Card.Title>
                      <Row className="g-1 mb-2">
                        <Col sm={""}>
                          <LabelComponent
                            label={"Cajones para Carrocerías"}
                            required
                          />
                          <InputGroup size="sm">
                            <InputGroup.Text>Med. Cajón 1</InputGroup.Text>
                            <Form.Control
                              type="number"
                              placeholder="mm"
                              {...register("cajon_carroceria_1", {
                                required: true,
                              })}
                            />
                            <InputGroup.Text>Ubicación</InputGroup.Text>
                            <Form.Select
                              size="sm"
                              {...register("cajon_carroceria_ubic_1", {
                                required: true,
                              })}
                            >
                              <option value="">Seleccione</option>
                              {atributosGross.map(
                                (atributo) =>
                                  atributo.ubicacion && (
                                    <option
                                      key={atributo.ubicacion}
                                      value={atributo.ubicacion}
                                    >
                                      {atributo.ubicacion}
                                    </option>
                                  )
                              )}
                            </Form.Select>
                            <InputGroup.Text>Med. Cajón 2</InputGroup.Text>
                            <Form.Control
                              type="number"
                              placeholder="mm"
                              {...register("cajon_carroceria_2", {
                                required: true,
                              })}
                            />
                            <InputGroup.Text>Ubicación</InputGroup.Text>
                            <Form.Select
                              size="sm"
                              {...register("cajon_carroceria_ubic_2", {
                                required: true,
                              })}
                            >
                              <option value="">Seleccione</option>
                              {atributosGross.map(
                                (atributo) =>
                                  atributo.ubicacion && (
                                    <option
                                      key={atributo.ubicacion}
                                      value={atributo.ubicacion}
                                    >
                                      {atributo.ubicacion}
                                    </option>
                                  )
                              )}
                            </Form.Select>
                          </InputGroup>
                        </Col>
                      </Row>
                      <Row className="g-1">
                        <Col sm={"6"}>
                          <LabelComponent label={"Tanques de agua"} required />
                          <InputGroup size="sm">
                            <InputGroup.Text>Ubic. Tanque 1</InputGroup.Text>
                            <Form.Select
                              size="sm"
                              {...register("tanq_agua_1", {
                                required: true,
                              })}
                            >
                              <option value="">Seleccione</option>
                              {atributosGross.map(
                                (atributo) =>
                                  atributo.ubicacion && (
                                    <option
                                      key={atributo.ubicacion}
                                      value={atributo.ubicacion}
                                    >
                                      {atributo.ubicacion}
                                    </option>
                                  )
                              )}
                            </Form.Select>
                            <InputGroup.Text>Ubic. Tanque 2</InputGroup.Text>
                            <Form.Select
                              size="sm"
                              {...register("tanq_agua_2", {
                                required: true,
                              })}
                            >
                              <option value="">Seleccione</option>
                              {atributosGross.map(
                                (atributo) =>
                                  atributo.ubicacion && (
                                    <option
                                      key={atributo.ubicacion}
                                      value={atributo.ubicacion}
                                    >
                                      {atributo.ubicacion}
                                    </option>
                                  )
                              )}
                            </Form.Select>
                          </InputGroup>
                        </Col>
                        <Col sm={""}>
                          <LabelComponent label={"Boquillas"} required />
                          <InputGroup size="sm">
                            <InputGroup.Text>Delantera</InputGroup.Text>
                            <Form.Control
                              size="sm"
                              type="number"
                              {...register("boq_st_delantera", {
                                required: true,
                              })}
                            />
                            <InputGroup.Text>Trasera</InputGroup.Text>
                            <Form.Control
                              size="sm"
                              type="number"
                              {...register("boq_st_trasera", {
                                required: true,
                              })}
                            />
                          </InputGroup>
                        </Col>
                        <Form.Group as={Col} sm={2}>
                          <LabelComponent label={"Cajón en frente"} required />
                          <Form.Control
                            size="sm"
                            type="number"
                            {...register("cajon_frente", {
                              required: true,
                            })}
                          />
                        </Form.Group>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Row>
          )}
        </Form>
      )}
    </>
  );
}
