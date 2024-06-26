exports.run = {
  usage: ['cekkhodam'],
  hidden: ['checkkkhodam', 'cekhodam', 'checkhodam'],
  use: '<nama>',
  category: 'user info',
  async: async (m, {
    client,
    args,
    text,
    isPrefix,
    command,
    env,
    Func
  }) => {
    // Memeriksa apakah teks kosong
    if (!text) return m.reply("ketik nama sayang");

    // Fungsi untuk memilih secara acak dari array
    const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // Daftar khodam
    const khodam = pickRandom([
      "Kaleng Cat Avian",
      "Pipa Rucika",
      "Botol Tupperware",
      "Badut Mixue",
      "Sabun GIV",
      "Sandal Swallow",
      "Jarjit",
      "Ijat",
      "Fizi",
      "Mail",
      "Ehsan",
      "Upin",
      "Ipin",
      "sungut lele",
      "Tok Dalang",
      "Opah",
      "Opet",
      "Alul",
      "Pak Vinsen",
      "Maman Resing",
      "Pak RT",
      "Admin ETI",
      "Bung Towel",
      "Lumpia Basah",
      "Martabak Manis",
      "Baso Tahu",
      "Tahu Gejrot",
      "Dimsum",
      "Seblak Ceker",
      "Telor Gulung",
      "Tahu Aci",
      "Tempe Mendoan",
      "Nasi Kucing",
      "Kue Cubit",
      "Tahu Sumedang",
      "Nasi Uduk",
      "Wedang Ronde",
      "Kerupuk Udang",
      "Cilok",
      "Cilung",
      "Kue Sus",
      "Jasuke",
      "Seblak Makaroni",
      "Sate Padang",
      "Sayur Asem",
      "Kromboloni",
      "Marmut Pink",
      "Belalang Mullet",
      "Kucing Oren",
      "Lintah Terbang",
      "Singa Paddle Pop",
      "Macan Cisewu",
      "Vario Mber",
      "Beat Mber",
      "Supra Geter",
      "Oli Samping",
      "Knalpot Racing",
      "Jus Stroberi",
      "Jus Alpukat",
      "Alpukat Kocok",
      "Es Kopyor",
      "Es Jeruk",
      "Cappucino Cincau",
      "Jasjus Melon",
      "Teajus Apel",
      "Pop ice Mangga",
      "Teajus Gulabatu",
      "Air Selokan",
      "Air Kobokan",
      "TV Tabung",
      "Keran Air",
      "Tutup Panci",
      "Kotak Amal",
      "Tutup Termos",
      "Tutup Botol",
      "Kresek Item",
      "Kepala Casan",
      "Ban Serep",
      "Kursi Lipat",
      "Kursi Goyang",
      "Kulit Pisang",
      "Warung Madura",
      "Gorong-gorong",
    ]);

    // Membuat respon
    const response = `
╭━━━━°「 *Cekkodam* 」°
┃
┊• *Nama :* ${text}
┃• *Khodam :* ${khodam}
╰═┅═━––––––๑
    `;

    // Mengirim respon
    m.reply(response);
  },
  error: false,
  cache: true,
  limit: true,
  location: __filename
}