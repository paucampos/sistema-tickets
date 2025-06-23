const { Builder, By, until } = require("selenium-webdriver");
const fs = require("fs");
const path = require("path");
const { reportarResultado } = require("./testrail/testrail-client");

const dir = path.join(__dirname, "capturas");
const CASE_ID = 2243; // ID del test run activo

async function testAsignarSolicitud() {
  let driver = await new Builder().forBrowser("chrome").build();
  let status = 1; // 1 = Passed, 5 = Failed
  let comentario = "Asigna solicitud exitosamente.";

  try {
    // Abrir login
    await driver.get("http://localhost:4200/login");

    // Esperar que se cargue el dropdown
    const dropdown = await driver.wait(
      until.elementLocated(By.css("select")),
      5000
    );

    // Seleccionar un usuario (por texto visible)
    const options = await dropdown.findElements(By.css("option"));
    for (let option of options) {
      const text = await option.getText();
      if (text.includes("Roberto Marquez Jara")) {
        await option.click();
        break;
      }
    }

    // Click en botón "Entrar"
    await driver.findElement(By.css("button")).click();

    // Esperar redirección
    await driver.wait(until.urlContains("/inicio"), 5000);

    // Click en "Tickets" del header
    await driver.findElement(By.css("#tickets")).click();

    // Esperar que la tabla con tickets cargue
    await driver.wait(until.elementLocated(By.css("table")), 5000);

    // Selecciona Asignar en algun ticket
    const asignar = await driver.findElement(
      By.xpath("//a[contains(text(), 'Asignar')]")
    );
    await asignar.click();

    // Esperar dropdown de trabajadores
    const select = await driver.wait(
      until.elementLocated(By.css("select.form-select")),
      5000
    );
    await select.click();

    // Elegir la segunda opción (primera válida después de "-- Selecciona...")
    const opciones = await driver.findElements(
      By.css("select.form-select option")
    );
    if (opciones.length < 2)
      throw new Error("No hay trabajadores disponibles");
    await opciones[1].click(); // selecciona el primero disponible

    // Paso 5: Click en "Asignar"
    const botonAsignar = await driver.findElement(
      By.xpath("//button[contains(text(),'Asignar')]")
    );
    await botonAsignar.click();

    // Paso 6: Esperar modal
    await driver.wait(until.elementLocated(By.id("modalConfirmacion")), 5000);
    const modalTitulo = await driver
      .findElement(By.id("modalConfirmacionLabel"))
      .getText();
    const modalTexto = await driver
      .findElement(By.css(".modal-body"))
      .getText();

    // Verificación
    if (modalTitulo !== 'Listo' || !modalTexto.includes('Asignación realizada')) {
      throw new Error('❌ Modal de confirmación incorrecto');
    }

    // Tomar captura
    await driver.takeScreenshot().then((image) => {
      fs.writeFileSync(
        path.join(dir, "asignar_solicitud.png"),
        image,
        "base64"
      );
    });
  } catch (err) {
    status = 5;
    console.error("❌ Error durante la prueba:", err);
  } finally {
    await driver.quit();
    const rutaCaptura = dir + "/asignar_solicitud.png";
    await reportarResultado(CASE_ID, status, comentario, rutaCaptura);
  }
}

module.exports = { testAsignarSolicitud };
