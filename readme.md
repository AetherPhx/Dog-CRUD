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

> Fase Actual: Logrado 🏆

1. Fase 1: Configuración del entorno de desarrollo.
2. Fase 2: Maquetación de la página de Inicio.
3. Fase 3: Implementación de CRUD Simple.
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
- Implementar la fn de pintar al entrar a la web.
- Implementar función que borre un perro únicamente de la interfaz.

### Fase 4: Implementación de Modal de Confirmación

- Estructurar Modal con mensaje de confirmación y botones para confirmar y cancelar.
- Brindar estilos al modal según el diseño y darle la interactividad para que se muestre al querer eleminar un perro.
- Implementar funciones al confirmar o cancelar desde el modal.

# Reto Avanzado

## Descripción

Este reto adicional consiste en extender la funcionalidad del CRUD implementado anteriormente y mejorar la organización del código mediante el uso de módulos ES.

### Nuevos Objetivos

1. Organizar el código utilizando módulos ES.
2. Completar el CRUD: Agregar, eliminar y modificar perros en la base de datos.
3. Mejorar la experiencia del usuario con mensajes de éxito, error y confirmación en cada acción del CRUD.

## Implementación

### Refactorización con Módulos ES

- Crear módulo para manejar peticiones HTTP (API).
- Dividir las funcionalidades CRUD en módulos individuales.
- Actualizar el código principal para importar los módulos donde sea necesario.

### Funcionalidades CRUD

#### Agregar Perros

- Crear un formulario con los campos necesarios y validar los datos.
- Realizar una petición POST para agregar un nuevo perro a la base de datos.
- Si la operación es exitosa, mostrar el nuevo perro en la interfaz.

#### Eliminar Perros

- Actualizar la función de eliminación para incluir una petición DELETE.
- Eliminar el perro de la interfaz si la petición DELETE es exitosa.

#### Modificación de Perros

- Crear un formulario para modificar los datos del perro con validación de datos.
- Realizar una petición PATCH para actualizar los datos del perro en la DB.
- Reflejar los cambios en la interfaz si la modificación es exitosa.

### Mensajes al Usuario

- Implementar `notificaciones tipo toast` de éxito o error tras cada operación.
- Crear modales de confirmación para cada acción.
