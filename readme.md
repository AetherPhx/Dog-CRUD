# Desafío: DOG CRUD

## Descripción

Este proyecto es parte de los desafíos realizados en los días de Hackaton dentro del bootcamp de IDAT con la finalidad de poner en práctica los conocimientos adquiridos durante la semana.

Se tiene como objetivo principal desarrollar una web CRUD para gestionar una base de datos de perros usando los materiales brindados.
Para el desafío se ha brindado la DB en .json, las imágenes de los perros y el diseño de la web.

El proyecto es desarrollado en HTML, SCSS, JS Vanilla, iniciado en Vite mediante yarn.
La DB es manejada como una API REST, se le realizan pruebas en Postman antes de integrar las peticiones. Estas peticiones se manejaran con axios.

## Objetivos

- Maquetar la web siguiendo el diseño brindado como material.
- Implementar una petición a la DB para obtener la lista de perros y mostrarlos en la web.
- Implementar botón de eliminar perro que únicamente elimina el perro de la interfaz y no de la DB.
- Mostrar mensaje de confirmación para eliminar un perro.

## Plan de Desarrollo

> Fase Actual: #1

1. Fase 1: Configuración del entorno de desarrollo.
2. Fase 2: Maquetación de la página de Inicio.
3. **Fase 3: Implementación de CRUD Simple.**
4. Fase 4: Implementación de Mensaje de Confirmación.

### Fase 1: Configuración del entorno de desarrollo

- Iniciar el proyecto con Vite.
- Instalar dependencias y paquetes necesarios.
- Configurar la estructura de carpetas.
- Preparar archivos necesarios.
- Crear repositorio local mediante Git.
- Conectar y publicar repositorio remoto en GitHub.

### Fase 2: Maquetación de la página de Inicio

- Crear la estructura del header.
- Crear la estructura de la plantilla para las tarjetas de perros.
- Establecer estilos globales.
- Aplicar estilos al header.
- Aplicar estilos a la tarjeta de perro.
- Agregar overlay a la tarjeta de perro con botones de acción.
- Aplicar estilos al overlay.

### Fase 3: Implementación de CRUD Simple

- Realizar petición GET mediante Axios para obtener la lista de perros.
- Desarrollar función para pintar la lista de perros.
- Implementar la fn de pinta al entrar a la web.
- Implementar función que borre un perro únicamente de la interfaz.

### Fase 4: Implementación de Modal de Confirmación

- Estructurar Modal con mensaje de confirmación y botones para confirmar y cancelar.
- Brindar estilos al modal según el diseño y darle la interactividad para que se muestre al querer eleminar un perro.
- Implementar funciones al confirmar o cancelar desde el modal.

# Reto Avanzado (Próximamente 🔥)

## Descripción

Este reto adicional consiste en extender la funcionalidad del CRUD implementado anteriormente, enfocándose en interactuar directamente con la base de datos. Además, se aprovechará el uso de módulos ES para estructurar mejor el código.

## Nuevos Objetivos

1. Refactorizar el código usando módulos ES para una mejor organización.
2. Implementar funcionalidad para agregar nuevos perros a la base de datos.
3. Implementar funcionalidad para eliminar perros de la base de datos.

## Plan de Desarrollo

### Fase 5: Refactorización con Módulos ES

- Crear módulo para el manejo de peticiones.
- Crear módulo para las funcionalidades del CRUD.
- Separar las funcionalidades del CRUD en módulos individuales (por ejemplo, `getDogs.js`, `addDog.js`, `deleteDog.js`).
- Organizar los módulos en carpetas y asegurarse de que cada archivo tenga una única responsabilidad.
- Actualizar el código principal para importar los módulos ES donde se necesiten.

### Fase 6: Implementación de Agregar Perros a la DB

- Crear un formulario para añadir perros con campos de nombre, raza, y edad.
- Implementar la función que realice una petición POST a la base de datos para agregar un nuevo perro.
- Validar los datos del formulario antes de enviarlos.

### Fase 7: Implementación de Eliminar Perros de la DB

- Actualizar la función de eliminación para que, además de eliminar el perro de la interfaz, se realice una petición DELETE a la base de datos.

### Fase 8: Mensajes de Éxito o Falla

- Implementar mensajes de éxito o error según el resultado de la operación.
