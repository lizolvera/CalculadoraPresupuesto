"use strict";
let balance = 0;
let transacciones = [];
let idCounter = 0;
const balanceElemento = document.getElementById("balance");
const listaTransacciones = document.getElementById("listaTransacciones");
const inputMonto = document.getElementById("monto");
const inputDescripcion = document.getElementById("descripcion");
const btnIngreso = document.getElementById("agregarIngreso");
const btnGasto = document.getElementById("agregarGasto");
function agregarTransaccion(tipo) {
    const monto = parseFloat(inputMonto.value);
    const descripcion = inputDescripcion.value.trim();
    if (isNaN(monto) || monto <= 0 || descripcion === "") {
        alert("Por favor, ingrese un monto válido y una descripción.");
        return;
    }
    const nuevaTransaccion = {
        id: idCounter++,
        monto,
        descripcion,
        tipo
    };
    transacciones.push(nuevaTransaccion);
    actualizarBalance();
    mostrarTransacciones();
    inputMonto.value = "";
    inputDescripcion.value = "";
}
function actualizarBalance() {
    balance = transacciones.reduce((total, transaccion) => {
        return transaccion.tipo === "ingreso" ? total + transaccion.monto : total - transaccion.monto;
    }, 0);
    balanceElemento.textContent = balance.toString();
}
function mostrarTransacciones() {
    listaTransacciones.innerHTML = "";
    transacciones.forEach(transaccion => {
        const li = document.createElement("li");
        li.textContent = `${transaccion.descripcion}: $${transaccion.monto}`;
        li.className = transaccion.tipo === "ingreso" ? "income" : "expense";
        listaTransacciones.appendChild(li);
    });
}
btnIngreso.addEventListener("click", () => agregarTransaccion("ingreso"));
btnGasto.addEventListener("click", () => agregarTransaccion("gasto"));
