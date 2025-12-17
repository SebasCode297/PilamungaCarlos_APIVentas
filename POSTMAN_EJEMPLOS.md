# Ejemplos de Peticiones para Postman

## 🔵 USER SERVICE (Puerto 3001)
Base URL: `http://localhost:3001/api/users`

### 1. Obtener todos los usuarios
```
GET http://localhost:3001/api/users
```

**Respuesta esperada:**
```json
[
  {
    "id_usuario": 1,
    "cedula": "1234567890",
    "nombre": "Juan Pérez",
    "correo": "juan@example.com",
    "telefono": "0987654321"
  }
]
```

---

### 2. Obtener usuario por ID
```
GET http://localhost:3001/api/users/1
```

**Respuesta esperada:**
```json
{
  "id_usuario": 1,
  "cedula": "1234567890",
  "nombre": "Juan Pérez",
  "correo": "juan@example.com",
  "telefono": "0987654321"
}
```

---

### 3. Crear nuevo usuario
```
POST http://localhost:3001/api/users
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "cedula": "1234567890",
  "nombre": "Juan Pérez",
  "correo": "juan@example.com",
  "telefono": "0987654321"
}
```

**Respuesta esperada:**
```json
{
  "id_usuario": 1,
  "cedula": "1234567890",
  "nombre": "Juan Pérez",
  "correo": "juan@example.com",
  "telefono": "0987654321"
}
```

---

### 4. Actualizar usuario
```
PUT http://localhost:3001/api/users/1
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "cedula": "1234567890",
  "nombre": "Juan Pérez Actualizado",
  "correo": "juan.nuevo@example.com",
  "telefono": "0987654321"
}
```

**Respuesta esperada:**
```json
{
  "id_usuario": 1,
  "cedula": "1234567890",
  "nombre": "Juan Pérez Actualizado",
  "correo": "juan.nuevo@example.com",
  "telefono": "0987654321"
}
```

---

### 5. Eliminar usuario
```
DELETE http://localhost:3001/api/users/1
```

**Respuesta esperada:**
```json
{
  "id_usuario": 1,
  "cedula": "1234567890",
  "nombre": "Juan Pérez",
  "correo": "juan@example.com",
  "telefono": "0987654321"
}
```

---

## 🟢 PRODUCT SERVICE (Puerto 3000)
Base URL: `http://localhost:3000/api/products`

### 1. Obtener todos los productos
```
GET http://localhost:3000/api/products
```

**Respuesta esperada:**
```json
[
  {
    "id": 1,
    "nombre": "Laptop",
    "descripcion": "Laptop HP 15 pulgadas",
    "precio": 899.99,
    "stock": 10
  }
]
```

---

### 2. Obtener producto por ID
```
GET http://localhost:3000/api/products/1
```

**Respuesta esperada:**
```json
{
  "id": 1,
  "nombre": "Laptop",
  "descripcion": "Laptop HP 15 pulgadas",
  "precio": 899.99,
  "stock": 10
}
```

---

### 3. Crear nuevo producto
```
POST http://localhost:3000/api/products
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "nombre": "Laptop",
  "descripcion": "Laptop HP 15 pulgadas",
  "precio": 899.99,
  "stock": 10
}
```

**Respuesta esperada:**
```json
{
  "id": 1,
  "nombre": "Laptop",
  "descripcion": "Laptop HP 15 pulgadas",
  "precio": 899.99,
  "stock": 10
}
```

---

### 4. Actualizar producto
```
PUT http://localhost:3000/api/products/1
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "nombre": "Laptop Actualizada",
  "descripcion": "Laptop HP 15 pulgadas - Modelo 2024",
  "precio": 999.99,
  "stock": 15
}
```

**Respuesta esperada:**
```json
{
  "id": 1,
  "nombre": "Laptop Actualizada",
  "descripcion": "Laptop HP 15 pulgadas - Modelo 2024",
  "precio": 999.99,
  "stock": 15
}
```

---

### 5. Eliminar producto
```
DELETE http://localhost:3000/api/products/1
```

**Respuesta esperada:**
```json
{
  "id": 1,
  "nombre": "Laptop",
  "descripcion": "Laptop HP 15 pulgadas",
  "precio": 899.99,
  "stock": 10
}
```

---

## 🟡 ORDER SERVICE (Puerto 3002)
Base URL: `http://localhost:3002/api/ordenes`

### 1. Obtener todas las órdenes
```
GET http://localhost:3002/api/ordenes
```

