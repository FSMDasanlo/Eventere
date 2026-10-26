const products = [
  {
    title: "Alfombras para ceremonias",
    category: "Celebraciones",
    filter: "celebraciones",
    description: "Fibras naturales y formas circulares para crear un camino o un rincón especial en una celebración.",
    images: [
      ["alfombra_1_arco.png", "Alfombras circulares artesanales en un camino con arco floral"],
      ["alfombra_1_atardecer.png", "Alfombras artesanales en una ceremonia al atardecer"],
      ["alfombra_1_mejorada.png", "Detalle de alfombras circulares para una ceremonia"],
      ["IMG_20260622_102311.jpg", "Alfombras circulares colocadas en el interior de una vivienda"],
      ["IMG_20260622_102323.jpg", "Vista de las alfombras artesanales en una estancia"],
      ["IMG_20260622_102346.jpg", "Alfombras artesanales junto a un sofá"],
      ["IMG_20260622_102349.jpg", "Detalle de la composición de alfombras circulares"]
    ]
  },
  {
    title: "Cestas y organizadores",
    category: "Hogar y organización",
    filter: "hogar",
    description: "Cestas, bandejas y organizadores de fibras naturales para aportar textura y orden a los espacios.",
    images: [
      ["IMG-20260507-WA0000.jpg", "Cesta artesanal con detalles decorativos"],
      ["IMG_20260630_130958.jpg", "Cesta alta tejida con fibras naturales"],
      ["IMG_20260630_131009.jpg", "Vista de una cesta alta artesanal"],
      ["IMG_20260630_132101.jpg", "Bandeja rectangular artesanal"],
      ["IMG_20260630_132114.jpg", "Cesta rectangular forrada y tejida a mano"],
      ["IMG_20260630_132136.jpg", "Conjunto de cestas de distintos tamaños"],
      ["IMG_20260630_132145.jpg", "Cestas redondas y rectangulares de fibras naturales"],
      ["IMG_20260630_132238.jpg", "Cesta cuadrada para guardar pequeños objetos"],
      ["IMG_20260630_132247.jpg", "Detalle de una cesta rectangular tejida"]
    ]
  },
  {
    title: "Detalles decorativos",
    category: "Decoración artesanal",
    filter: "hogar",
    description: "Piezas con fibras, aros y formas naturales para dar un toque personal a una mesa o a un rincón.",
    images: [
      ["IMG-20260507-WA0002.jpg", "Cestas y piezas decorativas artesanales en una estantería"],
      ["IMG-20260507-WA0003.jpg", "Composición de cestas y decoración de fibras"],
      ["IMG-20260507-WA0004.jpg", "Detalle de piezas artesanales expuestas en el hogar"],
      ["IMG-20260519-WA0000.jpg", "Decoración circular de fibras naturales"],
      ["IMG-20260519-WA0003.jpg", "Pequeños detalles decorativos artesanales"],
      ["IMG-20260522-WA0002.jpg", "Pieza decorativa circular hecha con fibras naturales"],
      ["IMG-20260522-WA0009.jpg", "Detalle circular artesanal presentado en una estantería"],
      ["IMG_20260630_132303.jpg", "Escultura circular de fibras naturales"],
      ["IMG_20260630_132333.jpg", "Composición artesanal de fibras y flores"]
    ]
  },
  {
    title: "Jarrones naturales",
    category: "Hogar y decoración",
    filter: "hogar",
    description: "Jarrones vestidos con texturas naturales, pensados para acompañar ramas y flores secas.",
    images: [
      ["IMG_20260630_161154.jpg", "Jarrón artesanal de fibras naturales con ramas secas"],
      ["IMG_20260911_211203.jpg", "Jarrón alto de fibras con flores secas"]
    ]
  },
  {
    title: "Bicicleta decorativa",
    category: "Detalles originales",
    filter: "hogar",
    description: "Una pequeña pieza decorativa hecha a mano, ideal para dar un acento original a cualquier composición.",
    images: [
      ["IMG_20260515_164801.jpg", "Bicicleta decorativa artesanal vista de lado"],
      ["IMG_20260515_164826.jpg", "Detalle de la bicicleta decorativa hecha a mano"]
    ]
  },
  {
    title: "Soportes de fibras naturales",
    category: "Hogar y decoración",
    filter: "hogar",
    description: "Piezas revestidas en yute que suman textura y calidez a la entrada o a un rincón de casa.",
    images: [
      ["IMG-20260630-WA0000.jpg", "Soporte artesanal de yute junto a paraguas"]
    ]
  },
  {
    title: "Piezas tejidas con detalle",
    category: "Decoración artesanal",
    filter: "hogar",
    description: "Creaciones de inspiración natural, hechas con paciencia y atención a cada acabado.",
    images: [
      ["IMG-20260625-WA0015.jpg", "Pieza cónica tejida con fibras naturales"]
    ]
  }
];

