/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import fetch from "node-fetch"

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw "Input Teks"
    await m.reply(wait)

    try {
        let data = await generateImage(text)
        if (data && data.imgs.length > 0) {
            for (let i = 0; i < data.imgs.length; i++) {
                await conn.sendFile(m.chat, data.imgs[i], '', `Image *(${i + 1}/${data.imgs.length})*`, m, false, {
                    mentions: [m.sender]
                });
            }
        }
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["bing-img2"]
handler.tags = ["ai"];
handler.command = /^(bing-img2|bingimg2)$/i
handler.register = handler.limit = true
export default handler

/* New Line */
async function generateImage(prompt) {
    const data = {
        captionInput: prompt,
        captionModel: "default"
    };

    const url = 'https://chat-gpt.pictures/api/generateImage';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}