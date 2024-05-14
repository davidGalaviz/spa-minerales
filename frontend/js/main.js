import { Router } from "./router.js";
import { DetallesMineral } from "./components/detalles-mineral.component.js";
import { ListadoMinerales } from "./components/listado-minerales.component.js";
import { Renderer } from "./renderer.js";
import { DataProvider } from "./data-provider.js";

class App {
  activeComponent = undefined;
  router;
  dataProvider;
  renderer;

  rutas = new Map();

  constructor() {
    this.rutas.set(/\//, ListadoMinerales);
    this.rutas.set(/[a-zA-Z0-9]+/, DetallesMineral);
    this.router = new Router(this, this.rutas);
    this.dataProvider = new DataProvider(this.router);
    this.renderer = new Renderer(this.dataProvider, this.router);

    this.router.renderizarRutaInicial().then(() => {});
  }

  async setActiveComponent(newActiveComponent) {
    this.activeComponent = newActiveComponent;
    await this.renderer.renderComponent(this.activeComponent);
  }
}

const app = new App();
