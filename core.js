function iniciales(nombre) {
  return nombre.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase();
}
function avatarColor(nombre) {
  let h = 0; for (let c of nombre) h = (h * 31 + c.charCodeAt(0)) & 0xFFFF;
  return avatarColors[h % avatarColors.length];
}
function fmtEur(n) {
  if (n >= 1000) return '€' + (n/1000).toFixed(0) + 'K';
  return '€' + n.toLocaleString('es-ES');
}
function margenPct(precio, coste) { return ((precio - coste) / precio * 100).toFixed(1); }
function margenBar(pct, color='var(--accent-2)') {
  const p = Math.min(parseFloat(pct), 50);
  const frac = p / 50 * 100;
  const barColor = p < 15 ? 'var(--danger)' : p < 22 ? 'var(--warn)' : color;
  return `<div class="margin-bar"><div class="bar-track"><div class="bar-fill" style="width:${frac}%;background:${barColor};"></div></div><span style="font-size:12px;font-family:'Inter',sans-serif;">${pct}%</span></div>`;
}

// ===== RENDER FUNCTIONS =====
function renderClientes(data) {
  const tbody = document.getElementById('clientes-tbody');
  tbody.innerHTML = data.map(c => {
    const mg = margenPct(c.facturacion, c.coste);
    const moMes = (c.facturacion - c.coste).toLocaleString('es-ES') + ' €';
    const moAnio = ((c.facturacion - c.coste) * 12).toLocaleString('es-ES') + ' €';
    const ini = iniciales(c.nombre);
    const col = avatarColor(c.nombre);
    return `<tr onclick="openDetalle('${c.id}')">
      <td>
        <div style="display:flex;align-items:center;gap:9px;">
          <div class="avatar-sm" style="background:${col};width:26px;height:26px;font-size:10px;">${ini}</div>
          <div style="font-weight:500;">${c.nombre}</div>
        </div>
      </td>
      <td style="font-size:13px;color:var(--text-2);">${c.gestor}</td>
      <td style="text-align:center;font-size:13px;">${c.sedes}</td>
      <td style="text-align:center;font-size:13px;">${c.servicios}</td>
      <td><span class="num">${fmtEur(c.facturacion)}</span></td>
      <td>
        <div style="line-height:1.3;">
          <div class="num" style="font-size:12.5px;">${moMes}</div>
          <div style="font-size:11px;color:var(--text-3);">${moAnio} / año</div>
        </div>
      </td>
      <td><span class="badge ${c.estado}"><span class="badge-dot"></span>${c.estado.charAt(0).toUpperCase()+c.estado.slice(1)}</span></td>
      <td><button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();openDetalle('${c.id}')">Ver →</button></td>
    </tr>`;
  }).join('');
  document.getElementById('clientes-count').textContent = data.length + ' clientes';
}

