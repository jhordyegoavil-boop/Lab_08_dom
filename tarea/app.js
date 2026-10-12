// Tarea: lista de tareas (version 3: DOM + eventos + clases)

// ---------- Objetos ----------
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

const lista = new ListaTareas();

// ---------- DOM ----------
const formTarea = document.querySelector("#formTarea");
const texto = document.querySelector("#texto");
const caracteres = document.querySelector("#caracteres");
const mensaje = document.querySelector("#mensaje");
const listaTareas = document.querySelector("#listaTareas");
const pendientes = document.querySelector("#pendientes");
const totalTareas = document.querySelector("#totalTareas");

function mostrarMensaje(contenido, clase) {
  mensaje.textContent = contenido;
  mensaje.className = clase;
}

function dibujar() {
  listaTareas.textContent = "";

  lista.tareas.forEach((t) => {
    const li = document.createElement("li");
    if (t.completada) {
      li.classList.add("hecha");
    }

    const span = document.createElement("span");
    span.textContent = t.descripcion();

    span.addEventListener("click", () => {
      t.alternar();
      dibujar();
    });

    const boton = document.createElement("button");
    boton.textContent = "Borrar";
    boton.classList.add("borrar");

   
    boton.addEventListener("click", () => {
      lista.eliminar(t.id);
      mostrarMensaje("Tarea eliminada", "ok");
      dibujar();
    });

    li.appendChild(span);
    li.appendChild(boton);
    listaTareas.appendChild(li);
  });

  pendientes.textContent = lista.pendientes();
  totalTareas.textContent = lista.tareas.length;
}

// ---------- Eventos ----------
texto.addEventListener("input", () => {
  caracteres.textContent = texto.value.length;
  if (mensaje.classList.contains("error")) {
    mostrarMensaje("", "");
  }
});

formTarea.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const valor = texto.value.trim();

  if (valor === "") {
    mostrarMensaje("Escribe una tarea antes de agregar", "error");
  } else if (valor.length < 3) {
    mostrarMensaje("La tarea debe tener al menos 3 caracteres", "error");
  } else if (lista.existe(valor)) {
    mostrarMensaje("Esa tarea ya existe", "error");
  } else {
    lista.agregar(valor);
    mostrarMensaje("Tarea agregada", "ok");
    formTarea.reset();
    caracteres.textContent = 0;
    dibujar();
  }
});

dibujar();
