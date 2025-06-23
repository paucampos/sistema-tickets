const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');
const { reportarResultado } = require('./testrail/testrail-client');

// Ruta absoluta a /selenium-tests/capturas
const dir = path.join(__dirname, 'capturas');
const CASE_ID = 2239; // ID del test run activo

async function testVerDetalleSolicitud() {
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
    await driver.wait(until.elementLocated(By.css('table')), 5000);

    const link = await driver.findElement(By.xpath("//a[contains(text(), '100001')]"));
    await link.click();

    // Esperar que la card cargue
    const cardDetalle = await driver.wait(until.elementLocated(By.css('#card-detalle')), 5000);

    if (cardDetalle) {
      console.log('✅ Prueba exitosa: se desplegó detalle ticket');
    } else {
      status = 5;
      console.log('❌ No se encontro detalle ticket');
    }

    // Tomar captura
    await driver.takeScreenshot().then(image => {
      fs.writeFileSync(path.join(dir, 'detalle_solicitud.png'), image, 'base64');
    });


  } catch (err) {
    status = 5;
    console.error('❌ Error durante la prueba:', err);
  } finally {
    await driver.quit();
    const rutaCaptura = dir + '/detalle_solicitud.png';
    await reportarResultado(CASE_ID, status, comentario, rutaCaptura);
  }
};

module.exports = { testVerDetalleSolicitud };
