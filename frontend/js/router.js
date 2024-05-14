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
      const componenteQueCoincide = this.buscarComponente(event.state ?? "/");

      await this.app.setActiveComponent(componenteQueCoincide);
    });
  }

  async renderizarRutaInicial() {
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

  async navegar(event, ruta, state) {
    // No quitamos la página actual
    event.preventDefault();
    // Push state
    history.pushState(state, "", ruta);
    this.rutaActiva = ruta;
    const componenteQueCoincide = this.buscarComponente(ruta);

    await this.app.setActiveComponent(componenteQueCoincide);
  }
}
