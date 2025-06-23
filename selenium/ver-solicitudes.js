const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');
const { reportarResultado } = require('./testrail/testrail-client');

// Ruta absoluta a /selenium-tests/capturas
const dir = path.join(__dirname, 'capturas');

const RUN_ID = 0;
const CASE_ID = 0; // ID del test run activo

async function testVerSolicitudes() {
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
      if (text.includes('María López')) {
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
    await driver.wait(until.elementLocated(By.css('table')), 7000);

    const filas = await driver.findElements(By.css('table tbody tr'));

    if (filas.length > 0) {
      console.log('✅ Prueba exitosa: se encontraron tickets');
    } else {
      status = 5;
      console.log('❌ No se encontraron tickets');
    }

    // Tomar captura
    await driver.takeScreenshot().then(image => {
      fs.writeFileSync(path.join(dir, 'solicitudes.png'), image, 'base64');
    });


  } catch (err) {
    status = 5;
    console.error('❌ Error durante la prueba:', err);
  } finally {
    await driver.quit();
    const rutaCaptura = dir + '/solicitudes.png';
    //await reportarResultado(CASE_ID, status, comentario, rutaCaptura);
  }
};

module.exports = { testVerSolicitudes };
