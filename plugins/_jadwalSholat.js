import axios from 'axios';
import Jimp from 'jimp';
import fs from 'fs';

export async function before(m, {
    conn,
    participants
}) {
    conn.autosholat = conn.autosholat ? conn.autosholat : {};
    conn.adz = conn.adz ? conn.adz : {};

    let lokasi = 'Bandung';

    let id = m.chat;
    if (id in conn.adz) {
    return false
    }
    
    if (!conn.autosholat[id]) {
        let jdwl = await jadwalsholat(lokasi);
        conn.autosholat[id] = {
            send: false,
            jdwl
        }
    } else if (!fs.existsSync('./src/jdw.png')) {
        let jdw = await jadwalsholat(lokasi);

        await image(jdw.shubuh, jdw.dhuhur, jdw.ashar, jdw.maghrib, jdw.isya, lokasi);

    } else {

        // ubah di sini sesuai nama kota kamu
        let result = conn.autosholat[id].jdwl

        const date = new Date(new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Jakarta'
        }));
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const timeNow = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        for (const [sholat, waktu] of Object.entries(result)) {
            if (timeNow === waktu) {
                  conn.adz[id] = [
                            
                    conn.sendMessage(m.chat, {
                        audio: {
                            url: 'https://media.vocaroo.com/mp3/1ofLT2YUJAjQ'
                        },
                        mimetype: 'audio/mp4',
                        ptt: true,
                        contextInfo: {
                            externalAdReply: {
                                showAdAttribution: true,
                                mediaType: 1,
                                mediaUrl: '',
                                title: `Selamat menunaikan Ibadah Sholat ${sholat}`,
                                body: `🕑 ${waktu}`,
                                sourceUrl: '',
                                thumbnail: await fs.readFileSync('./src/jdw.png'),
                                renderLargerThumbnail: true
                            }
                        }
                    }, {
                        quoted: m,
                        mentions: participants.map(a => a.id)
                    }),
                setTimeout(() => {
                 delete conn.autosholat[id];
                 delete conn.adz[id]
                }, 60000),
                fs.unlinkSync('./src/jdw.png')
                ]
            }
        }
    }
}

export const disabled = false;

async function jadwalsholat(kota) {
    try {
        const {
            data
        } = await axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${kota}&country=Indonesia&method=8`);

        const result = {
            shubuh: data.data.timings.Fajr,
            dhuhur: data.data.timings.Dhuhr,
            ashar: data.data.timings.Asr,
            maghrib: data.data.timings.Maghrib,
            isya: data.data.timings.Isha
        };
        return result;
    } catch (e) {
        return 'eror 404';
    }
}

async function image(sh, dh, as, ma, is, lok) {
    // Reading image
    const image = await Jimp.read('https://telegra.ph/file/8e791e4a13e80881584dc.jpg');
    // Defining the text font
    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
    const wil = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
    // subuh
    image.print(font, 550, 223, sh);
    // dhuhur
    image.print(font, 550, 321, dh);
    // ashar
    image.print(font, 550, 392, as);
    // Maghrib
    image.print(font, 550, 481, ma);
    // isya
    image.print(font, 550, 571, is);

    // wilayah
    image.print(wil, 870, 391, lok);
    // Writing image after processing
    await image.writeAsync('./src/jdw.png');
}