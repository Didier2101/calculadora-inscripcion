// Constante para el IVA y la Tasa Representativa del Mercado (TRM)
const IVA = 0.19;
const TRM = 4200;

// Función principal para calcular el valor total de la afiliación
function calcularValor() {
  // Obtener los valores del formulario
  const tarifaSeleccionada = parseFloat(
    document.getElementById("tarifa").value
  );
  const tipoAfiliado = document.getElementById("tipoAfiliado").value;

  // Calcular el valor base y el IVA
  const valorBase = tarifaSeleccionada;
  const valorIVA = valorBase * IVA;
  let valorTotal = valorBase + valorIVA;

  // Aplicar descuentos o recargos según el tipo de afiliado
  if (tipoAfiliado === "asociado") {
    valorTotal *= 0.9; // Descuento del 10%
  } else if (tipoAfiliado === "no_asociado") {
    valorTotal *= 1.1; // Recargo del 10%
  } else if (tipoAfiliado === "extranjero") {
    // Convertir el total a dólares para afiliados extranjeros
    valorTotal /= TRM;
  }

  // Mostrar el resultado en la página
  mostrarResultado(valorBase, valorIVA, valorTotal, tipoAfiliado);
}

// Función para mostrar el resultado en pesos colombianos con formato adecuado
function mostrarResultado(valorBase, valorIVA, valorTotal, tipoAfiliado) {
  const resultadoDiv = document.getElementById("resultado");

  // Formateo para mostrar valores en pesos colombianos
  const formatearCOP = (valor) => {
    return `$COP ${valor.toLocaleString("es-CO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Definir el formato del resultado
  let resultadoHTML = `
    <p>Valor Base: ${formatearCOP(valorBase)}</p>
    <p>Valor IVA (19%): ${formatearCOP(valorIVA)}</p>
  `;

  if (tipoAfiliado === "extranjero") {
    // Para extranjeros, el total en dólares
    resultadoHTML += `<p>Total a Pagar (en dólares): $${valorTotal.toFixed(
      2
    )} USD</p>`;
  } else {
    // Para nacionales, el total en pesos colombianos
    resultadoHTML += `<p>Total a Pagar: ${formatearCOP(valorTotal)}</p>`;
  }

  resultadoDiv.innerHTML = resultadoHTML;
}
