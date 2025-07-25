export default async function handler(req, res) {
  // Habilitar CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // respuesta rápida para preflight
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Solo se permiten solicitudes POST' });
  }

  const webhookURL = 'https://script.google.com/macros/s/AKfycbyFB-7aFkUIIZMnmrB2_zA94pKr-E9fJaFbP4mFpqwhJZB-Meszm6nENGFxSDeyuSIO/exec';

  try {
    const respuesta = await fetch(webhookURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const texto = await respuesta.text();
    console.log("✅ Reenviado a Google Sheets:", texto);
    res.status(200).send("✅ Datos reenviados al webhook");
  } catch (error) {
    console.error("❌ Error al reenviar a Google Sheets:", error);
    res.status(500).send("❌ Error al reenviar a Google Sheets");
  }
}
