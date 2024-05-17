import { DETALLES_MINERAL, LISTA_MINERALES } from "./data-keys.js";

export class DataProvider {
  app;
  data = {
    [LISTA_MINERALES]: [],
    [DETALLES_MINERAL]: undefined,
  };

  router;

  constructor(app, router) {
    this.app = app;
    this.router = router;
  }

  /**
   * Regresa los datos identificados por la data key proveída.
   * @param {*} dataKey
   * @returns
   */
  async getData(dataKey) {
    switch (dataKey) {
      case LISTA_MINERALES: {
        // Pedimos la lista de minerales del API
        const response = await fetch("http://localhost:8000/minerales", {
          mode: "cors",
        });

        const minerales = await response.json();
        this.data[LISTA_MINERALES] = minerales;

        return this.data[LISTA_MINERALES];
      }
      case DETALLES_MINERAL: {
        const slug = this.router.rutaActiva;
        const response = await fetch(
          `http://localhost:8000/minerales/${slug}`,
          {
            mode: "cors",
          }
        );

        const mineral = await response.json();

        this.data[DETALLES_MINERAL] = mineral;

        return this.data[DETALLES_MINERAL];
      }

      default:
        return undefined;
    }
  }

  /**
   * Envía un request al API para marcar un mineral como favorito o no favorito.
   * @param {*} slug El slug del mineral cuyo estado de "favorito" se quiere invertir.
   */
  async toggleFavoritoMineral(slug) {
    const responseToggleFav = await fetch(
      `http://localhost:8000/minerales/${slug}/toggle-favorito`,
      {
        method: "POST",
        mode: "cors",
      }
    );

    const mineralActualizado = responseToggleFav.json();

    // Actualizamos nuestra lista de minerales con los nuevos datos del mineral que modificamos
    const minerales = this.data[LISTA_MINERALES].map((mineral) =>
      mineral.slug === slug ? mineralActualizado : mineral
    );

    this.data[LISTA_MINERALES] = minerales;

    // Avisamos que cambió la lista de minerales
    this.app.registerDataChange(LISTA_MINERALES);
  }
}
