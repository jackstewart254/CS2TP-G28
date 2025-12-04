export function generateApiKey(prefix = "fd_live") {
  const random = crypto.randomUUID().replace(/-/g, "");
  return `${prefix}_${random.slice(0, 24)}`;
}
