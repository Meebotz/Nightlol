/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import axios from 'axios'
let timeout = 120000
let poin = 4999
let handler = async (m, { conn, command, usedPrefix }) => {
    conn.tebakchara = conn.tebakchara ? conn.tebakchara : {}
    let id = m.chat
    if (id in conn.tebakchara) {
        conn.reply(m.chat, 'Masih Ada Soal Yang Blum Terjawab', m, conn.tebakchara[id][0])
        throw false
    }
    let res = await axios.get('https://api.jikan.moe/v4/characters')
    let jsons = await res.data.data
  
    let json = jsons.getRandom()
    let caption = `*${command.toUpperCase()}*
Siapakah Nama Dari Foto Diatas?

Waktu *${(timeout / 1000).toFixed(2)} Detik*
Ketik ${usedPrefix}hcha Untuk Bantuan
Bonus: ${poin} XP
    `.trim()
    conn.tebakchara[id] = [
        await conn.sendFile(m.chat, `${json.images.jpg.image_url}`, 'anuu.jpg', caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakchara[id]) conn.sendFile(m.chat, json.images.jpg.image_url, '', `Waktu Habis!\nJawabannya Adalah *${json.name}*\nKanji : ${json.name_kanji}\n*Url :* ${json.url}\n*Desk :* ${json.about}`, conn.tebakchara[id][0])
            delete conn.tebakchara[id]
        }, timeout)
    ]
}
handler.help = ['tebakchara']
handler.tags = ['game']
handler.command = /^tebakchara/i
handler.register = true

export default handler

const buttons = [
    ['Bantuan', '/hcha'],
    ['Nyerah', 'menyerah']
]