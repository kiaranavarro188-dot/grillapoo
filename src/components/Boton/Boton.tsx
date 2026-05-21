import { BotonLogica } from './Boton';

interface BotonProps {
  controlador: BotonLogica; // Pasamos el objeto de la clase entero
}

export function BotonComponente({ controlador }: BotonProps) {
  return (
    <button
      disabled={controlador.deshabilitado}
      style={{
        backgroundColor: controlador.color,
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: controlador.deshabilitado ? 'not-allowed' : 'pointer',
        opacity: controlador.deshabilitado ? 0.6 : 1,
        fontWeight: 'bold'
      }}
      onClick={() => controlador.ejecutarAccion()} // Llama al método de la clase
    >
      {controlador.texto} {/* Muestra el atributo de la clase */}
    </button>
  );
}