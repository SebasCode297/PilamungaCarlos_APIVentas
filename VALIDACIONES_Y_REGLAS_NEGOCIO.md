# Validaciones y Reglas de Negocio Implementadas

## 📋 USER SERVICE (user_service)

### ✅ 5 VALIDACIONES IMPLEMENTADAS:

1. **Validar formato de cédula**: Solo números, entre 10 y 13 dígitos
2. **Validar formato de correo electrónico**: Formato válido de email
3. **Validar que el nombre no esté vacío**: No puede ser solo espacios
4. **Validar longitud del teléfono**: Exactamente 10 dígitos
5. **Validar que el teléfono contenga solo números**: No permite caracteres especiales

### 🎯 5 REGLAS DE NEGOCIO IMPLEMENTADAS:

1. **Nombre mínimo de 2 caracteres**: El nombre debe tener al menos 2 caracteres
2. **Nombre máximo de 100 caracteres**: El nombre no puede exceder 100 caracteres
3. **Cédula única**: No puede haber dos usuarios con la misma cédula
4. **Correo único**: No puede haber dos usuarios con el mismo correo
5. **No eliminar usuarios con órdenes**: No se puede eliminar un usuario que tenga órdenes asociadas

---

## 📦 PRODUCT SERVICE (client)

### ✅ 5 VALIDACIONES IMPLEMENTADAS:

1. **Validar que el nombre no esté vacío**: No puede ser solo espacios
2. **Validar longitud del nombre**: Máximo 100 caracteres
3. **Validar longitud de la descripción**: Máximo 500 caracteres
4. **Validar formato del precio**: Máximo 2 decimales
5. **Validar que el stock sea un número entero**: No acepta decimales

### 🎯 5 REGLAS DE NEGOCIO IMPLEMENTADAS:

1. **Precio máximo**: No puede exceder 999,999.99
2. **Stock máximo**: No puede exceder 10,000 unidades
3. **Nombre único**: No puede haber dos productos con el mismo nombre (case-insensitive)
4. **No eliminar productos en órdenes**: No se puede eliminar un producto que esté en órdenes
5. **No precio en 0 con stock**: No se puede establecer precio en 0 cuando hay stock disponible

---

## 🛒 ORDER SERVICE (order_service)

### ✅ 5 VALIDACIONES IMPLEMENTADAS:

1. **Validar cantidad positiva**: La cantidad debe ser un número entero positivo
2. **Validar precio_unitario positivo**: El precio debe ser un número positivo
3. **Validar máximo de productos por orden**: No más de 20 productos por orden
4. **Validar cantidad máxima por producto**: No más de 100 unidades por producto
5. **Validar formato de estado**: Solo estados permitidos (CREADA, EN_PROCESO, COMPLETADA, CANCELADA)

### 🎯 5 REGLAS DE NEGOCIO IMPLEMENTADAS:

1. **No modificar órdenes completadas**: No se puede modificar una orden con estado COMPLETADA
2. **No eliminar órdenes completadas**: No se puede eliminar una orden completada
3. **Validar stock disponible**: La cantidad no puede exceder el stock disponible del producto
4. **No productos duplicados**: No se pueden agregar productos duplicados en la misma orden
5. **Validar precio del producto**: El precio_unitario debe coincidir con el precio del producto (margen 0.01)

---

## 📝 DETALLES ADICIONALES

### Estados de Orden Permitidos:
- `CREADA`: Orden recién creada
- `EN_PROCESO`: Orden en proceso de preparación
- `COMPLETADA`: Orden completada y entregada
- `CANCELADA`: Orden cancelada

### Límites Configurados:
- **Máximo productos por orden**: 20
- **Máxima cantidad por producto**: 100 unidades
- **Precio máximo de producto**: 999,999.99
- **Stock máximo de producto**: 10,000 unidades
- **Longitud máxima nombre usuario**: 100 caracteres
- **Longitud máxima nombre producto**: 100 caracteres
- **Longitud máxima descripción producto**: 500 caracteres

### Validaciones de Integridad:
- **Cédula**: Entre 10 y 13 dígitos, solo números
- **Teléfono**: Exactamente 10 dígitos, solo números
- **Correo**: Formato válido de email
- **Precio**: Máximo 2 decimales
- **Stock**: Número entero positivo

---

## 🔒 Protecciones Implementadas

### User Service:
- ✅ Previene duplicados de cédula y correo
- ✅ Valida formato de datos de entrada
- ✅ Protege integridad referencial (no elimina usuarios con órdenes)

### Product Service:
- ✅ Previene duplicados de nombres de productos
- ✅ Valida límites de precio y stock
- ✅ Protege integridad referencial (no elimina productos en órdenes)

### Order Service:
- ✅ Valida existencia de usuarios y productos
- ✅ Valida stock disponible antes de crear orden
- ✅ Previene modificaciones en órdenes completadas
- ✅ Valida precios y cantidades
- ✅ Previene productos duplicados en la misma orden

---

## ⚠️ Mensajes de Error Descriptivos

Todos los errores devuelven mensajes claros y descriptivos que ayudan a identificar el problema:

- **Validaciones**: Indican qué campo tiene el problema y qué se espera
- **Reglas de negocio**: Explican por qué no se puede realizar la operación
- **Integridad referencial**: Informan sobre dependencias que impiden la operación

---

## 🧪 Pruebas Recomendadas

### User Service:
1. Intentar crear usuario con cédula duplicada
2. Intentar crear usuario con correo inválido
3. Intentar crear usuario con teléfono de longitud incorrecta
4. Intentar eliminar usuario con órdenes asociadas
5. Intentar actualizar cédula a una existente

### Product Service:
1. Intentar crear producto con nombre duplicado
2. Intentar crear producto con precio mayor al máximo
3. Intentar crear producto con stock mayor al máximo
4. Intentar eliminar producto que está en órdenes
5. Intentar actualizar precio a 0 con stock disponible

### Order Service:
1. Intentar crear orden con más de 20 productos
2. Intentar crear orden con cantidad mayor al stock
3. Intentar agregar productos duplicados
4. Intentar modificar orden completada
5. Intentar eliminar orden completada

