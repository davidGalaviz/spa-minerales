"use-strict";
export class Router {
  rutas;
  app;
  rutaActiva;

  constructor(app, rutas) {
    this.app = app;
    this.rutas = rutas;

    const rutaInicial = window.location.pathname;
    this.rutaActiva = rutaInicial;

    addEventListener("popstate", async (event) => {
      this.rutaActiva = event.state;
      // Buscamos el componente que hay que mostrar en la ruta actual
      const componenteQueCoincide = this.buscarComponente(event.state ?? "/");

      await this.app.setActiveComponent(componenteQueCoincide);
    });
  }

  /**
   * Determina qué componente se debe mostrar inicialmente. (En la ruta inicial).
   */
  async setComponenteInicial() {
    const rutaInicial = window.location.pathname;

    const componenteQueCoincide = this.buscarComponente(rutaInicial);

    await this.app.setActiveComponent(componenteQueCoincide);
  }

  /**
   * Busca el componente que coincida para la ruta dada.
   * @param {*} ruta
   */
  buscarComponente(ruta) {
    let componente;
    // Necesitamos encontrar la ruta que coincida
    for (const [key, comp] of this.rutas) {
      if (key.test(ruta)) {
        componente = comp;
        break;
      }
    }

    return componente;
  }

  /**
   * Realiza una navegación hacia la ruta especificada.
   * @param {*} event
   * @param {*} ruta
   * @param {*} state
   */
  async navegar(event, ruta, state) {
    // No quitamos la página actual
    event.preventDefault();
    // Push state - Cambiamos la URL actual
    history.pushState(state, "", ruta);
    // Llevamos registro de la ruta activa
    this.rutaActiva = ruta;

    // Buscamos el componente que hay que mostrar en esta ruta
    const componenteQueCoincide = this.buscarComponente(ruta);

    // Establecemos ese como el componente activo
    await this.app.setActiveComponent(componenteQueCoincide);
  }
}
