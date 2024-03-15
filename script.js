async function sendPrompt() {
    const userInput = document.getElementById('user-input').value;
    const userEmail = document.getElementById('user-email').value;
    const chatOutput = document.querySelector('.chat-output');

    // Validar el correo electrónico del usuario
    if (!isValidEmail(userEmail)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }

    try {
        const response = await axios.post('https://api.anthropic.com/v1/complete', {
            model: '1dad118c-e0a4-4ac6-8bc0-71e369b4e238',
            prompt: userInput,
            max_tokens_to_sample: 100,
            stop_sequences: ['\n'],
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': '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',
            },
        });

        const generatedResponse = response.data.completion;

        // Agregar el prompt del usuario y la respuesta generada al chat
        chatOutput.innerHTML += `<p><strong>Usuario:</strong> ${userInput}</p>`;
        chatOutput.innerHTML += `<p><strong>Agente:</strong> ${generatedResponse}</p>`;

        // Generar y descargar el archivo Excel
        const excelFile = generateExcelFile(userInput, generatedResponse);
        downloadFile(excelFile, 'plan.xlsx');

        // Enviar el plan generado por correo electrónico al usuario
        await sendPlanByEmail(userEmail, generatedResponse);

        // Limpiar los campos de entrada
        document.getElementById('user-input').value = '';
        document.getElementById('user-email').value = '';
    } catch (error) {
        console.error('Error al generar el plan:', error);
        alert('Ocurrió un error al generar el plan. Por favor, inténtalo de nuevo.');
    }
}

function isValidEmail(email) {
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function generateExcelFile(userInput, generatedResponse) {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([
        ['Usuario', 'Agente'],
        [userInput, generatedResponse],
    ]);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Plan');
    const excelFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    return excelFile;
}

function downloadFile(data, filename) {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
}

async function sendPlanByEmail(email, plan) {
    const transporter = nodemailer.createTransport({
        // Configura los detalles del servicio de correo electrónico
        // Por ejemplo, para Gmail:
        service: 'gmail',
        auth: {
            user: 'afelipeg@gmail.com',
            pass: '4ndr35gu1',
        },
    });

    const mailOptions = {
        from: 'TU_CORREO_ELECTRONICO',
        to: email,
        subject: 'Plan generado por el Agente Planificador de Medios Digitales',
        text: `Adjunto encontrarás el plan generado:\n\n${plan}`,
        attachments: [
            {
                filename: 'plan.xlsx',
                content: generateExcelFile(plan),
            },
        ],
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo electrónico enviado correctamente.');
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
    }
}
