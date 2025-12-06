import express from "express";
import { getMailTransport, contactTo } from "../services/mailer.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message, subject } = req.body || {};

    if (!name || typeof name !== "string") {
      return res.status(400).json({ error: "Campo 'name' é obrigatório." });
    }
    if (!email || typeof email !== "string") {
      return res.status(400).json({ error: "Campo 'email' é obrigatório." });
    }
    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Campo 'message' é obrigatório." });
    }

    const transporter = getMailTransport();
    if (!transporter) {
      return res
        .status(500)
        .json({ error: "Configuração SMTP ausente. Defina SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS." });
    }

    const mailSubject = subject?.trim()
      ? subject.trim()
      : `Novo contato do portfólio - ${name || "Visitante"}`;

    const mailText = [
      `Nome: ${name}`,
      `Email: ${email}`,
      phone ? `Telefone: ${phone}` : "",
      "",
      "Mensagem:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    await transporter.sendMail({
      from: `"Contato Portfolio" <${process.env.SMTP_USER || email}>`,
      replyTo: email,
      to: contactTo,
      subject: mailSubject,
      text: mailText,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[Contact API] Erro ao enviar email:", err?.message || err);
    return res.status(500).json({ error: "Erro ao enviar mensagem. Tente novamente em instantes." });
  }
});

export default router;
