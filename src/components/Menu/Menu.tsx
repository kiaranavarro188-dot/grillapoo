import { useState } from 'react';
import { MenuLogica } from './Menu';

interface MenuProps {
  controlador: MenuLogica;
}

export function MenuComponente({ controlador }: MenuProps) {
  // El mismo trigger que venimos usando para refrescar React
  const [_, setRefresh] = useState(0);

  const items = controlador.obtenerItems();

  const manejarClickPrincipal = (id: string) => {
    controlador.seleccionarItemPrincipal(id);
    setRefresh(p => p + 1);
  };

  const manejarClickSubMenu = (idPrincipal: string, idSub: string) => {
    controlador.seleccionarSubMenu(idPrincipal, idSub);
    setRefresh(p => p + 1);
  };

  return (
    <div style={{
      width: '260px',
      height: '100vh',
      backgroundColor: '#1e1e24', // Gris oscuro premium
      color: '#fff',
      fontFamily: 'sans-serif',
      padding: '20px 10px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      boxShadow: '4px 0 10px rgba(0,0,0,0.1)',
      position: 'fixed',
      left: 0,
      top: 0
    }}>
      {/* HEADER DEL MENÚ */}
      <div style={{ padding: '10px', marginBottom: '20px', borderBottom: '1px solid #333' }}>
        <h3 style={{ margin: 0, fontSize: '18px', color: '#007bff', letterSpacing: '1px' }}>SISTEMA</h3>
      </div>

      {/* RENDER DE ÍTEMS */}
      {items.map((item) => {
        const esActivo = controlador.esItemActivo(item.id);
        const tieneHijos = item.subMenus && item.subMenus.length > 0;
        const expandido = controlador.estaExpandido(item.id);

        return (
          <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            
            {/* Botón Principal o Trigger del grupo */}
            <div
              onClick={() => manejarClickPrincipal(item.id)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 15px',
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: esActivo && !tieneHijos ? '#007bff' : 'transparent',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!esActivo || tieneHijos) e.currentTarget.style.backgroundColor = '#2a2a35';
              }}
              onMouseLeave={(e) => {
                if (!esActivo || tieneHijos) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>{item.icono || "🔹"}</span>
                <span style={{ fontSize: '14px', fontWeight: esActivo ? 600 : 400 }}>{item.texto}</span>
              </div>
              
              {/* Flechita indicadora si tiene submenús */}
              {tieneHijos && (
                <span style={{ 
                  fontSize: '10px', 
                  transform: expandido ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                  color: '#aaa'
                }}>
                  ▼
                </span>
              )}
            </div>

            {/* RENDER DE SUBMENÚS (Se muestran solo si está expandido) */}
            {tieneHijos && expandido && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                paddingLeft: '10px', // Desplazamiento hacia la derecha para notar la jerarquía
                marginTop: '2px',
                borderLeft: '1px solid #333',
                marginLeft: '15px'
              }}>
                {item.subMenus!.map((sub) => {
                  const subActivo = controlador.esSubMenuActivo(sub.id);
                  return (
                    <div
                      key={sub.id}
                      onClick={() => manejarClickSubMenu(item.id, sub.id)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        color: subActivo ? '#007bff' : '#aaa',
                        backgroundColor: subActivo ? 'rgba(0,123,255,0.1)' : 'transparent',
                        fontWeight: subActivo ? 600 : 400,
                        transition: 'all 0.2s',
                        // 🛠️ ARREGLADO POR LA IA: Atributos ordenados y separados correctamente del "key"
                        display: 'flex',
                        justifyContent: 'flex-start',
                        width: '100%',
                        boxSizing: 'border-box' // Faltaban las comas en estas últimas líneas de CSS
                      }}
                      onMouseEnter={(e) => {
                        if (!subActivo) e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={(e) => {
                        if (!subActivo) e.currentTarget.style.color = '#aaa';
                      }}
                    >
                      {sub.texto}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}