function renderServicios(containerId, data) {
  // Global servicios view (all-servicios-tbody) keeps old table
  if (containerId === 'all-servicios-tbody') {
    const tbody = document.getElementById(containerId);
    tbody.innerHTML = data.map(s => {
      const mg = ((s.precioMes - s.costeMes) / s.precioMes * 100).toFixed(1);
      return `<tr>
        <td class="mono" style="font-size:11.5px;color:var(--text-2);">${s.cod}</td>
        <td style="font-weight:500;">${s.nombre}</td>
        <td style="font-size:13px;color:var(--text-2);">${s.cliente}</td>
        <td style="font-size:13px;color:var(--text-2);">${s.proveedor}</td>
        <td><span style="font-size:12px;background:var(--bg);padding:2px 7px;border-radius:4px;">${s.frecuencia}</span></td>
        <td><span class="num">${fmtEur(s.precioMes)}</span></td>
        <td><span class="num" style="color:var(--text-2);">${fmtEur(s.costeMes)}</span></td>
        <td><span style="font-size:12px;font-family:'Inter',sans-serif;color:var(--accent-2);font-weight:600;">${mg}%</span></td>
        <td><span class="badge ${s.estado}"><span class="badge-dot"></span>${s.estado.charAt(0).toUpperCase()+s.estado.slice(1)}</span></td>
      </tr>`;
    }).join('');
    return;
  }

  // Detalle cliente: card-based expandable view
  const container = document.getElementById(containerId);
  if (!container) return;

  // Update summary label with filter tabs
  const activos = data.filter(s => s.estado === 'activo');
  const cancelados = data.filter(s => s.estado === 'cancelado');
  const moTotal = activos.reduce((a,s) => a + (s.precioMes - s.costeMes), 0);
  const factTotal = activos.reduce((a,s) => a + s.precioMes, 0);
  const lbl = document.getElementById('srv-resumen-label');
  if (lbl) lbl.innerHTML = `
    <div style="display:flex;align-items:center;gap:6px;">
      <button onclick="srvFilter('activo')" id="srvtab-activo" style="font-size:12px;padding:4px 10px;border-radius:6px;border:1px solid var(--border);background:var(--text);color:white;cursor:pointer;font-family:inherit;font-weight:500;">${activos.length} activos</button>
      <button onclick="srvFilter('cancelado')" id="srvtab-cancelado" style="font-size:12px;padding:4px 10px;border-radius:6px;border:1px solid var(--border);background:var(--surface);color:var(--text-2);cursor:pointer;font-family:inherit;">${cancelados.length} cancelados</button>
      <span style="color:var(--border-strong);">|</span>
      <span style="font-size:12px;color:var(--text-2);">Fact. recurrente: <strong style="font-family:'Inter',sans-serif;">€${factTotal.toLocaleString('es-ES')}/mes</strong></span>
      <span style="font-size:12px;color:var(--accent-2);">· MO: <strong style="font-family:'Inter',sans-serif;">€${moTotal.toLocaleString('es-ES')}/mes</strong></span>
    </div>`;

  window._srvAllData = data;
  window._srvCurrentFilter = 'activo';
  renderSrvCards(data.filter(s => s.estado === 'activo'));
}

window.srvFilter = function(estado) {
  window._srvCurrentFilter = estado;
  const actBtn = document.getElementById('srvtab-activo');
  const canBtn = document.getElementById('srvtab-cancelado');
  if (actBtn) { actBtn.style.background = estado === 'activo' ? 'var(--text)' : 'var(--surface)'; actBtn.style.color = estado === 'activo' ? 'white' : 'var(--text-2)'; }
  if (canBtn) { canBtn.style.background = estado === 'cancelado' ? 'var(--text)' : 'var(--surface)'; canBtn.style.color = estado === 'cancelado' ? 'white' : 'var(--text-2)'; }
  renderSrvCards((window._srvAllData || []).filter(s => s.estado === estado));
}

