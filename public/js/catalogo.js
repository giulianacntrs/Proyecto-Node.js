document.addEventListener('DOMContentLoaded', () => {
  const toggleCarritoBtn = document.getElementById('toggleCarritoBtn');
  const carritoSidebar = document.getElementById('carritoSidebar');

  toggleCarritoBtn.addEventListener('click', () => {
    if (carritoSidebar.style.display === 'none' || carritoSidebar.style.display === '') {
      carritoSidebar.style.display = 'block';  
    } else {
      carritoSidebar.style.display = 'none';   
    }
  });

  cargarProductos(); 
  mostrarCarrito();   
});

function cargarProductos() {
  const productos = [
    { "id": 1, "nombre": "Reloj Elegante", "precio": 199, "imagen": "reloj1.jpg" },
    { "id": 2, "nombre": "Reloj Deportivo", "precio": 120, "imagen": "reloj2.jpg" },
    { "id": 3, "nombre": "Reloj Clásico", "precio": 150, "imagen": "reloj3.jpg" },
    { "id": 4, "nombre": "Reloj Sumergible", "precio": 200, "imagen": "reloj3.jpg" }
  ];
  
  const contenedorProductos = document.getElementById('productos-list');
  contenedorProductos.innerHTML = '';  

  productos.forEach(producto => {
    const productoHTML = document.createElement('div');
    productoHTML.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'mb-4');
    productoHTML.innerHTML = `
      <div class="card h-100">
        <img src="images/${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">Precio: $${producto.precio}</p>
          <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        </div>
      </div>
    `;
    contenedorProductos.appendChild(productoHTML);
  });
}

function agregarAlCarrito(id) {
  const productos = [
    { "id": 1, "nombre": "Reloj Elegante", "precio": 199, "imagen": "reloj1.jpg" },
    { "id": 2, "nombre": "Reloj Deportivo", "precio": 120, "imagen": "reloj2.jpg" },
    { "id": 3, "nombre": "Reloj Clásico", "precio": 150, "imagen": "reloj3.jpg" },
    { "id": 4, "nombre": "Reloj Sumergible", "precio": 200, "imagen": "reloj3.jpg" }
  ];

  const producto = productos.find(p => p.id === id);
  if (producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoExistente = carrito.find(item => item.id === id);
    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();  
  }
}

function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const carritoContainer = document.getElementById('carrito-container');
  carritoContainer.innerHTML = ''; 

  if (carrito.length === 0) {
    carritoContainer.innerHTML = "<p class='text-muted'>No hay productos en el carrito.</p>";
  } else {
    carrito.forEach(item => {
      const carritoItem = document.createElement('div');
      carritoItem.classList.add('carrito-item');
      carritoItem.innerHTML = `
        <img src="images/${item.imagen}" alt="${item.nombre}" class="img-thumbnail" style="width: 50px; height: auto;">
        <h6>${item.nombre}</h6>
        <p>Precio: $${item.precio}</p>
        <p>Cantidad: ${item.cantidad}</p>
      `;
      carritoContainer.appendChild(carritoItem);
    });
  }
}

function pagar() {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  if (carrito.length > 0) {
    carrito = [];  
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert("¡Gracias por tu compra! El carrito se ha vaciado.");
    mostrarCarrito();  
  } else {
    alert("Tu carrito está vacío.");
  }
}

function cerrarSesion() {
  localStorage.removeItem('usuario');
  window.location.href = "index.html";  
}
