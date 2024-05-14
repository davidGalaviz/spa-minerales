const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

// Datos
let minerales = [
  {
    slug: "cuarzo-rosa",
    nombre: "Cuarzo Rosa",
    url_foto:
      "https://i0.wp.com/geologyscience.com/wp-content/uploads/2023/08/Rose-Quartz-4-jpeg.webp?resize=640%2C481&ssl=1",
    formula: "SiO₂",
    descripcion:
      "El cuarzo rosa es una variedad de cuarzo con un distintivo color rosado a rojo rosado, que va desde tonos pálidos hasta tonos más profundos.",
    favorito: false,
  },
  {
    slug: "aguamarina",
    nombre: "Aguamarina",
    url_foto:
      "https://i0.wp.com/geologyscience.com/wp-content/uploads/2023/05/Aquamarine-4.jpeg?resize=640%2C422&ssl=1",
    formula: "Be₃Al₂(Si₁₆O₁₈)",
    descripcion:
      "La aguamarina es una hermosa piedra preciosa y una variedad del mineral berilo. Es muy apreciado por su impresionante color azul a azul verdoso, que recuerda a las aguas cristalinas del mar, lo que le da el nombre de “aguamarina”.",
    favorito: false,
  },
  {
    slug: "opalo-de-fuego",
    nombre: "Ópalo de Fuego",
    url_foto:
      "https://i0.wp.com/geologyscience.com/wp-content/uploads/2023/09/Fire-opal-jpg.webp?resize=640%2C587&ssl=1",
    formula: "SiO₂·nH₂O",
    descripcion:
      "El ópalo de fuego es una piedra preciosa cautivadora y única conocida por su vibrante juego de colores y tonos ardientes. A diferencia de los ópalos tradicionales, que normalmente muestran una apariencia lechosa e iridiscente, los ópalos de fuego se distinguen por su transparencia y los brillantes destellos de colores rojo, naranja y amarillo que exhiben. Estas piedras preciosas reciben su nombre de los colores intensos y cálidos que recuerdan a las llamas.",
    favorito: false,
  },
];

let corsOptions = {
  origin: ["http://127.0.0.1:8080", "http://localhost:8080"],
};

app.use(cors(corsOptions));

// Rutas
app.get("/minerales", (req, res) => {
  res.json(minerales);
});

app.get("/minerales/:slug", (req, res) => {
  const slug = req.params.slug;
  const mineral = minerales.find((m) => m.slug === slug);

  if (mineral) {
    res.json(mineral);
  } else {
    res.sendStatus(404);
  }
});

app.post("/minerales/:slug/toggle-favorito", (req, res) => {
  const slug = req.params.slug;
  const idx_mineral = minerales.findIndex((m) => m.slug === slug);

  if (idx_mineral !== -1) {
    minerales = minerales.map((m) =>
      m.slug === slug ? { ...m, favorito: !m.favorito } : m
    );

    res.json(minerales[idx_mineral]);
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