function renderSrvCards(data) {
  const container = document.getElementById('servicios-cards');
  if (!container) return;

  const fmtFull = n => n != null ? '€' + n.toLocaleString('es-ES', {minimumFractionDigits:0}) : '—';
  const fmtH = n => n != null ? '€' + n.toFixed(2) + '/h' : '—';
  const fmtU = n => n != null ? '€' + n.toFixed(2) + '/ud' : '—';

  const encargoLabel = e => e === 'firmado'
    ? `<span class="badge firmado" style="font-size:10px;"><svg width="9" height="9" viewBox="0 0 16 16" fill="none" style="display:inline;vertical-align:-1px;margin-right:2px;"><path d="M3 8l3 3 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Encargo firmado</span>`
    : `<span class="badge pen-firma" style="font-size:10px;"><svg width="9" height="9" viewBox="0 0 16 16" fill="none" style="display:inline;vertical-align:-1px;margin-right:2px;"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5"/><path d="M8 5v3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="11" r="0.6" fill="currentColor"/></svg>Pendiente firma</span>`;

  container.innerHTML = data.length === 0
    ? `<div style="text-align:center;padding:40px;color:var(--text-3);font-size:13px;">No hay servicios en este estado.</div>`
    : data.map((s, i) => {
    const isCancelled = s.estado === 'cancelado';
    const mg = ((s.precioMes - s.costeMes) / s.precioMes * 100).toFixed(1);
    const moMes = s.precioMes - s.costeMes;
    const moAnio = s.precioAnio - s.costeAnio;
    const mgColor = isCancelled ? 'var(--text-3)' : parseFloat(mg) < 15 ? 'var(--danger)' : parseFloat(mg) < 22 ? 'var(--warn)' : 'var(--accent-2)';
    const cardOpacity = isCancelled ? 'opacity:0.75;' : '';

    return `
    <div class="srv-card" id="srv-card-${i}" style="${cardOpacity}">

      <!-- Header -->
      <div class="srv-header" onclick="toggleSrv(${i})" style="${isCancelled ? 'background:var(--surface-2);' : ''}">
        <svg class="srv-chevron" width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <div style="flex:1;min-width:0;">
          <div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap;">
            <span style="font-size:13.5px;font-weight:600;${isCancelled ? 'text-decoration:line-through;color:var(--text-2);' : ''}">${s.nombre}</span>
            ${isCancelled
              ? `<span class="badge cancelado" style="font-size:10px;"><span class="badge-dot"></span>Cancelado</span>`
              : `<span class="badge activo" style="font-size:10px;"><span class="badge-dot"></span>Activo</span>`
            }
            ${encargoLabel(s.encargo)}
            <span style="font-size:11px;color:var(--text-3);">${s.cod}</span>
          </div>
          <div style="font-size:12px;color:var(--text-2);margin-top:3px;">
            ${s.proveedor} &nbsp;·&nbsp; ${s.frecuencia} &nbsp;·&nbsp; Arranque: ${s.arranque}
            ${isCancelled && s.cancelacion ? `&nbsp;·&nbsp; <span style="color:var(--danger);">Cancelado: ${s.cancelacion}</span>` : ''}
          </div>
        </div>
        <!-- KPIs resumen -->
        <div style="display:flex;gap:24px;flex-shrink:0;${isCancelled ? 'opacity:0.5;' : ''}">
          <div style="text-align:right;">
            <div style="font-size:10px;color:var(--text-3);margin-bottom:1px;">Cliente / mes</div>
            <div style="font-family:'Inter',sans-serif;font-size:13px;font-weight:600;">${fmtFull(s.precioMes)}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:10px;color:var(--text-3);margin-bottom:1px;">Margen</div>
            <div style="font-family:'Inter',sans-serif;font-size:13px;font-weight:700;color:${mgColor};">${mg}%</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:10px;color:var(--text-3);margin-bottom:1px;">MO / mes</div>
            <div style="font-family:'Inter',sans-serif;font-size:13px;font-weight:600;color:${isCancelled ? 'var(--text-3)' : 'var(--accent-2)'};">${fmtFull(moMes)}</div>
          </div>
        </div>
      </div>

      <!-- Body -->
      <div class="srv-body">

        <!-- Identificación -->
        <div class="srv-section-label">Identificación del servicio</div>
        <div class="srv-grid" style="grid-template-columns:2fr 1fr 1fr 1fr;">
          <div class="srv-field">
            <div class="srv-field-label">Servicio prestado</div>
            <div class="srv-field-value strong">${s.nombre}</div>
          </div>
          <div class="srv-field">
            <div class="srv-field-label">Frecuencia</div>
            <div class="srv-field-value">${s.frecuencia}</div>
          </div>
          <div class="srv-field">
            <div class="srv-field-label">Fecha arranque</div>
            <div class="srv-field-value mono">${s.arranque}</div>
          </div>
          <div class="srv-field">
            <div class="srv-field-label">Encargo</div>
            <div style="margin-top:4px;">${encargoLabel(s.encargo)}</div>
          </div>
        </div>
        <div class="srv-grid" style="grid-template-columns:1fr${isCancelled ? ' 1fr' : ''};">
          <div class="srv-field">
            <div class="srv-field-label">Alcance del servicio</div>
            <div class="srv-field-value muted">${s.alcance}</div>
          </div>
          ${isCancelled ? `<div class="srv-field" style="background:var(--danger-light);">
            <div class="srv-field-label" style="color:var(--danger);">Motivo cancelación</div>
            <div class="srv-field-value" style="color:var(--danger);">${s.motivoCancelacion || '—'}</div>
            <div style="font-size:11px;color:var(--danger);opacity:0.7;margin-top:2px;">Cancelado el ${s.cancelacion}</div>
          </div>` : ''}
        </div>

        <!-- Costes proveedor -->
        <div class="srv-section-label">Costes proveedor</div>
        <div class="srv-grid" style="grid-template-columns:repeat(4,1fr);">
          <div class="srv-field">
            <div class="srv-field-label">Coste mensual</div>
            <div class="srv-field-value mono strong">${fmtFull(s.costeMes)}</div>
          </div>
          <div class="srv-field">
            <div class="srv-field-label">Coste anual</div>
            <div class="srv-field-value mono">${fmtFull(s.costeAnio)}</div>
          </div>
          <div class="srv-field">
            <div class="srv-field-label">€ / hora</div>
            <div class="srv-field-value mono">${fmtH(s.costeHora)}</div>
          </div>
          <div class="srv-field">
            <div class="srv-field-label">€ / unidad</div>
            <div class="srv-field-value mono">${fmtU(s.costeUd)}</div>
          </div>
        </div>

        <!-- Facturación cliente -->
        <div class="srv-section-label">Facturación cliente</div>
        <div class="srv-grid" style="grid-template-columns:repeat(4,1fr);">
          <div class="srv-field">
            <div class="srv-field-label">Precio mensual</div>
            <div class="srv-field-value mono strong">${fmtFull(s.precioMes)}</div>
          </div>
          <div class="srv-field">
            <div class="srv-field-label">Precio anual</div>
            <div class="srv-field-value mono">${fmtFull(s.precioAnio)}</div>
          </div>
          <div class="srv-field">
            <div class="srv-field-label">€ / hora</div>
            <div class="srv-field-value mono">${fmtH(s.precioHora)}</div>
          </div>
          <div class="srv-field">
            <div class="srv-field-label">€ / unidad</div>
            <div class="srv-field-value mono">${fmtU(s.precioUd)}</div>
          </div>
        </div>

        <!-- Rentabilidad -->
        <div class="srv-section-label">Rentabilidad</div>
        <div class="srv-grid" style="grid-template-columns:repeat(4,1fr);">
          <div class="srv-field">
            <div class="srv-field-label">% Margen</div>
            <div class="srv-field-value mono" style="font-size:16px;font-weight:700;color:${mgColor};">${mg}%</div>
          </div>
          <div class="srv-field">
            <div class="srv-field-label">MO mensual</div>
            <div class="srv-field-value mono" style="font-size:15px;font-weight:600;color:${isCancelled ? 'var(--text-3)' : 'var(--accent-2)'};">${fmtFull(moMes)}</div>
          </div>
          <div class="srv-field">
            <div class="srv-field-label">MO anual</div>
            <div class="srv-field-value mono" style="font-size:15px;font-weight:600;color:${isCancelled ? 'var(--text-3)' : 'var(--accent-2)'};">${fmtFull(moAnio)}</div>
          </div>
          <div class="srv-field" style="display:flex;flex-direction:column;justify-content:center;">
            <div class="srv-field-label">Barra margen</div>
            <div style="margin-top:6px;">
              <div style="height:5px;background:var(--border);border-radius:3px;">
                <div style="width:${Math.min(parseFloat(mg),50)*2}%;height:100%;background:${mgColor};border-radius:3px;"></div>
              </div>
              <div style="font-size:10px;color:var(--text-3);margin-top:3px;">${mg}% sobre precio cliente</div>
            </div>
          </div>
        </div>

      </div>
    </div>`;
  }).join('');

}

