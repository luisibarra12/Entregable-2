const botonesAgregar = document.querySelectorAll(".btn-agregar");
const contenedor = document.getElementById("carrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

botonesAgregar.forEach((boton) => {
  boton.addEventListener("click", () => {
    const card = boton.closest(".card");
    const nombre = card.querySelector("p").innerText;
    const id = card.getAttribute("data-id");

    const producto = { id, nombre };

    if (!carrito.some(p => p.id === id)) {
      carrito.push(producto);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      alert(`${nombre} agregado al carrito`);
      mostrarCarrito();
    } else {
      alert(`${nombre} ya está en el carrito`);
    }
  });
});

function mostrarCarrito() {
  // Limpiar contenido
  contenedor.innerHTML = `<h2>Carrito:</h2>`;

  if (carrito.length === 0) {
    contenedor.innerHTML += "<p>El carrito está vacío.</p>";
    return;
  }

  // Mostrar productos en el carrito
  carrito.forEach(producto => {
    const item = document.createElement("p");
    item.textContent = `• ${producto.nombre}`;
    contenedor.appendChild(item);
  });

  // Botón: Vaciar carrito
  const vaciarBtn = document.createElement("button");
  vaciarBtn.textContent = "Vaciar carrito";
  vaciarBtn.id = "vaciar-carrito";
  vaciarBtn.style.marginTop = "10px";
  contenedor.appendChild(vaciarBtn);

  vaciarBtn.addEventListener("click", () => {
    carrito = [];
    localStorage.removeItem("carrito");
    mostrarCarrito();
  });

  // Botón: Finalizar compra
  const finalizarBtn = document.createElement("button");
  finalizarBtn.textContent = "Finalizar compra";
  finalizarBtn.id = "finalizar-compra";
  finalizarBtn.style.marginTop = "10px";
  finalizarBtn.style.marginLeft = "10px";
  contenedor.appendChild(finalizarBtn);

  finalizarBtn.addEventListener("click", () => {
    alert("¡Gracias por su compra!");
    carrito = [];
    localStorage.removeItem("carrito");
    mostrarCarrito();
  });
}

// Mostrar carrito al cargar la página
mostrarCarrito();