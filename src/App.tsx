import { useRef, useState } from 'react';

// Importación de Lógica
import { GrillaLogica } from './components/Grilla/Grilla';
import { DropdownLogica } from './components/DropBox/DropBox';
import { CheckboxLogica } from './components/CheckBox/CheckBox';
import { MenuLogica } from './components/Menu/Menu';

// Importación de Componentes Visuales
import { GrillaComponente } from './components/Grilla/Grilla.tsx';
import { DropdownComponente } from './components/DropBox/DropBox.tsx';
import { CheckboxComponente } from './components/CheckBox/CheckBox.tsx';
import { MenuComponente } from './components/Menu/Menu.tsx';

import './App.css';

export default function App() {
  const [, setRefrescar] = useState(0);

  // --- MENÚ LATERAL ---
  const miMenu = useRef(new MenuLogica({
    itemsIniciales: [
      { id: "dashboard", texto: "Consolidación", icono: "🏠" },
      { id: "organismo", texto: "Organismos", icono: "🏢", subMenus: [
          { id: "sub1", texto: "Listado Oficial", accion: () => {} },
          { id: "sub2", texto: "Configuración", accion: () => {} }
      ]},
      { id: "reportes", texto: "Reportes", icono: "📊" },
      { id: "usuarios", texto: "Usuarios", icono: "👤" },
    ],
    alCambiarRuta: () => setRefrescar(p => p + 1)
  }));

  // --- FILTROS ---
  const filtroOrganismo = useRef(new DropdownLogica({
    tituloDefault: "Todos los Organismos",
    opcionesIniciales: [
      { id: "1", texto: "Ministerio de Educación" },
      { id: "2", texto: "Seguridad Social" }
    ],
    alCambiarSeleccion: () => setRefrescar(p => p + 1)
  }));

  const checkSoloActivos = useRef(new CheckboxLogica({
    label: "Ver solo activos",
    valorInicial: true,
    alCambiarEstado: () => setRefrescar(p => p + 1)
  }));

  // --- GRILLA 1 ---
  const miGrilla = useRef(new GrillaLogica({
    titulo: "Listado de Registros",
    columnas: ["ID", "Fecha", "Organismo", "Estado"],
    textoBoton: "Nuevo Registro +",
    colorBoton: "#2b4c7e",
    textoBotonSecundario: "+ Agregar Columna",
    colorBotonSecundario: "#530744",
    alPresionarBoton: () => {
      miGrilla.current.agregarFila(["102", "26/05/2026", "Organismo Nuevo", "Pendiente"]);
      setRefrescar(p => p + 1);
    },
    alPresionarBotonSecundario: () => {
      const nuevoNombre = `Columna ${miGrilla.current.columnas.length + 1}`;
      miGrilla.current.agregarColumna(nuevoNombre);
      setRefrescar(p => p + 1);
    },
    alEliminarFila: () => setRefrescar(p => p + 1),
    alEliminarColumna: () => setRefrescar(p => p + 1),
    alEditarColumna: () => setRefrescar(p => p + 1)
  }));

  // --- GRILLA 2 ---
  const miGrillaNueva = useRef(new GrillaLogica({
    titulo: "Listado de Registros nueva",
    columnas: ["ID", "Fecha", "Organismo", "Estado"],
    textoBoton: "Nuevo Registro +",
    colorBoton: "#2b4c7e",
    textoBotonSecundario: "+ Agregar Columna",
    colorBotonSecundario: "#530744",
    alPresionarBoton: () => {
      miGrillaNueva.current.agregarFila(["102", "26/05/2026", "Organismo Nuevo", "Pendiente"]);
      setRefrescar(p => p + 1);
    },
    alPresionarBotonSecundario: () => {
      const nuevoNombre = `Columna ${miGrillaNueva.current.columnas.length + 1}`;
      miGrillaNueva.current.agregarColumna(nuevoNombre);
      setRefrescar(p => p + 1);
    },
    alEliminarFila: () => setRefrescar(p => p + 1),
    alEliminarColumna: () => setRefrescar(p => p + 1),
    alEditarColumna: () => setRefrescar(p => p + 1)
  }));

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#f0f2f5',
      fontFamily: 'sans-serif',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }}>

      {/* SIDEBAR */}
      <MenuComponente controlador={miMenu.current} />

      {/* CONTENIDO PRINCIPAL */}
      <div style={{
        marginLeft: '260px',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box'
      }}>

        {/* HEADER */}
        <header style={{
          height: '60px',
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
        }}>
          <span style={{ color: '#2b4c7e', fontWeight: 700, fontSize: '18px' }}>
            CONSOLIDACIÓN POR ORGANISMO
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '13px', color: '#666' }}>Admin Usuario</span>
            <div style={{
              width: '35px',
              height: '35px',
              borderRadius: '50%',
              backgroundColor: '#2b4c7e',
              color: '#fff',
              display: 'grid',
              placeItems: 'center'
            }}>A</div>
          </div>
        </header>

        {/* CUERPO */}
        <main style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          flexGrow: 1,
          boxSizing: 'border-box',
          width: '100%'
        }}>

          {/* TARJETA DE FILTROS */}
          <section style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            border: '1px solid #e1e4e8'
          }}>
            <div style={{
              marginBottom: '15px',
              color: '#2b4c7e',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span>🔍 Filtros de Búsqueda</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ width: '300px' }}>
                <label style={{ fontSize: '12px', color: '#666', marginBottom: '5px', display: 'block' }}>
                  Seleccionar Organismo
                </label>
                <DropdownComponente controlador={filtroOrganismo.current} ancho="100%" />
              </div>

              <div style={{ paddingBottom: '10px' }}>
                <CheckboxComponente controlador={checkSoloActivos.current} />
              </div>

              <button style={{
                backgroundColor: '#2b4c7e',
                color: '#fff',
                border: 'none',
                padding: '10px 25px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600,
                height: '42px'
              }}>
                Buscar
              </button>
            </div>
          </section>

          {/* TARJETA GRILLA 1 */}
          <section style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            border: '1px solid #e1e4e8',
            overflowX: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ margin: 0, color: '#333', fontSize: '18px' }}>Listado General</h3>
              <span style={{ fontSize: '12px', color: '#999' }}>
                Mostrando {miGrilla.current.obtenerDatos().length} resultados
              </span>
            </div>
            <GrillaComponente controlador={miGrilla.current} />
          </section>

          {/* TARJETA GRILLA 2 */}
          <section style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            border: '1px solid #e1e4e8',
            overflowX: 'auto'
          }}>
            <GrillaComponente controlador={miGrillaNueva.current} />
          </section>

        </main>

        {/* FOOTER */}
        <footer style={{
          padding: '15px 24px',
          fontSize: '12px',
          color: '#999',
          textAlign: 'center',
          backgroundColor: '#fff',
          borderTop: '1px solid #e1e4e8'
        }}>
          © 2026 PACID - Sistema de Gestión de Organismos
        </footer>

      </div>
    </div>
  );
}