function renderOTs(data) {
  const tbody = document.getElementById('ots-tbody');
  const prioColor = { 'Crítica': 'var(--danger)', 'Alta': 'var(--warn)', 'Normal': 'var(--text-3)' };
  tbody.innerHTML = data.map(ot => {
    const pcol = prioColor[ot.prioridad] || 'var(--text-3)';
    const tec = ot.tecnico !== 'Sin asignar'
      ? `<div style="display:flex;align-items:center;gap:6px;"><div class="avatar-sm" style="background:${avatarColor(ot.tecnico)};">${iniciales(ot.tecnico)}</div><span style="font-size:12px;">${ot.tecnico}</span></div>`
      : `<span style="font-size:12px;color:var(--danger);">Sin asignar</span>`;
    return `<tr>
      <td class="mono" style="font-size:12px;color:var(--text-2);">${ot.id}</td>
      <td style="font-weight:500;font-size:13px;max-width:180px;">${ot.desc}</td>
      <td>
        <div style="font-weight:500;font-size:13px;">${ot.cliente}</div>
        <div style="font-size:11px;color:var(--text-3);">${ot.sede}</div>
      </td>
      <td style="font-size:12.5px;color:var(--text-2);">${ot.servicio}</td>
      <td><span class="badge ${ot.estado}"><span class="badge-dot"></span>${ot.estado.charAt(0).toUpperCase()+ot.estado.slice(1)}</span></td>
      <td><span style="font-size:12px;font-weight:500;color:${pcol};">${ot.prioridad}</span></td>
      <td>${tec}</td>
      <td style="font-size:12px;color:var(--text-2);" class="mono">${ot.fecha}</td>
      <td><button class="btn btn-ghost btn-sm">Ver</button></td>
    </tr>`;
  }).join('');
}

