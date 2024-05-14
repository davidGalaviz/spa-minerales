export class Router {
  rutas;
  mainContainer = document.querySelector(".main-container");

  constructor(rutas) {
    this.rutas = rutas;

    this.renderizarRutaInicial();
  }

  async renderizarRutaInicial() {
    const rutaInicial = window.location.pathname;

    await this.renderizarRuta(rutaInicial);
  }

  async renderizarRuta(ruta) {
    let htmlCorrespondiente;

    // Necesitamos encontrar la ruta que coincida
    for (const [key, value] of this.rutas) {
      if (key.test(ruta)) {
        htmlCorrespondiente = value;
        break;
      }
    }

    const content = await htmlCorrespondiente();

    this.mainContainer.innerHTML = content;
  }
}
