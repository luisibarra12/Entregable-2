document.addEventListener("DOMContentLoaded", () => {
  const botonesAgregar = document.querySelectorAll(".btn-agregar");
  const contenedor = document.getElementById("carrito");
  const estaEnProductos = window.location.pathname.includes("productos.html");
  const estaEnInicio = window.location.pathname.includes("index.html") || window.location.pathname === "/";

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (estaEnProductos && botonesAgregar.length) {
    botonesAgregar.forEach((boton) => {
      boton.addEventListener("click", () => {
        const card = boton.closest(".card");
        const nombre = card.querySelector("p").innerText;
        const id = card.getAttribute("data-id");

        const producto = { id, nombre };

        if (!carrito.some(p => p.id === id)) {
          carrito.push(producto);
          localStorage.setItem("carrito", JSON.stringify(carrito));
          Toastify({
            text: `${nombre} agregado al carrito`,
            duration: 2500,
            gravity: "top",
            position: "right",
            style: { background: "linear-gradient(to right, #00b09b, #96c93d)" }
          }).showToast();
          mostrarCarrito();
        } else {
          Toastify({
            text: `${nombre} ya está en el carrito`,
            duration: 2500,
            gravity: "top",
            position: "right",
            style: { background: "linear-gradient(to right, #b00020, #7f0000)" }
          }).showToast();
        }
      });
    });
  }

  if (estaEnProductos && contenedor) {
    mostrarCarrito();
  }

  function mostrarCarrito() {
    if (!contenedor) return;

    contenedor.innerHTML = `<h2>Carrito:</h2>`;

    if (carrito.length === 0) {
      contenedor.innerHTML += "<p>El carrito está vacío.</p>";
      return;
    }

    carrito.forEach(producto => {
      const item = document.createElement("p");
      item.textContent = `• ${producto.nombre}`;
      contenedor.appendChild(item);
    });

    const vaciarBtn = document.createElement("button");
    vaciarBtn.textContent = "Vaciar carrito";
    vaciarBtn.style.marginTop = "10px";
    contenedor.appendChild(vaciarBtn);

    vaciarBtn.addEventListener("click", () => {
      carrito = [];
      localStorage.removeItem("carrito");
      mostrarCarrito();
    });

    const finalizarBtn = document.createElement("button");
    finalizarBtn.textContent = "Finalizar compra";
    finalizarBtn.style.marginTop = "10px";
    finalizarBtn.style.marginLeft = "10px";
    contenedor.appendChild(finalizarBtn);

    finalizarBtn.addEventListener("click", () => {
      Toastify({
        text: "¡Gracias por su compra!",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: { background: "linear-gradient(to right, #00b09b, #96c93d)" }
      }).showToast();
      carrito = [];
      localStorage.removeItem("carrito");
      mostrarCarrito();
    });
  }

  // Mostrar toastify
  if (estaEnInicio) {
    setTimeout(() => {
      Toastify({
        text: "Descuentos imperdibles 🤑 ¡50% off!",
        duration: 3000,
        gravity: "bottom",
        position: "right",
        stopOnFocus: false,
        onClick: () => {
          window.location.href = "pages/productos.html";
        }
      }).showToast();
    }, 3500);
  }
});

