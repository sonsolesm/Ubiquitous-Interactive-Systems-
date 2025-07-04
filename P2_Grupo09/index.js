// Importar las dependencias
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');

// Configurar Express
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Ruta para servir el archivo favoritos.json
app.get('/favoritos.json', (req, res) => {
    fs.readFile('favoritos.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo favoritos.json:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.json(JSON.parse(data));
    });
});
// Ruta para servir los archivos estáticos del cliente
app.use(express.static('public'));

// Manejar la conexión de un cliente
io.on('connection', (socket) => {
    console.log('Cliente conectado');

  // Manejar la adición de productos al carrito
  socket.on('agregarAlCarrito', (producto) => {
      console.log('Producto recibido:', producto);

      // Leer el archivo JSON de la lista de productos
      fs.readFile('lista.json', 'utf8', (err, data) => {
          if (err) {
              console.error('Error al leer el archivo lista.json:', err);
              return;
          }

          // Parsear el archivo JSON
          let lista = JSON.parse(data);

          // Verificar si el producto ya está en el carrito
          const index = lista.carrito.findIndex(item => item.id === producto.id);

          if (index !== -1) {
              // Si el producto ya está en el carrito, aumentar la cantidad
              lista.carrito[index].cantidad ++;
          } else {
              // Si el producto no está en el carrito, agregarlo con cantidad 1
              lista.carrito.push({ ...producto, cantidad: 1 });
          }

          // Escribir el archivo JSON actualizado
          fs.writeFile('lista.json', JSON.stringify(lista, null, 2), (err) => {
              if (err) {
                  console.error('Error al escribir el archivo lista.json:', err);
                  return;
              }
              console.log('Archivo lista.json actualizado');
          });
      });
    io.emit('listaActualizada');
  });

  // Manejar la adición de productos a favoritos
  socket.on('agregarAFavoritos', (producto) => {
      console.log('Producto favorito recibido:', producto);

      // Leer el archivo JSON de la lista de favoritos
      fs.readFile('favoritos.json', 'utf8', (err, data) => {
          if (err) {
              if (err.code === 'ENOENT') {
                  // Si el archivo no existe, inicializar favoritos como un array vacío
                  let favoritos = [];
                  // Agregar el producto a favoritos
                  favoritos.push(producto);
                  // Escribir el archivo JSON con el producto agregado
                  fs.writeFile('favoritos.json', JSON.stringify(favoritos, null, 2), (err) => {
                      if (err) {
                          console.error('Error al escribir el archivo favoritos.json:', err);
                          return;
                      }
                      console.log('Producto agregado a favoritos:', producto);
                  });
              } else {
                  console.error('Error al leer el archivo favoritos.json:', err);
                  return;
              }
          } else {
              // Parsear el archivo JSON y manejar los favoritos existentes
              let favoritos = JSON.parse(data);
              // Verificar si el producto ya está en favoritos
              const index = favoritos.findIndex(item => item.id === producto.id);
              if (index === -1) {
                  // Si el producto no está en favoritos, agregarlo
                  favoritos.push(producto);
                  // Escribir el archivo JSON actualizado
                  fs.writeFile('favoritos.json', JSON.stringify(favoritos, null, 2), (err) => {
                      if (err) {
                          console.error('Error al escribir el archivo favoritos.json:', err);
                          return;
                      }
                      console.log('Producto agregado a favoritos:', producto);
                  });
              } else {
                  console.log('El producto ya está en favoritos:', producto);
              }
          }
      });
  });
  // Manejar la eliminación de productos de favoritos
  socket.on('quitarDeFavoritos', (id) => {
      fs.readFile('favoritos.json', 'utf8', (err, data) => {
          if (err) {
              console.error('Error al leer el archivo favoritos.json:', err);
              return;
          }
          let favoritos = JSON.parse(data);
          const index = favoritos.findIndex(item => item.id === id);
          if (index !== -1) {
              favoritos.splice(index, 1);
              fs.writeFile('favoritos.json', JSON.stringify(favoritos, null, 2), (err) => {
                  if (err) {
                      console.error('Error al escribir el archivo favoritos.json:', err);
                      return;
                  }
                  console.log('Producto eliminado de favoritos:', id);
                  // Emitir evento para notificar la actualización de favoritos a todos los clientes
                  io.emit('favoritosActualizados', favoritos);
              });
          } else {
              console.log('El producto no está en favoritos:', id);
          }
      });
  });
  
  // Manejar la eliminación de productos del carrito
  socket.on('quitarDelCarrito', (producto) => {
      console.log('Producto a quitar:', producto);

      // Leer el archivo JSON de la lista de productos
      fs.readFile('lista.json', 'utf8', (err, data) => {
          if (err) {
              console.error('Error al leer el archivo lista.json:', err);
              return;
          }

          // Parsear el archivo JSON
          let lista = JSON.parse(data);

          // Verificar si el producto está en el carrito
          const index = lista.carrito.findIndex(item => item.id === producto.id);

          if (index !== -1) {
              // Si el producto está en el carrito, reducir la cantidad o eliminarlo si la cantidad es menor o igual a 0
              lista.carrito[index].cantidad -= producto.cantidad;
              if (lista.carrito[index].cantidad <= 0) {
                  lista.carrito.splice(index, 1);
              }
          }

          // Escribir el archivo JSON actualizado
          fs.writeFile('lista.json', JSON.stringify(lista, null, 2), (err) => {
              if (err) {
                  console.error('Error al escribir el archivo lista.json:', err);
                  return;
              }
              console.log('Archivo lista.json actualizado');
          });
      });
    io.emit('listaActualizada');
  });



    // Manejar la desconexión de un cliente
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    // Evento para recibir la solicitud de asistencia de un cliente
  socket.on('solicitarAsistencia', (ubicacion) => {
      fs.readFile('asistencia.json', (err, data) => {
          let asistencias = [];
          if (!err && data) {
              asistencias = JSON.parse(data);
          }
          // Add the new assistance request with a timestamp as its ID
          asistencias.push({ id: Date.now(), ubicacion: ubicacion }); 
          fs.writeFile('asistencia.json', JSON.stringify(asistencias, null, 2), (err) => {
              if (err) {
                  console.error('Error al guardar la solicitud de asistencia:', err);
              } else {
                  // Notify all clients about the new list of assistance requests
                  io.emit('asistenciaRequerida', asistencias);
              }
          });
      });
  });

  // Evento para eliminar una solicitud de asistencia
  socket.on('eliminarAsistencia', (idAsistencia) => {
      fs.readFile('asistencia.json', (err, data) => {
          if (err) {
              console.error('Error al leer asistencia.json:', err);
              return;
          }
          let asistencias = JSON.parse(data);
          const index = asistencias.findIndex(a => a.id === idAsistencia);
          if (index !== -1) {
              asistencias.splice(index, 1);
              fs.writeFile('asistencia.json', JSON.stringify(asistencias, null, 2), (err) => {
                  if (err) {
                      console.error('Error al eliminar la solicitud de asistencia:', err);
                  } else {
                      io.emit('asistenciaActualizada', asistencias);
                  }
              });
          }
      });
  });
  
    // Evento para recibir la confirmación del dependiente
    socket.on('asistenciaConfirmada', () => {
        // Notificar al cliente que el dependiente está en camino
        io.emit('dependienteEnCamino');
    });
  // Eventos para guardar pedidos
  socket.on('pagoConTarjeta', (carrito) => {
      guardarPedido(carrito, 'Tarjeta');
  });

  socket.on('pagoEnEfectivo', (carrito) => {
      guardarPedido(carrito, 'Efectivo');
  });

  socket.on('confirmarPedido', (idPedido) => {
      fs.readFile('pedidos.json', 'utf8', (err, data) => {
          if (err) {
              console.error('Error al leer pedidos:', err);
              return;
          }
          let pedidos = JSON.parse(data);
          const nuevosPedidos = pedidos.filter(pedido => pedido.id !== idPedido);

          fs.writeFile('pedidos.json', JSON.stringify(nuevosPedidos, null, 2), err => {
              if (err) {
                  console.error('Error al actualizar pedidos:', err);
                  return;
              }
              console.log('Pedido confirmado y eliminado:', idPedido);
              io.emit('actualizarPedidos', nuevosPedidos);
          });
      });
  });

  // Evento para solicitar la lista de pedidos
  socket.on('solicitarPedidos', () => {
      fs.readFile('pedidos.json', 'utf8', (err, data) => {
          if (err) {
              console.error('Error al leer pedidos:', err);
              return;
          }
          let pedidos = JSON.parse(data);
          socket.emit('actualizarPedidos', pedidos);
      });
  });

  socket.on('solicitarAsistencias', () => {
      fs.readFile('asistencia.json', 'utf8', (err, data) => {
          if (err) {
              console.error('Error reading asistencia.json:', err);
              socket.emit('errorAsistencias', 'Failed to load assistance requests');
              return;
          }
          try {
              const asistencias = JSON.parse(data);
              socket.emit('asistenciaRequerida', asistencias);
          } catch (parseErr) {
              console.error('Error parsing asistencia.json:', parseErr);
              socket.emit('errorAsistencias', 'Failed to parse assistance requests');
          }
      });
  });
  
});
// Ruta para obtener la lista de productos del carrito
app.get('/mi-lista', (req, res) => {
    // Leer el archivo lista.json
    fs.readFile('lista.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo lista.json:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        // Parsear el archivo JSON y enviar la lista de productos del carrito al cliente
        const lista = JSON.parse(data);
        res.json(lista.carrito);
    });
});


// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});


function guardarPedido(pedido, metodoPago) {
    const idPedido = Date.now(); // Usar timestamp como ID de pedido simple
    const detallePedido = {
        id: idPedido,
        productos: pedido,
        metodoPago: metodoPago
    };

    fs.readFile('pedidos.json', 'utf8', (err, data) => {
        let pedidos = [];
        if (!err && data) {
            pedidos = JSON.parse(data);
        }
        pedidos.push(detallePedido);

        fs.writeFile('pedidos.json', JSON.stringify(pedidos, null, 2), err => {
            if (err) {
                console.error('Error al guardar el pedido:', err);
            } else {
                console.log('Pedido guardado con éxito:', idPedido);
                io.emit('pedidoGuardado', detallePedido);
            }
        });
    });
}

// Monitor changes in asistencia.json
fs.watch('asistencia.json', (eventType, filename) => {
    if (eventType === 'change') {
        fs.readFile('asistencia.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Failed to read asistencia.json:', err);
                return;
            }
            try {
                const asistencias = JSON.parse(data);
                io.emit('asistenciaRequerida', asistencias);
            } catch (parseErr) {
                console.error('Error parsing asistencia.json:', parseErr);
            }
        });
    }
});

// Monitor changes in pedidos.json
fs.watch('pedidos.json', (eventType, filename) => {
    if (eventType === 'change') {
        fs.readFile('pedidos.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Failed to read pedidos.json:', err);
                return;
            }
            try {
                const pedidos = JSON.parse(data);
                io.emit('actualizarPedidos', pedidos);
            } catch (parseErr) {
                console.error('Error parsing pedidos.json:', parseErr);
            }
        });
    }
});
