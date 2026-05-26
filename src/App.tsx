import { useRef, useState } from 'react';
import { GrillaLogica } from './components/Grilla/Grilla';
import { GrillaComponente } from './components/Grilla/Grilla.tsx';
import { DropdownLogica } from './components/DropBox/DropBox';
import { DropdownComponente } from './components/DropBox/DropBox.tsx';
import { CheckboxLogica } from './components/CheckBox/CheckBox';
import { CheckboxComponente } from './components/CheckBox/CheckBox.tsx';
import { MenuLogica } from './components/Menu/Menu';
import { MenuComponente } from './components/Menu/Menu.tsx';

import './App.css'; 

export default function App() {
  const [, setRefrescar] = useState(0);
  const miMenuLateral = useRef(
    new MenuLogica({
      itemsIniciales: [
        { 
          id: "inicio", 
          texto: "Dashboard General", 
          icono: "📊",
          accion: () => console.log("Navegando al Inicio...")
        },
        {
          id: "alumnos_seccion",
          texto: "Gestión de Alumnos",
          icono: "👥",
          subMenus: [
            { id: "sub_alta", texto: "Inscripciones", accion: () => console.log("Click en Inscripciones") },
            { id: "sub_asistencia", texto: "Control Asistencia", accion: () => console.log("Click en Asistencia") },
            { id: "sub_grilla", texto: "Panel de Datos", accion: () => console.log("Click en Ver Grilla") }
          ]
        },
        {
          id: "config_seccion",
          texto: "Configuración",
          icono: "⚙️",
          subMenus: [
            { id: "sub_perfil", texto: "Mi Perfil", accion: () => console.log("Click en Mi Perfil") },
            { id: "sub_sistema", texto: "Ajustes del Sistema", accion: () => console.log("Click en Ajustes") }
          ]
        }
      ],
      alCambiarRuta: (idItem, idSubMenu) => {
        console.log(`Ruta cambiada: Principal=${idItem}, Submenú=${idSubMenu || "Ninguno"}`);
        setRefrescar(p => p + 1); // Fuerza a React a actualizar los estilos del menú
      }
    })
  );
  // --- CONTROLADOR DE LA GRILLA (Alumnos) ---
  const miPanelUsuarios = useRef(
    new GrillaLogica({
      titulo: "Lista de Alumnos Inscritos",
      columnas: ["ID", "Nombre"],
      textoBoton: "Agregar Fila",
      colorBoton: "purple", 
      textoBotonSecundario: "Agregar columna",
      colorBotonSecundario: "green",
      alPresionarBoton: () => {
        const cantidadActual = miPanelUsuarios.current.obtenerDatos().length;
        const nuevoId = (cantidadActual + 1).toString();
        
        const nuevaFila = miPanelUsuarios.current.columnas.map((col, index) => {
          if (index === 0) return nuevoId;
          if (index === 1) return `Alumno Número ${nuevoId}`;
          return `Dato ${col}`;
        });

        miPanelUsuarios.current.agregarFila(nuevaFila);
        setRefrescar(p => p + 1);
      },
      alPresionarBotonSecundario: () => {
        const nuevoNombreColumna = `Columna ${miPanelUsuarios.current.columnas.length + 1}`;
        miPanelUsuarios.current.agregarColumna(nuevoNombreColumna);
        setRefrescar(p => p + 1);
      },
      alEliminarFila: () => setRefrescar(p => p + 1),
      alEliminarColumna: () => setRefrescar(p => p + 1),
      alEditarColumna: () => setRefrescar(p => p + 1)
    })
  );

  // --- CONTROLADOR DEL DROPDOWN (Materias) ---
  const miDropdownMaterias = useRef(
    new DropdownLogica({
      tituloDefault: "Seleccionar Materia 📚",
      opcionesIniciales: [
        { id: "1", texto: "Probabilidad y Estadística" },
        { id: "2", texto: "Programación .NET" },
        { id: "3", texto: "Arquitectura de Software" }
      ],
      alCambiarSeleccion: () => setRefrescar(p => p + 1),
      alCambiarEstadoMenu: () => setRefrescar(p => p + 1)
    })
  );

  // 🆕 AGREGADO: INSTANCIA 1 DEL CHECKBOX (Términos)
  // Arranca desmarcado por defecto (false)
  const checkTerminos = useRef(
    new CheckboxLogica({
      label: "Acepto los términos de matriculación",
      valorInicial: false,
      alCambiarEstado: (marcado) => {
        console.log("Check Términos cambió a:", marcado);
        setRefrescar(p => p + 1); // Gatilla el re-render para actualizar la pantalla
      }
    })
  );

  // 🆕 AGREGADO: INSTANCIA 2 DEL CHECKBOX (Trabaja)
  // Reutilizamos la misma clase pero con configuración distinta: arranca marcado (true)
  const checkTrabaja = useRef(
    new CheckboxLogica({
      label: "El alumno trabaja actualmente",
      valorInicial: true,
      alCambiarEstado: (marcado) => {
        console.log("Check Trabaja cambió a:", marcado);
        setRefrescar(p => p + 1);
      }
    })
  );

  // 🧠 MODIFICACIÓN EXPLICADA: Cambiamos la estructura del contenedor padre a 'flex' horizontal (fila).
  // Esto nos permite encastrar el Menú a la izquierda y el resto de las cosas a la derecha sin que se pisen.
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fafafa' }}>
      
      {/* 🆕 INYECCIÓN DEL COMPONENTE MENÚ PRINCIPAL */}
      {/* Agregado por la IA: Renderizamos el componente visual pasándole la instancia de control de POO */}
      <MenuComponente controlador={miMenuLateral.current} />

      {/* 🆕 CONTENEDOR DE CONTENIDO PRINCIPAL (DERECHO) */}
      {/* Agregado por la IA: Agrupamos el Layout viejo en este div y le metemos 'marginLeft: 260px' 
          para que coincida exactamente con el ancho del Sidebar y no quede solapado por debajo. */}
      <div style={{
        marginLeft: '260px',
        flexGrow: 1,
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        alignItems: 'center',
        boxSizing: 'border-box'
      }}>
        
        {/* PANEL SUPERIOR: Dropdown + Checkboxes */}
        <div style={{ 
          display: 'flex',
          gap: '20px',
          alignItems: 'stretch',
          width: '700px',
          maxWidth: '100%'
        }}>
          
          {/* Tarjeta del Dropdown */}
          <div style={{ 
            backgroundColor: '#fff', padding: '20px', borderRadius: '12px', 
            border: '1px solid #ddd', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', flex: 1 
          }}>
            <h4 style={{ marginTop: 0, marginBottom: '15px', color: '#444' }}>Asignación de Cursada</h4>
            <DropdownComponente controlador={miDropdownMaterias.current} ancho="100%" />
            <p style={{ fontSize: '13px', color: '#666', marginTop: '15px', marginBottom: 0 }}>
              <b>Materia activa:</b> {miDropdownMaterias.current.obtenerSeleccionada()?.texto || "Ninguna"}
            </p>
          </div>

          {/* 🆕 AGREGADO: Tarjeta de Checkboxes independientes */}
          <div style={{ 
            backgroundColor: '#fff', padding: '20px', borderRadius: '12px', 
            border: '1px solid #ddd', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', flex: 1,
            display: 'flex', flexDirection: 'column', justifyContent: 'center'
          }}>
            <h4 style={{ marginTop: 0, marginBottom: '15px', color: '#444' }}>Condiciones del Alumno</h4>
            
            {/* Renderizamos el primer Checkbox */}
            <CheckboxComponente controlador={checkTerminos.current} />
            
            {/* Renderizamos el segundo Checkbox */}
            <CheckboxComponente controlador={checkTrabaja.current} />

            {/* Bloque para validar que la lógica guarda bien los estados individuales */}
            <div style={{ marginTop: '15px', fontSize: '11px', color: '#888', borderTop: '1px solid #eee', paddingTop: '10px' }}>
              <div><b>Estado Términos:</b> {checkTerminos.current.seleccionado() ? "🟢 Aceptado" : "🔴 No aceptado"}</div>
              <div><b>Estado Trabaja:</b> {checkTrabaja.current.seleccionado() ? "🟢 Sí" : "🔴 No"}</div>
            </div>
          </div>

        </div>

        {/* Grilla de Alumnos */}
        <GrillaComponente controlador={miPanelUsuarios.current} />
        
      </div>
    </div>
  );
}