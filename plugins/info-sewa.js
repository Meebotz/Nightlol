let handler = async (m, {
    conn,
    text,
    args,
    command,
    usedPrefix 
}) => {
const list = `⋄ Sewa Meebotz ⋄

[ 1 ] 3k / Minggu 
[ 2 ] 10k / bulan 
[ 3 ]  20k / 2bulan
[ 4 ]  25k /2 bulan + premium (30 hari)

 Via Dana: 083179789056
 Qris: not yet available 
 
 Owner: wa.me/6283179789056
  
 *Note*: chat owner untuk sewa Bot
                   Bot selalu Ter Up To Date

 anda membeli = setuju 😃
`

conn.sendFile(m.chat, 'https://telegra.ph/file/cf1c9bce36f1890e1d458.jpg', '', list, m)
}
handler.help = handler.command = ['sewa','sewabot']
handler.tags = ['main']
export default handler