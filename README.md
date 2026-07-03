# 🧶 Fio dos Desejos — Landing Page

Landing page de uma loja de **amigurumis feitos à mão**. O projeto tem duas telas:

1. **Página Hub (`index.html`)** — estilo "link na bio". É o primeiro acesso ao tocar no link compartilhado nas redes sociais. O cliente escolhe para onde ir: **Loja, WhatsApp, Instagram ou TikTok**.
2. **Landing da Loja (`loja.html`)** — a vitrine completa: hero, categorias, produtos com desconto, personalização sob encomenda, sobre e contato.

Site **100% front-end**, responsivo e sem dependências de build — fácil de testar e publicar.

---

## 🛠️ Tecnologias

- **HTML5** semântico
- **CSS3** com design tokens (variáveis), Grid e Flexbox
- **JavaScript** puro (sem frameworks): IntersectionObserver para animações, menu mobile e pedidos direto pelo WhatsApp (com a mensagem já montada)
- **Google Fonts**: Fraunces (display) + Quicksand (corpo)

Sem `npm install`, sem etapa de build. É só abrir.

---

## 📁 Estrutura

```
fio-dos-desejos/
├── index.html              # Página hub (link na bio)
├── loja.html               # Landing page da loja
├── css/
│   ├── tokens.css          # Cores, fontes, espaçamentos (design system)
│   ├── base.css            # Reset, tipografia e utilitários
│   ├── hub.css             # Estilos da página hub
│   └── loja.css            # Estilos da landing da loja
├── js/
│   ├── hub.js              # Comportamento da página hub
│   └── loja.js            # Interações da loja (carrinho, menu, etc.)
├── assets/
│   └── images/             # Logo, wordmark e fotos dos produtos
└── README.md
```

---

## ▶️ Como rodar localmente

A forma mais simples é abrir o `index.html` direto no navegador.

Para evitar qualquer detalhe de caminho relativo, use um servidor local:

**VS Code:** instale a extensão **Live Server**, clique com o botão direito em `index.html` → *Open with Live Server*.

**Ou pelo terminal (Python já instalado):**
```bash
python3 -m http.server 5500
# acesse http://localhost:5500
```

---

## ✏️ Como personalizar

Tudo que costuma mudar está concentrado em poucos lugares:

### Número do WhatsApp
Em `js/loja.js`, edite a constante no topo (DDI + DDD + número, só dígitos):
```js
const WHATSAPP_NUMBER = "5598981950075";
```
E ajuste os links `wa.me/...` em `index.html` e `loja.html`.

### Links das redes sociais
Procure pelos links do Instagram e do TikTok nos dois HTMLs e troque pelas URLs reais.

### Cores e fontes
Tudo em `css/tokens.css`. Mudou ali, mudou no site inteiro.

### Adicionar um produto novo
1. Coloque a foto em `assets/images/`.
2. Em `loja.html`, **copie um bloco `<article class="card">`** e ajuste:
   - `data-name` e `data-price` (usados pelo carrinho)
   - `src` e `alt` da imagem
   - categoria, título, avaliação e preços

**Desconto** (preço riscado + valor com desconto):
```html
<div class="card__price">
  <span class="price-old">R$ 299,00</span>   <!-- riscado -->
  <span class="price-now">R$ 149,00</span>   <!-- valor final -->
</div>
```
Para produto sem desconto, é só remover a linha `price-old`.

---

## 🚀 Publicar no GitHub Pages

Por ser estático, o deploy é direto:

1. Suba a pasta para um repositório no GitHub.
2. No repositório, vá em **Settings → Pages**.
3. Em *Build and deployment*, escolha **Deploy from a branch**, branch **main**, pasta **/ (root)** → **Save**.
4. Aguarde ~1 min. O site fica no ar em `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.

> Dica: o link que você compartilha nas redes deve apontar para a **raiz** (a página hub). De lá o cliente vai pra loja, WhatsApp ou redes.

Alternativas igualmente simples: **Netlify** (arrastar a pasta) ou **Vercel**.

---

## ♿ Qualidade

- Responsivo do desktop ao celular
- Foco visível no teclado e HTML semântico
- Respeita `prefers-reduced-motion`
- Imagens com `loading="lazy"` e textos `alt`

---

Feito à mão com ♥ — como os amigurumis.