// ===== NAVIGATION =====
const views = ['dashboard','clientes','detalle-cliente','servicios','ots','proveedores','detalle-proveedor'];
function showView(v) {
  views.forEach(id => {
    const el = document.getElementById('view-'+id);
    if (el) el.classList.add('hidden');
  });
  document.getElementById('view-'+v).classList.remove('hidden');

  // Update nav
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', !!el.getAttribute('onclick') && el.getAttribute('onclick').indexOf("'"+v+"'") >= 0);
  });

  // Render data
  if (v === 'clientes') renderClientes(clientes);
  if (v === 'servicios') renderServicios('all-servicios-tbody', serviciosData);
  if (v === 'ots') renderOTs(otsData);
}

function openDetalle(clienteId) {
  const c = clientes.find(x => x.id === clienteId);
  if (!c) return;
  document.getElementById('dc-breadcrumb').textContent = c.nombre;
  document.getElementById('dc-nombre').textContent = c.nombre;
  document.getElementById('dc-codigo').textContent = c.id;
  document.getElementById('dc-gestor').textContent = 'Gestor: ' + c.gestor;
  document.getElementById('dc-sedes-count').textContent = c.sedes + ' sedes';
  document.getElementById('dc-estado-badge').className = 'badge ' + c.estado;
  document.getElementById('dc-estado-badge').innerHTML = '<span class="badge-dot"></span>' + (c.estado.charAt(0).toUpperCase()+c.estado.slice(1));

  // Render servicios for this client
  const svcs = serviciosData.filter(s => s.cliente === c.nombre);
  renderServicios('servicios-cards', svcs);

  switchTab('general');
  showView('detalle-cliente');
}

