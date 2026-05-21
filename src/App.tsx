import { useRef, useState } from 'react';
import { GrillaLogica } from './components/Grilla/Grilla';
import { GrillaComponente } from './components/Grilla/Grilla.tsx';
import './App.css'; // Mantenemos tus estilos por si los usás

export default function App() {
  // Estado simple de React que usamos EXCLUSIVAMENTE para forzar el redibujado
  // de la pantalla cuando nuestro objeto muta internamente.
  const [, setRefrescar] = useState(0);

  const miPanelUsuarios = useRef(
    new GrillaLogica({
      titulo: "Lista de Alumnos Inscritos",
      columnas: ["ID", "Nombre"],
      textoBoton: "Agregar Fila",
      colorBoton: "purple", // Customizamos el atributo desde el constructor
      textoBotonSecundario: "Agregar columna",
      colorBotonSecundario: "green",
      alPresionarBoton: () => {
        // --- MÉTODO ACCIÓN DE NUESTRO OBJETO ---
        const cantidadActual = miPanelUsuarios.current.obtenerDatos().length;
        const nuevoId = (cantidadActual + 1).toString();
        
        // Modifica el atributo privado 'datos' de la instancia
        miPanelUsuarios.current.agregarFila([nuevoId, `Alumno Número ${nuevoId}`]);
        
        // Le avisamos a React que el objeto cambió para que actualice la vista
        setRefrescar(progreso => progreso + 1);
      },
      alPresionarBotonSecundario: () => {
        const nuevoNombreColumna = `Columna ${miPanelUsuarios.current.columnas.length + 1}`;
        miPanelUsuarios.current.agregarColumna(nuevoNombreColumna);
        setRefrescar(progreso => progreso + 1);
      },
      alEliminarFila: () => {
        setRefrescar(progreso => progreso + 1);
      },
     alEditarColumna: (_index, _nuevoNombre) => {    
        setRefrescar(progreso => progreso + 1); // Fuerza a React a redibujar el nuevo nombre
      }
    })

  );

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#fafafa',
      fontFamily: 'sans-serif' 
    }}>
    
      <GrillaComponente controlador={miPanelUsuarios.current} />
    </div>
  );
}