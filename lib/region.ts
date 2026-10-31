/** Which shop this build is.
 * Cloudflare leaves this unset, so the Swiss site stays German and in francs.
 * The Vercel project sets NEXT_PUBLIC_STORE=za, so that deploy is English and in rand.
 */
export const isZa = process.env.NEXT_PUBLIC_STORE === "za";

export const siteUrl = isZa ? "https://novionsa.co.za" : "https://novion.ch";
export const htmlLang = isZa ? "en" : "de-CH";
export const moneyLocale = isZa ? "en-ZA" : "de-CH";
export const moneyCode = isZa ? "ZAR" : "CHF";

export function tx(de: string, en: string) {
  return isZa ? en : de;
}
