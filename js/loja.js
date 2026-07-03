/* =====================================================================
   Fio dos Desejos — Loja
   Interações da landing page: navbar, menu mobile, reveal no scroll,
   pedido direto pelo WhatsApp (produtos e personalização), favoritos,
   link ativo e formulário → WhatsApp com o pedido já montado.

   Sem checkout no site: todo pedido é finalizado pelo WhatsApp, com a
   mensagem preenchida automaticamente para o cliente não digitar de novo.
   ===================================================================== */

(function () {
  "use strict";

  /* --------- Configuração rápida (edite aqui) --------- */
  const WHATSAPP_NUMBER = "5598981950075"; // DDI + DDD + número, só dígitos

  // Abre o WhatsApp com a mensagem já escrita
  function openWhats(texto) {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank", "noopener");
  }

  /* --------- Navbar: sombra ao rolar --------- */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* --------- Menu mobile --------- */
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  // fecha o menu ao clicar num link
  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );

  /* --------- Scroll reveal --------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* --------- Link ativo conforme a seção visível --------- */
  const sections = ["inicio", "produtos", "personalizar", "sobre", "contato"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const links = menu.querySelectorAll("a");

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            links.forEach((l) =>
              l.classList.toggle("is-active", l.getAttribute("href") === "#" + id)
            );
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* --------- Toast de feedback --------- */
  const toast = document.getElementById("toast");
  const toastText = document.getElementById("toastText");
  let toastTimer;
  function showToast(message) {
    if (!toast) return;
    toastText.textContent = message;
    toast.classList.add("is-shown");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-shown"), 2600);
  }

  /* --------- Pedido de produto → WhatsApp ---------
     Cada card carrega os dados do produto (nome, tamanho, preço, categoria).
     Ao clicar em "Pedir pelo WhatsApp", já monta a mensagem completa. */
  document.querySelectorAll("[data-buy]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card");
      const nome = card?.dataset.name || "amigurumi";
      const tamanho = card?.dataset.size || "";
      const cat = card?.dataset.cat || "";
      const preco = card?.dataset.price
        ? "R$ " + Number(card.dataset.price).toFixed(2).replace(".", ",")
        : "";

      let texto = `Olá! Quero fazer um pedido pela loja do Fio dos Desejos.\n\n`;
      texto += `Modelo: ${nome}\n`;
      if (cat) texto += `Categoria: ${cat}\n`;
      if (tamanho) texto += `Tamanho: ${tamanho}\n`;
      if (preco) texto += `Valor: ${preco}\n`;
      texto += `\nPode me confirmar disponibilidade e prazo de entrega?`;

      showToast(`Abrindo o WhatsApp com seu pedido...`);
      openWhats(texto);
    });
  });

  /* --------- Favoritar --------- */
  document.querySelectorAll(".card__fav").forEach((btn) => {
    btn.addEventListener("click", () => {
      const active = btn.classList.toggle("is-active");
      btn.setAttribute("aria-label", active ? "Remover dos favoritos" : "Favoritar");
    });
  });

  /* --------- Formulário de pedido/personalização → WhatsApp --------- */
  const sendBtn = document.getElementById("sendWhats");
  if (sendBtn) {
    sendBtn.addEventListener("click", () => {
      const val = (id) => (document.getElementById(id)?.value || "").trim();
      const nome = val("nome");
      const contato = val("contato");
      const modelo = val("modelo");
      const msg = val("msg");

      let texto = `Olá! Vim pela loja do Fio dos Desejos e quero fazer um pedido.\n\n`;
      texto += `Nome: ${nome || "(não informado)"}\n`;
      if (contato) texto += `Contato: ${contato}\n`;
      if (modelo) texto += `Modelo/personagem: ${modelo}\n`;
      if (msg) texto += `Detalhes: ${msg}\n`;

      openWhats(texto);
    });
  }

  /* --------- Ano dinâmico no rodapé --------- */
  const yearEl = document.querySelector(".footer__bottom span");
  if (yearEl) {
    yearEl.innerHTML = yearEl.innerHTML.replace("2025", new Date().getFullYear());
  }
})();
