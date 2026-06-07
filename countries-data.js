// ═══════════════════════════════════════════════════════════
// Sure Visa Consultant — Countries & Testimonials (live)
// Loads from Firebase visa business doc, falls back to defaults
// ═══════════════════════════════════════════════════════════

// ────── DEFAULT COUNTRIES (used when admin hasn't customized) ──────
const DEFAULT_COUNTRIES = [
  { id:'D1', name:'Poland', flag:'🇵🇱', code:'pl', type:'work', image:null,
    salary:'€800-€1,200/month', duration:'1-3 years',
    desc:'Work permit in Poland with verified employers.',
    jobs:['Amazon General Worker','CCC Warehouses Worker','Branded Clothes & Shoes Warehouse Worker'],
    docs:['Passport (all pages scanned)','Home Address','Contact Number','1 Photo white background'],
    extra:'1 year to 3 years work permit', status:'active' },
  { id:'D2', name:'Bulgaria', flag:'🇧🇬', code:'bg', type:'work', image:null,
    salary:'€700-€1,000/month', duration:'90 days seasonal',
    desc:'Schengen seasonal work visa with free accommodation.',
    jobs:['Food Delivery Courier','Hotel Worker'],
    docs:['Passport (all pages)','Photo','Full Address','Europass CV','Photo 35x45mm','Educational documents (if available)'],
    extra:'Schengen seasonal visa up to 90 days + Job + Company. Free accommodation & transport.', status:'active' },
  { id:'D3', name:'Czechia', flag:'🇨🇿', code:'cz', type:'work', image:null,
    salary:'€900-€1,300/month', duration:'1-2 years',
    desc:'Work permit with free accommodation in Czech Republic.',
    jobs:['Construction Workers','Warehouse Workers','Factory General Workers','Cleaning Workers'],
    docs:['Full passport scan','Police clearance certificate','Full address with postal code'],
    extra:'Free accommodation provided.', status:'active' },
  { id:'D4', name:'Romania', flag:'🇷🇴', code:'ro', type:'work', image:null,
    salary:'€600-€900/month', duration:'1 year',
    desc:'Hyper store and retail job opportunities in Romania.',
    jobs:['Hyper Store Job'], docs:['Standard work permit documents'],
    extra:'Accommodation provided by company.', status:'active' },
  { id:'D5', name:'Turkey', flag:'🇹🇷', code:'tr', type:'work', image:null,
    salary:'$500-$900/month', duration:'1-2 years',
    desc:'Multiple work permit options in Turkey.',
    jobs:['Dumper Driver','Truck Mechanic','Mixer Driver','Tire Repairman','Excavator Operator','General Welder','Loader/Grader Operator','Construction Worker','Cloth/Cotton Factory Worker'],
    docs:['Standard work permit documents'], extra:'', status:'active' },
  { id:'D6', name:'Serbia', flag:'🇷🇸', code:'rs', type:'work', image:null,
    salary:'€500-€800/month', duration:'1 year (extendable)',
    desc:'Farming jobs with full benefits package.',
    jobs:['Farming (Helper)'], docs:['Standard work permit documents'],
    extra:'1 Year (Extendable). Accommodation, medical & transport provided by company.', status:'active' },
  { id:'D7', name:'Greece', flag:'🇬🇷', code:'gr', type:'work', image:null,
    salary:'€700-€1,000/month', duration:'1 year (extendable)',
    desc:'Greek work permit for farming sector.',
    jobs:['Farming'], docs:['Standard work permit documents'],
    extra:'1 Year Work Permit (Extendable).', status:'active' },
  { id:'D8', name:'Malaysia Visit', flag:'🇲🇾', code:'my', type:'visit', image:null,
    salary:'', duration:'30-90 days',
    desc:'Tourist visa for Malaysia with e-Visa option.',
    jobs:['Tourist / Visit Visa'],
    docs:['Passport','Bank statement','Photos','Hotel booking','Flight ticket'],
    extra:'e-Visa option available.', status:'active' },
  { id:'D9', name:'Azerbaijan', flag:'🇦🇿', code:'az', type:'visit', image:null,
    salary:'', duration:'30 days',
    desc:'Quick e-Visa for Azerbaijan tourism.',
    jobs:['Tourist / Visit Visa'], docs:['Passport','Photos','Hotel booking'],
    extra:'Quick e-Visa processing.', status:'active' },
  { id:'D10', name:'Saudi Arabia', flag:'🇸🇦', code:'sa', type:'visit', image:null,
    salary:'', duration:'Multiple',
    desc:'Saudi tourist, Umrah, and family visit visas.',
    jobs:['Tourist Visa','Umrah Visa','Family Visit Visa'],
    docs:['Passport','Photos','Family ID (for family visit)'],
    extra:'e-Visa available for tourists. Multiple entry available.', status:'active' },
  { id:'D11', name:'South Korea', flag:'🇰🇷', code:'kr', type:'business', image:null,
    salary:'', duration:'30-90 days',
    desc:'Business visit visa with 100% success rate.',
    jobs:['Business Visit Visa'],
    docs:['Passport','ID Card','Photo','FRC (Family Registration Certificate)','Bank Statement showing 2-2.5 million'],
    extra:'100% Success Rate. Hassle-Free Documentation.', status:'active' },
  { id:'D12', name:'UAE Business', flag:'🇦🇪', code:'ae', type:'business', image:null,
    salary:'', duration:'14-90 days',
    desc:'UAE business and investor visas.',
    jobs:['Business Visit Visa','Investor Visa'],
    docs:['Passport','Company documents','Bank statement','Photos','Invitation letter'],
    extra:'14, 30, 60, 90 days options available.', status:'active' }
];

