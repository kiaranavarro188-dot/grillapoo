export interface SubMenuItem {
  id: string;
  texto: string;
  accion: () => void; // Lo que pasa al hacer click (ej: cambiar una vista)
}

export interface MenuItemConfig {
  id: string;
  texto: string;
  icono?: string;        // Un emoji o string para el icono (ej: "⚙️", "📊")
  accion?: () => void;   // Acción si es un botón directo
  subMenus?: SubMenuItem[]; // Si tiene elementos adentro
}

export interface ConfigMenu {
  itemsIniciales: MenuItemConfig[];
  alCambiarRuta?: (idItem: string, idSubMenu?: string) => void; // Feedback para saber dónde hizo click el usuario
}

export class MenuLogica {
  private items: MenuItemConfig[] = [];
  private itemActivoId: string | null = null;
  private subMenuActivoId: string | null = null;
  private subMenusAbiertos: Record<string, boolean> = {}; // Guarda qué menú con hijos está expandido

  private alCambiarRuta?: (idItem: string, idSubMenu?: string) => void;

  constructor(config: ConfigMenu) {
    this.items = config.itemsIniciales;
    this.alCambiarRuta = config.alCambiarRuta;
    
    // Inicializamos todos los menús con hijos como cerrados
    this.items.forEach(item => {
      if (item.subMenus) {
        this.subMenusAbiertos[item.id] = false;
      }
    });
  }

  // ACCIÓN: Cuando el usuario hace click en un ítem principal
  public seleccionarItemPrincipal(id: string): void {
    const item = this.items.find(i => i.id === id);
    if (!item) return;

    if (item.subMenus && item.subMenus.length > 0) {
      // Si tiene submenús, el click expande/colapsa la lista en vez de navegar
      this.subMenusAbiertos[id] = !this.subMenusAbiertos[id];
    } else {
      // Si es un link directo, seteamos los activos y disparamos su acción
      this.itemActivoId = id;
      this.subMenuActivoId = null;
      if (item.accion) item.accion();
      if (this.alCambiarRuta) this.alCambiarRuta(id);
    }
  }

  // ACCIÓN: Cuando hace click en un submenú de la lista desplegada
  public seleccionarSubMenu(idItemPrincipal: string, idSubMenu: string): void {
    const item = this.items.find(i => i.id === idItemPrincipal);
    const subItem = item?.subMenus?.find(s => s.id === idSubMenu);

    if (subItem) {
      this.itemActivoId = idItemPrincipal;
      this.subMenuActivoId = idSubMenu;
      if (subItem.accion) subItem.accion();
      if (this.alCambiarRuta) this.alCambiarRuta(idItemPrincipal, idSubMenu);
    }
  }

  // GETTERS (Para que el TSX dibuje el estado actual)
  public obtenerItems(): MenuItemConfig[] {
    return this.items;
  }

  public esItemActivo(id: string): boolean {
    return this.itemActivoId === id;
  }

  public esSubMenuActivo(id: string): boolean {
    return this.subMenuActivoId === id;
  }

  public estaExpandido(id: string): boolean {
    return !!this.subMenusAbiertos[id];
  }

  // DINÁMICO: Modificaciones al vuelo (característica POO)
  public agregarItem(nuevoItem: MenuItemConfig): void {
    this.items.push(nuevoItem);
    if (nuevoItem.subMenus) {
      this.subMenusAbiertos[nuevoItem.id] = false;
    }
  }
}