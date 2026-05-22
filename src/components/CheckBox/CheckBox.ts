export interface ConfigCheckbox {
  label: string;               // El texto que acompaña al checkbox (ej: "Acepto términos")
  valorInicial?: boolean;      // Si arranca marcado (true) o desmarcado (false)
  deshabilitado?: boolean;     // Por si querés que esté grisado de entrada
  alCambiarEstado?: (marcado: boolean) => void; // El callback para avisarle a React o a otro componente
}

export class CheckboxLogica {
  // ATRIBUTOS PRIVADOS (Encapsulamiento de POO)
  public label: string;
  private estaMarcado: boolean = false;
  private esDeshabilitado: boolean = false;
  
  // Callback de comunicación
  private alCambiarEstado?: (marcado: boolean) => void;

  constructor(config: ConfigCheckbox) {
    this.label = config.label;
    this.estaMarcado = config.valorInicial || false;
    this.esDeshabilitado = config.deshabilitado || false;
    this.alCambiarEstado = config.alCambiarEstado;
  }

  // MÉTODOS DE ACCIÓN (Los que alteran el estado interno)
  public toggle(): void {
    // Si está deshabilitado, bloqueamos cualquier intento de cambio
    if (this.esDeshabilitado) return;

    this.estaMarcado = !this.estaMarcado;

    // Disparamos el callback para notificar a la vista
    if (this.alCambiarEstado) {
      this.alCambiarEstado(this.estaMarcado);
    }
  }

  public marcar(): void {
    if (this.esDeshabilitado || this.estaMarcado) return;
    this.estaMarcado = true;
    if (this.alCambiarEstado) this.alCambiarEstado(true);
  }

  public desmarcar(): void {
    if (this.esDeshabilitado || !this.estaMarcado) return;
    this.estaMarcado = false;
    if (this.alCambiarEstado) this.alCambiarEstado(false);
  }

  public setDeshabilitado(estado: boolean): void {
    this.esDeshabilitado = estado;
  }

  // GETTERS (Para que el archivo .tsx pueda leer el estado actual)
  public seleccionado(): boolean {
    return this.estaMarcado;
  }

  public estaDeshabilitado(): boolean {
    return this.esDeshabilitado;
  }
}