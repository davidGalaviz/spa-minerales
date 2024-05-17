export class Renderer {
  app;
  dataProvider;
  router;
  mainContainer = document.querySelector(".main-container");

  constructor(app, dataProvider, router) {
    this.app = app;
    this.dataProvider = dataProvider;
    this.router = router;
  }

  /**
   * Renderiza un componente.
   * @param {*} component
   */
  async renderComponent(component) {
    // Obtener los datos para "alimentar" al template
    const data = await this.dataProvider.getData(component.requiresData);

    // Renderizar el componente
    const content = component.feedTemplate(data);

    // Añadirlo al DOM
    this.mainContainer.innerHTML = content;

    // Registrar los event listeners del componente
    component.registerEventListeners(this.dataProvider, this.router);
  }

  /**
   * Dada una data key, actualiza el componente activo si éste depende de esa data key.
   * @param {*} dataKey
   */
  async updateActiveComponentIfDependsOnData(dataKey) {
    if (this.app.activeComponent.requiresData === dataKey) {
      await this.renderComponent(this.app.activeComponent);
    }
  }
}
