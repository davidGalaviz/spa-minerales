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

  async renderComponent(component) {
    // Obtener los datos para "alimentar" al template
    const data = await this.dataProvider.getData(component.requiresData);

    console.log("data", typeof data);

    // Renderizar el componente (añadirlo al DOM)
    const content = component.feedTemplate(data);

    this.mainContainer.innerHTML = content;

    // Registrar los event listeners del componente
    component.registerEventListeners(this.dataProvider, this.router);
  }

  async updateActiveComponentIfDependsOnData(dataKey) {
    if (this.app.activeComponent.requiresData === dataKey) {
      await this.renderComponent(this.app.activeComponent);
    }
  }
}
