const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async message => {
    console.log(`Received message from ${message.from}: ${message.body}`);
    let chat = await message.getChat();
    let response;
    switch(message.body) {
        case 'Hi':
            response = 'Hello! This is Soprema WhatsApp Assistance. How can I assist you today?';
            break;
            case 'Hello':
            response = 'Hi! This is Soprema WhatsApp Assistance. How can I assist you today?';
            break;
        case 'About':
            response = 'Thank you for your interest in Soprema! We are a leading manufacturer of waterproofing and insulation solutions, committed to providing high-quality products and services to our customers. To learn more about our company and the products we offer, please visit our website at https://soprema.ae If you have any further questions, please dont hesitate to ask our chatbot by typing "know more" for more options.';
            break;
        case 'Options':
            response = {
                body: 'Select an option:\n1. Website\n2. Products\n3. About us\n4. Chat with an expert',
                options: [
                    { text: 'Website', value: '1' },
                    { text: 'Products', value: '2' },
                    { text: 'About us', value: '3' },
                    { text: 'Executive', value: '4' }

                ]
            };
            break;
        case 'Know more':
            response = 'Available options:\nProducts - Thank you for your message! To learn more about our products, please check out our website at https://soprema.ae/?s=\nChat with our executive - https://wa.me/+9710502241435';
            break;
        default:
            if (message.body === '1') {
                response = 'Check out our website at https://soprema.ae';
            } else {
                response = 'Sorry, I didnt quite understand your question. Please connect with our customer executive at https://wa.me/+9710502241435 for further assistance. Thank you!';
            }
            if (message.body === '2') {
                response = 'Check out our products on website at https://soprema.ae/?s=';
            } else {
                response = 'Sorry, I didnt quite understand your question. Please connect with our customer executive at https://wa.me/+9710502241435 for further assistance. Thank you!';
            }
            if (message.body === '3') {
                response = 'We are a leading manufacturer of waterproofing and insulation solutions, committed to providing high-quality products and services to our customers. To learn more about our company and the products we offer, please visit our website at https://soprema.ae If you have any further questions, please dont hesitate to ask our chatbot by typing "know more" for more options.';
            } else {
                response = 'Sorry, I didnt quite understand your question. Please connect with our customer executive at https://wa.me/+9710502241435 for further assistance. Thank you!';
            }
            if (message.body === '4') {
                response = 'Click the link below to chat with our customer executive\nhttps://wa.me/+971502241435';
            } else {
                response = 'Sorry, I didnt quite understand your question. Please connect with our customer executive at https://wa.me/+9710502241435 for further assistance. Thank you!';
            }
            if (message.body === 'Who are you?') {
                response = 'Hello! I am the Soprema company chatbot, designed to assist you with any questions you may have about our products and services. How may I assist you today?';
            } else {
                response = 'Sorry, I didnt quite understand your question. Please connect with our customer executive at https://wa.me/+9710502241435 for further assistance. Thank you!';
            }
            
    }
    chat.sendSeen();
    if (response.body && response.options) {
        await chat.sendMessage(response.body, { options: response.options });
    } else {
        await chat.sendMessage(response);
    }
});

client.initialize();

rl.on('line', async (input) => {
    if (input === 'exit') {
        client.destroy();
        process.exit();
    } else {
        const chat = await client.getChatById(input + '@c.us');
        if (!chat.isGroup) {
            let response = 'Hello! This is Soprema WhatsApp Assistance. How can I assist you today?';
            await chat.sendMessage(response);
        }
    }
});
