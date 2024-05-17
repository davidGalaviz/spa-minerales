import { LISTA_MINERALES } from "../data-keys.js";

export const ListadoMinerales = {
  feedTemplate: (minerales) => {
    // Llenamos un template por cada mineral que recibimos
    const items = [];

    for (const mineral of minerales) {
      const item = `
    <div class="border border-zinc-800 border-solid">
        <img src="${mineral.url_foto}" />

        <div class="p-4 flex" >
            <div class="flex flex-col w-5/6">
                <span class="font-bold text-xl">${mineral.nombre}</span>
                <span class="text-slate-400">${mineral.formula}</span>
            </div>
            <div class="flex justify-center items-center"> ${
              !mineral.favorito
                ? `<img data-slug="${mineral.slug}" class="btn-toggle-favorito h-1/2 w-1/2 cursor-pointer" src="https://img.icons8.com/ios/50/star--v1.png" alt="star--v1"/>`
                : `<img data-slug="${mineral.slug}" class="btn-toggle-favorito h-1/2 w-1/2 cursor-pointer" src="https://img.icons8.com/ios-filled/50/000000/star--v1.png" alt="star--v1"/>`
            }</div>
          
        </div>
       
          <button class="btn-ver-detalles bg-zinc-800 text-slate-50 p-4 w-full mt-3" data-slug="${
            mineral.slug
          }">Ver detalles</button>

      

        
    </div>
    `;
      items.push(item);
    }

    // Colocamos los elementos dentro de un contenedor
    const contenedor = '<div class="columns-3 gap-4">|</div>';

    const openingTagContenedor = contenedor.split("|")[0];
    const closingTagContenedor = contenedor.split("|")[1];

    let templateCompleto = openingTagContenedor;

    for (const item of items) {
      templateCompleto = templateCompleto.concat(item);
    }

    templateCompleto = templateCompleto.concat(closingTagContenedor);

    return templateCompleto;
  },
  requiresData: LISTA_MINERALES,
  registerEventListeners: (dataProvider, router) => {
    const btnVerDetalles = document.querySelectorAll(".btn-ver-detalles");
    btnVerDetalles.forEach((item) => {
      item.addEventListener("click", (event) => {
        const slug = item.getAttribute("data-slug");
        router.navegar(event, slug, { slug });
      });
    });

    const btnToggleFav = document.querySelectorAll(".btn-toggle-favorito");
    btnToggleFav.forEach((item) => {
      item.addEventListener("click", async (event) => {
        const slug = item.getAttribute("data-slug");
        dataProvider.toggleFavoritoMineral(slug);
      });
    });
  },
};
