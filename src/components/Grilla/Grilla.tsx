import { useState } from 'react';
import { GrillaLogica } from './Grilla';
import { BotonComponente } from '../Boton/Boton.tsx';
interface GrillaProps {
  controlador: GrillaLogica; // Recibe el objeto grilla completo
}

export function GrillaComponente({ controlador }: GrillaProps) {
  // Usamos un estado de React solo para forzar el redibujado en pantalla al añadir datos
  const [filas, setFilas] = useState<string[][]>(controlador.obtenerDatos());

  // Creamos un método puente para actualizar la vista de React cuando la clase cambie
  const refrescarTabla = () => {
    setFilas([...controlador.obtenerDatos()]);
  };

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      border: '1px solid #ddd', 
      padding: '20px', 
      borderRadius: '8px',
      maxWidth: '500px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      {/* Atributo Título de la Clase */}
      <h2 style={{ color: '#333', marginTop: 0 }}>{controlador.titulo}</h2>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', textAlign: 'left' }}>
            {/* Leemos el atributo Columnas de la Clase */}
            {controlador.columnas.map((col, index) => (
              <th key={index} style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.length === 0 ? (
            <tr>
              <td colSpan={controlador.columnas.length} style={{ padding: '15px', textAlign: 'center', color: '#888' }}>
                No hay registros todavía.
              </td>
            </tr>
          ) : (
            filas.map((fila, index) => (
              <tr key={index}>
                {fila.map((celda, cellIndex) => (
                  <td key={cellIndex} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{celda}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* 
        PASO CLAVE: Renderizamos el componente botón de React.
        ¿Qué le pasamos por prop? El objeto botón que vive ADENTRO de la clase grilla.
      */}
      <BotonComponente controlador={controlador.botonAccion} />
    </div>
  );
}