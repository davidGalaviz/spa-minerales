import { Router } from "./router.js";
import { ListadoMinerales } from "./routes/listado-minerales.js";

const rutas = new Map();
rutas.set(/\//, ListadoMinerales);

// [/\//, ListadoMinerales], [/\/[a-zA-Z0-9]+/, null]

// mostrar el contenido apropiado para la URL actual
const router = new Router(rutas);

// Escuchar por cambios en la URL y mostrar el contenido apropiado [FUNCIONALIDAD DE ROUTER]
