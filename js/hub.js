/* =====================================================================
   Fio dos Desejos — Hub
   Mantém a página leve. As animações de entrada são feitas em CSS;
   aqui só garantimos o respeito a "movimento reduzido".
   ===================================================================== */

// Caso o usuário prefira menos movimento, removemos os delays escalonados.
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (prefersReduced) {
  document.querySelectorAll(".hub__link, .hub__avatar, .hub__name, .hub__tag, .hub__socials")
    .forEach((el) => (el.style.animation = "none"));
}
