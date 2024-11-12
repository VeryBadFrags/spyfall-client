export function resetClickableElements() {
  document
    .querySelectorAll(".strike")
    .forEach((elem) => elem.classList.remove("strike"));
}
