import { BotonLogica } from '../Boton/Boton';

interface ConfigGrilla {
  titulo: string;
  columnas: string[];
  textoBoton: string;
  colorBoton?: string;
  textoBotonSecundario?: string; //columna
  colorBotonSecundario?: string; //columna
  alPresionarBoton: () => void; // El método que resolverá la acción principal
  alPresionarBotonSecundario?: () => void; // Acción opcional para segundo botón
  alEliminarFila?: (index: number) => void; // Acción opcional para eliminar fila
  alEliminarColumna?: (index: number) => void; // Acción opcional para eliminar columna
}

export class GrillaLogica {
  // ATRIBUTOS
  public titulo: string;
  public columnas: string[];
  private datos: string[][] = []; // Empieza vacía
  public botonAccion: BotonLogica; // COMPOSICIÓN: Atributo que guarda OTRA clase
  public botonSecundario?: BotonLogica;
  private alEliminarFila?: (index: number) => void;
  private alEliminarColumna?: (index: number) => void;

  constructor(config: ConfigGrilla) {
    this.titulo = config.titulo;
    this.columnas = config.columnas;
    this.alEliminarFila = config.alEliminarFila;
    this.alEliminarColumna = config.alEliminarColumna;

    // La grilla fabrica su propio objeto Botón usando la clase BotonLogica
    this.botonAccion = new BotonLogica({
      texto: config.textoBoton,
      color: config.colorBoton,
      alHacerClick: config.alPresionarBoton
    });

    if (config.textoBotonSecundario && config.alPresionarBotonSecundario) {
      this.botonSecundario = new BotonLogica({
        texto: config.textoBotonSecundario,
        color: config.colorBotonSecundario,
        alHacerClick: config.alPresionarBotonSecundario
      });
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

  public obtenerDatos(): string[][] {
    return this.datos;
  }
}