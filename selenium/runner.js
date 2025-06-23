// selenium-tests/runner.js
const { testVerDetalleSolicitud } = require('./ver-detalle-solicitud');
const { testAsignarSolicitud } = require('./asignar-solicitud');
const { testVerDetalleSolicitudMsg } = require('./ver-detalle-solicitud-msg');
const { testVerSolicitudes } = require('./ver-solicitudes');
// const { testAsignarTicket } = require('./test-asignar-ticket');
// const { testCerrarTicket } = require('./test-cerrar-ticket');

(async () => {
  await testVerDetalleSolicitud();
  await testVerDetalleSolicitudMsg();
  await testAsignarSolicitud();
  await testVerSolicitudes();
  // await testCerrarTicket();
  console.log('✅ Todas las pruebas ejecutadas correctamente');
})();
