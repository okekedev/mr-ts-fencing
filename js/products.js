// =============================================
// SHALLOW THE BED STORE — products.js
// Fetches JSON data and renders product cards
// =============================================

async function loadProducts(jsonPath, containerId, renderer) {
  const container = document.getElementById(containerId);
  if (!container) return;
  try {
    const res = await fetch(jsonPath);
    const data = await res.json();
    container.innerHTML = data.map(renderer).join('');
  } catch (e) {
    container.innerHTML = '<p>Unable to load products. Please call us at (940) 692-6671.</p>';
  }
}

// Mattress full detail card
function renderMattress(m) {
  const featureTags = m.features.map(f => `<span class="feature-tag">${f}</span>`).join('');
  const sizePills = (m.sizes || []).map(s => `<span class="size-pill">${s}</span>`).join('');
  return `
    <div class="product-card" id="${m.id}">
      <div class="product-img">
        <img src="${m.image}" alt="${m.name}" loading="lazy">
      </div>
      <div class="product-info">
        <span class="card-badge">Best for: ${m.bestFor}</span>
        <h2>${m.name}</h2>
        <p>${m.description}</p>
        <div class="feature-tags">${featureTags}</div>
        ${sizePills ? `<details class="size-dropdown"><summary>Sizes</summary><div class="size-pills">${sizePills}</div></details>` : ''}
        <a href="contact.html" class="btn btn-primary">Ask About This Mattress</a>
      </div>
    </div>`;
}

// Mattress summary card (for homepage)
function renderMattressCard(m) {
  return `
    <div class="card" onclick="window.location='product.html?id=${m.id}'" style="cursor:pointer;">
      <img class="card-img" src="${m.image}" alt="${m.name}" loading="lazy">
      <div class="card-body">
        <span class="card-badge">Beautyrest Black</span>
        <h3>${m.name}</h3>
        <p>${m.tagline}</p>
        <a href="product.html?id=${m.id}" class="btn btn-primary" onclick="event.stopPropagation()">View Details</a>
      </div>
    </div>`;
}

// Adjustable base detail
function renderBase(b) {
  const featureList = b.features.map(f => `<li>${f}</li>`).join('');
  const sizePills = (b.sizes || []).map(s => `<span class="size-pill">${s}</span>`).join('');
  return `
    <div class="product-card" id="${b.id}">
      <div class="product-img">
        <img src="${b.image}" alt="${b.name}" loading="lazy">
      </div>
      <div class="product-info">
        <span class="card-badge">${b.warranty}</span>
        <h2>${b.name}</h2>
        <p>${b.description}</p>
        <ul class="feature-tags" style="margin-bottom:1.5rem;">
          ${b.features.map(f => `<li class="feature-tag">${f}</li>`).join('')}
        </ul>
        <p style="font-size:0.8rem;color:var(--gray-text);margin-bottom:1.25rem;">${b.compatible}</p>
        ${sizePills ? `<details class="size-dropdown"><summary>Sizes</summary><div class="size-pills">${sizePills}</div></details>` : ''}
        <a href="contact.html" class="btn btn-primary">Ask About This Base</a>
      </div>
    </div>`;
}

// Nav active state
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  // Mobile nav toggle
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }
});
