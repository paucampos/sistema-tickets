// testrail-client.js
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

const TESTRAIL_DOMAIN = 'https://grupouniacctest.testrail.io';
const USER = 'paula.camposc@uniacc.edu';
const PASSWORD = 'Testrail2025%';
const RUN_ID = 19; // ID del test run activo

/**
 * Reporta el resultado de un caso y adjunta la captura.
 * @param {number} caseId ID del caso en TestRail
 * @param {number} statusId 1=Passed, 5=Failed
 * @param {string} comment Comentario del resultado
 * @param {string} [screenshotPath] Ruta local al archivo PNG
 */
async function reportarResultado(caseId, statusId, comment = '', screenshotPath) {
  try {
    // Paso 1: Reportar resultado
    const resultado = await axios.post(
      `${TESTRAIL_DOMAIN}/index.php?/api/v2/add_result_for_case/${RUN_ID}/${caseId}`,
      {
        status_id: statusId,
        comment: comment
      },
      {
        auth: {
          username: USER,
          password: PASSWORD
        }
      }
    );

    const resultId = resultado.data.id;
    console.log(`✅ Resultado reportado. ID del resultado: ${resultId}`);

    // Paso 2: Adjuntar screenshot si se especifica
    if (screenshotPath && fs.existsSync(screenshotPath)) {
      const form = new FormData();
      form.append('attachment', fs.createReadStream(screenshotPath));

      await axios.post(
        `${TESTRAIL_DOMAIN}/index.php?/api/v2/add_attachment_to_result/${resultId}`,
        form,
        {
          auth: {
            username: USER,
            password: PASSWORD
          },
          headers: form.getHeaders()
        }
      );

      console.log(`Captura adjuntada: ${path.basename(screenshotPath)}`);
    }
  } catch (error) {
    console.error('❌ Error al reportar resultado:', error.response?.data || error.message);
  }
}

module.exports = { reportarResultado };
