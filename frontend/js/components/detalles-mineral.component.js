import { DETALLES_MINERAL } from "../data-keys.js";

export const DetallesMineral = {
  feedTemplate: (mineral) => {
    const template = `
    <div>
        <img src="${mineral.url_foto}" />
        <span class="font-bold text-xl">${mineral.nombre}</span>
        <span class="text-slate-400">${mineral.formula}</span>

        <span>${mineral.descripcion}</span>
    </div>
    `;

    return [template, undefined];
  },
  requiresData: DETALLES_MINERAL,
  registerEventListeners: () => {
    // No hay event listeners que registrar para este componente
  },
};
