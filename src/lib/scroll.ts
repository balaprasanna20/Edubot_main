/**
 * Pixel-perfect smooth scroll utility for Edubot single-page website.
 * Calculates exact target offset accounting for the sticky 72px header.
 */
export const NAVBAR_HEIGHT = 72;

export function scrollToSection(sectionId: string, offset = NAVBAR_HEIGHT) {
  if (typeof window === "undefined") return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (sectionId === "overview" || sectionId === "") {
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? "auto" : "smooth",
    });
    return;
  }

  const cleanId = sectionId.startsWith("#") ? sectionId.substring(1) : sectionId;
  const element = document.getElementById(cleanId);
  if (!element) return;

  const elementRect = element.getBoundingClientRect();
  const targetY = elementRect.top + window.pageYOffset - offset;

  window.scrollTo({
    top: Math.max(0, targetY),
    behavior: prefersReduced ? "auto" : "smooth",
  });
}
