# Tarea: Mi componente interactivo

## Componente elegido

**Lista de tareas** con campo de texto, boton para agregar, marcar tareas como hechas, borrarlas y un contador de pendientes. Es util para organizar los trabajos de la semana y permite practicar DOM, eventos y objetos.


## Version 1: solo DOM

**Que agregue:** una lista fija de textos y un bucle que crea un `li` por cada uno con `createElement` y lo coloca con `appendChild`; tambien muestro el total en pantalla con `textContent`.

**Por que:** primero queria comprobar que sabia encontrar elementos y crear nodos antes de agregar interaccion.

**Que cambio en la pagina:** aparecen tres tareas de ejemplo y el total, pero el usuario no puede hacer nada: es una pagina estatica generada con JavaScript.

```js
const lista = document.querySelector("#listaTareas");
const textos = ["Estudiar DOM", "Practicar eventos", "Hacer la tarea"];

textos.forEach((t) => {
  const li = document.createElement("li");
  li.textContent = t;
  lista.appendChild(li);
});

document.querySelector("#totalTareas").textContent = textos.length;
```

## Version 2: con eventos

**Que agregue:** el evento `submit` del formulario (con `preventDefault` y validacion con mensaje en la pagina), el evento `input` para el contador de caracteres y el evento `click` para marcar una tarea y para borrarla con un boton.

**Por que:** para que la interfaz reaccione al usuario y pueda crear, modificar y eliminar elementos.

**Que cambio en la pagina:** ya se pueden agregar tareas escribiendo, ver cuantos caracteres llevo, marcarlas (se tachan) y borrarlas. Los datos solo viven en el DOM.

```js
const form = document.querySelector("#formTarea");
const texto = document.querySelector("#texto");
const mensaje = document.querySelector("#mensaje");
const lista = document.querySelector("#listaTareas");

texto.addEventListener("input", () => {
  document.querySelector("#caracteres").textContent = texto.value.length;
});

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const valor = texto.value.trim();

  if (valor.length < 3) {
    mensaje.textContent = "La tarea debe tener al menos 3 caracteres";
    mensaje.className = "error";
    return;
  }

  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = valor;
  span.addEventListener("click", () => li.classList.toggle("hecha"));

  const borrar = document.createElement("button");
  borrar.textContent = "Borrar";
  borrar.addEventListener("click", () => li.remove());

  li.appendChild(span);
  li.appendChild(borrar);
  lista.appendChild(li);
  form.reset();
});
```

## Version 3: con clases y objetos

**Que agregue:** la clase `Tarea` (datos de una tarea y su comportamiento) y la clase `ListaTareas` (guarda el arreglo y sabe agregar, eliminar, buscar, detectar duplicados y contar pendientes). El DOM ahora se dibuja desde los objetos con la funcion `dibujar()`.

**Por que:** en la version 2 el estado estaba mezclado con el HTML y era dificil contar pendientes o detectar tareas repetidas. Con objetos, los datos viven en un solo lugar y la pantalla es un reflejo de ellos.

**Que cambio en la pagina:** ahora hay contador de pendientes y total, validacion de tarea repetida, y el codigo es mas facil de ampliar.

```js
class Tarea {
  constructor(id, texto) {
    this.id = id;
    this.texto = texto;
    this.completada = false;
  }
  alternar() {
    this.completada = !this.completada;
  }
  descripcion() {
    return this.completada ? this.texto + " (hecha)" : this.texto;
  }
}

class ListaTareas {
  constructor() {
    this.tareas = [];
    this.siguienteId = 1;
  }
  agregar(texto) {
    const tarea = new Tarea(this.siguienteId, texto);
    this.siguienteId = this.siguienteId + 1;
    this.tareas.push(tarea);
    return tarea;
  }
  eliminar(id) {
    this.tareas = this.tareas.filter((t) => t.id !== id);
  }
  buscar(id) {
    return this.tareas.find((t) => t.id === id);
  }
  existe(texto) {
    return this.tareas.some((t) => t.texto.toLowerCase() === texto.toLowerCase());
  }
  pendientes() {
    return this.tareas.filter((t) => !t.completada).length;
  }
}
```

## Donde uso DOM, eventos y objetos

| Categoria | Parte del codigo final (tarea/app.js) | Para que sirve |
|-----------|---------------------------------------|----------------|
| DOM | `document.querySelector(...)` de `#formTarea`, `#texto`, `#mensaje`, `#listaTareas`, `#pendientes` | Encontrar los elementos de la pagina |
| DOM | `createElement("li")`, `createElement("span")`, `createElement("button")` y `appendChild` dentro de `dibujar()` | Crear cada tarea en pantalla |
| DOM | `textContent`, `className`, `classList.add`, `listaTareas.textContent = ""` | Mostrar mensajes, estilos y limpiar la lista antes de redibujar |
| Eventos | `texto.addEventListener("input", ...)` | Actualizar el contador de caracteres mientras se escribe |
| Eventos | `formTarea.addEventListener("submit", ...)` con `preventDefault()` | Validar y agregar la tarea sin recargar la pagina |
| Eventos | `span.addEventListener("click", ...)` y `boton.addEventListener("click", ...)` | Marcar como hecha y borrar una tarea |
| Objetos | `class Tarea` y `new Tarea(...)` dentro de `ListaTareas.agregar` | Representar una tarea con su estado |
| Objetos | `class ListaTareas` y `const lista = new ListaTareas()` | Guardar y gestionar todas las tareas |

## Pruebas realizadas

Comprueba cada caso en tu navegador y cambia "Resultado obtenido" / "Cumple" si algo difiere.

| # | Accion | Resultado esperado | Resultado obtenido | Cumple (Si/No) |
|---|--------|--------------------|--------------------|----------------|
| 1 | Enviar el formulario con el campo vacio | Mensaje rojo "Escribe una tarea antes de agregar"; no se agrega nada | Mensaje rojo mostrado en la pagina; lista sin cambios | Si |
| 2 | Escribir "ab" y enviar | Mensaje "La tarea debe tener al menos 3 caracteres" | Mensaje de error mostrado | Si |
| 3 | Escribir "Estudiar JavaScript" y enviar | La tarea aparece, mensaje verde "Tarea agregada", pendientes = 1 de 1 | Tarea agregada y contadores actualizados | Si |
| 4 | Agregar otra vez "estudiar javascript" | Mensaje "Esa tarea ya existe" | Rechazada como duplicada | Si |
| 5 | Hacer clic sobre el texto de una tarea | Se tacha y pendientes baja en 1 | Tarea tachada y contador actualizado | Si |
| 6 | Hacer clic otra vez sobre la misma tarea | Se destacha y pendientes sube en 1 | Vuelve a pendiente | Si |
| 7 | Pulsar Borrar en una tarea | La tarea desaparece, total baja en 1, mensaje "Tarea eliminada" | Tarea eliminada | Si |
| 8 | Escribir en el campo | El contador de caracteres cambia letra por letra | Contador actualizado | Si |

## Por que diseñe asi mi clase

Disene `Tarea` con los atributos `id`, `texto` y `completada` porque son los datos minimos de una tarea: el `id` permite identificarla y borrarla aunque haya textos parecidos, el `texto` es lo que ve el usuario y `completada` guarda su estado. Sus metodos `alternar()` y `descripcion()` ponen en la propia tarea lo que sabe hacer (cambiar de estado y describirse). `ListaTareas` guarda el arreglo y concentra las operaciones sobre el conjunto (`agregar`, `eliminar`, `buscar`, `existe`, `pendientes`), de modo que el DOM solo se ocupa de mostrar y los eventos de recibir las acciones del usuario.
