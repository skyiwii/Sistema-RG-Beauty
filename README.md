
@'
# RG Beauty — Sistema de gestión de inventario

## 1. Descripción del proyecto

RG Beauty es un sistema web desarrollado con Django para apoyar la administración de productos, existencias y movimientos de inventario de una microempresa dedicada a servicios y productos de belleza.

El proyecto forma parte del sistema de gestión de RG Beauty y contempla su futura integración con otros módulos, como ventas, reservas y administración de usuarios.

## 2. Tecnologías

- Python 3.14
- Django 5.2
- MySQL
- HTML y CSS
- Git y GitHub
- python-dotenv para la configuración mediante variables de entorno

## 3. Requisitos previos

Cada integrante debe disponer de:

- Python instalado.
- Git.
- MySQL Server y un cliente de administración de bases de datos.
- Un editor de código, como Visual Studio Code.

## 4. Obtener el proyecto

Clonar el repositorio:

```bash
git clone https://github.com/skyiwii/Sistema-RG-Beauty.git
cd Sistema-RG-Beauty
```

Crear el entorno virtual:

```powershell
python -m venv .venv
```

Activarlo en PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

Instalar las dependencias:

```powershell
python -m pip install -r requirements.txt
```

## 5. Configurar la conexión a MySQL

Crear un archivo `.env` a partir de la plantilla:

```powershell
Copy-Item .env.example .env
```

Editar `.env` y reemplazar los valores de ejemplo por las credenciales locales de MySQL:

```dotenv
DB_NAME=rg_beauty
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_contraseña_mysql
DB_HOST=127.0.0.1
DB_PORT=3306
```

Cada integrante debe configurar sus propias credenciales. El archivo `.env` contiene información local y no debe subirse al repositorio.

La base de datos `rg_beauty` debe existir en el servidor MySQL y el usuario configurado debe tener los permisos necesarios.

## 6. Base de datos del proyecto

El archivo `database/Base_De_Datos_RG_Beauty.sql` contiene el esquema SQL compartido para el trabajo del equipo.

**Precaución:** el archivo contiene instrucciones `DROP TABLE IF EXISTS`, por lo que puede eliminar tablas con nombres coincidentes. Debe utilizarse únicamente sobre una base de datos de prueba o una base nueva, después de revisar su contenido. No debe importarse sobre una base con información que se quiera conservar.

El archivo incluye tablas del sistema de negocio y tablas internas de Django. Antes de utilizarlo junto con las migraciones de Django, el equipo debe coordinar cómo se integrará el esquema existente con las migraciones del framework, para evitar conflictos por tablas ya creadas.

No se deben importar los scripts repetidamente sin comprobar previamente el estado de la base de datos.

## 7. Ejecutar y comprobar el proyecto

Comprobar la configuración:

```powershell
python manage.py check
```

Comprobar la conexión a la base de datos:

```powershell
python manage.py shell -c "from django.db import connection; connection.ensure_connection(); print('Conexión a MySQL correcta')"
```

**Antes de ejecutar migraciones**, confirmar con el equipo el procedimiento de integración entre las tablas del SQL y las migraciones de Django.

Cuando la configuración de la base de datos esté lista, ejecutar el servidor:

```powershell
python manage.py runserver
```

Abrir:

- Sistema: http://127.0.0.1:8000/
- Administración de Django: http://127.0.0.1:8000/admin/

Para detener el servidor, presionar `Ctrl + C`.

## 8. Estado actual del sistema

La versión actual contiene la estructura inicial del proyecto, navegación, autenticación basada en Django y páginas de referencia para el módulo de inventario.

Las secciones contempladas son:

- Panel principal.
- Gestión de productos.
- Consulta de existencias.
- Registro de movimientos.
- Ajustes de stock.
- Historial de movimientos.

Las pantallas que todavía sean de referencia deben completarse con la lógica de negocio, validaciones, acceso a datos y pruebas correspondientes.

## 9. Organización del trabajo

La distribución definitiva debe acordarse entre los integrantes antes de modificar archivos compartidos.

Como propuesta inicial:

- **Integrante 1 — Productos:** listado, registro, edición, consulta y validaciones de productos.
- **Integrante 2 — Stock:** consulta de existencias, disponibilidad y actualización del stock.
- **Integrante 3 — Movimientos:** entradas, salidas y ajustes de inventario.
- **Integrante 4 — Historial e integración:** consulta de movimientos, pruebas de integración y coordinación con los módulos relacionados.

Esta distribución es orientativa y debe ajustarse a las responsabilidades acordadas por el equipo. Las funcionalidades que compartan modelos, servicios o vistas deben coordinarse antes de implementarse.

## 10. Trabajo colaborativo con Git

Antes de comenzar una tarea:

```bash
git switch main
git pull origin main
```

Crear una rama propia:

```bash
git switch -c feature/nombre-de-la-tarea
```

Ejemplos:

- `feature/gestion-productos`
- `feature/consulta-stock`
- `feature/movimientos`
- `feature/historial`

Revisar los cambios:

```bash
git status
```

Preparar y registrar los archivos necesarios:

```bash
git add archivo_o_carpeta
git commit -m "Descripción breve del cambio"
```

Publicar la rama:

```bash
git push -u origin feature/nombre-de-la-tarea
```

Después, crear un Pull Request en GitHub para revisar los cambios antes de integrarlos en `main`.

Evitar trabajar directamente sobre `main` y no incluir archivos `.env`, entornos virtuales ni credenciales.

## 11. Comandos útiles

Comprobar el proyecto:

```powershell
python manage.py check
```

Ejecutar el servidor:

```powershell
python manage.py runserver
```

Crear un administrador de Django, una vez preparada la base de datos:

```powershell
python manage.py createsuperuser
```

Revisar el estado del repositorio:

```bash
git status
```

Consultar las ramas:

```bash
git branch
```
'@ | Set-Content -Encoding utf8 .\README.md
