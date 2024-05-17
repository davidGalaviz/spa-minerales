import { DETALLES_MINERAL } from "../data-keys.js";

export const DetallesMineral = {
  feedTemplate: (mineral) => {
    const template = `
    <div class="columns-2">
        <img src="${mineral.url_foto}" />
        <div class="flex flex-col">
          <span class="font-bold text-3xl">${mineral.nombre}</span>
          <span class="text-slate-400">${mineral.formula}</span>

          <span class="mt-4">${mineral.descripcion}</span>
        </div>
        
    </div>
    `;

    return [template, undefined];
  },
  requiresData: DETALLES_MINERAL,
  registerEventListeners: () => {
    // No hay event listeners que registrar para este componente
  },
};
