TaskFlow

TaskFlow es una aplicación web de gestión de tareas que permite crear, completar, eliminar y filtrar tareas de forma sencilla e intuitiva.

Funcionalidades
Crear nuevas tareas
Marcar tareas como completadas
Eliminar tareas
Filtrar tareas (todas, pendientes y completadas)
Búsqueda de tareas en tiempo real
Botón para completar todas las tareas
Botón para eliminar tareas completadas
Estadísticas (total, completadas y pendientes)
Modo claro y modo oscuro
Persistencia de tareas mediante backend Node.js en memoria
Diseño responsive para móvil y escritorio
Editar tareas

Tecnologías utilizadas
HTML5
CSS3
JavaScript 
LocalStorage
Git y GitHub
Instalación y uso
Clonar el repositorio:
git clone https://github.com/DiegoSerradilla/taskflow-project.git
Node.js
Express
Fetch API


Frontend:
Abrir index.html con Live Server

Backend:
Entrar en la carpeta server y ejecutar:

npm install
npm run dev

Se ha añadido un backend con Node.js y Express para gestionar las tareas mediante una API REST.
Las tareas se almacenan en memoria y se accede a ellas desde el frontend mediante peticiones fetch.

Endpoints principales:

GET → obtener tareas
POST → crear tarea
PATCH → editar/completar tarea
DELETE → eliminar tarea
Actualización Fase 3 Backend

Se ha conectado el frontend con un backend desarrollado en Node.js y Express mediante una API REST.

Mejoras añadidas:
- Carga de tareas desde servidor con método GET
- Creación de tareas con método POST
- Eliminación de tareas con método DELETE
- Cambio de estado completada con método PATCH
- Separación de la capa de red en `api/client.js`
- Eliminación progresiva de lógica directa fetch en `script.js`
- Gestión visual de estados de carga y error
- Estructura más profesional entre frontend y backend

Arquitectura del backend separada en routes, controllers y services.