window.COUNTRIES = DEFAULT_COUNTRIES.slice();
window.TESTIMONIALS = [];

// ────── Load from Firebase ──────
window.loadSiteContent = async function(){
  if(!window.BMS) return;
  try {
    const doc = await window.BMS.getOne('businesses', 'visa');
    if(doc && doc.countries && doc.countries.length){
      window.COUNTRIES = doc.countries.filter(c => c.status !== 'hidden');
    }
    if(doc && doc.testimonials){
      window.TESTIMONIALS = doc.testimonials.filter(t => t.status !== 'hidden');
    }
  } catch(e){
    console.warn('Could not load Firebase content, using defaults:', e);
  }
};

// ────── Render countries grid ──────
window.renderCountriesGrid = function(filter='all', gridId='countryGrid', limit=null){
  const grid = document.getElementById(gridId);
  if(!grid) return;
  let list = filter === 'all' ? COUNTRIES : COUNTRIES.filter(c => c.type === filter);
  if(limit) list = list.slice(0, limit);

  if(list.length === 0){
    grid.innerHTML = `<div class="col-12" style="text-align:center;padding:40px;color:var(--muted)">
      <i class="bi bi-globe" style="font-size:2.5rem;margin-bottom:10px;display:block"></i>
      <p>No countries available in this category</p>
    </div>`;
    return;
  }

  grid.innerHTML = list.map((c) => {
    const typeLabel = { work:'WORK PERMIT', visit:'VISIT VISA', business:'BUSINESS', study:'STUDY VISA' }[c.type] || c.type.toUpperCase();
    const imgSrc = c.image || `https://flagcdn.com/w640/${c.code}.png`;
    return `<div class="col-6 col-md-4 col-lg-3">
      <div class="country-card" onclick="showCountry(${COUNTRIES.indexOf(c)})">
        <div class="country-img">
          <img class="flag-display" src="${imgSrc}" alt="${c.name}" loading="lazy"
               onerror="this.src='https://flagcdn.com/w640/${c.code}.png'"/>
          <span class="country-type ${c.type}">${typeLabel}</span>
          <div class="country-name"><span class="flag-emoji">${c.flag||''}</span> ${c.name}</div>
        </div>
        <div class="country-body">
          ${c.salary ? `<div style="font-size:.78rem;color:#059669;font-weight:700;margin-bottom:8px"><i class="bi bi-cash-coin me-1"></i>${c.salary}</div>` : ''}
          <button class="country-cta">View Details <i class="bi bi-arrow-right ms-1"></i></button>
        </div>
      </div>
    </div>`;
  }).join('');
};

window.filterCountries = function(type, btn){
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  renderCountriesGrid(type);
};

