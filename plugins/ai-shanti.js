/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import fetch from "node-fetch"

const handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    const text = args.length >= 1 ? args.join(" ") : m.quoted?.text;
    if (!text) return m.reply("Input Teks");
    await m.reply(wait);

    try {
        const res = await ChatGpt(text, command === "gptshanti" ? "gpt" : "replicate");
        if (command === "gptshanti") await m.reply(res);
        if (command === "imgshanti") await conn.sendFile(m.chat, res, "", wm, m);
    } catch (e) {
        return m.reply(eror);
    }
};

handler.help = ["gptshanti", "imgshanti"];
handler.tags = ["ai"];
handler.command = /^(gptshanti|imgshanti)$/i;
handler.register = handler.limit = true
export default handler;

async function ChatGpt(query, type) {
    try {
        const response = await fetch(`https://shanti.quest/${type}?prompt=${query}`);
        if (!response.ok) throw new Error('Network response was not OK');
        return await response.text();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}