const productGrid = document.querySelector("#product-grid");
const dialog = document.querySelector(".gallery-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogImage = document.querySelector(".dialog-image");
const galleryCount = document.querySelector(".gallery-count");
const galleryThumbnails = document.querySelector(".gallery-thumbnails");
const dialogInterest = document.querySelector(".dialog-interest");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
let activeProduct = null;
let activeImageIndex = 0;

function whatsappUrl(productTitle) {
  const message = `Hola, me gustaría recibir información sobre ${productTitle} de Eventere.`;
  return `https://wa.me/34618169377?text=${encodeURIComponent(message)}`;
}

function renderProducts() {
  productGrid.innerHTML = products.map((product, index) => {
    const [image, alt] = product.images[0];
    return `
      <article class="product-card" data-category="${product.filter}">
        <button class="product-image-button" type="button" data-product="${index}" aria-label="Ver galería de ${product.title}">
          <img src="img/${image}" alt="${alt}" loading="lazy">
          <span class="image-count" aria-hidden="true">▧ ${product.images.length} ${product.images.length === 1 ? "foto" : "fotos"}</span>
        </button>
        <div class="product-meta">
          <p class="product-category">${product.category}</p>
          <h3>${product.title}</h3>
          <p class="product-description">${product.description}</p>
          <button class="product-link" type="button" data-product="${index}">Ver piezas <span aria-hidden="true">↗</span></button>
        </div>
      </article>`;
  }).join("");
}

function showImage(index) {
  activeImageIndex = (index + activeProduct.images.length) % activeProduct.images.length;
  const [filename, alt] = activeProduct.images[activeImageIndex];
  dialogImage.src = `img/${filename}`;
  dialogImage.alt = alt;
  galleryCount.textContent = `${activeImageIndex + 1} de ${activeProduct.images.length}`;
  galleryThumbnails.querySelectorAll(".gallery-thumb").forEach((button, thumbIndex) => {
    const isActive = thumbIndex === activeImageIndex;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-current", isActive ? "true" : "false");
    if (isActive) button.scrollIntoView({ block: "nearest", inline: "nearest" });
  });
}

function openGallery(productIndex) {
  activeProduct = products[productIndex];
  dialogTitle.textContent = activeProduct.title;
  dialogInterest.href = whatsappUrl(activeProduct.title);
  galleryThumbnails.innerHTML = activeProduct.images.map(([filename, alt], index) => `
    <button class="gallery-thumb${index === 0 ? " is-active" : ""}" type="button" data-image="${index}" aria-label="Mostrar imagen ${index + 1}: ${alt}" aria-current="${index === 0 ? "true" : "false"}">
      <img src="img/${filename}" alt="" loading="lazy">
    </button>`).join("");
  showImage(0);
  dialog.showModal();
}

productGrid.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-product]");
  if (trigger) openGallery(Number(trigger.dataset.product));
});

document.querySelector(".gallery-thumbnails").addEventListener("click", (event) => {
  const thumbnail = event.target.closest("[data-image]");
  if (thumbnail) showImage(Number(thumbnail.dataset.image));
});

document.querySelector(".gallery-prev").addEventListener("click", () => showImage(activeImageIndex - 1));
document.querySelector(".gallery-next").addEventListener("click", () => showImage(activeImageIndex + 1));
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

dialog.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") showImage(activeImageIndex - 1);
  if (event.key === "ArrowRight") showImage(activeImageIndex + 1);
});

document.querySelector(".filter-row").addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;

  document.querySelectorAll(".filter-button").forEach((filterButton) => {
    const isActive = filterButton === button;
    filterButton.classList.toggle("is-active", isActive);
    filterButton.setAttribute("aria-pressed", String(isActive));
  });

  productGrid.querySelectorAll(".product-card").forEach((card) => {
    card.hidden = button.dataset.filter !== "todas" && card.dataset.category !== button.dataset.filter;
  });
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
  }
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
renderProducts();
