import { useState } from 'react';
import { DropdownLogica } from './DropBox';

interface DropdownProps {
  controlador: DropdownLogica;
  ancho?: string;
}

export function DropdownComponente({ controlador, ancho = '200px' }: DropdownProps) {
  // El mismo truco de refresco que usamos en la grilla
  const [_, setRefresh] = useState(0);

  const abierta = controlador.menuDesplegado();
  const seleccionada = controlador.obtenerSeleccionada();
  const opciones = controlador.obtenerOpciones();

  // Función para manejar el click en una opción
  const alElegir = (id: string) => {
    controlador.seleccionarOpcion(id);
    setRefresh(p => p + 1); // Forzamos redibujado
  };

  // Función para abrir/cerrar
  const alToglear = () => {
    controlador.toggleMenu();
    setRefresh(p => p + 1);
  };

  return (
    <div style={{ 
      position: 'relative', 
      width: ancho, 
      fontFamily: 'Arial, sans-serif',
      userSelect: 'none' 
    }}>
      {/* BOTÓN PRINCIPAL (Trigger) */}
      <div 
        onClick={alToglear}
        style={{
          padding: '12px 15px',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          transition: 'all 0.2s'
        }}
      >
        <span style={{ color: seleccionada ? '#333' : '#888' }}>
          {seleccionada ? seleccionada.texto : controlador.tituloDefault}
        </span>
        <span style={{ 
          transform: abierta ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
          fontSize: '12px'
        }}>
          ▼
        </span>
      </div>

      {/* MENÚ DESPLEGABLE */}
      {abierta && (
        <div style={{
          position: 'absolute',
          top: '110%',
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          borderRadius: '8px',
          boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
          zIndex: 100,
          maxHeight: '200px',
          overflowY: 'auto'
        }}>
          {opciones.length === 0 ? (
            <div style={{ padding: '10px', color: '#999', textAlign: 'center' }}>
              No hay opciones
            </div>
          ) : (
            opciones.map((op) => (
              <div
                key={op.id}
                onClick={() => alElegir(op.id)}
                style={{
                  padding: '10px 15px',
                  cursor: 'pointer',
                  backgroundColor: seleccionada?.id === op.id ? '#f0f7ff' : 'transparent',
                  color: seleccionada?.id === op.id ? '#007bff' : '#333',
                  borderBottom: '1px solid #f5f5f5',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = seleccionada?.id === op.id ? '#f0f7ff' : 'transparent'}
              >
                {op.texto}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

