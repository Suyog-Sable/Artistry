export const whatsappNumber = (
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918879237135"
).trim();
export const isWhatsAppConfigured = /^[1-9]\d{7,14}$/.test(whatsappNumber);
export function whatsappUrl(message: string) {
  return isWhatsAppConfigured
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    : null;
}
export const generalMessage =
  "Hello Artistry! I would like to know more about your personalized portraits and handmade Lippan art.";
