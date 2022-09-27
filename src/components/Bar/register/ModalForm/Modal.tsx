import { Modal } from "./ModalForm";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    _id: string,
  nome: string,
  marca: string,
  unidade: string,
};

export  function ModalForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>(
    
  );
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
//   console.log(watch("nome")) // watch input value by passing the name of it
  return (
    <Modal>

    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="test" {...register("nome")} />
      
      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("marca", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.marca && <span>This field is required</span>}

      <select
        {...register("unidade")}
      >
        <option value="m">m</option>
        <option value="uni">uni</option>
        <option value="kg">kg</option>

      </select>

      <input type="submit" value={"Atualizar"}/> 

    </form>
    </Modal>
  );
}