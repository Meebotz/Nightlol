/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

let handler = m => m
handler.before = async function (m, { conn, isOwner }) {
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/(REPORT|REQUEST|KONFIR|KONFIRM)!/i.test(m.quoted.text)) return !0
    if (!isOwner) throw false
    conn.reply(m.quoted.mentionedJid[0], '*Owner:* ' + m.text, m)
    conn.reply(m.key.remoteJid, '*Pesan dari owner:* ' + m.text, m)
}
export default handler