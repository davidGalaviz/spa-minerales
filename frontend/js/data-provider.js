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

  async toggleFavoritoMineral(slug) {
    const responseToggleFav = await fetch(
      `http://localhost:8000/minerales/${slug}/toggle-favorito`,
      {
        method: "POST",
        mode: "cors",
      }
    );

    const mineralActualizado = responseToggleFav.json();

    const minerales = this.data[LISTA_MINERALES].map((mineral) =>
      mineral.slug === slug ? mineralActualizado : mineral
    );

    this.data[LISTA_MINERALES] = minerales;

    this.app.registerDataChange(LISTA_MINERALES);
  }
}
