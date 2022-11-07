import React, { useContext } from 'react';
import { styled, keyframes } from '@stitches/react';
import { violet, blackA, mauve, green } from '@radix-ui/colors';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { productsContext } from '../../../pages/cadastro/Cadastro';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod'
import { watch } from 'fs';

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: blackA.blackA9,
  position: 'fixed',
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

const StyledContent = styled(DialogPrimitive.Content, {
  backgroundColor: 'white',
  borderRadius: 6,
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '450px',
  maxHeight: '85vh',
  padding: 25,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&:focus': { outline: 'none' },
});

function Content({ children, ...props }: any) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay  />
      <StyledContent {...props}>{children}</StyledContent>
    </DialogPrimitive.Portal>
  );
}

const StyledTitle = styled(DialogPrimitive.Title, {
  margin: 0,
  fontWeight: 500,
  color: mauve.mauve12,
  fontSize: 17,
});

const StyledDescription = styled(DialogPrimitive.Description, {
  margin: '10px 0 20px',
  color: mauve.mauve11,
  fontSize: 15,
  lineHeight: 1.5,
});

// Exports
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogContent = Content;
export const DialogTitle = StyledTitle;
export const DialogDescription = StyledDescription;
export const DialogClose = DialogPrimitive.Close;

// Your app...
const Flex = styled('div', { display: 'flex' });
const Box = styled('div', {});

const Button = styled('button',{
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 15px',
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,

  variants: {
    variant: {
      violet: {
        backgroundColor: 'white',
        color: violet.violet11,
        boxShadow: `0 2px 10px ${blackA.blackA7}`,
        '&:hover': { backgroundColor: mauve.mauve3 },
        '&:focus': { boxShadow: `0 0 0 2px black` },
      },
      green: {
        backgroundColor: green.green4,
        color: green.green11,
        '&:hover': { backgroundColor: green.green5 },
        '&:focus': { boxShadow: `0 0 0 2px ${green.green7}` },
      },
    },
  },

  defaultVariants: {
    variant: 'violet',
  },
});

const IconButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: 25,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: violet.violet11,
  position: 'absolute',
  top: 10,
  right: 10,

  '&:hover': { backgroundColor: violet.violet4 },
  '&:focus': { boxShadow: `0 0 0 2px ${violet.violet7}` },
});

const Fieldset = styled('fieldset', {
  all: 'unset',
  display: 'flex',
  gap: 20,
  alignItems: 'center',
  marginBottom: 15,
});

const Label = styled('label', {
  fontSize: 15,
  color: violet.violet11,
  width: 90,
  textAlign: 'right',
});

const Input = styled('input', {
  all: 'unset',
  width: '100%',
  flex: '1',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 10px',
  fontSize: 15,
  lineHeight: 1,
  color: violet.violet11,
  boxShadow: `0 0 0 1px ${violet.violet7}`,
  height: 35,

  '&:focus': { boxShadow: `0 0 0 2px ${violet.violet8}` },
});
type Inputs = {
    _id: string,
  nome: string,
  marca: string,
  unidade: string,
  
  };
//   const productSchema = zod.object({
//     nome: zod.string().min(3, 'Informe o nome do produto'),
//     marca: zod.string().min(2, 'Informe o nome da marca'),
//     unidade:zod.string().min(1, 'Informe o nome da marca')
//   })

const DialogDemo = () => {
    const axiosPrivate = useAxiosPrivate()
    const {setProductList, productList} = useContext(productsContext)
    const { watch, control, handleSubmit, reset, formState: { errors }} = useForm<Inputs>({
    //   resolver: zodResolver(productSchema),
      defaultValues: {
        _id: "",
        nome: "" ,
        marca: "",
        unidade: "",
      }
    });
    const [open, setOpen] = React.useState(false);
    const onSubmit: SubmitHandler<Inputs>  = async (data: Inputs) => {
       axiosPrivate.post("produto/cadastro", 
       JSON.stringify(data)).then((info)=>{ 
          setProductList([...productList, info.data])})
        .then(response => {console.log("Sucess:", JSON.stringify(response)
        )})
        .catch(error => console.error("Error:", error))
        setOpen(false)
        reset()

      }
    return (
        
  <Dialog open={open} onOpenChange={setOpen}>
    
    <DialogTrigger asChild>
      <Button >Adicionar Produto</Button>
    </DialogTrigger>
    <DialogContent >
      <DialogTitle>Adicionar Produto</DialogTitle>
      <DialogDescription>
        Preencha as informações do produto
      </DialogDescription>
      <form onSubmit={handleSubmit(onSubmit)} style={{flexGrow: 1}} >
      <Fieldset>
        <Label htmlFor="name">Name</Label>
        <Controller
            name="nome"
            control={control}
            render={({ field }) =><Input
            {...field}
            required
            id="name"
            placeholder = {"Descrição"}
            />}/>
      </Fieldset>
      <Fieldset>
        <Label htmlFor="marca">Marca</Label>
        <Controller
            name="marca"
            control={control}
            render={({ field }) =><Input
            {...field}
            required
            id="marca"
            placeholder = {"Marca"}
            />}/>
      </Fieldset>
      <Fieldset>
        <Label htmlFor="unidade">Unidade</Label>
        <Controller
         name="unidade"
         control={control}
         render={({ field }) =><Input
            {...field}
            required
            id="unidade"
            placeholder = {"Unidade"}
            />}/>
      </Fieldset>
      <Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>

          <Button variant="green" type='submit'>Cadastrar</Button>

      </Flex>
      </form>
      <DialogClose asChild>
        <IconButton aria-label="Close">
          <Cross2Icon />
        </IconButton>
      </DialogClose>
    </DialogContent>
    
  </Dialog>

)};

export default DialogDemo;
