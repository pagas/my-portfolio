/**
 * Smoothly scrolls to a section by its ID
 * @param id - The ID of the section to scroll to
 */
export function scrollToSection(id: string): void {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

