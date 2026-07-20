const WHATSAPP_NUMBER = "5584992092241";

export function getWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
