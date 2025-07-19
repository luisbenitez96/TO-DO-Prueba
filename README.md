# Documentación del Sistema: To-do-list

## Índice

1. [Introducción](#1-introducción)
2. [Requisitos Previos](#2-requisitos-previos)
3. [Instalación y Configuración](#3-instalación-y-configuración)
   - [Backend (Laravel)](#31-backend-laravel)
   - [Frontend (React--Vite)](#32-frontend-react--vite)
4. [Ejecución](#4-ejecución)
5. [Notas Adicionales](#5-notas-adicionales)
6. [Contacto](#6-contacto)

---

## 1. Introducción

Este sistema es una aplicación de lista de tareas (To-do-list) compuesta por un backend desarrollado en Laravel (PHP) y un frontend en React utilizando Vite. Permite gestionar tareas y listas de manera eficiente y moderna.

---

## 2. Requisitos Previos

### Backend

- PHP >= 8.1
- Composer
- MySQL o SQLite
- Node.js y npm (opcional, para assets)

### Frontend

- Node.js >= 16
- npm o yarn

---

## 3. Instalación y Configuración

### 3.1 Backend (Laravel)

1. Accede a la carpeta del backend:
   ```bash
   cd To-do-list-backend
   ```
2. Instala dependencias:
   ```bash
   composer install
   ```
3. Copia el archivo de entorno y configura tus variables:
   ```bash
   cp .env.example .env
   ```
   Edita `.env` para la base de datos.
4. Genera la clave de la app:
   ```bash
   php artisan key:generate
   ```
5. Ejecuta las migraciones:
   ```bash
   php artisan migrate
   ```
6. (Opcional) Instala y compila assets:
   ```bash
   npm install
   npm run dev
   ```

### 3.2 Frontend (React + Vite)

1. Accede a la carpeta del frontend:
   ```bash
   cd To-do-list-frontend
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
   o
   ```bash
   yarn install
   ```

---

## 4. Ejecución

### Backend

```bash
php artisan serve
```

Accede a [http://localhost:8000](http://localhost:8000)

### Frontend

```bash
npm run dev
```

o

```bash
yarn dev
```

Accede a [http://localhost:5173](http://localhost:5173)

---

## 5. Notas Adicionales

- El frontend consume la API del backend, asegúrate de que ambos estén corriendo.
- Si necesitas cambiar la URL de la API, revisa la configuración en el frontend,
- En este caso no utilice una variable en el frontend, cosa que no debe ser asi, si desea cambiar esta en todoService
- Para producción, consulta la documentación oficial de Laravel y Vite.

---

# Guía de Uso de la Aplicación To-do-list

## 1. Acceso a la aplicación

- Asegúrate de que el backend y el frontend estén corriendo:
  - Backend: http://localhost:8000
  - Frontend: http://localhost:5173
- Abre tu navegador y accede a la URL del frontend.

## 2. Pantalla principal

Verás una lista de tareas (si existen) y los siguientes elementos principales:

- **Botón “Agregar”**: Abre un formulario para crear una nueva tarea.
- **Botón “Filtros”**: Permite filtrar tareas por estado y fecha límite.
- **Listado de tareas**: Cada tarea muestrai título, descripción, fecha límite, estado y si está completada.

## 3. Crear una nueva tarea

1. Haz clic en el botón **“Agregar”**.
2. Completa los campos:
   - Título (obligatorio)
   - Descripción (obligatorio)
   - Fecha límite (obligatorio)
   - Estado (elige entre: Sin iniciar, En Proceso, Completada, Anulada)
3. Haz clic en **“Guardar”**.
4. Si todo es correcto, la tarea aparecerá en la lista.

## 4. Editar una tarea

1. Haz clic en el botón **“Editar”** en la tarjeta de la tarea.
2. Se abrirá el formulario con los datos actuales.
3. Modifica los campos que desees y haz clic en **“Actualizar”**.

## 5. Marcar una tarea como completada o pendiente

- Haz clic en el botón **“Completar”** para marcar la tarea como completada.

## 6. Eliminar una tarea

- Haz clic en el botón **“Eliminar”** en la tarjeta de la tarea.

## 7. Filtrar tareas

- Haz clic en **“Filtros”**.
- Puedes filtrar por:
  - Estado (Sin iniciar, En Proceso, Completada, Anulada)
  - Fecha límite (selecciona una fecha)
- Haz clic en **“Limpiar filtros”** para ver todas las tareas nuevamente.

## 8. Notificaciones y mensajes

- Al agregar, editar o eliminar una tarea, verás mensajes de éxito o error

## 9. Estructura de la API (para usuarios avanzados)

El backend expone los siguientes endpoints principales (todos bajo `/api/todos`):

- `GET /api/todos` — Listar todas las tareas
- `POST /api/todos` — Crear una nueva tarea
- `GET /api/todos/{id}` — Obtener una tarea específica
- `PUT /api/todos/{id}` — Actualizar una tarea
- `DELETE /api/todos/{id}` — Eliminar una tarea
- `PATCH /api/todos/{id}/toggle` — Cambiar el estado de completado

## 10. Consejos adicionales

- Puedes tener varias tareas y alternar su estado fácilmente.
- Usa los filtros para organizar tu trabajo diario.
