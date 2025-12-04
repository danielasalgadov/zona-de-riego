import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./drizzle/schema.ts";

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection, { schema, mode: "default" });

const sampleProducts = [
  // Plants
  {
    name: "Árbol de Ramón (Brosimum alicastrum)",
    description: "Árbol nativo de la Península de Yucatán. Excelente para reforestación y sombra. Produce frutos comestibles ricos en nutrientes.",
    category: "plants",
    price: 35000, // $350 MXN
    stock: 50,
    imageUrl: "/products/ramon-tree.jpg",
    featured: 1
  },
  {
    name: "Palma Chit (Thrinax radiata)",
    description: "Palma endémica resistente a la sequía. Ideal para paisajismo costero y jardines tropicales.",
    category: "plants",
    price: 28000,
    stock: 30,
    imageUrl: "/products/chit-palm.jpg",
    featured: 1
  },
  {
    name: "Ceiba (Ceiba pentandra)",
    description: "Árbol sagrado maya. Crecimiento rápido, excelente para proyectos de reforestación a gran escala.",
    category: "plants",
    price: 45000,
    stock: 20,
    imageUrl: "/products/ceiba.jpg",
    featured: 0
  },
  {
    name: "Flor de Mayo (Plumeria rubra)",
    description: "Arbusto ornamental con flores fragantes. Perfecto para jardines tropicales.",
    category: "plants",
    price: 18000,
    stock: 60,
    imageUrl: "/products/plumeria.jpg",
    featured: 0
  },
  
  // Seeds
  {
    name: "Semillas de Zacate Nativo Mix",
    description: "Mezcla de semillas de pastos nativos adaptados al clima de Yucatán. Ideal para restauración de áreas verdes.",
    category: "seeds",
    price: 12000,
    stock: 100,
    imageUrl: "/products/native-grass-seeds.jpg",
    featured: 1
  },
  {
    name: "Semillas de Frijol Nescafé (Mucuna pruriens)",
    description: "Leguminosa nativa fijadora de nitrógeno. Excelente para mejorar suelos degradados.",
    category: "seeds",
    price: 8000,
    stock: 150,
    imageUrl: "/products/mucuna-seeds.jpg",
    featured: 0
  },
  {
    name: "Semillas de Flor de Calabaza",
    description: "Flores comestibles para huertos ornamentales. Atrae polinizadores.",
    category: "seeds",
    price: 5000,
    stock: 200,
    imageUrl: "/products/squash-flower-seeds.jpg",
    featured: 0
  },
  
  // Tools
  {
    name: "Pala de Jardinería Profesional",
    description: "Pala de acero inoxidable con mango ergonómico. Ideal para trasplante y excavación.",
    category: "tools",
    price: 45000,
    stock: 40,
    imageUrl: "/products/professional-shovel.jpg",
    featured: 1
  },
  {
    name: "Tijeras de Podar Premium",
    description: "Tijeras de acero al carbono con resorte. Corte limpio para mantenimiento de arbustos.",
    category: "tools",
    price: 32000,
    stock: 50,
    imageUrl: "/products/pruning-shears.jpg",
    featured: 0
  },
  {
    name: "Rastrillo de Hojas",
    description: "Rastrillo ligero de aluminio con dientes flexibles. Perfecto para limpieza de jardines.",
    category: "tools",
    price: 25000,
    stock: 35,
    imageUrl: "/products/leaf-rake.jpg",
    featured: 0
  },
  
  // Irrigation
  {
    name: "Sistema de Riego por Goteo - Kit Básico",
    description: "Kit completo para 50m². Incluye manguera, goteros, conectores y temporizador.",
    category: "irrigation",
    price: 180000,
    stock: 25,
    imageUrl: "/products/drip-irrigation-kit.jpg",
    featured: 1
  },
  {
    name: "Aspersor Rotativo Profesional",
    description: "Aspersor de rango ajustable 5-15m. Ideal para áreas grandes.",
    category: "irrigation",
    price: 65000,
    stock: 30,
    imageUrl: "/products/rotary-sprinkler.jpg",
    featured: 1
  },
  {
    name: "Sensor de Humedad de Suelo",
    description: "Sensor digital con pantalla LCD. Optimiza el riego según condiciones del suelo.",
    category: "irrigation",
    price: 95000,
    stock: 20,
    imageUrl: "/products/soil-moisture-sensor.jpg",
    featured: 0
  },
  {
    name: "Manguera de Riego Reforzada 30m",
    description: "Manguera de 3 capas resistente a UV. Incluye pistola de riego multifunción.",
    category: "irrigation",
    price: 55000,
    stock: 45,
    imageUrl: "/products/garden-hose.jpg",
    featured: 0
  }
];

console.log("Seeding products...");
await db.insert(schema.products).values(sampleProducts);
console.log(`✅ Inserted ${sampleProducts.length} products`);

await connection.end();
