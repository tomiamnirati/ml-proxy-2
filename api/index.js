export default async function handler(req, res) {
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
