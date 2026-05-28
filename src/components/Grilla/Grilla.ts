import { BotonLogica } from "../Boton/Boton";

export interface GrillaConfig {
  titulo: string;
  columnas: string[];
  textoBoton: string;
  colorGrilla?: string; // Nuevo atributo opcional para el color de fondo de la grilla
  colorBoton?: string;
  colorTextoBoton?: string;
  textoBotonSecundario?: string; //columna
  colorBotonSecundario?: string; //columna
  colorTextoBotonSecundario?: string;
  textoBotonFuente?: string;
  colorBotonFuente?: string;
  colorTextoBotonFuente?: string;
  alPresionarBoton: () => void; // El método que resolverá la acción principal
  alPresionarBotonSecundario?: () => void; // Acción opcional para segundo botón
  alEliminarFila?: (index: number) => void; // Acción opcional para eliminar fila
  alEliminarColumna?: (index: number) => void; // Acción opcional para eliminar columna
  alEditarColumna?: (index: number, nuevoNombre: string) => void;
  alCambiarFuente?: () => void;
}


export class GrillaLogica {
  public titulo: string;
  public columnas: string[];
  private datos: string[][] = []; // Empieza vacía
  public botonAccion: BotonLogica; // COMPOSICIÓN: Atributo que guarda OTRA clase
  public botonSecundario?: BotonLogica;
  public botonFuente?: BotonLogica;
  public fuenteActual: string = "Arial, sans-serif";
  private fuentesDisponibles: string[] = ["Arial, sans-serif", "Roboto", "Lobster", "Playfair Display", "Montserrat", "Pacifico"];
  private indiceFuenteActual: number = 0;
  private alEliminarFila?: (index: number) => void;
  private alEliminarColumna?: (index: number) => void;
  private alEditarColumna?: (index: number, nuevoNombre: string) => void;
  private alCambiarFuente?: () => void;

  constructor(config: GrillaConfig) {
    this.titulo = config.titulo;
    this.columnas = config.columnas;
    this.alEliminarFila = config.alEliminarFila;
    this.alEliminarColumna = config.alEliminarColumna;
    this.alEditarColumna = config.alEditarColumna;
    this.alCambiarFuente = config.alCambiarFuente;

    // La grilla fabrica su propio objeto Botón usando la clase BotonLogica
    this.botonAccion = new BotonLogica({
      texto: config.textoBoton,
      color: config.colorBoton,
      colorTexto: config.colorTextoBoton,
      alHacerClick: config.alPresionarBoton
    });

    if (config.textoBotonSecundario && config.alPresionarBotonSecundario) {
      this.botonSecundario = new BotonLogica({
        texto: config.textoBotonSecundario,
        color: config.colorBotonSecundario,
        colorTexto: config.colorTextoBotonSecundario,
        alHacerClick: config.alPresionarBotonSecundario
      });
    }

    if (config.textoBotonFuente) {
      this.botonFuente = new BotonLogica({
        texto: config.textoBotonFuente,
        color: config.colorBotonFuente || "#4a5568",
        colorTexto: config.colorTextoBotonFuente || "#ffffff",
        alHacerClick: () => this.siguienteFuente()
      });
    }
  }

  // MÉTODO NUEVO: Cicla a la siguiente fuente de Google Fonts
  public siguienteFuente(): void {
    this.indiceFuenteActual = (this.indiceFuenteActual + 1) % this.fuentesDisponibles.length;
    const fontName = this.fuentesDisponibles[this.indiceFuenteActual];
    
    if (fontName !== "Arial, sans-serif") {
      const fontId = `google-font-${fontName.replace(/\s+/g, '-').toLowerCase()}`;
      if (!document.getElementById(fontId)) {
        const link = document.createElement('link');
        link.id = fontId;
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}&display=swap`;
        document.head.appendChild(link);
      }
      this.fuenteActual = `'${fontName}', sans-serif`;
    } else {
      this.fuenteActual = "Arial, sans-serif";
    }

    if (this.alCambiarFuente) {
      this.alCambiarFuente();
    }
  }

  // MÉTODOS
  public agregarFila(nuevaFila: string[]): void {
    while (nuevaFila.length < this.columnas.length) {
      nuevaFila.push("");
    }
    this.datos.push(nuevaFila);
  }

  // NUEVO MÉTODO: Elimina del array por índice
  public eliminarFila(index: number): void {
    if (index >= 0 && index < this.datos.length) {
      this.datos.splice(index, 1); // Borra la fila del origen de datos
      
      // Si pasaron un callback de afuera (ej. React para disparar un re-render), lo ejecutamos
      if (this.alEliminarFila) {
        this.alEliminarFila(index);
      }
    }
  }

    public eliminarColumna(index: number): void {
    if (index >= 0 && index < this.columnas.length) {
      this.columnas.splice(index, 1); // Borra el encabezado de columna
      this.datos = this.datos.map(fila => fila.filter((_, i) => i !== index)); // Borra los valores de esa columna en cada fila
      
      // Si pasaron un callback de afuera (ej. React para disparar un re-render), lo ejecutamos
      if (this.alEliminarColumna) {
        this.alEliminarColumna(index);
      }
    }
  }

  public agregarColumna(nombreColumna: string): void {
    this.columnas.push(nombreColumna);
    this.datos = this.datos.map(fila => [...fila, ""]);
  }

  public editarColumna(index: number, nuevoNombre: string): void {
    if (index >= 0 && index < this.columnas.length) {
      this.columnas[index] = nuevoNombre;
      if (this.alEditarColumna) {
        this.alEditarColumna(index, nuevoNombre);
      }
    }
  }


  public editarFila(indice: number, nuevosDatos: string[]): void {
  if (indice >= 0 && indice < this.datos.length) {
    // reemplaza los datos de la fila por los nuevos
    this.datos[indice] = nuevosDatos;
  }
}

  public obtenerDatos(): string[][] {
    return this.datos;
  }

  public agregarcolumnas(nuevoNombre: string): void {
    this.columnas.push(nuevoNombre);
    this.datos = this.datos.map(fila => [...fila, "-"]);
  }

  // MÉTODO CORREGIDO: Vacío de parámetros para que no tire error al llamarlo
  public borrarfila(): void {
    this.datos.pop();
  }
}