// ===== TABS =====
const tabNames = ['general','servicios','presupuestos','sedes','contactos','actividad','calendario','documentos'];
function switchTab(name) {
  tabNames.forEach(t => {
    document.getElementById('tab-'+t).classList.add('hidden');
  });
  document.getElementById('tab-'+name).classList.remove('hidden');
  document.querySelectorAll('.tab').forEach((el, i) => {
    el.classList.toggle('active', tabNames[i] === name);
  });
}

// ===== FILTERS =====
function applyFilters() {
  const q = (document.getElementById('filter-search')?.value || '').toLowerCase();
  const estado = document.getElementById('filter-estado')?.value || '';
  const gestor = document.getElementById('filter-gestor')?.value || '';
  const filtered = clientes.filter(c => {
    const matchQ = !q || c.nombre.toLowerCase().includes(q) || c.gestor.toLowerCase().includes(q) || c.sector?.toLowerCase().includes(q);
    const matchEstado = !estado || c.estado === estado;
    const matchGestor = !gestor || c.gestor === gestor;
    return matchQ && matchEstado && matchGestor;
  });
  renderClientes(filtered);
}
// legacy aliases (por si se usan en otro sitio)
function filterClientes(q) { applyFilters(); }
function filterClientesByEstado(e) { applyFilters(); }

// ===== MODALS =====
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
document.querySelectorAll('.modal-overlay').forEach(el => {
  el.addEventListener('click', e => { if (e.target === el) el.classList.remove('open'); });
});

// ===== TOAST =====
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = '✓ ' + msg;
  t.style.opacity = '1';
  t.style.transform = 'translateY(0)';
  setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateY(8px)'; }, 2800);
}

// ===== SERVICE CARDS =====
function toggleSrv(i) {
  const card = document.getElementById('srv-card-' + i);
  if (card) card.classList.toggle('open');
}


// ===== MODAL NUEVO SERVICIO =====
function toggleEncargoStyle() {
  const val = document.querySelector('input[name="ns-encargo"]:checked')?.value;
  const f = document.getElementById('lbl-firmado');
  const p = document.getElementById('lbl-pen-firma');
  if (f) { f.style.borderColor = val === 'firmado' ? 'var(--accent-2)' : 'var(--border)'; f.style.background = val === 'firmado' ? 'var(--accent-2-light)' : ''; }
  if (p) { p.style.borderColor = val === 'pendiente' ? 'var(--warn)' : 'var(--border)'; p.style.background = val === 'pendiente' ? 'var(--warn-light)' : ''; }
}
function calcNsMargen() {
  const coste = parseFloat(document.getElementById('ns-coste-mes')?.value) || 0;
  const precio = parseFloat(document.getElementById('ns-precio-mes')?.value) || 0;
  const costeAnioEl = document.getElementById('ns-coste-anio');
  const precioAnioEl = document.getElementById('ns-precio-anio');
  if (costeAnioEl) costeAnioEl.value = coste > 0 ? (coste * 12).toFixed(0) : '';
  if (precioAnioEl) precioAnioEl.value = precio > 0 ? (precio * 12).toFixed(0) : '';
  const pct = document.getElementById('ns-margen-pct');
  const moMes = document.getElementById('ns-mo-mes');
  const moAnio = document.getElementById('ns-mo-anio');
  const bar = document.getElementById('ns-margen-bar');
  if (precio > 0 && coste > 0) {
    const mg = (precio - coste) / precio * 100;
    const mo = precio - coste;
    const col = mg < 15 ? 'var(--danger)' : mg < 22 ? 'var(--warn)' : 'var(--accent-2)';
    if (pct) { pct.textContent = mg.toFixed(1) + '%'; pct.style.color = col; }
    if (moMes) { moMes.textContent = '€' + mo.toLocaleString('es-ES'); moMes.style.color = col; }
    if (moAnio) { moAnio.textContent = '€' + (mo * 12).toLocaleString('es-ES'); moAnio.style.color = col; }
    if (bar) { bar.style.width = Math.min(mg, 50) * 2 + '%'; bar.style.background = col; }
  } else {
    [pct, moMes, moAnio].forEach(el => { if (el) { el.textContent = '—'; el.style.color = 'var(--text-3)'; } });
    if (bar) bar.style.width = '0%';
  }
}
function guardarServicio() {
  const nombre = document.getElementById('ns-nombre')?.value.trim();
  if (!nombre) { document.getElementById('ns-nombre').style.borderColor = 'var(--danger)'; document.getElementById('ns-nombre').focus(); return; }
  closeModal('modal-nuevo-servicio');
  showToast('Servicio "' + nombre + '" añadido correctamente');
}

