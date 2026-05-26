/**
 * whatsapp.ts — generate wa.me URLs with optional pre-filled message.
 *
 * Number must be international, digits only. E.g. "5492214000000".
 */
export function whatsappUrl(number: string, message?: string): string {
  const clean = number.replace(/\D/g, '');
  const base = `https://wa.me/${clean}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
