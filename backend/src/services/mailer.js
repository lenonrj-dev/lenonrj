import nodemailer from "nodemailer";

export const contactTo = "lenon.contato.dev.co@gmail.com";

export function getMailTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "465");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const secure = process.env.SMTP_SECURE !== "false";

  if (!host || !port || !user || !pass) {
    console.error("[Contact] Configuração SMTP ausente. Defina SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.");
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}
