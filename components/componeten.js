import React, { useContext } from 'react';
import { TesteContex } from '../Context/TesteContex';
import useInput from '../hooks/useInput';
import useInputCustom from '../hooks/useInput';
import * as Teste from './componetes';
import { Imput } from './Imput';





const json = {
  conponentes: [
    {
      conponente: "Text",
      props: {
        text: "Código de barras",
        variant: "h6",
        sx: { ml: 5 },
        md: 4,
        xs: 12
      }
    },

    {
      conponente: "Imput",
      props: {
        label: "Código de barras",
        helperText: "Código que vem no produto.",
        name: "codigo1",
        sx: { 
       },
        md: 4,
        xs: 12
      }
    },
    {
      conponente: "Imput",
      props: {
        label: "Código de barras",
        helperText: "Código que vem no produto.",
        name: "codigo2",
        sx: { 
       },
        md: 4,
        xs: 12
      }
    },
    {
      conponente: "Imput",
      props: {
        label: "Código de barras",
        helperText: "Código que vem no produto.",
        name: "codigo3",
        sx: { 
       },
        md: 4,
        xs: 12
      }
    },
    {
      conponente: "Imput",
      props: {
        label: "Código de barras",
        helperText: "Código que vem no produto.",
        name: "codigo4",
        sx: { 
       },
        md: 4,
        xs: 12
      }
    }
    
  ]
}









export default function Componeten() {
  

  const [username, userInput] = useInput({ type: "text" });
  const [username2, userInput2] = useInput({ type: "text" });
  const [username3, userInput3] = useInput({ type: "text" });
  const [username4, userInput4] = useInput({ type: "text" });


  return (
    <React.Fragment>

{userInput}   {username} <br />
{username2}   {userInput2} <br />
{username3}   {userInput3} <br />
{username4}  {userInput4} <br />


      {json.conponentes.map(conponente => {
        const tete = conponente.conponente
        return (
        <div key={conponente.conponente}>

          {tete === "Imput" ? <Imput {...conponente.props} /> : null}
          {tete === "Text" ? <Teste.Text {...conponente.props} /> : null}

          
        </div>
      )})}

      <button onClick={() => {} }>
        Vai 
      </button>



    </React.Fragment>
  );
}
















