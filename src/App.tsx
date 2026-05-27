import { useRef, useState } from 'react';

// Importación de Lógica
import { GrillaLogica } from './components/Grilla/Grilla';
import { DropdownLogica } from './components/DropBox/DropBox';
import { CheckboxLogica } from './components/CheckBox/CheckBox';
import { MenuLogica } from './components/Menu/Menu';

import { GrillaComponente } from './components/Grilla/Grilla.tsx';
import { DropdownComponente } from './components/DropBox/DropBox.tsx';
import { CheckboxComponente } from './components/CheckBox/CheckBox.tsx';
import { MenuComponente } from './components/Menu/Menu.tsx';

import './App.css'; 

export default function App() {
  const [, setRefrescar] = useState(0);

  // --- 1. INSTANCIA DEL MENÚ 
  const miMenu = useRef(new MenuLogica({
    itemsIniciales: [
      { id: "dashboard", texto: "Consolidación", accion: () => setRefrescar(p => p + 1) },
      { id: "organismo", texto: "Organismos", subMenus: [
          { id: "org-lista", texto: "Listado Oficial", accion: () => {} },
          { id: "org-config", texto: "Configuración", accion: () => {} }
      ]},
      { id: "reportes", texto: "Reportes", subMenus: [
          { id: "rep-lista", texto: "Lista", accion: () => {} },
          { id: "rep-modelos", texto: "Modelos", accion: () => {} }
      ]},
      
      { id: "usuarios", texto: "Usuarios", },
    ],
    alCambiarRuta: () => setRefrescar(p => p + 1)
  }));

  // --- 2. INSTANCIA DE LA GRILLA (Listado Principal) ---
  const miGrilla = useRef(new GrillaLogica({
    titulo: "Listado de Registros",
    columnas: ["ID", "Fecha", "Organismo", "Estado", "Acciones"],
    textoBoton: "Nuevo Registro +",
    colorBoton: "#000c7c", 
    alPresionarBoton: () => {
      miGrilla.current.agregarFila(["102", "26/05/2026", "Organismo Nuevo", "Pendiente", "---"]);
      setRefrescar(p => p + 1);
    }
  }));
   
    const miGrillaNueva = useRef(new GrillaLogica({
    titulo: "Listado de Registros nueva ",
    columnas: ["ID", "Fecha", "Organismo", "Estado", "Acciones"],
    textoBoton: "Nuevo Registro +",
    colorBoton: "#001885", 
    alPresionarBoton: () => {
      miGrillaNueva.current.agregarFila(["102", "26/05/2026", "Organismo Nuevo", "Pendiente", "---"]);
      setRefrescar(p => p + 1);
    }
  }));


  // --- 3. INSTANCIA DE FILTROS (Dropdown y Checkboxes) ---
  const filtroOrganismo = useRef(new DropdownLogica({
    tituloDefault: "Todos los Organismos",
    opcionesIniciales: [
      { id: "1", texto: "Ministerio de Educación" },
      { id: "2", texto: "Seguridad Social" },
      { id: "3", texto: "Secretaría de Seguridad" },
      { id: "4", texto: "Salud Pública" },
      { id: "5", texto: "Transporte" },
    ],
    alCambiarSeleccion: () => setRefrescar(p => p + 1)
  }));

  const checkSoloActivos = useRef(new CheckboxLogica({ 
    label: "Ver solo activos", 
    valorInicial: true, 
    alCambiarEstado: () => setRefrescar(p => p + 1) 
  }));

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      width: '100%',          // Al usar 100% evitamos desbordes con las barras de scroll nativas
      backgroundColor: '#f0f2f5', 
      fontFamily: '"Inter", "Segoe UI", sans-serif',
      overflow: 'hidden',     // Bloqueo total de scrolls globales raros
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }}>
      
      {/* --- BARRA LATERAL (MENU) --- */}
      {/* Ya no necesita trucos raros, recibe el menú que se banca su propio espacio */}
      <MenuComponente controlador={miMenu.current} />

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div style={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100vh',
        overflow: 'hidden',   // El contenedor intermedio se queda quieto
        boxSizing: 'border-box'
      }}>
        
        {/* CABECERA (HEADER) */}
        <header style={{
          height: '60px',
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          zIndex: 10,
          flexShrink: 0
        }}>
          <span style={{ color: '#001535', fontWeight: 700, fontSize: '18px' }}>
            CONSOLIDACIÓN POR ORGANISMO
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
             <span style={{ fontSize: '13px', color: '#666' }}>Admin Usuario</span>
             <div style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#2b4c7e', color: '#fff', display: 'grid', placeItems: 'center' }}>A</div>
          </div>
        </header>

        {/* CUERPO DEL DASHBOARD (El espacio gris de fondo) */}
        <main style={{ 
          padding: '24px 24px 24px 12px', // Margen izquierdo chico para que quede pegado al menú oscuro
          display: 'flex', 
          flexDirection: 'column', 
          gap: '20px',
          flexGrow: 1,
          overflowY: 'auto',              // Si el contenido es largo, el scroll vertical aparece SOLO acá adentro
          boxSizing: 'border-box',
          width: '100%'
        }}>
          
          {/* TARJETA DE FILTROS */}
          <section style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            border: '1px solid #e1e4e8',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            <div style={{ marginBottom: '15px', color: '#2b4c7e', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>🔍 Filtros de Búsqueda</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ width: '300px' }}>
                <label style={{ fontSize: '12px', color: '#666', marginBottom: '5px', display: 'block' }}>Seleccionar Organismo</label>
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

          {/* TARJETA DE LISTADO (GRILLA) */}
          <section style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            border: '1px solid #e1e4e8',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: '#333', fontSize: '18px' }}>Listado General</h3>
              <span style={{ fontSize: '12px', color: '#999' }}>Mostrando {miGrilla.current.obtenerDatos().length} resultados</span>
            </div>

            {/* ENCAPSULADOR DE SEGURIDAD PARA LA GRILLA */}
            <div style={{ 
              width: '100%', 
              overflowX: 'auto', // Scroll horizontal interno exclusivo para las columnas de la tabla
              backgroundColor: '#fafafa',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}>
              <GrillaComponente controlador={miGrilla.current} />
                <GrillaComponente controlador={miGrillaNueva.current} />
            </div>
          </section>

        </main>

        {/* FOOTER */}
        <footer style={{ padding: '15px 24px', fontSize: '12px', color: '#999', textAlign: 'center', backgroundColor: '#fff', borderTop: '1px solid #e1e4e8', flexShrink: 0 }}>
          © 2026 PACID - Sistema de Gestión de Organismos
        </footer>

      </div>
    </div>
  );
}