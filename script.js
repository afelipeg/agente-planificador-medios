function sendPrompt() {
    const userInput = document.getElementById('user-input').value;
    const userEmail = document.getElementById('user-email').value;
    const chatOutput = document.querySelector('.chat-output');

    // Validar el correo electrónico del usuario
    if (!isValidEmail(userEmail)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }

    // Aquí debes hacer una llamada a la API de generación de lenguaje
    // y obtener la respuesta generada en base al prompt del usuario.
    // Por ahora, mostraremos una respuesta de ejemplo.
    const generatedResponse = 'Aquí se mostrará la respuesta generada por el modelo de lenguaje.';

    // Agregar el prompt del usuario y la respuesta generada al chat
    chatOutput.innerHTML += `<p><strong>Usuario:</strong> ${userInput}</p>`;
    chatOutput.innerHTML += `<p><strong>Agente:</strong> ${generatedResponse}</p>`;

    // Enviar el plan generado por correo electrónico al usuario
    sendPlanByEmail(userEmail, generatedResponse);

    // Configurar la descarga directa del archivo Excel
    downloadExcelFile(generatedResponse);

    // Limpiar los campos de entrada
    document.getElementById('user-input').value = '';
    document.getElementById('user-email').value = '';
}

function isValidEmail(email) {
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function sendPlanByEmail(email, plan) {
    // Aquí debes implementar la lógica para enviar el plan por correo electrónico al usuario
    // Puedes utilizar un servicio de correo electrónico o una API de envío de correos
    console.log(`Enviando el plan por correo electrónico a ${email}`);
    // ...
}

function downloadExcelFile(plan) {
    // Aquí debes implementar la lógica para generar y descargar el archivo Excel
    // Puedes utilizar una biblioteca como SheetJS para crear el archivo Excel
    console.log('Descargando el archivo Excel');
    // ...
}
