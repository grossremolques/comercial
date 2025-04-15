import { ModalComponent } from "./ModalComponent";
import { Form, Row, Col, Button } from "react-bootstrap";
import { LabelComponent } from "./TextWarningForm";
import { useForm } from "react-hook-form";
import { useClientes } from "../context/Clientes/ClientesContext";
import { useEffect, useState } from "react";
import { LocalidadesByProvincia } from "../API/Georef";
import { TextWarningForm } from "./TextWarningForm";
import LoadingIcon from "./LoaderIcon";
import { useModal } from "../context/ModalContext";
import TemplateFormCliente from "../templates/Clientes";
export default function ModalNewCliente({handleRefreshClientes}) {
  // LocalStorage
  const STORAGE_KEY = "data-nuevoCliente";
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  const resetValues = Object.keys(data).reduce((acc, item) => {
    acc[item] = '';
    return acc;
  },{})
  
  const { handleModalShow } = useModal();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    watch,
  } = useForm({defaultValues: data});
  const watchedValues = watch();
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchedValues));
  }, [watchedValues]);

  
  const { provincias, getProvincias, postCliente } = useClientes();
  useEffect(() => {
    getProvincias();
  }, []);

  const onSubmit = async (data) => {
    handleModalShow("modal-loading");
    const response = await postCliente(data);
    if (response.isAlreadyIn) {
      handleModalShow("modal-warning-cliente");
    } else {
      handleRefreshClientes()
      localStorage.removeItem(STORAGE_KEY);
      reset(resetValues)
      handleModalShow("modal-success-cliente");
    }
  }
  
  return (
    <>
      <ModalComponent
        modalId="modal-new-cliente"
        title="🆕 Nuevo Cliente"
        nameButton="Guardar"
        handleOnClick={handleSubmit(onSubmit)}
        showButtonsClose
        body={
          <>
            <TemplateFormCliente register={register} handleSubmit={handleSubmit} errors={errors} watch={watch} setValue={setValue}/>
          </>
        }
      />
      <ModalComponent
        modalId="modal-loading"
        title="Procesando"
        body={<LoadingIcon />}
        showButtonsClose={false}
      />
      <ModalComponent
        modalId="modal-warning-cliente"
        title="⚠️ Registro Existente"
        body={
          <div>
            <p>El cliente ya se encuentra ingresado en el registro</p>
            <p>Por favor, verifique el CUIT o el Código, e intenta nuevamente.</p>
          </div>
        }
        showButtonsClose={false}
        variantBtn='warning'
        nameButton={'Aceptar'}
        handleOnClick={() => {
          handleModalShow('modal-new-cliente')
        }}
      />
      <ModalComponent
        modalId="modal-success-cliente"
        title="✅ Proceso exitoso"
        body={
          <div>
            <p>Se han guardado exitosamente</p>
          </div>
        }
        showButtonsClose={true}
        variantBtn='success'
        
      />
    </>
  );
}
