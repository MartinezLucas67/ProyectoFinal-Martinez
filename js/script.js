const listaProductos = document.getElementById("listaProductos");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");

let carrito = [];

// Función para renderizar los productos en el DOM
function renderizarProductos() {
    listaProductos.innerHTML = "";

    productos.forEach((product) => {
        let content = document.createElement("div");
        content.className = "card";
        content.innerHTML = `
            <img src="${product.img}">  
            <h3>${product.nombre}</h3>
            <p>${product.precio}</p> 
        `;

        let comprar = document.createElement("button");
        comprar.innerText = "Comprar";

        content.append(comprar);

        comprar.addEventListener("click", () => {
            agregarAlCarrito(product);
            renderizarCarrito();
        });

        listaProductos.append(content);
    });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(product) {
    carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        precio: product.precio,
    });
}

// Función para renderizar los productos en el carrito
function renderizarCarrito() {
    const modalContent = document.getElementById("modal-content");

    // Verifica si modalContent es null antes de continuar
    if (!modalContent) {
        console.error("Elemento modal-content no encontrado.");
        return;
    }

    modalContent.innerHTML = "";

    carrito.forEach((item) => {
        let itemElement = document.createElement("div");
        itemElement.innerHTML = `
            <img src="${item.img}">
            <p>${item.nombre}</p>
            <p>${item.precio}</p>
        `;
        modalContent.append(itemElement);
    });

    const total = calcularTotal();
    const totalElement = document.createElement("p");
    totalElement.innerText = `Total: ${total}`;
    modalContent.append(totalElement);

    const finalizarCompraButton = document.createElement("button");
    finalizarCompraButton.innerText = "Finalizar Compra";
    finalizarCompraButton.addEventListener("click", () => {
        finalizarCompra();
        mostrarMensajeAgradecimiento();
    });

    modalContent.append(finalizarCompraButton);

    const mensajeAgradecimiento = document.createElement("p");
    mensajeAgradecimiento.id = "mensajeAgradecimiento";
    modalContent.append(mensajeAgradecimiento);
}

// Función para mostrar el mensaje de agradecimiento
function mostrarMensajeAgradecimiento() {
    const mensajeAgradecimiento = document.getElementById("mensajeAgradecimiento");
    mensajeAgradecimiento.innerText = "Muchas gracias por su compra";
}

// Función para calcular el total de la compra
function calcularTotal() {
    let total = 0;
    carrito.forEach((item) => {
        total += item.precio;
    });
    return total;
}

// Función para abrir el modal del carrito
function abrirModalCarrito() {
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
        <h2 class="modal-header-title">Carrito</h2>
        <span class="modal-header-button" onclick="cerrarModalCarrito()">x</span>
    `;

    const modalContent = document.createElement("div");
    modalContent.id = "modal-content";
    modalContent.className = "modal-content";

    const finalizarCompraButton = document.createElement("button");
    finalizarCompraButton.innerText = "Finalizar Compra";
    finalizarCompraButton.addEventListener("click", finalizarCompra);

    modalContainer.innerHTML = "";
    modalContent.append(finalizarCompraButton);
    modalContainer.append(modalHeader, modalContent);
    modalContainer.style.display = "block";

    renderizarCarrito();
}

// Función para cerrar el modal del carrito
function cerrarModalCarrito() {
    modalContainer.style.display = "none";
}

// Función para finalizar la compra
function finalizarCompra() {
    const total = calcularTotal();
    console.log("Compra finalizada - Total a pagar:", total);
    carrito = []; // Limpia el carrito después de finalizar la compra
    renderizarCarrito(); // Actualizar la visualización del carrito en el modal
}

verCarrito.addEventListener("click", abrirModalCarrito);

// Inicialización de la aplicación
renderizarProductos();