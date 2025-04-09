# Sprint Scrum I - Proyecto - Ingeniería Software I - Frontend

Este repositorio contiene el **frontend** de la plataforma **Design Better**, una solución innovadora para el diseño y personalización de moda. La plataforma permite a diseñadores y clientes colaborar en la creación, simulación y personalización de prendas, mejorando el flujo de trabajo y la experiencia de usuario. Este módulo frontend está desarrollado con **Next.js**, **Tailwind CSS** y se ejecuta en contenedores Docker para facilitar el desarrollo y despliegue.

---

## Documentación y Recursos

- **Historial de Versiones:**  
  [Historial de versiones y documentación](https://uvggt-my.sharepoint.com/:w:/g/personal/piv23574_uvg_edu_gt/EZJRR6nZmgVLvWhW3ljZVaABUmeDmoFEFqZ2tBmaSOk5ng?e=v5Vjpr)

- **Presentación de la Entrega:**  
  [Accede a la presentación en Canva](https://www.canva.com/design/DAGj6A2ls68/VbwZEe7RZ4ySxEQi0gXDhA/edit?utm_content=DAGj6A2ls68&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

---

## Estructura del Repositorio

A continuación se describe la estructura principal del proyecto:

```
DesignBetterFrontend/
├── app/                    # Rutas y vistas principales (Next.js App Router)
├── components/             # Componentes reutilizables (UI, formularios, etc.)
├── lib/                    # Funciones y utilidades auxiliares
├── providers/              # Proveedores de contexto y autenticación
├── public/                 # Archivos estáticos públicos
├── styles/                 # Archivos CSS/Tailwind
├── .next/                  # Carpeta generada por Next.js (build)
├── Dockerfile              # Imagen Docker para producción
├── docker-compose.yml      # Configuración de servicios en contenedor
├── next.config.ts          # Configuración principal de Next.js
├── tailwind.config.js      # Configuración de Tailwind CSS
├── tsconfig.json           # Configuración de TypeScript
├── package.json            # Dependencias y scripts del proyecto
├── yarn.lock / package-lock.json
└── README.md               # Documentación principal del proyecto
```

---

## Requisitos Previos

- **Docker** (v20.10 o superior)
- **Docker Compose**
- **Yarn o npm** (solo si deseas ejecutar sin contenedores)
- **Node.js 18+** (si ejecutas sin contenedor)

---

## Ejecución del Proyecto con Docker

### 1. Clonar el Repositorio
```bash
git clone https://github.com/Ultimate-Truth-Seeker/DesignBetterFrontend.git
cd DesignBetterFrontend
```

### 2. Crear red Docker (opcional)
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

