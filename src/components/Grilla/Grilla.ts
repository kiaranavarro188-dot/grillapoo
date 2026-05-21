import { BotonLogica } from '../Boton/Boton';

interface ConfigGrilla {
  titulo: string;
  columnas: string[];
  textoBoton: string;
  colorBoton?: string;
  alPresionarBoton: () => void; // El método que resolverá la acción
}

export class GrillaLogica {
  // ATRIBUTOS
  public titulo: string;
  public columnas: string[];
  private datos: string[][] = []; // Empieza vacía
  public botonAccion: BotonLogica; // COMPOSICIÓN: Atributo que guarda OTRA clase

  constructor(config: ConfigGrilla) {
    this.titulo = config.titulo;
    this.columnas = config.columnas;
    
    // La grilla fabrica su propio objeto Botón usando la clase BotonLogica
    this.botonAccion = new BotonLogica({
      texto: config.textoBoton,
      color: config.colorBoton,
      alHacerClick: config.alPresionarBoton
    });
  }

  // MÉTODOS
  public agregarFila(nuevaFila: string[]): void {
    this.datos.push(nuevaFila);
  }

  public obtenerDatos(): string[][] {
    return this.datos;
  }
}