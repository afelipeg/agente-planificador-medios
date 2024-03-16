async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const chatOutput = document.querySelector('.chat-output');

    // Mostrar el mensaje del usuario en el chat
    chatOutput.innerHTML += `<div class="message user-message">${userInput}</div>`;

    try {
        const response = await fetch('https://api.anthropic.com/v1/complete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': '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',
            },
            body: JSON.stringify({
                model: 'Agente Planificador de Medios',
                prompt: userInput,
                max_tokens_to_sample: 1000,
                stop_sequences: ['\n'],
            }),
        });

        const data = await response.json();
        const botResponse = data.completion;

        // Mostrar la respuesta del bot en el chat
        chatOutput.innerHTML += `<div class="message agent-message">${botResponse}</div>`;

        // Limpiar el campo de entrada
        document.getElementById('user-input').value = '';
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
    }
}
