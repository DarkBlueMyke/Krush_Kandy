document.addEventListener("DOMContentLoaded", function () {
    const btnTerminarOrden = document.querySelector(".sku-section button");
    const btnRealizarVenta = document.querySelector(".big-buttons button");
    const tablaProductos = document.querySelector("#productos tbody");
    const subtotalField = document.getElementById("subtotal");
    const descuentoField = document.getElementById("descuento");
    const totalField = document.getElementById("total");
    const discountInput = document.getElementById("discount");
    const ordenInput = document.getElementById("orden");


    let productos = [];
    let numeroOrden = 1;
    let contadorOrden = 1;


    function generarNumeroOrden() {
        ordenInput.value = numeroOrden;
    }


    function actualizarResumen() {
        let subtotal = productos.reduce((sum, item) => sum + item.cantidad * item.precio, 0);
        let descuento = (subtotal * (parseFloat(discountInput.value) || 0)) / 100;
        let total = subtotal - descuento;


        subtotalField.textContent = `$${subtotal.toFixed(2)}`;
        descuentoField.textContent = `$${descuento.toFixed(2)}`;
        totalField.textContent = `$${total.toFixed(2)}`;
    }


    function terminarOrden() {
        const orden = contadorOrden;
        const sku = document.getElementById("sku").value.trim();
        const cantidad = parseInt(document.getElementById("cantidad").value);
        const precio = 10;


        if (!sku || isNaN(cantidad) || cantidad <= 0) {
            alert("Por favor, ingresa un SKU y cantidad válida.");
            return;
        }


        const nuevoProducto = { orden, sku, cantidad, precio };
        productos.push(nuevoProducto);


        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${orden}</td>
            <td>${sku}</td>
            <td>Producto ${sku}</td>
            <td>${cantidad}</td>
            <td>$${precio.toFixed(2)}</td>
        `;


        tablaProductos.appendChild(fila);
        actualizarResumen();


        document.getElementById("sku").value = "";
        document.getElementById("cantidad").value = "1";
        contadorOrden++;
    }


    function realizarVenta() {
        if (productos.length === 0) {
            alert("No hay productos en la orden.");
            return;
        }


        alert("Venta realizada con éxito.");


        numeroOrden++;
        contadorOrden = 1;
        generarNumeroOrden();


        productos = [];
        tablaProductos.innerHTML = "";
        actualizarResumen();
    }


    function aplicarDescuento() {
        actualizarResumen();
    }


    function manejarEnter(event) {
        if (event.key === "Enter") {
            if (document.activeElement.id === "sku" || document.activeElement.id === "cantidad") {
                terminarOrden();
            } else if (document.activeElement.id === "discount") {
                aplicarDescuento();
            }
        }
    }


    btnTerminarOrden.addEventListener("click", terminarOrden);
    btnRealizarVenta.addEventListener("click", realizarVenta);
    discountInput.addEventListener("input", aplicarDescuento);
    document.addEventListener("keydown", manejarEnter);


    generarNumeroOrden();
});
