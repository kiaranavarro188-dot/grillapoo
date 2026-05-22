export interface OpcionDropdown {
  id: string;
  texto: string;
}

export interface ConfigDropdown {
  tituloDefault: string;               // El texto si no hay nada seleccionado (ej: "Seleccionar alumno")
  opcionesIniciales: OpcionDropdown[]; // El array de opciones [{id: '1', texto: 'Juan'}]
  alCambiarSeleccion?: (opcion: OpcionDropdown | null) => void; // Callback para avisar a React
  alCambiarEstadoMenu?: (abierto: boolean) => void;             // Callback por si la UI necesita saber si se abrió
}

export class DropdownLogica {
  // ATRIBUTOS
  public tituloDefault: string;
  private opciones: OpcionDropdown[] = [];
  private seleccionada: OpcionDropdown | null = null; // Guarda el objeto seleccionado actualmente
  private estaAbierto: boolean = false;              // Estado visual de si el menú está desplegado

  // Callbacks para comunicar la lógica con la vista (React)
  private alCambiarSeleccion?: (opcion: OpcionDropdown | null) => void;
  private alCambiarEstadoMenu?: (abierto: boolean) => void;

  constructor(config: ConfigDropdown) {
    this.tituloDefault = config.tituloDefault;
    this.opciones = config.opcionesIniciales;
    this.alCambiarSeleccion = config.alCambiarSeleccion;
    this.alCambiarEstadoMenu = config.alCambiarEstadoMenu;
  }

  // MÉTODOS DE ESTADO (Apertura y Cierre)
  public toggleMenu(): void {
    this.estaAbierto = !this.estaAbierto;
    if (this.alCambiarEstadoMenu) {
      this.alCambiarEstadoMenu(this.estaAbierto);
    }
  }

  public cerrarMenu(): void {
    this.estaAbierto = false;
    if (this.alCambiarEstadoMenu) {
      this.alCambiarEstadoMenu(this.estaAbierto);
    }
  }

  // MÉTODOS DE SELECCIÓN
  public seleccionarOpcion(id: string): void {
    const encontrada = this.opciones.find(o => o.id === id);
    if (encontrada) {
      this.seleccionada = encontrada;
      this.estaAbierto = false; // Al elegir una opción, el dropdown se cierra
      
      if (this.alCambiarSeleccion) {
        this.alCambiarSeleccion(this.seleccionada);
      }
      if (this.alCambiarEstadoMenu) {
        this.alCambiarEstadoMenu(this.estaAbierto);
      }
    }
  }

  public limpiarSeleccion(): void {
    this.seleccionada = null;
    if (this.alCambiarSeleccion) {
      this.alCambiarSeleccion(null);
    }
  }

  // MÉTODOS DINÁMICOS (Para mutar las opciones desde afuera)
  public agregarOpcion(nuevaOpcion: OpcionDropdown): void {
    if (!this.opciones.some(o => o.id === nuevaOpcion.id)) {
      this.opciones.push(nuevaOpcion);
    }
  }

  public eliminarOpcion(id: string): void {
    this.opciones = this.opciones.filter(o => o.id !== id);
    if (this.seleccionada?.id === id) {
      this.limpiarSeleccion();
    }
  }

  // GETTERS (Para que el TSX lea el estado interno)
  public obtenerOpciones(): OpcionDropdown[] {
    return this.opciones;
  }

  public obtenerSeleccionada(): OpcionDropdown | null {
    return this.seleccionada;
  }

  public menuDesplegado(): boolean {
    return this.estaAbierto;
  }
}