**Respuesta esperada:**
```json
[
  {
    "id_order": 1,
    "id_usuario": 1,
    "total": 1899.98,
    "estado": "CREADA",
    "fecha_pedido": "2024-01-15T10:30:00.000Z"
  }
]
```

---

### 2. Obtener orden por ID
```
GET http://localhost:3002/api/ordenes/1
```

**Respuesta esperada:**
```json
{
  "id_order": 1,
  "id_usuario": 1,
  "total": 1899.98,
  "estado": "CREADA",
  "fecha_pedido": "2024-01-15T10:30:00.000Z"
}
```

---

### 3. Crear nueva orden (IMPORTANTE: Requiere usuario y productos existentes)
```
POST http://localhost:3002/api/ordenes
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "id_usuario": 1,
  "productos": [
    {
      "id_producto": 1,
      "cantidad": 2,
      "precio_unitario": 899.99
    },
    {
      "id_producto": 2,
      "cantidad": 1,
      "precio_unitario": 499.99
    }
  ]
}
```

**Nota:** 
- `id_usuario` debe existir en el servicio de usuarios
- `id_producto` debe existir en el servicio de productos
- El total se calcula automáticamente

**Respuesta esperada:**
```json
{
  "id_order": 1,
  "id_usuario": 1,
  "total": 0,
  "estado": "CREADA",
  "fecha_pedido": "2024-01-15T10:30:00.000Z"
}
```

---

### 4. Actualizar orden
```
PUT http://localhost:3002/api/ordenes/1
Content-Type: application/json
```

**Body (JSON) - Puedes actualizar uno o varios campos:**
```json
{
  "id_usuario": 2,
  "estado": "EN_PROCESO",
  "total": 2000.00
}
```

**O solo el estado:**
```json
{
  "estado": "COMPLETADA"
}
```

**Respuesta esperada:**
```json
{
  "id_order": 1,
  "id_usuario": 2,
  "total": 2000.00,
  "estado": "COMPLETADA",
  "fecha_pedido": "2024-01-15T10:30:00.000Z"
}
```

---

### 5. Eliminar orden
```
DELETE http://localhost:3002/api/ordenes/1
```

**Respuesta esperada:**
```json
{
  "id_order": 1,
  "id_usuario": 1,
  "total": 1899.98,
  "estado": "CREADA",
  "fecha_pedido": "2024-01-15T10:30:00.000Z"
}
```

---

## 📋 Orden de Pruebas Recomendado

### Paso 1: Crear un usuario
```
POST http://localhost:3001/api/users
Body: {
  "cedula": "1234567890",
  "nombre": "Juan Pérez",
  "correo": "juan@example.com",
  "telefono": "0987654321"
}
```
**Guarda el `id_usuario` de la respuesta**

### Paso 2: Crear productos
```
POST http://localhost:3000/api/products
Body: {
  "nombre": "Laptop",
  "descripcion": "Laptop HP 15 pulgadas",
  "precio": 899.99,
  "stock": 10
}
```
**Guarda el `id` del producto de la respuesta**

Repite para crear más productos si lo deseas.

### Paso 3: Crear una orden
```
POST http://localhost:3002/api/ordenes
Body: {
  "id_usuario": 1,  // Usa el id_usuario del Paso 1
  "productos": [
    {
      "id_producto": 1,  // Usa el id del producto del Paso 2
      "cantidad": 2,
      "precio_unitario": 899.99  // Debe coincidir con el precio del producto
    }
  ]
}
```

---

## ⚠️ Errores Comunes y Soluciones

### Error: "El usuario no existe"
- **Causa:** El `id_usuario` no existe en la base de datos de usuarios
- **Solución:** Primero crea el usuario usando el User Service

### Error: "El producto no existe"
- **Causa:** El `id_producto` no existe en la base de datos de productos
- **Solución:** Primero crea el producto usando el Product Service

### Error: "No se puede conectar con el servicio de usuarios"
- **Causa:** El servicio de usuarios no está ejecutándose
- **Solución:** Asegúrate de que el servicio esté corriendo en el puerto 3001

### Error: "No se puede conectar con el servicio de productos"
- **Causa:** El servicio de productos no está ejecutándose
- **Solución:** Asegúrate de que el servicio esté corriendo en el puerto 3000

---

## 🔧 Configuración de Postman

### Headers necesarios para POST y PUT:
```
Content-Type: application/json
```

### Variables de entorno (opcional):
Puedes crear variables en Postman:
- `base_url_users`: `http://localhost:3001`
- `base_url_products`: `http://localhost:3000`
- `base_url_orders`: `http://localhost:3002`

Y usar: `{{base_url_orders}}/api/ordenes`

