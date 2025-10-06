
# 📝 Todo List Frontend (Angular 17)

Frontend del proyecto **Todo List**, desarrollado en **Angular 17** con **NgRx** para el manejo de estado global, **Angular Material** para la interfaz, y **Tailwind CSS** para el diseño moderno y responsivo.  
Integra un backend en **.NET 8 Web API** para la gestión de tareas y autenticación de usuarios.

---

## 🚀 Tecnologías principales

| Tecnología | Descripción |
|-------------|-------------|
| **Angular 17** | Framework frontend moderno basado en TypeScript. |
| **NgRx** | Manejo de estado reactivo (Store, Effects, Actions, Reducers). |
| **Angular Material** | Componentes UI accesibles y profesionales. |
| **Tailwind CSS** | Framework de utilidades CSS para diseño rápido. |
| **RxJS** | Programación reactiva con observables. |
| **SweetAlert2** | Alertas personalizadas y modernas. |

---

## ⚙️ Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** v18+  
- **Angular CLI** v17+  
- **npm** o **yarn**  
- **Backend .NET 8+** corriendo localmente (por defecto en `http://localhost:5114`)

---

## 🧩 Instalación

Clona el repositorio y entra en la carpeta del proyecto:

```bash
git clone https://github.com/jefer15/todo-list-front.git
cd todo-list-front
```

Instala las dependencias:

```bash
npm install
```

---

## 🖥️ Ejecución en desarrollo

Para iniciar el servidor de desarrollo de Angular:

```bash
npm start
```

Luego abre [http://localhost:4200](http://localhost:4200) en tu navegador.

---

## 🧪 Ejecución de pruebas unitarias

El proyecto incluye pruebas unitarias configuradas con **Karma** y **Jasmine**.

Ejecuta:

```bash
npm test
```
---

## 🧱 Estructura del proyecto

```
src
 ├── app
 │   ├── core
 │   │   ├── guard
 │   │   ├── interceptor
 │   │   ├── models
 │   │   │   ├── auth
 │   │   │   └── task
 │   │   └── services
 │   │       ├── auth
 │   │       └── task
 │   ├── features
 │   │   ├── auth
 │   │   │   ├── login
 │   │   │   └── register
 │   │   └── tasks
 │   │       ├── task-detail
 │   │       └── task-form
 │   └── store
 │       ├── auth
 │       └── tasks
 ├── assets
 └── environments
```
