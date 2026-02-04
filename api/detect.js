export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" })
  }

  const apiKey = req.headers["x-api-key"]
  const AUTH_KEY = process.env.API_AUTH_KEY

  if (!apiKey || apiKey !== AUTH_KEY) {
    return res.status(401).json({
      status: "error",
      message: "Invalid API Key"
    })
  }

  const { language, audio_format, audio_base64 } = req.body || {}

  if (!language || !audio_format || !audio_base64) {
    return res.status(400).json({
      status: "error",
      message: "Missing required fields"
    })
  }

  const confidence = Math.random().toFixed(2)

  return res.status(200).json({
    status: "success",
    ai_generated: confidence > 0.5,
    confidence: Number(confidence),
    language,
    format: audio_format
  })
}
