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

        div.innerHTML = `
         <img src="${p.imagen}" alt="${p.nombre}"> 
        <h3>${p.nombre}</h3>
            <p>$${p.precio}</p>
            <button onclick="agregarAlCarrito('${p.nombre}', ${p.precio})">
                Agregar
            </button>
        `;

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

// Inicial
mostrarProductos(productos);
valorPrecio.textContent = "$" + filtroPrecio.value;
