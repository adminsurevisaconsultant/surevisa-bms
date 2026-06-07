// ═══════════════════════════════════════════════════════════
// Sure Visa Consultant — Shared Layout
// Injects top bar, navbar, footer, and mobile nav on every page
// ═══════════════════════════════════════════════════════════

(function(){
  // Set favicon (logo) on every page
  (function(){
    const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.href = 'logo.png';
    document.head.appendChild(link);
  })();

  // Detect current page from URL
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const currentPage = path.replace('.html', '') || 'index';

  const navItems = [
    { href: 'index.html',     id: 'index',     label: 'Home' },
    { href: 'about.html',     id: 'about',     label: 'About Us' },
    { href: 'services.html',  id: 'services',  label: 'Services' },
    { href: 'countries.html', id: 'countries', label: 'Countries' },
    { href: 'process.html',   id: 'process',   label: 'Process' },
    { href: 'contact.html',   id: 'contact',   label: 'Contact' },
  ];

  const isActive = (id) => currentPage === id ? 'active' : '';

  // ───────── TOP BAR ─────────
  const topBar = `
    <div class="top-bar">
      <div class="container">
        <div>
          <a href="tel:+923474402416"><i class="bi bi-telephone-fill"></i>+92 347 4402416</a>
          <a href="mailto:contact@surevisaconsultant.com" class="d-none d-md-inline"><i class="bi bi-envelope-fill"></i>contact@surevisaconsultant.com</a>
        </div>
        <div>
          <i class="bi bi-geo-alt-fill"></i> Dinga, Kharian, Gujrat
        </div>
      </div>
    </div>
  `;

  // ───────── NAVBAR ─────────
  const navbar = `
    <nav class="navbar">
      <div class="container">
        <div class="nav-wrap">
          <a class="navbar-brand" href="index.html">
            <div class="logo-circle"><img src="logo.png" alt="Sure Visa Consultant"/></div>
            <div class="brand-text">
              Sure Visa<br>Consultant
              <small>WORK · STUDY · VISIT</small>
            </div>
          </a>
          <div class="nav-tabs-wrap">
            <ul class="nav-tabs-list">
              ${navItems.map(item => `
                <li><a class="nav-link ${isActive(item.id)}" href="${item.href}">${item.label}</a></li>
              `).join('')}
              <li><a href="apply.html" class="btn-apply"><i class="bi bi-file-earmark-plus-fill"></i> <span>Apply Visa</span></a></li>
              <li><a href="client-portal.html" class="btn-track"><i class="bi bi-search"></i> <span>Check Status</span></a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  `;

  // ───────── FOOTER ─────────
  const footer = `
    <footer>
      <div class="container">
        <div class="row g-4">
          <div class="col-md-4">
            <a class="navbar-brand" href="index.html" style="margin-bottom:16px">
              <div class="logo-circle"><img src="logo.png" alt="Sure Visa Consultant"/></div>
              <div class="brand-text" style="color:#fff">
                Sure Visa<br>Consultant
                <small>WORK · STUDY · VISIT</small>
              </div>
            </a>
            <p style="font-size:.88rem;color:#94a3b8;margin-top:16px;line-height:1.6">
              Trusted visa consultancy serving Pakistan with work permits, study visas, and visit visas for 20+ countries worldwide.
            </p>
          </div>
          <div class="col-md-2 col-6">
            <h6>Quick Links</h6>
            <a href="index.html">Home</a>
            <a href="about.html">About Us</a>
            <a href="services.html">Services</a>
            <a href="countries.html">Countries</a>
            <a href="process.html">Process</a>
            <a href="apply.html">Apply Visa</a>
            <a href="client-portal.html">Check Status</a>
          </div>
          <div class="col-md-3 col-6">
            <h6>Popular Destinations</h6>
            <a href="countries.html">UK Work Permit</a>
            <a href="countries.html">Poland Work Permit</a>
            <a href="countries.html">Canada Mobility</a>
            <a href="countries.html">Dubai Work Permit</a>
            <a href="countries.html">Portugal Work Permit</a>
          </div>
          <div class="col-md-3">
            <h6>Contact</h6>
            <a href="tel:+923474402416"><i class="bi bi-telephone-fill me-1"></i> +92 347 4402416</a>
            <a href="tel:+923160172199"><i class="bi bi-telephone-fill me-1"></i> +92 316 0172199</a>
            <a href="https://wa.me/923474402416" target="_blank"><i class="bi bi-whatsapp me-1"></i> WhatsApp</a>
            <p style="font-size:.82rem;color:#94a3b8;margin-top:10px;line-height:1.5">
              <i class="bi bi-geo-alt-fill me-1"></i> Pervez Gujjar Palaza, Dhalyan Chowk, Dinga, Kharian, Gujrat
            </p>
          </div>
        </div>
        <div class="footer-bottom">
          © <span id="yr"></span> Sure Visa Consultant. All rights reserved.
        </div>
      </div>
    </footer>
  `;

  // ───────── WHATSAPP FLOAT + MOBILE NAV ─────────
  const floats = `
    <a href="https://wa.me/923474402416" target="_blank" class="whatsapp-float">
      <i class="bi bi-whatsapp"></i>
    </a>
    <div class="mobile-bottom-nav">
      <div class="mobile-bottom-nav-inner">
        <a href="index.html" class="mob-nav-item ${isActive('index')}"><i class="bi bi-house-fill"></i><span>Home</span></a>
        <a href="countries.html" class="mob-nav-item ${isActive('countries')}"><i class="bi bi-globe-americas"></i><span>Countries</span></a>
        <a href="apply.html" class="mob-nav-item center">
          <div class="ic-box"><i class="bi bi-file-earmark-plus-fill"></i></div>
          <span>Apply</span>
        </a>
        <a href="client-portal.html" class="mob-nav-item"><i class="bi bi-search"></i><span>Track</span></a>
        <a href="contact.html" class="mob-nav-item ${isActive('contact')}"><i class="bi bi-telephone-fill"></i><span>Contact</span></a>
      </div>
    </div>
    <div class="toast-msg" id="toast"></div>
  `;

  // ───────── INJECT ─────────
  document.addEventListener('DOMContentLoaded', () => {
    // Inject before existing body content
    const headerHTML = topBar + navbar;
    const footerHTML = footer + floats;

    // Find placeholder slots or inject at start/end
    const headerSlot = document.getElementById('siteHeader');
    const footerSlot = document.getElementById('siteFooter');

    if(headerSlot) headerSlot.innerHTML = headerHTML;
    else document.body.insertAdjacentHTML('afterbegin', headerHTML);

    if(footerSlot) footerSlot.innerHTML = footerHTML;
    else document.body.insertAdjacentHTML('beforeend', footerHTML);

    // Set current year
    const yrEl = document.getElementById('yr');
    if(yrEl) yrEl.textContent = new Date().getFullYear();
  });

  // Toast helper
  window.toast = function(msg, type='success'){
    const t = document.getElementById('toast');
    if(!t) return;
    t.textContent = msg;
    t.className = 'toast-msg show' + (type==='error'?' error':'');
    setTimeout(()=>t.classList.remove('show'),3000);
  };
})();
