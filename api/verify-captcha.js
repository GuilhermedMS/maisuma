import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método não permitido' });
    }

    const { 'h-captcha-response': captchaResponse } = req.body;
    const secretKey = '27ae6ea8-7efa-4f42-8a7a-d28abbcc5db2'; // Insira sua chave secreta aqui
    const verificationURL = `https://hcaptcha.com/siteverify?secret=${secretKey}&response=${captchaResponse}`;

    try {
        const response = await fetch(verificationURL, { method: 'POST' });
        const data = await response.json();

        if (data.success) {
            return res.status(200).json({ message: 'Captcha verificado com sucesso!' });
        } else {
            return res.status(400).json({ message: 'Verificação do captcha falhou' });
        }
    } catch (error) {
        console.error('Erro ao verificar captcha:', error);
        return res.status(500).json({ message: 'Erro no servidor' });
    }
}