window.showCountry = function(idx){
  const c = COUNTRIES[idx];
  if(!c) return;
  const typeLabel = { work:'Work Permit', visit:'Visit Visa', business:'Business Visit', study:'Study Visa' }[c.type] || c.type;
  const imgSrc = c.image || `https://flagcdn.com/w640/${c.code}.png`;
  document.getElementById('cdContent').innerHTML = `
    <div style="height:240px;position:relative;overflow:hidden;background:#e2e8f0">
      <img src="${imgSrc}" alt="${c.name}" style="width:100%;height:100%;object-fit:cover;display:block"
           onerror="this.src='https://flagcdn.com/w640/${c.code}.png'"/>
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(10,37,64,.95) 100%)"></div>
      <button class="btn-close btn-close-white" data-bs-dismiss="modal" style="position:absolute;top:14px;right:14px;background-color:rgba(0,0,0,.6);padding:14px;border-radius:50%;opacity:1;z-index:10"></button>
      <div style="position:absolute;bottom:20px;left:24px;right:24px;color:#fff;z-index:1">
        <span style="background:var(--orange);padding:5px 14px;border-radius:6px;font-size:.72rem;font-weight:700">${c.flag||''} ${typeLabel.toUpperCase()}</span>
        <h3 style="font-weight:900;margin-top:10px;font-size:1.8rem;letter-spacing:-.5px;text-shadow:0 2px 8px rgba(0,0,0,.5)">${c.name}</h3>
      </div>
    </div>
    <div style="padding:28px;max-height:60vh;overflow-y:auto">
      ${c.desc ? `<p style="color:#475569;font-size:.95rem;line-height:1.7;margin-bottom:16px">${c.desc}</p>` : ''}

      ${(c.salary || c.duration) ? `<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:18px">
        ${c.salary ? `<div style="flex:1;min-width:140px;background:#f0fdf4;border:1px solid #bbf7d0;padding:12px;border-radius:8px"><div style="font-size:.7rem;color:#059669;font-weight:700;letter-spacing:1px">SALARY</div><div style="font-weight:800;color:#064e3b;font-size:.95rem">${c.salary}</div></div>` : ''}
        ${c.duration ? `<div style="flex:1;min-width:140px;background:#eff6ff;border:1px solid #bfdbfe;padding:12px;border-radius:8px"><div style="font-size:.7rem;color:#2563eb;font-weight:700;letter-spacing:1px">DURATION</div><div style="font-weight:800;color:#1e40af;font-size:.95rem">${c.duration}</div></div>` : ''}
      </div>` : ''}

      ${c.jobs && c.jobs.length ? `<h6 style="font-weight:800;margin-bottom:10px;font-size:.95rem;color:var(--navy)"><i class="bi bi-briefcase-fill me-1"></i> Available Jobs / Categories</h6>
      <ul style="padding-left:20px;font-size:.88rem;color:#475569;line-height:1.8">
        ${c.jobs.map(j => `<li>${j}</li>`).join('')}
      </ul>` : ''}

      ${c.docs && c.docs.length ? `<h6 style="font-weight:800;margin-top:20px;margin-bottom:10px;font-size:.95rem;color:var(--navy)"><i class="bi bi-file-earmark-text-fill me-1"></i> Required Documents</h6>
      <ul style="padding-left:20px;font-size:.88rem;color:#475569;line-height:1.8">
        ${c.docs.map(d => `<li>${d}</li>`).join('')}
      </ul>` : ''}

      ${c.extra ? `<div style="background:#f0fdf4;border-left:4px solid var(--success);padding:14px;border-radius:8px;margin-top:20px;font-size:.88rem;color:#064e3b"><strong><i class="bi bi-info-circle me-1"></i> Important:</strong> ${c.extra}</div>` : ''}

      <div style="display:flex;gap:10px;margin-top:24px;flex-wrap:wrap">
        <a href="apply.html?country=${encodeURIComponent(c.name)}&type=${c.type}" style="flex:1;min-width:160px;background:var(--orange);color:#fff;padding:13px;border-radius:8px;font-weight:700;text-align:center;text-decoration:none">
          <i class="bi bi-file-earmark-plus-fill me-1"></i> Apply Now
        </a>
        <a href="https://wa.me/923474402416?text=Hi,%20I%20am%20interested%20in%20${encodeURIComponent(c.name)}%20${encodeURIComponent(typeLabel)}" target="_blank" style="flex:1;min-width:160px;background:var(--whatsapp);color:#fff;padding:13px;border-radius:8px;font-weight:700;text-align:center;text-decoration:none">
          <i class="bi bi-whatsapp me-1"></i> WhatsApp
        </a>
      </div>
    </div>
  `;
  new bootstrap.Modal(document.getElementById('cdModal')).show();
};

window.renderTestimonialsGrid = function(gridId='testimonialsGrid', limit=null){
  const grid = document.getElementById(gridId);
  if(!grid) return;
  let list = TESTIMONIALS.slice();
  if(limit) list = list.slice(0, limit);

  if(list.length === 0){
    const wrapper = grid.closest('section');
    if(wrapper) wrapper.style.display = 'none';
    return;
  }

  grid.innerHTML = list.map(t => {
    const stars = '⭐'.repeat(+t.rating || 5);
    const photo = t.photo
      ? `<img src="${t.photo}" style="width:64px;height:64px;border-radius:50%;object-fit:cover;border:3px solid var(--orange-light)"/>`
      : `<div style="width:64px;height:64px;border-radius:50%;background:var(--orange-light);color:var(--orange);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.6rem;border:3px solid var(--orange-light)">${(t.name||'?').charAt(0).toUpperCase()}</div>`;
    return `<div class="col-md-6 col-lg-4">
      <div style="background:#fff;border:1px solid var(--border);border-radius:14px;padding:28px;height:100%;position:relative;box-shadow:0 4px 12px rgba(10,37,64,.04)">
        <div style="font-size:3.5rem;color:var(--orange-light);line-height:1;position:absolute;top:14px;right:20px;font-family:Georgia,serif">"</div>
        <div style="display:flex;gap:14px;align-items:center;margin-bottom:14px;position:relative;z-index:1">
          ${photo}
          <div>
            <div style="font-weight:800;color:var(--navy);font-size:1rem">${t.name||'Anonymous'}</div>
            ${t.country ? `<div style="font-size:.78rem;color:var(--muted);margin-top:2px"><i class="bi bi-geo-alt-fill" style="color:var(--orange)"></i> ${t.country}</div>` : ''}
            <div style="font-size:.82rem;margin-top:3px">${stars}</div>
          </div>
        </div>
        <p style="font-size:.92rem;color:#475569;line-height:1.7;margin:0;font-style:italic">"${t.message||''}"</p>
      </div>
    </div>`;
  }).join('');
};
