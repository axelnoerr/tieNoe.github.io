const productos = [
    { nombre: "Playera Negra", categoria: "playera", precio: 300, imagen: "img/playera-gym.jpg" },
    { nombre: "Playera Blanca", categoria: "playera", precio: 350, imagen: "img/play-blan-gym.jpg" },
    { nombre: "Pantalón Jeans", categoria: "pantalon", precio: 800, imagen: "img/jean-gym.jpg" },
    { nombre: "Sudadera", categoria: "playera", precio: 600, imagen: "img/sud.jpg" },
    {nombre: "Gorra Negra",categoria: "gorras",precio: 250,imagen: "img/gorra.jpg"}
];

let carrito = [];

const contenedor = document.getElementById("productos");
const filtroCategoria = document.getElementById("categoria");
const filtroPrecio = document.getElementById("precio");
const valorPrecio = document.getElementById("valorPrecio");
const buscador = document.getElementById("buscador");

function mostrarProductos(lista) {
    contenedor.innerHTML = "";

    lista.forEach(p => {
        const div = document.createElement("div");
        div.classList.add("producto");

        const contenido = document.createElement("div");

        contenido.addEventListener("click", () => {
            abrirModal(p.nombre, p.precio, p.imagen);
        });

        const img = document.createElement("img");
        img.src = p.imagen;

        const nombre = document.createElement("h3");
        nombre.textContent = p.nombre;

        const precio = document.createElement("p");
        precio.textContent = "$" + p.precio;

        contenido.appendChild(img);
        contenido.appendChild(nombre);
        contenido.appendChild(precio);

        const boton = document.createElement("button");
        boton.textContent = "Agregar";
        boton.addEventListener("click", (e) => {
            e.stopPropagation();
            agregarAlCarrito(p.nombre, p.precio);
        });

        div.appendChild(contenido);
        div.appendChild(boton);

        contenedor.appendChild(div);
    });
}

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();

    const carritoBox = document.getElementById("carrito");
    carritoBox.classList.add("animar");

    setTimeout(() => {
        carritoBox.classList.remove("animar");
    }, 300);
}

function actualizarCarrito() {
    const lista = document.getElementById("listaCarrito");
    const total = document.getElementById("total");

    lista.innerHTML = "";
    let suma = 0;

    carrito.forEach((p, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${p.nombre} - $${p.precio}
            <button onclick="eliminarProducto(${index})">❌</button>
        `;

        lista.appendChild(li);
        suma += p.precio;
    });

    total.textContent = "Total: $" + suma;
}
function eliminarProducto(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}
let productoActual = null;

function abrirModal(nombre, precio, imagen) {
    document.getElementById("modal").style.display = "flex";

    document.getElementById("modal-img").src = imagen;
    document.getElementById("modal-nombre").textContent = nombre;
    document.getElementById("modal-precio").textContent = "$" + precio;

    productoActual = { nombre, precio };
}

function cerrarModal() {
    document.getElementById("modal").style.display = "none";
}
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnAgregarModal").addEventListener("click", () => {
        if (productoActual) {
            agregarAlCarrito(productoActual.nombre, productoActual.precio);
            cerrarModal();
        }
    });
});

function enviarWhatsApp() {
    if (carrito.length === 0) {
        alert("Carrito vacío");
        return;
    }

    let mensaje = "Hola, quiero pedir:%0A";

    carrito.forEach(p => {
        mensaje += `- ${p.nombre} ($${p.precio})%0A`;
    });

    let total = carrito.reduce((acc, p) => acc + p.precio, 0);
    mensaje += `%0ATotal: $${total}`;

    const telefono = "525587201257"; 

    const url = `https://wa.me/${telefono}?text=${mensaje}`;
    window.open(url, "_blank");
}

function filtrar() {
    let filtrados = productos;

    const categoria = filtroCategoria.value;
    const precio = filtroPrecio.value;
    const texto = buscador.value.toLowerCase();

    if (categoria !== "todos") {
        filtrados = filtrados.filter(p => p.categoria === categoria);
    }

    filtrados = filtrados.filter(p => p.precio <= precio);

    filtrados = filtrados.filter(p =>
        p.nombre.toLowerCase().includes(texto)
    );

    mostrarProductos(filtrados);
}

filtroCategoria.addEventListener("change", filtrar);
filtroPrecio.addEventListener("input", () => {
    valorPrecio.textContent = "$" + filtroPrecio.value;
    filtrar();
});
buscador.addEventListener("input", filtrar);

mostrarProductos(productos);
valorPrecio.textContent = "$" + filtroPrecio.value;
