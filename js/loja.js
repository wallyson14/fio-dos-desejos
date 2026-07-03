/* =====================================================================
   Fio dos Desejos — Loja
   Catálogo gerado a partir da lista PRODUTOS (fácil de manter),
   galeria de fotos por produto, pedidos direto pelo WhatsApp,
   navbar, menu mobile, reveal no scroll e formulário → WhatsApp.

   Sem checkout no site: todo pedido é finalizado pelo WhatsApp, com a
   mensagem preenchida automaticamente. Preço é sob consulta.
   ===================================================================== */

(function () {
  "use strict";

  /* --------- Configuração rápida (edite aqui) --------- */
  const WHATSAPP_NUMBER = "5598981950075"; // DDI + DDD + número, só dígitos

  function openWhats(texto) {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank", "noopener");
  }

  /* =====================================================================
     CATÁLOGO
     Para adicionar um produto novo, copie um bloco { ... } abaixo e ajuste.
     - nome, categoria, tamanho, descricao
     - imagens: lista de caminhos das SUAS fotos (recomendado 3 por peça).
       Deixe [] para usar um placeholder "foto em breve" enquanto não tiver.
       Ex.: imagens: ["assets/images/ursinho-1.jpg", "assets/images/ursinho-2.jpg"]
     - badge: selo opcional no canto da foto (ex.: "Novidade"). Deixe "" pra nenhum.
     ===================================================================== */
  const PRODUTOS = [
    {
      nome: "Caixa Dinossauros Baby",
      categoria: "Bebês",
      tamanho: "12 cm cada",
      badge: "Novidade",
      descricao: "Seis dinossauros coloridos numa caixa fofa. Um presente encantador para bebês e crianças.",
      imagens: ["assets/images/produto-dinos.jpg"],
    },
    {
      nome: "Luffy (One Piece)",
      categoria: "Personagens",
      tamanho: "30 cm",
      badge: "",
      descricao: "O capitão dos Chapéus de Palha em amigurumi, com todos os detalhes do personagem.",
      imagens: ["assets/images/produto-luffy.jpg"],
    },
    {
      nome: "Girafinha Gigi",
      categoria: "Animais",
      tamanho: "25 cm",
      badge: "",
      descricao: "Girafinha de pescoço comprido e olhar meigo, feita ponto a ponto com muito carinho.",
      imagens: ["assets/images/produto-girafa.jpg"],
    },
  ];

  /* --------- Placeholder "foto em breve" (SVG on-brand) --------- */
  const PLACEHOLDER_CORES = [
    { bg: "#FBF1E8", corpo: "#C98B7D" },
    { bg: "#F1EFE3", corpo: "#9FAE82" },
    { bg: "#FBE9E4", corpo: "#E7A89F" },
  ];
  function placeholder(nome, i) {
    const c = PLACEHOLDER_CORES[i % PLACEHOLDER_CORES.length];
    const svg =
      `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'>` +
      `<rect width='400' height='500' fill='${c.bg}'/>` +
      `<g transform='translate(200,205)'>` +
      `<circle cx='-52' cy='-66' r='30' fill='${c.corpo}'/>` +
      `<circle cx='52' cy='-66' r='30' fill='${c.corpo}'/>` +
      `<circle cx='0' cy='0' r='92' fill='${c.corpo}'/>` +
      `<circle cx='-33' cy='-6' r='9' fill='#4a3126'/>` +
      `<circle cx='33' cy='-6' r='9' fill='#4a3126'/>` +
      `<circle cx='-50' cy='20' r='12' fill='#ffffff' opacity='0.35'/>` +
      `<circle cx='50' cy='20' r='12' fill='#ffffff' opacity='0.35'/>` +
      `<path d='M-15 22 Q0 36 15 22' stroke='#4a3126' stroke-width='4' fill='none' stroke-linecap='round'/>` +
      `</g>` +
      `<text x='200' y='420' text-anchor='middle' font-family='Verdana,sans-serif' font-size='23' font-weight='700' fill='#6B4A38'>${nome}</text>` +
      `<text x='200' y='452' text-anchor='middle' font-family='Verdana,sans-serif' font-size='15' fill='#B49C8C'>foto em breve</text>` +
      `</svg>`;
    return "data:image/svg+xml," + encodeURIComponent(svg);
  }

  function imagensDe(p) {
    if (p.imagens && p.imagens.length) return p.imagens;
    return [0, 1, 2].map((i) => placeholder(p.nome, i));
  }

  /* --------- Renderiza o catálogo --------- */
  const STARS =
    `<div class="stars" aria-label="5 de 5 estrelas">` +
    `<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3 6 6 .8-4.5 4.3 1 6.3L12 18l-5.5 3.4 1-6.3L3 8.8 9 8z"/></svg>`.repeat(5) +
    `</div>`;
  const SVG_FAV = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z"/></svg>`;
  const SVG_SIZE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M6 9v6M18 9v6"/></svg>`;
  const SVG_WHATS = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.5A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.9.9-2.8-.2-.3A8 8 0 1 1 12 20z"/></svg>`;

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function cardHTML(p) {
    const imgs = imagensDe(p);
    const badge = p.badge ? `<span class="card__badge">${esc(p.badge)}</span>` : "";
    const thumbs =
      imgs.length > 1
        ? `<div class="card__thumbs">` +
          imgs
            .map(
              (src, i) =>
                `<button class="card__thumb${i === 0 ? " is-active" : ""}" type="button" data-src="${src}" aria-label="Ver foto ${i + 1}"><img src="${src}" alt="" loading="lazy"></button>`
            )
            .join("") +
          `</div>`
        : "";
    return (
      `<article class="card reveal" data-name="${esc(p.nome)}" data-size="${esc(p.tamanho || "")}" data-cat="${esc(p.categoria || "")}">` +
      `<div class="card__media">` +
      `<img class="card__img" src="${imgs[0]}" alt="Amigurumi ${esc(p.nome)}" loading="lazy">` +
      badge +
      `<button class="card__fav" type="button" aria-label="Favoritar">${SVG_FAV}</button>` +
      `</div>` +
      thumbs +
      `<div class="card__body">` +
      `<span class="card__cat">${esc(p.categoria)}</span>` +
      `<h3 class="card__title">${esc(p.nome)}</h3>` +
      STARS +
      `<p class="card__size">${SVG_SIZE}Tamanho: ${esc(p.tamanho)}</p>` +
      `<p class="card__desc">${esc(p.descricao)}</p>` +
      `<p class="card__ask">Consulte o valor</p>` +
      `<button class="card__add" type="button" data-buy>${SVG_WHATS}Pedir pelo WhatsApp</button>` +
      `</div>` +
      `</article>`
    );
  }

  const grid = document.getElementById("gridProducts");
  if (grid) {
    grid.innerHTML = PRODUTOS.map(cardHTML).join("");
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

  /* --------- Interações do catálogo (delegação de eventos) --------- */
  if (grid) {
    grid.addEventListener("click", (e) => {
      // trocar foto pela miniatura
      const thumb = e.target.closest(".card__thumb");
      if (thumb) {
        const card = thumb.closest(".card");
        const main = card.querySelector(".card__img");
        if (main) main.src = thumb.dataset.src;
        card.querySelectorAll(".card__thumb").forEach((t) =>
          t.classList.toggle("is-active", t === thumb)
        );
        return;
      }

      // favoritar
      const fav = e.target.closest(".card__fav");
      if (fav) {
        const active = fav.classList.toggle("is-active");
        fav.setAttribute("aria-label", active ? "Remover dos favoritos" : "Favoritar");
        return;
      }

      // pedir pelo WhatsApp
      const buy = e.target.closest("[data-buy]");
      if (buy) {
        const card = buy.closest(".card");
        const nome = card?.dataset.name || "amigurumi";
        const tamanho = card?.dataset.size || "";
        const cat = card?.dataset.cat || "";

        let texto = `Olá! Quero fazer um pedido pela loja do Fio dos Desejos.\n\n`;
        texto += `Modelo: ${nome}\n`;
        if (cat) texto += `Categoria: ${cat}\n`;
        if (tamanho) texto += `Tamanho: ${tamanho}\n`;
        texto += `\nPode me passar o valor, disponibilidade e prazo de entrega?`;

        showToast("Abrindo o WhatsApp com seu pedido...");
        openWhats(texto);
      }
    });
  }

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
