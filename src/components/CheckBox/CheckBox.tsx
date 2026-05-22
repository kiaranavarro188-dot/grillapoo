import { useState } from 'react';
import { CheckboxLogica } from './CheckBox';

interface CheckboxProps {
  controlador: CheckboxLogica;
}

export function CheckboxComponente({ controlador }: CheckboxProps) {
  // El truco de refresco idéntico al de la Grilla y el Dropdown
  const [_, setRefresh] = useState(0);

  const marcado = controlador.seleccionado();
  const deshabilitado = controlador.estaDeshabilitado();

  const manejarClick = () => {
    controlador.toggle();
    setRefresh(p => p + 1); // Forzamos a React a redibujar el nuevo estado del check
  };

  return (
    <div 
      onClick={manejarClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        cursor: deshabilitado ? 'not-allowed' : 'pointer',
        opacity: deshabilitado ? 0.5 : 1,
        fontFamily: 'sans-serif',
        userSelect: 'none',
        padding: '6px 0'
      }}
    >
      {/* CASILLERO VISUAL */}
      <div style={{
        width: '20px',
        height: '20px',
        border: marcado ? '2px solid #007bff' : '2px solid #ccc',
        borderRadius: '6px',
        backgroundColor: marcado ? '#007bff' : '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'all 0.2s ease',
        boxShadow: marcado ? '0 2px 6px rgba(0,123,255,0.2)' : 'none'
      }}>
        {/* Tilde interna (Checkmark) hecha con CSS puro */}
        {marcado && (
          <span style={{ 
            color: '#fff', 
            fontSize: '12px', 
            fontWeight: 'bold',
            transform: 'scale(1)',
            transition: 'transform 0.1s'
          }}>
            ✓
          </span>
        )}
      </div>

      {/* TEXTO (Label) */}
      <span style={{ 
        fontSize: '14px', 
        color: marcado ? '#333' : '#666',
        fontWeight: marcado ? 500 : 400
      }}>
        {controlador.label}
      </span>
    </div>
  );
}