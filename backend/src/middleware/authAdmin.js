export function requireAdmin(req, res, next) {
  const token = req.headers["x-admin-token"] || req.headers["authorization"]?.replace("Bearer ", "");
  const expected = process.env.ADMIN_TOKEN;

  if (!expected) {
    console.warn("[Auth] ADMIN_TOKEN não configurado; bloqueando acesso.");
    return res.status(401).json({ error: "Acesso restrito" });
  }
  if (token !== expected) {
    return res.status(401).json({ error: "Não autorizado" });
  }
  return next();
}
