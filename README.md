# DexxosMarket

...

Usuario
* UserID (Primary Key)
* Nombre
* Apellido 1
* Apellido 2
* Género
* Correo
* Contraseña

Producto
* ProductID (Primary Key)
* IDImagen
* Nombre
* Precio
* Código

Orden
* OrderID (Primary Key)
* UserID (Foreign Key)
* CódigoBar
* PrecioTotal
* PrecioEnvío

OrderDetails
* ProductID (Primary Key)
* OrderID (Primary Key)

Carrito
* CartItemID
* UserID
* ProductID
* Quantity

ImagenProducto
* ImageID
* ProductID
* ImageURL





