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
    // Definimos qué componente correponde a qué ruta
    this.rutas.set(/\//, ListadoMinerales);
    this.rutas.set(/[a-zA-Z0-9]+/, DetallesMineral);

    // Inicializamos el Router, DataProvider y el Renderer
    this.router = new Router(this, this.rutas);
    this.dataProvider = new DataProvider(this, this.router);
    this.renderer = new Renderer(this, this.dataProvider, this.router);

    // Renderizamos la ruta inicial
    this.router.setComponenteInicial().then(() => {});
  }

  /**
   * Establece un componente como el componente activo (es decir, el que debe mostrarse actualmente).
   * @param {*} newActiveComponent
   */
  async setActiveComponent(newActiveComponent) {
    // Llevamos registro de cuál es el componente activo
    this.activeComponent = newActiveComponent;
    // Renderizamos el componente
    await this.renderer.renderComponent(this.activeComponent);
  }

  /**
   * Re-renderiza el componente activo si éste depende de los datos que cambiaron.
   * @param {*} dataKey
   */
  async registerDataChange(dataKey) {
    this.renderer.updateActiveComponentIfDependsOnData(dataKey);
  }
}

const app = new App();