function igEdit() {
  document.getElementById('ig-btns-view').style.display = 'none';
  document.getElementById('ig-btns-edit').style.display = 'flex';
  document.querySelectorAll('.ig-val').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.ig-inp').forEach(el => {
    el.style.display = 'block';
    // sync select value to match displayed text
    if (el.tagName === 'SELECT') {
      const valEl = document.getElementById(el.dataset.field);
      if (valEl) {
        for (const opt of el.options) {
          if (opt.text === valEl.textContent.trim()) { opt.selected = true; break; }
        }
      }
    }
  });
  document.querySelectorAll('.ig-cell').forEach(el => el.classList.add('editing'));
}
function igCancel() {
  document.getElementById('ig-btns-view').style.display = 'flex';
  document.getElementById('ig-btns-edit').style.display = 'none';
  document.querySelectorAll('.ig-val').forEach(el => el.style.display = '');
  document.querySelectorAll('.ig-inp').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.ig-cell').forEach(el => el.classList.remove('editing'));
}
function igSave() {
  document.querySelectorAll('.ig-inp').forEach(el => {
    const fieldId = el.dataset.field;
    if (!fieldId || fieldId.endsWith('-raw')) return;
    const valEl = document.getElementById(fieldId);
    if (!valEl) return;
    const newVal = el.tagName === 'SELECT' ? el.options[el.selectedIndex].text : el.value.trim();
    if (newVal) valEl.textContent = newVal;
  });
  igCancel();
  showToast('Cambios guardados correctamente');
}


function toggleEstadoStyle() {
  const val = document.querySelector('input[name="nc-estado"]:checked')?.value;
  document.getElementById('lbl-prospecto').style.borderColor = val === 'prospecto' ? 'var(--warn)' : 'var(--border)';
  document.getElementById('lbl-prospecto').style.background = val === 'prospecto' ? 'var(--warn-light)' : '';
  document.getElementById('lbl-activo').style.borderColor = val === 'activo' ? 'var(--accent-2)' : 'var(--border)';
  document.getElementById('lbl-activo').style.background = val === 'activo' ? 'var(--accent-2-light)' : '';
}
function crearCliente() {
  const nombre = document.getElementById('nc-nombre')?.value.trim();
  const cif = document.getElementById('nc-cif')?.value.trim();
  if (!nombre) { document.getElementById('nc-nombre').focus(); document.getElementById('nc-nombre').style.borderColor='var(--danger)'; return; }
  if (!cif) { document.getElementById('nc-cif').focus(); document.getElementById('nc-cif').style.borderColor='var(--danger)'; return; }
  closeModal('modal-nuevo-cliente');
  showToast('Cliente "' + nombre + '" creado correctamente');
}


