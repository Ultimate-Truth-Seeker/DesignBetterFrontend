
  export function generarGeometria(medidas: Record<string, number>) {
  const largo = medidas["largo"] || 100;
  const ancho = medidas["ancho"] || 50;

  return [
    {
      tipo: "polyline",
      puntos: [
        [0, 0],
        [ancho, 0],
        [ancho, largo],
        [0, largo],
        [0, 0]
      ],
      color: "black"
    }
  ];
}