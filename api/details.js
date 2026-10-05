// POST (or GET) /api/details?code=XXXX
// Verifies the guest code against the GUEST_CODE environment variable
// (set in the Vercel dashboard — never committed to the repo) and only
// returns the venue + program when it matches.

const DETAILS = {
  venue: {
    name: { en: 'Wat Ku Yang', th: 'วัดคูยาง', id: 'Wat Ku Yang' },
    addr: {
      en: '51 Ratchadamnoen 1 Soi 2, Nai Mueang, Mueang Kamphaeng Phet, Kamphaeng Phet 62000, Thailand',
      th: '51 ราชดำเนิน 1 ซอย 2 ตำบลในเมือง อำเภอเมืองกำแพงเพชร จังหวัดกำแพงเพชร 62000',
      id: '51 Ratchadamnoen 1 Soi 2, Nai Mueang, Mueang Kamphaeng Phet, Kamphaeng Phet 62000, Thailand',
    },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Wat+Ku+Yang+Kamphaeng+Phet',
  },
  program: [
    { time: '09:00', en: 'Ceremony', th: 'พิธีมงคลสมรส', id: 'Pemberkatan' },
    { time: '10:30', en: 'Photos & toasts', th: 'ถ่ายรูปและอวยพร', id: 'Foto & toast' },
    { time: '12:00', en: 'Lunch reception', th: 'งานเลี้ยงมื้อกลางวัน', id: 'Resepsi makan siang' },
    { time: '14:00', en: 'Farewell', th: 'อำลา', id: 'Penutupan' },
  ],
};

module.exports = async function handler(req, res) {
  const code = String(
    (req.body && req.body.code) || req.query.code || ''
  ).trim().toLowerCase();
  const expected = (process.env.GUEST_CODE || '').trim().toLowerCase();

  // Small delay to blunt brute-force guessing
  await new Promise(r => setTimeout(r, 400));

  if (!expected || code !== expected) {
    return res.status(401).json({ ok: false });
  }

  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ ok: true, ...DETAILS });
};