// ===== PRESUPUESTOS MODULE =====
// Data
const presupuestosData = {
  'Inditex SA': [
    {
      codigo: 'SAV-IND-26-001', descripcion: 'Control de accesos · instalación sistema completo gama media',
      tipo: 'Seguridad', instalacion: 'Oficinas', fecha: '13/05/2026', estado: 'pendiente',
      fpago: 'Transferencia bancaria', plazo: '60 días fecha factura', banco: 'Bankinter · ES90 0128 6192 0901 0534 2136',
      partidas: [
        { nro:1, desc:'DAHUA - Controlador bidireccional para 4 puertas\nControlador de control de accesos para 4 puertas de 1 sentido\nAdmite comunicación TCP/IP\nProtocolos de comunicación RS-485 y Wiegand 26/34. Capacidad 100.000 usuarios.', ud:'ud', qty:1, pUnit:390.00, margen:25, costeUnit:292.66, proveedor:'STL Security' },
        { nro:2, desc:'BAT - Batería recargable\nBatería recargable · Tecnología plomo ácido AGM\nVoltaje 12V · Capacidad 7.2Ah · 101x151x65mm / 2180g', ud:'ud', qty:1, pUnit:37.80, margen:50, costeUnit:25.20, proveedor:'STL Security' },
        { nro:3, desc:'UPROX - Lector versátil U-Prox SL Mini\nCredenciales móviles · NFC y radio 2.4GHz\nMifare Plus SL1/SL3 y Mifare Classic · RFID 125KHz', ud:'ud', qty:3, pUnit:179.40, margen:22, costeUnit:139.84, proveedor:'STL Security' },
        { nro:4, desc:'Pequeño material', ud:'ud', qty:1, pUnit:140.00, margen:15, costeUnit:118.00, proveedor:'Varios' },
        { nro:5, desc:'MANO DE OBRA - MAD T1\n- Diseño del proyecto desde el departamento de ingeniería técnica.\n- Gestión documental de PRL. (Si procede)\n- Desplazamientos y dietas.\n- Gestión logística.\n- Instalación.\n- Dirección de obra.\n- Puesta en marcha.\n- Formación de uso.', ud:'ud', qty:1, pUnit:450.00, margen:30, costeUnit:315.00, proveedor:'Propia' },
      ]
    },
    {
      codigo: 'SAV-IND-26-002', descripcion: 'Renovación sistema de iluminación LED · planta baja y primera',
      tipo: 'Electricidad', instalacion: 'Sede Central', fecha: '02/04/2026', estado: 'aprobado',
      fpago: 'Transferencia bancaria', plazo: '30 días fecha factura', banco: 'Bankinter · ES90 0128 6192 0901 0534 2136',
      partidas: [
        { nro:1, desc:'Luminaria LED empotrable 36W · UGR<19 · 4000K · 3600lm', ud:'ud', qty:48, pUnit:89.50, margen:25 },
        { nro:2, desc:'Driver regulable DALI · compatible KNX', ud:'ud', qty:48, pUnit:42.00, margen:22 },
        { nro:3, desc:'Cableado y canalizaciones', ud:'ml', qty:320, pUnit:8.50, margen:20 },
        { nro:4, desc:'MANO DE OBRA - Instalación y puesta en marcha', ud:'ud', qty:1, pUnit:2800.00, margen:28 },
      ]
    },
    {
      codigo: 'SAV-IND-26-003', descripcion: 'Mantenimiento preventivo HVAC · revisión anual completa',
      tipo: 'Climatización', instalacion: 'Almacén Zaragoza', fecha: '15/03/2026', estado: 'rechazado',
      fpago: 'Transferencia bancaria', plazo: '60 días fecha factura', banco: 'Bankinter · ES90 0128 6192 0901 0534 2136',
      partidas: [
        { nro:1, desc:'Revisión y limpieza unidades interiores · 32 uds', ud:'ud', qty:32, pUnit:85.00, margen:20 },
        { nro:2, desc:'Revisión unidades exteriores · 8 uds', ud:'ud', qty:8, pUnit:145.00, margen:20 },
        { nro:3, desc:'Recarga gas refrigerante R32 · si procede', ud:'kg', qty:5, pUnit:38.00, margen:18 },
        { nro:4, desc:'MANO DE OBRA - Desplazamiento y dietas', ud:'ud', qty:1, pUnit:480.00, margen:25 },
      ]
    }
  ]
};

let presCurrentCliente = 'Inditex SA';
let presCurrentIndex = null;  // null = creating new
let presPartidas = [];