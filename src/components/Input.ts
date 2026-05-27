export interface InputConfig {
  placeholder?: string;
  valorInicial?: string;
  alCambiarTexto?: (nuevoTexto: string) => void;
}

export class InputLogica {
  // Atributos privados (Encapsulamiento)
  private valor: string;
  public placeholder: string;
  private alCambiarTexto?: (nuevoTexto: string) => void;

  constructor(config: InputConfig = {}) {
    this.valor = config.valorInicial || "";
    this.placeholder = config.placeholder || "Escribí acá...";
    this.alCambiarTexto = config.alCambiarTexto;
  }

  // Getter para que la pantalla consulte qué hay escrito (Solo lectura)
  public obtenerValor(): string {
    return this.valor;
  }

  // Método público para actualizar el estado internamente
  public cambiarValor(nuevoTexto: string): void {
    this.valor = nuevoTexto;
    if (this.alCambiarTexto) {
      this.alCambiarTexto(nuevoTexto);
    }
  }

  // Método útil para limpiar la caja de texto desde el código
  public limpiar(): void {
    this.valor = "";
  }
}