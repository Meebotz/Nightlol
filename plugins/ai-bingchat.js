/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import fetch from 'node-fetch';
const handler = async (m, {
	conn,
	args,
	usedPrefix,
	command
}) => {
	let text;
	if (args.length >= 1) {
		text = args.slice(0).join(" ");
	} else if (m.quoted && m.quoted.text) {
		text = m.quoted.text;
	} else {
		throw 'Input teks atau reply teks!';
	}

	await conn.reply(m.chat, wait, m);
	try {
		const data = await ChatGptBing(text)
      await m.reply(data)
	} catch (error) {
		console.error(`Error in handler: ${error.message}`);
		await m.reply('An error occurred while processing the request.');
	}
};

handler.help = ["bingchat *[query]*"];
handler.tags = ["ai"];
handler.command = /^(bingc(hat)?)$/i;
handler.register = true
handler.premium = true
export default handler;

async function ChatGptBing(prompt) {
    let response = await (await fetch("https://copilot.github1s.tk/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "dummy",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "Creative",
            "max_tokens": 100,
            "messages": [{
                    "role": "system",
                    "content": "Anda adalah asisten yang membantu. Buat siapa saja yang bertanya anda jawab dengan detail"
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        })
    })).json()
    return response.choices[0].message.content
}