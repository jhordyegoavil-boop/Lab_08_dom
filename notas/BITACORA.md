# Bitacora de JavaScript interactivo
 
Laboratorio 08: JavaScript Interactivo - DOM, Eventos y Objetos.
Navegador usado: (escribe aqui cual usaste)
 
## Ejercicio 2: Seleccionar y modificar el DOM

| Instruccion | Que cambio en la pantalla | Se mantiene al recargar (Si/No) |
|-------------|---------------------------|---------------------------------|
| textContent desde la consola | El titulo paso a decir "Hola desde la consola" | No |
| textContent desde app.js | El titulo paso a decir "Hola TECSUP" | Si |
| style.color | El titulo se puso de color azul | Si |
| classList.add | El parrafo tomo fondo amarillo (clase destacado) | Si |
| createElement + appendChild | La lista mostro un tercer elemento: JavaScript | Si |
 
## Ejercicio 3: Evento click

| Tipo de evento | Que accion lo dispara | Cuanto suma por accion |
|----------------|-----------------------|------------------------|
| click | Un clic sobre el boton Sumar 1 | 1 |
| dblclick | Dos clics rapidos seguidos sobre el boton | 1 por cada doble clic |
| mouseover | Pasar el cursor por encima del boton, sin hacer clic | 1 cada vez que el cursor entra al boton |
 
## Ejercicio 4: Eventos input y submit

| Prueba | Que paso en la pantalla | Se recargo la pagina (Si/No) |
|--------|-------------------------|------------------------------|
| Escribir en el campo nombre | El texto "Hola, ..." cambio letra por letra | No |
| Enviar sin preventDefault | "Enviado" aparecio un instante y desaparecio; el campo quedo vacio | Si |
| Enviar con preventDefault, correo sin @ | Aparecio en rojo "Correo no valido: falta @" | No |
| Enviar con preventDefault, correo con @ | Aparecio "Enviado: " seguido del correo | No |

## Ejercicio 5: Clases y objetos
 
| Objeto | nombre | precio | descripcion() | conDescuento(0.25) |
|--------|--------|--------|---------------|--------------------|
| laptop | Laptop | 2500 | Laptop - S/ 2500.00 | 1875 |
| mouse | Mouse | 45 | Mouse - S/ 45.00 | 33.75 |
| teclado | Teclado | 120 | Teclado - S/ 120.00 | 90 |
| monitor | Monitor | 680 | Monitor - S/ 680.00 | 510 |

## Ejercicio 6: DOM, eventos y objetos juntos

| Prueba | Total que muestra la pagina | Correcto (Si/No) |
|--------|-----------------------------|------------------|
| Cuaderno 12.50 | 12.50 | Si |
| + Lapicero 3.20 | 15.70 | Si |
| + Mochila 89.90 | 105.60 | Si |
| Sin Number() | El producto no aparece; el total no cambia. Consola: this.precio.toFixed is not a function | No (error esperado) |

| Pieza | Linea de tu codigo donde aparece | Para que sirve |
|-------|----------------------------------|----------------|
| DOM | `const listaCarrito = document.querySelector("#carrito");` y `listaCarrito.appendChild(li);` (app.js, lineas 112 y 123) | Encontrar el elemento de la pagina y agregarle el nuevo producto |
| Evento | `formProducto.addEventListener("submit", ...)` (app.js, linea 115) | Reaccionar cuando el usuario envia el formulario |
| Objeto | `const producto = new Producto(prodNombre.value, Number(prodPrecio.value));` (app.js, linea 118) | Crear el producto con los datos escritos y guardarlo en el carrito |
