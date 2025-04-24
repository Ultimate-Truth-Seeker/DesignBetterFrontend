# Sprint Scrum I - Proyecto - Ingeniería Software I - Frontend

Este repositorio contiene el **frontend** de la plataforma **Design Better**, una solución innovadora para el diseño y personalización de moda. La plataforma permite a diseñadores y clientes colaborar en la creación, simulación y personalización de prendas, mejorando el flujo de trabajo y la experiencia de usuario. Este módulo frontend está desarrollado con **Next.js**, **Tailwind CSS** y se ejecuta en contenedores Docker para facilitar el desarrollo y despliegue.

---

## Documentación y Recursos

- **Historial de Versiones:**  
  [Historial de versiones y documentación](https://uvggt-my.sharepoint.com/:w:/g/personal/men23975_uvg_edu_gt/EbODmOJHdNlCt-gt0UDzqIkBXOH8IjRcJTD1jZfejYkbuA)

- **Presentación de la Entrega:**  
  [Accede a la presentación en Canva](https://www.canva.com/design/DAGlgSqIQfA/FL8fKKLI_ODLVjm9HwMP-w/edit?utm_content=DAGlgSqIQfA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

---

## Estructura del Repositorio

A continuación se describe la estructura principal del proyecto:

```
DesignBetterFrontend/
├── InvestigacionInterfaz       # CInvestigación e ideas sobre interfaces para las pantallas principales
├── app/                        # Rutas y vistas principales 
├── components/                 # Componentes reutilizables (UI, formularios, etc.)
├── lib/                        # Funciones y utilidades auxiliares (ej. JWT, routing)
├── providers/                  # Proveedores de contexto y lógica de autenticación
├── public/                     # Archivos estáticos públicos (imágenes, íconos, etc.)
├── styles/                     # Archivos CSS y configuración de Tailwind CSS
├── .gitignore                  # Define los archivos y carpetas ignorados por git
├── Dockerfile                  # Configuración de imagen Docker para producción
├── docker-compose.yml          # Orquestación de servicios en contenedores
├── eslint.config.mjs           # Configuración personalizada para ESLint
├── LICENSE                     # Licencia del proyecto
├── next-env.d.ts               # Definiciones de tipo para el entorno Next.js
├── next.config.ts              # Configuración principal del framework Next.js
├── package.json                # Información del proyecto, scripts y dependencias
├── package-lock.json           # Archivo de bloqueo de versiones para npm
├── postcss.config.mjs          # Configuración de PostCSS (procesador de CSS)
├── tailwind.config.js          # Configuración de Tailwind CSS (temas, plugins, etc.)
├── tsconfig.json               # Configuración de TypeScript
├── yarn.lock                   # Archivo de bloqueo de versiones para yarn
└── README.md                   # Documentación principal del proyecto

```

---

## Requisitos Previos

- **Docker** (v20.10 o superior)
- **Docker Compose**

---

## Ejecución del Proyecto con Docker

### 1. Clonar el Repositorio
```bash
git clone https://github.com/Ultimate-Truth-Seeker/DesignBetterFrontend.git
cd DesignBetterFrontend
```

### 2. Crear red Docker
```bash
docker network create devnetwork
```

### 3. Construir y levantar los contenedores
```bash
docker compose up -d
```

El sitio estará disponible por defecto en `http://localhost:3000`.

---

## Detener y Eliminar Contenedores

### Detener contenedores
```bash
docker compose down
```

### Eliminar todo (contenedores, imágenes, volúmenes)
```bash
docker compose down --rmi all --volumes --remove-orphans
```


Con esta estructura y documentación, el proyecto está preparado para un desarrollo colaborativo eficiente, despliegue en contenedores y futuras iteraciones ágiles.

