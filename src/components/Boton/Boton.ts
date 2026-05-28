// Configuración que aceptará el constructor del botón
interface ConfigBoton {
  texto: string;
  color?: string;
  colorTexto?: string;
  alHacerClick: () => void;
}

export class BotonLogica {
  // ATRIBUTOS
  public texto: string;
  public color: string;
  public colorTexto: string;
  public deshabilitado: boolean = false; 
  private accion: () => void;

  constructor(config: ConfigBoton) {
    this.texto = config.texto;
    this.color = config.color || "blue"; // Azul por defecto
    this.colorTexto = config.colorTexto || "white"; // Blanco por defecto
    this.accion = config.alHacerClick;
  }

  // MÉTODOS
  public ejecutarAccion(): void {
    if (!this.deshabilitado) {
      this.accion();
    }
  }

  public desactivar(): void {
    this.deshabilitado = true;
  }

  public activar(): void {
    this.deshabilitado = false;
  }
}