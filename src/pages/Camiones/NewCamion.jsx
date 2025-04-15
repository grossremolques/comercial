import { useCamiones } from "../../context/Camiones/CamionesContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TemplateFormCamion } from "../../templates/Camiones";
import { useAuth } from "../../context/AuthContext";
import { ModalComponent } from "../../components/ModalComponent";
import { useModal } from "../../context/ModalContext";
import LoadingIcon from "../../components/LoaderIcon";
import { useNavigate } from "react-router-dom";
export default function NewCamion() {
  const navigate = useNavigate();
  const {handleModalShow, handleModalClose} = useModal()
  const { getUser, user } = useAuth();
  const { atributos, getAtributos, postCamion } = useCamiones();
  const STORAGE_KEY = "data-camion";
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  const resetValues = Object.keys(data).reduce((acc, item) => {
    acc[item] = '';
    return acc;
  },{})

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: data,
  });
  const watchedValues = watch();
  //Guarda las actualizaciones en el localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchedValues));
  }, [watchedValues]);

  useEffect(() => {
    getAtributos();
    getUser();
  }, []);
  const onSubmit = async (data) => {
    handleModalShow("modal-loading");
    data.registrado_por = user?.alias;
    try {
      const response = await postCamion(data);
      if (response.status === 200) {
        localStorage.removeItem(STORAGE_KEY);
        reset(resetValues)
        handleModalShow("modal-success");
      }
      else if (response.isAlreadyIn) {
        handleModalShow("modal-warning");
      }
    }
    catch (e) {
      handleModalShow("modal-error");
      console.error(e);
    }
    
  };
  return (
    <div>
      <TemplateFormCamion
        atributos={atributos}
        register={register}
        camionData={data}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        watch={watch}
        setValue={setValue}
      />
      <ModalComponent
        modalId="modal-loading"
        title="Procesando"
        body={<LoadingIcon />}
        showButtonsClose={false}
      />
      <ModalComponent
        modalId="modal-error"
        title="Error"
        body={
          <div>
            <p>Hubo un error.</p>
            <p>Por favor, intente nuevamente.</p>
          </div>
        }
        showButtonsClose={true}
      />
      <ModalComponent
        modalId="modal-warning"
        title="⚠️ Registro Existente"
        body={
          <div>
            <p>El camión ya se encuentra ingresado en el registro</p>
            <p>Por favor, verifica los datos, e intenta nuevamente.</p>
          </div>
        }
        showButtonsClose={true}
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
        variantBtn='success'
        nameButton={'Ir a Camiones'}
        handleOnClick={() => {
          handleModalClose();
          navigate('/camiones')
        }}
      />
    </div>
  );
}
