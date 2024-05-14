export const ListadoMinerales = async () => {
  // Pedimos la lista de minerales del API
  const response = await fetch("http://localhost:8000/minerales", {
    mode: "cors",
  });

  const minerales = await response.json();

  // Llenamos un template por cada mineral que recibimos
  const items = [];

  for (const mineral of minerales) {
    const item = `
    <div class="border border-zinc-800 border-solid">
        <img src="${mineral.url_foto}" />

        <div class="p-4 flex flex-col" >
            <span class="font-bold text-xl">${mineral.nombre}</span>
            <span class="text-slate-400">${mineral.formula}</span>
            
        </div>

        <button class="bg-zinc-800 text-slate-50 p-4 w-full hover:bg-gradient-to-l" data-slug="${mineral.slug}">Ver detalles</button>
    </div>
    `;
    items.push(item);
  }

  // Colocamos los elementos dentro de un contenedor
  const contenedor = '<div class="grid grid-cols-3 gap-4">|</div>';

  const openingTagContenedor = contenedor.split("|")[0];
  const closingTagContenedor = contenedor.split("|")[1];

  let templateCompleto = openingTagContenedor;

  for (const item of items) {
    templateCompleto = templateCompleto.concat(item);
  }

  templateCompleto = templateCompleto.concat(closingTagContenedor);

  // Devolvemos el template completado
  return templateCompleto;
};
