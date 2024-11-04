const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Substitua pelo seu token de bot
const token = '7348520195:AAGN8xkJXATY1OmyhLkGxu2Kv4z-lR5BtB0';

// ID do grupo onde as mensagens devem ser replicadas
const chatId = '-1002422442915';

// Cria uma instância do bot
const bot = new TelegramBot(token, { polling: true });

// Função para obter o conteúdo da página
async function fetchPageContent(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Erro ao acessar a página:', error);
        return null;
    }
}

// Monitora mensagens no grupo específico
bot.on('message', async (msg) => {
    const { chat, text } = msg;

    // Verifica se a mensagem é de um chat específico
    if (chat.id.toString() === chatId) {
        console.log(`Nova mensagem no chat ${chat.id}: ${text}`);

        // Acessa a página e aguarda resposta
        const pageContent = await fetchPageContent('https://sonhadorbrasil.free.nf/sonhador/automatico/uploads/gatomia.html');
        
        // Se o conteúdo da página for obtido, envie a mensagem para o grupo
        if (pageContent) {
            bot.sendMessage(chatId, `Mensagem recebida: ${text}\nConteúdo da página: ${pageContent}`);
        }
    }
});

// Exibe mensagem de inicialização
console.log('Bot está funcionando...');
