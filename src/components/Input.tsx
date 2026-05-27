import { useState } from 'react';
import { InputLogica } from './Input';

interface InputProps {
  controlador: InputLogica;
  ancho?: string;
}

export function InputComponente({ controlador, ancho = "100%" }: InputProps) {
  // Estado local para forzar el re-render de React al escribir
  const [texto, setTexto] = useState(controlador.obtenerValor());

  const manejarInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorActual = e.target.value;
    controlador.cambiarValor(valorActual); // Guarda en la clase lógica
    setTexto(valorActual);                 // Actualiza la pantalla
  };

  return (
    <input
      type="text"
      value={texto}
      placeholder={controlador.placeholder}
      onChange={manejarInput}
      style={{
        width: ancho,
        height: '38px',
        padding: '0 12px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '14px',
        fontFamily: 'inherit',
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        outline: 'none',
        transition: 'border-color 0.2s'
      }}
    />
  );
}