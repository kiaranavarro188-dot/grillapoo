import { GrillaLogica } from './Grilla';
import { BotonComponente } from '../Boton/Boton.tsx';
interface GrillaProps {
  controlador: GrillaLogica; // Recibe el objeto grilla completo
}

export function GrillaComponente({ controlador }: GrillaProps) {
  const filas = controlador.obtenerDatos();

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
              <th key={index} style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <span>{col}</span>
                  <button
                    style={{
                      backgroundColor: '#c0392b',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      cursor: 'pointer'
                    }}
                    onClick={() => controlador.eliminarColumna(index)}
                  >
                    X
                  </button>
                </div>
              </th>
            ))}
            <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Acciones</th>
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
                  <td key={cellIndex} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{celda}</td>
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
                    onClick={() => controlador.eliminarFila(index)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* 
        PASO CLAVE: Renderizamos el componente botón de React.
        ¿Qué le pasamos por prop? El objeto botón que vive ADENTRO de la clase grilla.
      */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <BotonComponente controlador={controlador.botonAccion} />
        {controlador.botonSecundario && <BotonComponente controlador={controlador.botonSecundario} />}
      </div>
    </div>
  );
}