import { useState } from 'react'; 
import { GrillaLogica } from './Grilla';
import { BotonComponente } from '../Boton/Boton.tsx';

interface GrillaProps {
  controlador: GrillaLogica; // Recibe el objeto grilla completo desde la lógica
}

export function GrillaComponente({ controlador }: GrillaProps) {
  // El truco del estado para forzar a React a redibujar la pantalla cuando mutamos la lógica
  const [_, setRefresh] = useState(0);
  const filas = controlador.obtenerDatos();

  // Función para manejar la eliminación de filas
  const manejarEliminarFila = (index: number) => {
    controlador.eliminarFila(index);
    setRefresh(prev => prev + 1); // Dispara el re-render
  };

  // Función para manejar la eliminación de columnas
  const manejarEliminarColumna = (index: number) => {
    if (typeof controlador.eliminarColumna === 'function') {
      controlador.eliminarColumna(index);
      setRefresh(prev => prev + 1); // Dispara el re-render
    }
  };

  // NUEVA FUNCIÓN: Abre el prompt y edita el nombre de la columna por su índice
  const manejarEditarColumna = (index: number) => {
    const nombreActual = controlador.columnas[index];
    const nuevoNombre = prompt(`Editar nombre de la columna:`, nombreActual);
    
    if (nuevoNombre !== null && nuevoNombre.trim() !== "") {
      controlador.editarColumna(index, nuevoNombre);
      setRefresh(prev => prev + 1); // Dispara el re-render para ver el cambio de nombre
    }
  };

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      border: '1px solid #ddd', 
      padding: '20px', 
      borderRadius: '8px',
      maxWidth: '90%', // Permite que la tarjeta crezca si hay muchas columnas
      width: 'max-content', // Se ajusta al tamaño de la tabla
      minWidth: '400px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      backgroundColor: '#fff'
    }}>
      {/* Atributo Título de la Clase */}
      <h2 style={{ color: '#333', marginTop: 0 }}>{controlador.titulo}</h2>
      
      {/* Contenedor con scroll horizontal por si la tabla se estira demasiado */}
      <div style={{ width: '100%', overflowX: 'auto', marginBottom: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5', textAlign: 'left' }}>
              
              {/* Recorremos y dibujamos los encabezados de las columnas dinámicamente */}
              {controlador.columnas.map((col, index) => (
                <th key={index} style={{ padding: '10px', borderBottom: '2px solid #ddd', whiteSpace: 'nowrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <span>{col}</span>
                    
                    {/* Contenedor flexible para alinear los botones de cada columna */}
                    <div style={{ display: 'flex', gap: '4px' }}>
                      
                      {/* BOTÓN NUEVO DE EDITAR COLUMNA */}
                      <button
                        style={{
                          backgroundColor: '#f39c12', // Color naranja
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '4px 8px',
                          cursor: 'pointer',
                          fontSize: '11px'
                        }}
                        onClick={() => manejarEditarColumna(index)}
                      >
                        ✏️
                      </button>

                      {/* Botón X original para eliminar la columna */}
                      <button
                        style={{
                          backgroundColor: '#c0392b', // Color rojo
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '4px 8px',
                          cursor: 'pointer'
                        }}
                        onClick={() => manejarEliminarColumna(index)}
                      >
                        X
                      </button>
                    </div>

                  </div>
                </th>
              ))}
              
              {/* El encabezado fijo de Acciones queda prolijo al final de las columnas */}
              <th style={{ padding: '10px', borderBottom: '2px solid #ddd', whiteSpace: 'nowrap' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filas.length === 0 ? (
              <tr>
                <td colSpan={controlador.columnas.length + 1} style={{ padding: '15px', textAlign: 'center', color: '#888' }}>
                  No hay registros todavía.
                </td>
              </tr>
            ) : (
              filas.map((fila, index) => (
                <tr key={index}>
                  {fila.map((celda, cellIndex) => (
                    <td key={cellIndex} style={{ padding: '10px', borderBottom: '1px solid #eee', whiteSpace: 'nowrap' }}>
                      {celda}
                    </td>
                  ))}
                  <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                    <button
                      style={{
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        padding: '6px 12px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                      onClick={() => manejarEliminarFila(index)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Botones de acción inferiores (Agregar Fila, Agregar Columna) */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <BotonComponente controlador={controlador.botonAccion} />
        {controlador.botonSecundario && <BotonComponente controlador={controlador.botonSecundario} />}
      </div>
    </div>
  );
}