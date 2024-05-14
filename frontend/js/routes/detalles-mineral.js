export const DetallesMineral = async (router) => {
  const slug = window.location.pathname.slice(1);
  // Pedimos los detalles del mineral del API
  const response = await fetch(`http://localhost:8000/minerales/${slug}`, {
    mode: "cors",
  });

  if (response.status === 404) {
    // Devolvemos un template de "Not found"
  } else {
    // Llenamos el template con los datos del mineral que recibimos
    const mineral = await response.json();

    const template = `
    <div>
        <img src="${mineral.url_foto}" />
        <span class="font-bold text-xl">${mineral.nombre}</span>
        <span class="text-slate-400">${mineral.formula}</span>

        <span>${mineral.descripcion}</span>
    </div>
    `;

    return [template, undefined];
  }
};
