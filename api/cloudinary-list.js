// /api/cloudinary-list.js
// Endpoint serverless per elencare video Cloudinary (compatibile con Vercel / Netlify)
// Richiede queste variabili d'ambiente su Vercel:
//   CLOUDINARY_CLOUD, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET

const fetch = globalThis.fetch || require('node-fetch');

module.exports = async (req, res) => {
  const CLOUD  = process.env.CLOUDINARY_CLOUD;
  const KEY    = process.env.CLOUDINARY_API_KEY;
  const SECRET = process.env.CLOUDINARY_API_SECRET;

  if (!CLOUD || !KEY || !SECRET) {
    return res.status(500).json({ error: 'Cloudinary non configurato (mancano env vars)' });
  }

  const url   = `https://api.cloudinary.com/v1_1/${CLOUD}/resources/video?max_results=100`;
  const basic = Buffer.from(`${KEY}:${SECRET}`).toString('base64');

  try {
    const r = await fetch(url, { headers: { Authorization: `Basic ${basic}` } });
    if (!r.ok) {
      const txt = await r.text();
      return res.status(r.status).json({ error: txt });
    }

    const data  = await r.json();
    const items = (data.resources || []).map(it => ({
      url: it.secure_url,
      public_id: it.public_id,
      format: it.format,
      bytes: it.bytes,
      created_at: it.created_at,
      tags: it.tags || [],
      title: (it.context && it.context.custom && it.context.custom.caption) || it.public_id
    }));

    // cache breve per performance
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60');
    return res.json({ count: items.length, items });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: String(err) });
  }
};
