🛑 Para apagar todo (detener los servicios)

Desde la carpeta donde está tu docker-compose.yml, ejecuta:

docker compose down

¿Qué hace?

Detiene todos los contenedores

Elimina los contenedores y la red

❌ No borra tu código

❌ No borra las imágenes

❌ No borra tu proyecto

👉 Después de esto, las páginas dejarán de responder (normal).

▶️ Para volver a levantar y que funcione otra vez

En la misma carpeta, ejecuta:

docker compose up -d

¿Qué hace?

Crea la red

Levanta PostgreSQL

Levanta los 3 microservicios

Abre los puertos 3000, 3001 y 3002

Lo deja corriendo en segundo plano

🔍 Para comprobar que ya funciona
docker compose ps


Debe decir Up.

Luego en el navegador:

http://localhost:3000

http://localhost:3001

http://localhost:3002

🧠 Regla fácil (memorízala)

🔴 Apagar → docker compose down

🟢 Encender → docker compose up -d

👀 Ver estado → docker compose ps

📖 Ver logs → docker compose logs
# Pilamunga API Ventas

Proyecto de microservicios desarrollado con Node.js, Express, PostgreSQL y Docker.

## Arquitectura
- Base de datos PostgreSQL
- Microservicio de productos
- Microservicio de usuarios
- Microservicio de órdenes

## Tecnologías
- Node.js
- Express
- PostgreSQL
- Docker
- Docker Compose

## Puertos
- Productos: http://localhost:3000
- Usuarios: http://localhost:3001
- Órdenes: http://localhost:3002
- PostgreSQL: 5432

## Ejecución del proyecto
```bash
docker compose up -d
Detener el proyecto
docker compose down

Verificación

Acceder desde el navegador a los puertos configurados o revisar logs con:

docker compose logs