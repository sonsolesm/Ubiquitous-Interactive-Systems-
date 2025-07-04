# Explicación de como ejecutar las funcionalidades.

Nosotros hemos utilizado replit, para ejecutarlo lo haciamos desde el móvil. 
Para cualquier problema este es el link de nuestro replit: https://replit.com/@GONZALOGARCIA6/Compra2

## Funcionalidades base:
- **Añadir->** se realiza de forma ubicua escaneando el qr. En el apartado de escanear, cuando se abre la cámara lee un codigo qr de un producto que te dirige a la pagina de este producto. Hay dos qr generados en la carpeta de imagenes (media>img) con los que se puede probar. Además, se podrán encontrar los productos en la pestaña de productos, la cual está dividida en categorías. Solamente está implementada la categoría de frutas con sus productos.

- **Eliminar->** se realiza de forma ubicua deslizando en la pestaña Mi Lista. Si deslizas en un producto se eliminara de forma completa (al contrario que el botón de eliminar (-) que elimina uno a uno).
  
- **Marcar como Favorito->** se realiza de forma ubicua agitando el móvil.Esta se encuentra en la página del producto al que te dirige el qr.
  
- **Ordenar->** se realiza de forma ubicua manteniendo pulsado el producto y arrastrándolo en la pestaña de productos favoritos.
  
- **Pago->** si se presiona pago en efectivo, se mostrará una notificación para dirijirte a caja, y se le notificará al dependiente. Si se pulsa pago con tarjeta, se abrirá una notificación para que procedas al pago por NFC. Para probar el pago por NFC se puede utilizar cualquier tarjeta que contenga NFC (nosotros hemos utilizado el bono transporte). Al pagar el dispositivo vibra y se le manda una notificación al dependiente para confirmar el pago.

## Funcionalidades adicionales:
- **Búsqueda por voz ->** funciona con las palabras "pera", "platano" y "leche" y te muestra el pasillo en el que se encuentran estos productos.
  
- **Asistencia ->** para probarlo se necesitan dos ventanas (dependiente y cliente). Cuando el cliente pulsa el botón de asistencia, al cliente le aparece un popup de asistencia solicitada y al dependiente le aparecerá la solicitud con la ubicación del cliente, y un sonido de notificación.
Si el dependiente acepta la solicitud de asistencia, se le notifica al cliente de que el dependiente esta en camino con una vibración y un popup. Finalmente, el dependiente puede eliminar lo solicitud una vez completada.

Hemos implementado una interfaz de cliente con los elementos en grande, tanto letra como botones e imágenes, ya que nuestro prototipo se adaptaba a personas mayores. 