document.addEventListener("DOMContentLoaded", () => {
  mostrarCarrito();

  const toggleCarritoBtn = document.getElementById("toggleCarritoBtn");
  const carritoSidebar = document.getElementById("carritoSidebar");
  const cerrarCarritoBtn = document.getElementById("cerrarCarritoBtn");

  toggleCarritoBtn.addEventListener("click", () => {
    if (carritoSidebar.style.display === "none" || carritoSidebar.style.display === "") {
      carritoSidebar.style.display = "block"; 
    } else {
      carritoSidebar.style.display = "none"; 
    }
  });

  cerrarCarritoBtn.addEventListener("click", () => {
    carritoSidebar.style.display = "none"; 
  });
});

function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const carritoBody = document.getElementById("carrito-body");
  carritoBody.innerHTML = ""; 

  if (carrito.length === 0) {
    carritoBody.innerHTML =
      "<tr><td colspan='5'>El carrito está vacío.</td></tr>";
  } else {
    let total = 0;
    carrito.forEach((item) => {
      total += item.precio * item.cantidad;
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.nombre}</td>
        <td>$${item.precio}</td>
        <td>
          <button onclick="editarCantidad(${item.id}, 'sumar')">+</button>
          <span id="cantidad-${item.id}">${item.cantidad}</span>
          <button onclick="editarCantidad(${item.id}, 'restar')">-</button>
        </td>
        <td>$${item.precio * item.cantidad}</td>
        <td><button onclick="eliminarDelCarrito(${item.id})">Eliminar</button></td>
      `;
      carritoBody.appendChild(row);
    });

    document.getElementById("total-price").textContent = total;
  }
}

function editarCantidad(id, operacion) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const producto = carrito.find((item) => item.id === id);

  if (producto) {
    if (operacion === "sumar") {
      producto.cantidad += 1;
    } else if (operacion === "restar" && producto.cantidad > 1) {
      producto.cantidad -= 1;
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito(); 
  }
}

function eliminarDelCarrito(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito = carrito.filter((item) => item.id !== id);  

  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito(); 
}
