const sedesData = {
  'Inditex SA': [
    { nombre: 'Sede Central', ciudad: 'Madrid', direccion: 'Calle Bermúdez 12, 28050 Madrid', lat: 40.4537, lng: -3.6883, servicios: 8, metros: 1200, tipo: 'Oficinas corporativas', estado: 'activo' },
    { nombre: 'Almacén Zaragoza', ciudad: 'Zaragoza', direccion: 'Polígono Industrial Malpica, 50016 Zaragoza', lat: 41.6833, lng: -0.9400, servicios: 5, metros: 8400, tipo: 'Almacén logístico', estado: 'activo' },
    { nombre: 'Oficinas Barcelona', ciudad: 'Barcelona', direccion: 'Avda. Diagonal 640, 08017 Barcelona', lat: 41.3951, lng: 2.1385, servicios: 6, metros: 2100, tipo: 'Oficinas', estado: 'activo' },
    { nombre: 'Centro Logístico Valencia', ciudad: 'Valencia', direccion: 'Carrer de la Balconada 8, 46014 Valencia', lat: 39.4567, lng: -0.3763, servicios: 4, metros: 5600, tipo: 'Almacén', estado: 'activo' },
    { nombre: 'Tienda Flagship Bilbao', ciudad: 'Bilbao', direccion: 'Gran Vía de Don Diego López de Haro 16, 48001 Bilbao', lat: 43.2627, lng: -2.9253, servicios: 3, metros: 950, tipo: 'Retail', estado: 'activo' },
  ],
  'Mercadona': [
    { nombre: 'Logística Norte', ciudad: 'Guadalajara', direccion: 'Polígono Industrial El Henares, 19200 Guadalajara', lat: 40.6310, lng: -3.1700, servicios: 7, metros: 12000, tipo: 'Centro logístico', estado: 'activo' },
    { nombre: 'Oficinas Valencia', ciudad: 'Valencia', direccion: 'Carrer de Túria 4, 46008 Valencia', lat: 39.4702, lng: -0.3840, servicios: 2, metros: 800, tipo: 'Oficinas', estado: 'activo' },
  ]
};

let _sedesMap = null;
let _sedesMarkers = [];

function initSedesMap(sedes) {
  const mapEl = document.getElementById('sedes-map');
  if (!mapEl) return;

  // Destroy old map if exists
  if (_sedesMap) {
    _sedesMap.remove();
    _sedesMap = null;
  }
  _sedesMarkers = [];

  // Init Leaflet map
  _sedesMap = L.map('sedes-map', { zoomControl: true, scrollWheelZoom: false });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/">CARTO</a>',
    maxZoom: 18
  }).addTo(_sedesMap);

  if (sedes.length === 0) return;

  // Custom marker icon
  const makeIcon = (n) => L.divIcon({
    className: '',
    html: `<div style="
      width:32px;height:32px;
      background:#1F6FEB;
      border:2.5px solid white;
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      box-shadow:0 2px 8px rgba(31,111,235,0.4);
      display:flex;align-items:center;justify-content:center;
    "><span style="transform:rotate(45deg);color:white;font-size:11px;font-weight:700;font-family:Arial;">${n}</span></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -34]
  });

  const bounds = [];
  sedes.forEach((s, i) => {
    const marker = L.marker([s.lat, s.lng], { icon: makeIcon(i + 1) })
      .addTo(_sedesMap)
      .bindPopup(`
        <div style="font-family:Arial,sans-serif;min-width:180px;">
          <div style="font-size:13px;font-weight:700;margin-bottom:4px;">${s.nombre}</div>
          <div style="font-size:11px;color:#555;margin-bottom:2px;">${s.direccion}</div>
          <div style="font-size:11px;margin-top:6px;display:flex;gap:8px;">
            <span style="background:#EBF2FF;color:#1F6FEB;padding:1px 6px;border-radius:4px;">${s.servicios} servicios</span>
            <span style="background:#E8F7F3;color:#0D9373;padding:1px 6px;border-radius:4px;">${s.metros.toLocaleString('es-ES')} m²</span>
          </div>
        </div>
      `, { maxWidth: 220 });
    _sedesMarkers.push(marker);
    bounds.push([s.lat, s.lng]);
  });

  // Fit map to all markers
  if (bounds.length === 1) {
    _sedesMap.setView(bounds[0], 14);
  } else {
    _sedesMap.fitBounds(bounds, { padding: [40, 40] });
  }
}

function renderSedesList(sedes) {
  const list = document.getElementById('sedes-list');
  const label = document.getElementById('sedes-count-label');
  if (!list) return;
  if (label) label.textContent = sedes.length + ' sede' + (sedes.length !== 1 ? 's' : '');

  list.innerHTML = sedes.map((s, i) => `
    <div class="card" style="overflow:hidden;cursor:pointer;transition:box-shadow 0.15s;" onclick="focusSede(${i})" onmouseenter="this.style.boxShadow='0 2px 12px rgba(0,0,0,0.08)'" onmouseleave="this.style.boxShadow=''">
      <div style="padding:12px 14px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;">
        <div style="width:24px;height:24px;border-radius:50%;background:#1F6FEB;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <span style="color:white;font-size:10px;font-weight:700;">${i+1}</span>
        </div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${s.nombre}</div>
          <div style="font-size:11px;color:var(--text-3);">${s.ciudad}</div>
        </div>
        <span class="badge activo" style="font-size:10px;flex-shrink:0;"><span class="badge-dot"></span>Activa</span>
      </div>
      <div style="padding:10px 14px;">
        <div style="font-size:11.5px;color:var(--text-2);margin-bottom:6px;">
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none" style="display:inline;vertical-align:-1px;margin-right:3px;"><path d="M8 1C5.24 1 3 3.24 3 6c0 4 5 9 5 9s5-5 5-9c0-2.76-2.24-5-5-5zm0 6.5A1.5 1.5 0 118 4a1.5 1.5 0 010 3z" fill="#9E9B95"/></svg>
          ${s.direccion}
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <span style="font-size:10.5px;background:var(--accent-light);color:var(--accent);padding:2px 7px;border-radius:4px;">${s.servicios} servicios</span>
          <span style="font-size:10.5px;background:var(--accent-2-light);color:var(--accent-2);padding:2px 7px;border-radius:4px;">${s.metros.toLocaleString('es-ES')} m²</span>
          <span style="font-size:10.5px;background:var(--bg);color:var(--text-2);padding:2px 7px;border-radius:4px;">${s.tipo}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function focusSede(i) {
  if (!_sedesMap || !_sedesMarkers[i]) return;
  const marker = _sedesMarkers[i];
  _sedesMap.flyTo(marker.getLatLng(), 15, { duration: 0.8 });
  setTimeout(() => marker.openPopup(), 900);
}

function renderSedes(clienteNombre) {
  const sedes = sedesData[clienteNombre] || sedesData['Inditex SA'];
  renderSedesList(sedes);
  // Map init happens when tab becomes visible
  setTimeout(() => initSedesMap(sedes), 50);
}

// Hook into switchTab to init map when sedes tab opens
const _origSwitchTabSedes = switchTab;
switchTab = function(name) {
  _origSwitchTabSedes(name);
  if (name === 'sedes') {
    const clienteNombre = document.getElementById('dc-nombre')?.textContent || 'Inditex SA';
    renderSedes(clienteNombre);
  }
};

// ===== ACTIVIDAD MODULE =====