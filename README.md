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
git clone URL_DEL_REPOSITORIO
cd Sistema-RG-Beauty
```

Reemplaza `URL_DEL_REPOSITORIO` por la dirección real del repositorio de GitHub.

### Paso 2. Crear un entorno virtual

En Windows:

```powershell
python -m venv .venv
```

### Paso 3. Activar el entorno virtual

En PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

Si se utiliza la consola CMD:

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

http://127.0.0.1:8000/

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

El acceso al panel de administración de Django está disponible en:

http://127.0.0.1:8000/admin/

## 7. Base de datos

Durante el desarrollo local se utiliza SQLite. El archivo `db.sqlite3` no se incluye en el repositorio, por lo que cada integrante debe ejecutar las migraciones para crear su propia base de datos.

No se deben subir bases de datos personales, contraseñas ni archivos que contengan credenciales.

## 8. Trabajo colaborativo

Antes de comenzar a trabajar, se recomienda actualizar la rama principal:

```bash
git pull origin main
```

Cada integrante debería desarrollar sus cambios en una rama propia y realizar un Pull Request para revisar e integrar el trabajo.

Se debe coordinar el modelo de datos y las relaciones entre productos, existencias y movimientos antes de implementar las funcionalidades para evitar diferencias entre módulos.

## 9. Comandos útiles

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
