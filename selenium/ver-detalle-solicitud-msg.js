const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');
const { reportarResultado } = require('./testrail/testrail-client');

// Ruta absoluta a /selenium-tests/capturas
const dir = path.join(__dirname, 'capturas');
const CASE_ID = 2240; // ID del test run activo

async function testVerDetalleSolicitudMsg() {
  let driver = await new Builder().forBrowser('chrome').build();
  let status = 1; // 1 = Passed, 5 = Failed
  let comentario = 'Prueba exitosa.';

  try {
    // Abrir login
    await driver.get('http://localhost:4200/login');

    // Esperar que se cargue el dropdown
    const dropdown = await driver.wait(until.elementLocated(By.css('select')), 5000);

    // Seleccionar un usuario (por texto visible)
    const options = await dropdown.findElements(By.css('option'));
    for (let option of options) {
      const text = await option.getText();
      if (text.includes('José Ramírez')) {
        await option.click();
        break;
      }
    }

    // Click en botón "Entrar"
    await driver.findElement(By.css('button')).click();

    // Esperar redirección
    await driver.wait(until.urlContains('/inicio'), 5000);

    // Click en "Tickets" del header
    await driver.findElement(By.css('#tickets')).click();

    // Esperar que la tabla cargue
    await driver.wait(until.elementLocated(By.css('table')), 5000);

    // Seleccionar un id de ticket (por texto visible)
    const link = await driver.findElement(By.xpath("//a[contains(text(), '100006')]"));
    await link.click();

    // Esperar que la card cargue
    const cardDetalle = await driver.wait(until.elementLocated(By.css('#msgError')), 5000);

    if (cardDetalle) {
      console.log('✅ Prueba exitosa: se desplegó mensaje de error');
    } else {
      status = 5;
      console.log('❌ No se desplegó ticket');
    }

    // Tomar captura
    await driver.takeScreenshot().then(image => {
      fs.writeFileSync(path.join(dir, 'detalle_solicitud_msg.png'), image, 'base64');
    });


  } catch (err) {
    status = 5;
    console.error('❌ Error durante la prueba:', err);
  } finally {
    await driver.quit();
    const rutaCaptura = dir + '/detalle_solicitud_msg.png';
    await reportarResultado(CASE_ID, status, comentario, rutaCaptura);
  }
};

module.exports = { testVerDetalleSolicitudMsg };
