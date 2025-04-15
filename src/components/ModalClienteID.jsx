import { ModalComponent } from "./ModalComponent";
import { useForm } from "react-hook-form";
import { useClientes } from "../context/Clientes/ClientesContext";
import { useEffect, useState } from "react";
import LoadingIcon from "./LoaderIcon";
import { useModal } from "../context/ModalContext";
import TemplateFormCliente from "../templates/Clientes";
export default function ModalClienteID({ handleRefreshClientes, dataCliente }) {
  const { handleModalShow } = useModal();
  const {updateCliente} = useClientes();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, dirtyFields },
    watch,
  } = useForm();
  useEffect(() => {
    if (dataCliente) {
      reset(dataCliente);
      setTimeout(() => {
        setValue("localidad", dataCliente.localidad);
      }, 1000);
    }
  }, [dataCliente]);

  const onSubmit = async (data) => {
    const isEmpty = Object.keys(dirtyFields).length < 1;
    if (isEmpty) {
      handleModalShow("modal-info");
    }
    else {
      handleModalShow("modal-loading");
      const dataUpdate = {};
      for (let item in dirtyFields) {
        if (dirtyFields[item]) {
          dataUpdate[item] = data[item];
        }
      }
      const response = await updateCliente(dataUpdate, data.cuit);
      if (response.isAlreadyIn) {
        handleModalShow("modal-warning-clienteID");
      } 
      else if (response.status === 200) {
        handleRefreshClientes()
        handleModalShow("modal-success");
      } else {
        handleModalShow("modal-error");
      }
    }
  };
  return (
    <>
      <ModalComponent
        modalId="modal-clienteID"
        title="✏️ Editar Cliente"
        nameButton="Guardar"
        handleOnClick={handleSubmit(onSubmit)}
        showButtonsClose
        body={
          <>
            <TemplateFormCliente
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              watch={watch}
              disabledCUIT={true}
              setValue={setValue}
            />
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
        modalId="modal-warning"
        title="⚠️ Registro Existente"
        body={
          <div>
            <p>El cliente ya se encuentra ingresado en el registro</p>
            <p>Por favor, verifique el CUIT, e intenta nuevamente.</p>
          </div>
        }
        showButtonsClose={false}
        variantBtn="warning"
        nameButton={"Aceptar"}
        handleOnClick={() => {
          handleModalShow("modal-new-cliente");
        }}
      />
      <ModalComponent
        modalId="modal-success"
        title="✅ Proceso exitoso"
        body={
          <div>
            <p>Se han guardado exitosamente</p>
          </div>
        }
        showButtonsClose={true}
        variantBtn="success"
      />
      <ModalComponent
        modalId="modal-warning-clienteID"
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
          handleModalShow('modal-clienteID')
        }}
      />
    </>
  );
}
