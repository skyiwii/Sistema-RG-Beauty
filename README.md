# RG Beauty — Sistema de Gestión de Inventario

## 1. Descripción del proyecto

RG Beauty es un sistema web desarrollado con Django para apoyar la gestión de inventario de una microempresa dedicada a servicios y productos de belleza.

El proyecto busca centralizar la información de los productos y facilitar el control de existencias, los movimientos de inventario y el seguimiento de los cambios de stock.

## 2. Tecnologías utilizadas

- Python 3.14
- Django 5.2
- SQLite para el desarrollo local
- HTML y CSS
- Git y GitHub para el control de versiones

## 3. Requisitos previos

Antes de ejecutar el proyecto, se necesita tener instalado:

- Python 3.14 o una versión compatible con las dependencias del proyecto.
- Git.
- Un editor de código, como Visual Studio Code.

## 4. Instalación

### Paso 1. Clonar el repositorio

```bash
git clone https://github.com/skyiwii/Sistema-RG-Beauty.git
cd Sistema-RG-Beauty
```

### Paso 2. Crear un entorno virtual

En Windows, ejecutar:

```powershell
python -m venv .venv
```

### Paso 3. Activar el entorno virtual

En PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

En CMD:

```cmd
.venv\Scripts\activate.bat
```

### Paso 4. Instalar las dependencias

```powershell
python -m pip install -r requirements.txt
```

### Paso 5. Aplicar las migraciones

```powershell
python manage.py migrate
```

Este comando crea las tablas necesarias para el funcionamiento local de Django.

### Paso 6. Crear un usuario administrador

```powershell
python manage.py createsuperuser
```

Cada integrante debe crear sus propias credenciales locales. No se deben compartir contraseñas ni subirlas al repositorio.

### Paso 7. Ejecutar el servidor

```powershell
python manage.py runserver
```

Abrir en el navegador:

- Sistema: http://127.0.0.1:8000/
- Administración de Django: http://127.0.0.1:8000/admin/

Para detener el servidor, presionar `Ctrl + C` en la terminal.

## 5. Funcionalidades y estado actual

La versión actual contiene la estructura visual y la navegación inicial del sistema, junto con autenticación mediante Django.

Las secciones disponibles son:

- Panel principal.
- Listado de productos.
- Formulario inicial de productos.
- Consulta de stock.
- Registro de movimientos.
- Ajustes de stock.
- Historial de movimientos.

Algunas de estas secciones son actualmente plantillas de referencia y requieren la implementación de la lógica correspondiente, los formularios funcionales y la persistencia de datos.

## 6. Acceso al sistema

Las vistas principales requieren iniciar sesión. Para acceder, cada integrante debe crear un usuario local mediante `createsuperuser`.

Las credenciales creadas en un computador no se comparten automáticamente con los demás integrantes, ya que cada uno utiliza su propia base de datos local.

## 7. Base de datos

Durante el desarrollo local se utiliza SQLite. El archivo `db.sqlite3` está excluido del repositorio, por lo que cada integrante debe ejecutar las migraciones para crear su propia base de datos.

No se deben subir bases de datos personales, contraseñas ni archivos que contengan credenciales.

## 8. Trabajo colaborativo con Git

### Actualizar la rama principal

Antes de comenzar una tarea, actualizar la información del repositorio:

```bash
git switch main
git pull origin main
```

### Crear una rama de trabajo

Cada integrante debe crear una rama propia para su tarea. Por ejemplo:

```bash
git switch -c feature/gestion-productos
```

El nombre debe describir el trabajo que se realizará. Algunos ejemplos:

- `feature/gestion-productos`
- `feature/consulta-stock`
- `feature/movimientos`
- `feature/ajustes-stock`
- `feature/historial`

Cada integrante debe utilizar un nombre de rama distinto.

### Guardar los cambios

Para revisar los archivos modificados:

```bash
git status
```

Para preparar y registrar los cambios:

```bash
git add .
git commit -m "Describir brevemente los cambios"
```

Antes de ejecutar `git add .`, comprobar que no se incluyan archivos locales, credenciales ni otros archivos excluidos.

### Publicar la rama

```bash
git push -u origin feature/gestion-productos
```

Reemplazar el nombre de la rama por el correspondiente a cada integrante.

### Integrar los cambios

Cuando la funcionalidad esté lista, crear un Pull Request en GitHub para revisar e integrar los cambios en `main`.

No se recomienda que todos los integrantes trabajen directamente sobre `main`.

## 9. Organización de los módulos

Antes de implementar las funcionalidades, el equipo debe coordinar el modelo de datos y las relaciones entre productos, existencias y movimientos.

La distribución de tareas debe acordarse entre los integrantes para evitar duplicar código o implementar estructuras incompatibles.

## 10. Comandos útiles

Comprobar la configuración del proyecto:

```powershell
python manage.py check
```

Aplicar migraciones:

```powershell
python manage.py migrate
```

Ejecutar el servidor:

```powershell
python manage.py runserver
```

Crear un usuario administrador:

```powershell
python manage.py createsuperuser
```

Consultar el estado de Git:

```bash
git status
```

Consultar las ramas disponibles:

```bash
git branch
```
