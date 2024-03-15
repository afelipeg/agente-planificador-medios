function sendPrompt() {
    const userInput = document.getElementById('user-input').value;
    const chatOutput = document.querySelector('.chat-output');

    // Aquí debes hacer una llamada a la API de generación de lenguaje
    // y obtener la respuesta generada en base al prompt del usuario.
    // Por ahora, mostraremos una respuesta de ejemplo.
    const generatedResponse = 'Aquí se mostrará la respuesta generada por el modelo de lenguaje.';

    // Agregar el prompt del usuario y la respuesta generada al chat
    chatOutput.innerHTML += `<p><strong>Usuario:</strong> ${userInput}</p>`;
    chatOutput.innerHTML += `<p><strong>Agente:</strong> ${generatedResponse}</p>`;

    // Limpiar el campo de entrada
    document.getElementById('user-input').value = '';
}
