const DOC_EXT_ICON = {
  pdf:'📄', doc:'📝', docx:'📝', xls:'📊', xlsx:'📊', ppt:'📋', pptx:'📋',
  jpg:'🖼️', jpeg:'🖼️', png:'🖼️', gif:'🖼️', mp4:'🎥', zip:'🗜️', rar:'🗜️',
  eml:'📧', msg:'📧', txt:'📃', dwg:'📐', dxf:'📐', csv:'📊'
};
const DOC_EXT_COLOR = {
  pdf:'#DC2626', doc:'#1F6FEB', docx:'#1F6FEB', xls:'#0D9373', xlsx:'#0D9373',
  ppt:'#D97706', pptx:'#D97706', jpg:'#8B5CF6', jpeg:'#8B5CF6', png:'#8B5CF6',
  dwg:'#EC4899', dxf:'#EC4899', eml:'#06B6D4', msg:'#06B6D4'
};

function docExtIcon(name) { const ext=(name||'').split('.').pop().toLowerCase(); return DOC_EXT_ICON[ext]||'📎'; }
function docExtColor(name){ const ext=(name||'').split('.').pop().toLowerCase(); return DOC_EXT_COLOR[ext]||'var(--text-3)'; }
function docFmtSize(bytes){ if(!bytes) return '—'; if(bytes<1024) return bytes+'B'; if(bytes<1024*1024) return (bytes/1024).toFixed(0)+'KB'; return (bytes/1024/1024).toFixed(1)+'MB'; }
function docFmtFecha(d){ return d||'—'; }

// ── ÁRBOL DE CARPETAS ──────────────────────────────────────────────────────
const docTree = [
  { id:'c1', nombre:'1. Contratos', icono:'📋', color:'#1F6FEB', children:[
    { id:'c1a', nombre:'Contrato principal', icono:'📄' },
    { id:'c1b', nombre:'Adendas', icono:'📄' },
    { id:'c1c', nombre:'Modificaciones contractuales', icono:'📄' },
    { id:'c1d', nombre:'Renovaciones', icono:'📄' },
    { id:'c1e', nombre:'SLA / Anexos de servicio', icono:'📄' },
  ]},
  { id:'c2', nombre:'2. Mantenimiento e informes', icono:'🔧', color:'#0D9373', children:[
    { id:'c2a', nombre:'Informes mantenimiento preventivo', icono:'📋' },
    { id:'c2b', nombre:'Informes correctivos', icono:'📋' },
    { id:'c2c', nombre:'Certificados técnicos', icono:'🏅' },
    { id:'c2d', nombre:'Actas de visita', icono:'📝' },
    { id:'c2e', nombre:'Revisiones técnicas', icono:'🔍' },
  ]},
  { id:'c3', nombre:'3. CAE / PRL / Seguridad', icono:'🦺', color:'#DC2626', children:[
    { id:'c3a', nombre:'Documentación CAE', icono:'📋' },
    { id:'c3b', nombre:'PRL', icono:'⚠️' },
    { id:'c3c', nombre:'Planes de autoprotección', icono:'🚨' },
    { id:'c3d', nombre:'Simulacros', icono:'🏃' },
    { id:'c3e', nombre:'Certificados normativos', icono:'🏅' },
  ]},
  { id:'c4', nombre:'4. Planos y documentación técnica', icono:'📐', color:'#8B5CF6', children:[
    { id:'c4a', nombre:'Planos arquitectónicos', icono:'📐' },
    { id:'c4b', nombre:'Planos de instalaciones', icono:'📐' },
    { id:'c4c', nombre:'Layouts', icono:'📐' },
    { id:'c4d', nombre:'As-built', icono:'📐' },
    { id:'c4e', nombre:'Esquemas técnicos', icono:'📐' },
  ]},
  { id:'c5', nombre:'5. Fotografías', icono:'📷', color:'#D97706', children:[
    { id:'c5a', nombre:'Visitas técnicas', icono:'📷' },
    { id:'c5b', nombre:'Incidencias', icono:'📷' },
    { id:'c5c', nombre:'Before / After', icono:'📷' },
    { id:'c5d', nombre:'Evidencias', icono:'📷' },
  ]},
  { id:'c6', nombre:'6. Otros documentos', icono:'📁', color:'#6B7280', children:[
    { id:'c6a', nombre:'Presentaciones', icono:'📋' },
    { id:'c6b', nombre:'Presupuestos', icono:'💶' },
    { id:'c6c', nombre:'Correspondencia relevante', icono:'📧' },
    { id:'c6d', nombre:'Documentación administrativa', icono:'📝' },
  ]},
];

// ── DATOS DEMO ──────────────────────────────────────────────────────────────
const docArchivos = {
  'Inditex SA': {
    'c1a': [
      { id:'d1', nombre:'Contrato_FM_Inditex_2021.pdf', tamaño:284000, estado:'vigente', version:'v2.1', subido_por:'Adrián Redondo', subido_en:'12/03/2021', modificado_en:'01/01/2024', descripcion:'Contrato marco de servicios FM con Inditex SA. Renovado en 2024.', etiquetas:['contrato','vigente'], comentarios:[{autor:'Adrián Redondo', fecha:'01/01/2024', texto:'Renovado con incremento del 8% sobre tarifa base.'}] },
      { id:'d2', nombre:'Clausulado_especial_seguridad.pdf', tamaño:145000, estado:'vigente', version:'v1.0', subido_por:'Laura Sánchez', subido_en:'15/03/2021', modificado_en:'15/03/2021', descripcion:'Cláusulas específicas de seguridad del contrato principal.', etiquetas:['contrato','seguridad'], comentarios:[] },
    ],
    'c1b': [
      { id:'d3', nombre:'Adenda_ampliacion_seguridad_2023.pdf', tamaño:98000, estado:'vigente', version:'v1.0', subido_por:'Adrián Redondo', subido_en:'15/06/2023', modificado_en:'15/06/2023', descripcion:'Adenda para ampliación del servicio de seguridad a almacén Zaragoza.', etiquetas:['adenda','seguridad','zaragoza'], comentarios:[] },
    ],
    'c1e': [
      { id:'d4', nombre:'SLA_Tiempos_respuesta_2024.pdf', tamaño:67000, estado:'vigente', version:'v1.2', subido_por:'Adrián Redondo', subido_en:'01/01/2024', modificado_en:'01/01/2024', descripcion:'SLA de tiempos de respuesta pactados: incidencia crítica 4h, urgente 24h, normal 72h.', etiquetas:['sla','tiempos'], comentarios:[{autor:'Adrián Redondo', fecha:'10/05/2024', texto:'Pendiente de revisar el SLA de incidencias críticas en Q3.'}] },
    ],
    'c2a': [
      { id:'d5', nombre:'Informe_preventivo_Q1_2026.pdf', tamaño:312000, estado:'vigente', version:'v1.0', subido_por:'Pablo Ferrer', subido_en:'05/04/2026', modificado_en:'05/04/2026', descripcion:'Informe de mantenimiento preventivo Q1 2026 — Sede Central Madrid.', etiquetas:['preventivo','q1','madrid'], comentarios:[] },
      { id:'d6', nombre:'Informe_preventivo_Q4_2025.pdf', tamaño:298000, estado:'sustituido', version:'v1.0', subido_por:'Pablo Ferrer', subido_en:'10/01/2026', modificado_en:'10/01/2026', descripcion:'Informe preventivo Q4 2025 — sustituido por informe Q1 2026.', etiquetas:['preventivo','q4'], comentarios:[] },
    ],
    'c2b': [
      { id:'d7', nombre:'Informe_OT2847_climatizacion.pdf', tamaño:189000, estado:'vigente', version:'v1.0', subido_por:'Adrián Redondo', subido_en:'14/05/2026', modificado_en:'14/05/2026', descripcion:'Informe técnico avería climatización planta 3 — pendiente resolución.', etiquetas:['correctivo','ot2847','climatizacion'], comentarios:[{autor:'Adrián Redondo', fecha:'14/05/2026', texto:'OT aún abierta. Actualizar con informe final cuando se cierre.'}] },
    ],
    'c3a': [
      { id:'d8', nombre:'CAE_CleanCorp_2026.pdf', tamaño:445000, estado:'vigente', version:'v3.0', subido_por:'Adrián Redondo', subido_en:'02/01/2026', modificado_en:'02/01/2026', descripcion:'Documentación CAE de CleanCorp SL para acceso a instalaciones Inditex.', etiquetas:['cae','cleanCorp','proveedor'], comentarios:[] },
      { id:'d9', nombre:'CAE_TechFacilities_2026.pdf', tamaño:523000, estado:'vigente', version:'v2.1', subido_por:'Adrián Redondo', subido_en:'04/01/2026', modificado_en:'04/01/2026', descripcion:'Documentación CAE TechFacilities SA — actualización anual.', etiquetas:['cae','techfacilities'], comentarios:[] },
    ],
    'c6b': [
      { id:'d10', nombre:'SAV-IND-26-001_Control_accesos.html', tamaño:28000, estado:'vigente', version:'v1.0', subido_por:'Adrián Redondo', subido_en:'13/05/2026', modificado_en:'13/05/2026', descripcion:'Presupuesto control de accesos gama media — enviado al cliente.', etiquetas:['presupuesto','aprobado'], comentarios:[] },
    ],
  }
};

// ── STATE ───────────────────────────────────────────────────────────────────
let _docCliente = 'Inditex SA';
let _docCarpetaId = null; // null = raíz
let _docVista = 'lista';
let _docSelected = null;
let _docOpenFolders = new Set(['c1','c2','c3']);
let _docFiltroEstado = '';
let _docSearchQ = '';

// ── HELPERS ─────────────────────────────────────────────────────────────────
function docGetArchivos(cliente, carpetaId) {
  if (!carpetaId) return [];
  return (docArchivos[cliente]||{})[carpetaId] || [];
}
function docFindFolder(id, tree) {
  for (const n of tree) { if (n.id === id) return n; if (n.children) { const f = docFindFolder(id, n.children); if (f) return f; } }
  return null;
}
function docGetBreadcrumb(id, tree, path=[]) {
  for (const n of tree) {
    if (n.id === id) return [...path, n];
    if (n.children) { const r = docGetBreadcrumb(id, n.children, [...path, n]); if (r) return r; }
  }
  return null;
}
function docCountFiles(cliente, node) {
  let count = docGetArchivos(cliente, node.id).length;
  if (node.children) node.children.forEach(c => { count += docCountFiles(cliente, c); });
  return count;
}

// ── RENDER TREE ─────────────────────────────────────────────────────────────
function renderDocTree() {
  const el = document.getElementById('doc-tree');
  if (!el) return;
  el.innerHTML = docBuildTreeHTML(docTree, 0);
}

function docBuildTreeHTML(nodes, depth) {
  return nodes.map(n => {
    const hasChildren = n.children && n.children.length > 0;
    const isOpen = _docOpenFolders.has(n.id);
    const isActive = _docCarpetaId === n.id;
    const count = docCountFiles(_docCliente, n);
    const pad = `padding-left:${12 + depth * 14}px`;
    return `
      <div>
        <div class="doc-tree-item${isActive ? ' active' : ''}" style="${pad}" onclick="docNavTo('${n.id}')">
          ${hasChildren ? `<span class="doc-tree-chevron${isOpen ? ' open' : ''}" onclick="event.stopPropagation();docToggleFolder('${n.id}')" style="cursor:pointer;">›</span>` : '<span class="doc-tree-chevron"></span>'}
          <span class="doc-folder-icon">${n.icono||'📁'}</span>
          <span style="flex:1;overflow:hidden;text-overflow:ellipsis;">${n.nombre}</span>
          ${count > 0 ? `<span style="font-size:10px;background:var(--bg);border:1px solid var(--border);padding:0px 5px;border-radius:8px;color:var(--text-3);margin-right:6px;">${count}</span>` : ''}
        </div>
        ${hasChildren ? `<div class="doc-children${isOpen ? ' open' : ''}" id="dfc-${n.id}">${docBuildTreeHTML(n.children, depth+1)}</div>` : ''}
      </div>`;
  }).join('');
}

function docToggleFolder(id) {
  if (_docOpenFolders.has(id)) _docOpenFolders.delete(id); else _docOpenFolders.add(id);
  renderDocTree();
}

// ── NAVIGATION ───────────────────────────────────────────────────────────────
function docNavTo(id) {
  _docCarpetaId = id;
  _docSelected = null;
  document.getElementById('doc-detail-panel').style.width = '0';
  renderDocTree();
  renderDocBreadcrumb();
  renderDocContent();
}

function renderDocBreadcrumb() {
  const el = document.getElementById('doc-breadcrumb');
  if (!el) return;
  if (!_docCarpetaId) { el.innerHTML = `<span style="color:var(--accent);">📁 Todos</span>`; return; }
  const path = docGetBreadcrumb(_docCarpetaId, docTree) || [];
  el.innerHTML = [
    `<span style="color:var(--accent);cursor:pointer;" onclick="docNavTo(null)">📁 Docs</span>`,
    ...path.map((p,i) => `<span style="color:var(--text-3);">/</span><span style="${i===path.length-1?'color:var(--text);font-weight:500;':'color:var(--accent);cursor:pointer;'}" onclick="docNavTo('${p.id}')">${p.nombre}</span>`)
  ].join(' ');
}

// ── CONTENT ──────────────────────────────────────────────────────────────────
function renderDocContent() {
  const el = document.getElementById('doc-main-content');
  if (!el) return;

  // If no folder selected — show root folders as cards
  if (!_docCarpetaId) {
    el.innerHTML = `
      <div style="margin-bottom:14px;font-size:12px;color:var(--text-3);">Selecciona una carpeta en el árbol lateral o haz clic en una categoría</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;">
        ${docTree.map(n => {
          const count = docCountFiles(_docCliente, n);
          return `<div class="doc-grid-card" onclick="docNavTo('${n.id}');_docOpenFolders.add('${n.id}');renderDocTree();" style="border-left:3px solid ${n.color||'var(--border)'};">
            <div style="font-size:28px;margin-bottom:8px;">${n.icono}</div>
            <div style="font-size:12px;font-weight:600;line-height:1.3;">${n.nombre}</div>
            <div style="font-size:10.5px;color:var(--text-3);margin-top:4px;">${count} archivo${count!==1?'s':''}</div>
          </div>`;
        }).join('')}
      </div>`;
    return;
  }

  // Folder selected — show subfolders + files
  const folder = docFindFolder(_docCarpetaId, docTree);
  let archivos = docGetArchivos(_docCliente, _docCarpetaId);

  // Apply filters
  if (_docFiltroEstado) archivos = archivos.filter(a => a.estado === _docFiltroEstado);
  if (_docSearchQ) archivos = archivos.filter(a =>
    a.nombre.toLowerCase().includes(_docSearchQ) ||
    (a.descripcion||'').toLowerCase().includes(_docSearchQ) ||
    (a.etiquetas||[]).some(t => t.toLowerCase().includes(_docSearchQ))
  );

  const subFolders = folder?.children || [];

  let html = '';

  // Subfolders
  if (subFolders.length > 0) {
    html += `<div style="margin-bottom:14px;">
      <div style="font-size:10.5px;font-weight:600;color:var(--text-3);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">Subcarpetas</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        ${subFolders.map(sf => {
          const c = docCountFiles(_docCliente, sf);
          return `<div style="display:flex;align-items:center;gap:7px;padding:7px 12px;border:1px solid var(--border);border-radius:7px;cursor:pointer;background:var(--surface);transition:all 0.1s;" onmouseenter="this.style.borderColor='var(--accent)'" onmouseleave="this.style.borderColor='var(--border)'" onclick="docNavTo('${sf.id}')">
            <span style="font-size:14px;">${sf.icono||'📁'}</span>
            <div><div style="font-size:12px;font-weight:500;">${sf.nombre}</div><div style="font-size:10px;color:var(--text-3);">${c} archivo${c!==1?'s':''}</div></div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  }

  // Files
  if (archivos.length === 0 && subFolders.length === 0) {
    html += docEmptyState();
  } else if (archivos.length > 0) {
    html += `<div style="margin-bottom:8px;display:flex;align-items:center;justify-content:space-between;">
      <div style="font-size:10.5px;font-weight:600;color:var(--text-3);text-transform:uppercase;letter-spacing:0.5px;">${archivos.length} archivo${archivos.length!==1?'s':''}</div>
    </div>`;

    if (_docVista === 'grid') {
      html += `<div class="doc-grid">${archivos.map(a => `
        <div class="doc-grid-card${_docSelected===a.id?' selected':''}" onclick="docSelect('${a.id}')">
          <div class="doc-grid-icon">${docExtIcon(a.nombre)}</div>
          <div class="doc-grid-name">${a.nombre}</div>
          <div class="doc-grid-meta">${a.version} · ${a.subido_en}</div>
          <div style="margin-top:6px;"><span class="doc-badge-${a.estado}">${a.estado}</span></div>
        </div>`).join('')}</div>`;
    } else {
      html += `<div class="card" style="overflow:hidden;">
        <div style="display:grid;grid-template-columns:1fr 80px 80px 100px 90px 70px;padding:7px 14px;background:var(--surface-2);border-bottom:1px solid var(--border);">
          ${['Nombre','Versión','Estado','Subido por','Fecha','Tamaño'].map(h=>`<div style="font-size:10.5px;font-weight:600;color:var(--text-3);text-transform:uppercase;letter-spacing:0.4px;">${h}</div>`).join('')}
        </div>
        ${archivos.map(a => `
          <div class="doc-file-row${_docSelected===a.id?' selected':''}" onclick="docSelect('${a.id}')">
            <div class="doc-file-icon" style="background:${docExtColor(a.nombre)}22;color:${docExtColor(a.nombre)};">${docExtIcon(a.nombre)}</div>
            <div class="doc-file-name" style="flex:1;min-width:0;">${a.nombre}</div>
            <div class="doc-file-meta">${a.version}</div>
            <div class="doc-file-meta"><span class="doc-badge-${a.estado}">${a.estado}</span></div>
            <div class="doc-file-meta">${a.subido_por.split(' ')[0]}</div>
            <div class="doc-file-meta">${a.subido_en}</div>
            <div class="doc-file-meta">${docFmtSize(a.tamaño)}</div>
          </div>`).join('')}
      </div>`;
    }
  } else if (subFolders.length > 0) {
    html += docEmptyState('subcarpeta');
  }

  el.innerHTML = html;
}

function docEmptyState(ctx) {
  return `<div style="padding:48px;text-align:center;color:var(--text-3);">
    <div style="font-size:36px;margin-bottom:12px;">📭</div>
    <div style="font-size:13px;font-weight:500;margin-bottom:4px;">Sin archivos en esta ${ctx||'carpeta'}</div>
    <div style="font-size:12px;">Arrastra archivos aquí o usa el botón "Subir archivo"</div>
  </div>`;
}

// ── SELECTION & DETAIL PANEL ─────────────────────────────────────────────────
function docSelect(id) {
  _docSelected = id;
  renderDocContent();
  docShowDetail(id);
}

function docShowDetail(id) {
  const archivos = docGetArchivos(_docCliente, _docCarpetaId);
  const a = archivos.find(x => x.id === id);
  if (!a) return;

  const panel = document.getElementById('doc-detail-panel');
  panel.style.width = '300px';
  panel.innerHTML = `
    <div class="doc-detail-inner">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
        <div style="font-size:12px;font-weight:600;color:var(--text-2);text-transform:uppercase;letter-spacing:0.5px;">Detalle</div>
        <button onclick="document.getElementById('doc-detail-panel').style.width='0';_docSelected=null;renderDocContent();" style="background:none;border:none;cursor:pointer;color:var(--text-3);font-size:14px;padding:2px 4px;">✕</button>
      </div>

      <!-- Icono y nombre -->
      <div style="text-align:center;padding:16px;background:var(--surface-2);border-radius:8px;margin-bottom:16px;">
        <div style="font-size:40px;margin-bottom:8px;">${docExtIcon(a.nombre)}</div>
        <div style="font-size:12px;font-weight:600;word-break:break-word;line-height:1.4;">${a.nombre}</div>
        <div style="margin-top:6px;"><span class="doc-badge-${a.estado}">${a.estado}</span> <span style="font-size:10px;color:var(--text-3);">${a.version}</span></div>
      </div>

      <!-- Acciones -->
      <div style="display:flex;gap:6px;margin-bottom:16px;">
        <button class="btn btn-primary btn-sm" style="flex:1;" onclick="docDescargar('${id}')">⬇ Descargar</button>
        <button class="btn btn-secondary btn-sm" onclick="docNuevaVersion('${id}')">🔄 Nueva versión</button>
      </div>

      <!-- Metadatos -->
      <div class="doc-detail-section">
        <div class="doc-detail-label">Descripción</div>
        <div class="doc-detail-value" style="font-size:12px;color:var(--text-2);line-height:1.5;">${a.descripcion||'Sin descripción'}</div>
      </div>
      <div class="doc-detail-section" style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        <div><div class="doc-detail-label">Subido por</div><div class="doc-detail-value" style="font-size:12px;">${a.subido_por}</div></div>
        <div><div class="doc-detail-label">Fecha subida</div><div class="doc-detail-value" style="font-size:12px;">${a.subido_en}</div></div>
        <div><div class="doc-detail-label">Última modificación</div><div class="doc-detail-value" style="font-size:12px;">${a.modificado_en}</div></div>
        <div><div class="doc-detail-label">Tamaño</div><div class="doc-detail-value" style="font-size:12px;">${docFmtSize(a.tamaño)}</div></div>
      </div>

      <!-- Etiquetas -->
      ${a.etiquetas?.length ? `
      <div class="doc-detail-section">
        <div class="doc-detail-label">Etiquetas</div>
        <div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:4px;">
          ${a.etiquetas.map(t=>`<span style="font-size:10.5px;background:var(--bg);border:1px solid var(--border);padding:2px 7px;border-radius:10px;color:var(--text-2);">${t}</span>`).join('')}
        </div>
      </div>` : ''}

      <!-- Comentarios -->
      <div class="doc-detail-section">
        <div class="doc-detail-label" style="margin-bottom:6px;">Comentarios (${(a.comentarios||[]).length})</div>
        ${(a.comentarios||[]).map(c=>`
          <div style="background:var(--surface-2);border-radius:6px;padding:8px 10px;margin-bottom:6px;">
            <div style="font-size:11px;font-weight:500;">${c.autor} <span style="color:var(--text-3);font-weight:400;">· ${c.fecha}</span></div>
            <div style="font-size:12px;color:var(--text-2);margin-top:3px;line-height:1.4;">${c.texto}</div>
          </div>`).join('')}
        <div style="display:flex;gap:6px;margin-top:6px;">
          <input type="text" id="doc-comment-input" placeholder="Añadir comentario..." style="flex:1;font-size:12px;padding:5px 8px;border:1px solid var(--border);border-radius:5px;font-family:inherit;outline:none;" onkeydown="if(event.key==='Enter')docAddComentario('${id}')">
          <button onclick="docAddComentario('${id}')" class="btn btn-secondary btn-sm" style="font-size:11px;">+</button>
        </div>
      </div>

      <!-- Estado -->
      <div class="doc-detail-section">
        <div class="doc-detail-label" style="margin-bottom:6px;">Estado del documento</div>
        <select style="width:100%;font-size:12px;padding:6px 8px;border:1px solid var(--border);border-radius:6px;font-family:inherit;background:var(--surface);" onchange="docCambiarEstado('${id}',this.value)">
          <option value="vigente" ${a.estado==='vigente'?'selected':''}>✓ Vigente</option>
          <option value="sustituido" ${a.estado==='sustituido'?'selected':''}>↩ Sustituido</option>
          <option value="obsoleto" ${a.estado==='obsoleto'?'selected':''}>✕ Obsoleto</option>
        </select>
      </div>
    </div>`;
}

// ── ACTIONS ──────────────────────────────────────────────────────────────────
function docSearch(q) {
  _docSearchQ = q.toLowerCase();
  renderDocContent();
}

function docFiltrar(estado) {
  _docFiltroEstado = estado;
  renderDocContent();
}

function docSetVista(v) {
  _docVista = v;
  document.getElementById('doc-btn-lista').style.background = v==='lista' ? 'var(--surface)' : 'transparent';
  document.getElementById('doc-btn-grid').style.background  = v==='grid'  ? 'var(--surface)' : 'transparent';
  document.getElementById('doc-btn-lista').style.color = v==='lista' ? 'var(--text-2)' : 'var(--text-3)';
  document.getElementById('doc-btn-grid').style.color  = v==='grid'  ? 'var(--text-2)' : 'var(--text-3)';
  renderDocContent();
}

function docSubirArchivos(files) {
  if (!_docCarpetaId) { showToast('Selecciona primero una carpeta'); return; }
  if (!docArchivos[_docCliente]) docArchivos[_docCliente] = {};
  if (!docArchivos[_docCliente][_docCarpetaId]) docArchivos[_docCliente][_docCarpetaId] = [];
  const hoy = new Date().toLocaleDateString('es-ES');
  Array.from(files).forEach(f => {
    docArchivos[_docCliente][_docCarpetaId].push({
      id: 'd' + Date.now() + Math.random().toString(36).slice(2,5),
      nombre: f.name, tamaño: f.size, estado:'vigente', version:'v1.0',
      subido_por:'Adrián Redondo', subido_en:hoy, modificado_en:hoy,
      descripcion:'', etiquetas:[], comentarios:[]
    });
  });
  renderDocContent();
  renderDocTree();
  showToast(files.length + ' archivo' + (files.length>1?'s':'') + ' subido' + (files.length>1?'s':'') + ' correctamente');
}

function docHandleDrop(event) {
  event.preventDefault();
  event.currentTarget.style.background = '';
  const files = event.dataTransfer.files;
  if (files.length) docSubirArchivos(files);
}

function docDescargar(id) {
  const a = docGetArchivos(_docCliente, _docCarpetaId).find(x=>x.id===id);
  if (a) showToast('Descargando ' + a.nombre + '…');
}

function docNuevaVersion(id) {
  const input = document.createElement('input');
  input.type = 'file';
  input.onchange = () => {
    const archivos = docGetArchivos(_docCliente, _docCarpetaId);
    const doc = archivos.find(x=>x.id===id);
    if (doc && input.files[0]) {
      const vNum = parseFloat(doc.version.replace('v','')) + 0.1;
      doc.version = 'v' + vNum.toFixed(1);
      doc.modificado_en = new Date().toLocaleDateString('es-ES');
      doc.modificado_por = 'Adrián Redondo';
      renderDocContent();
      docShowDetail(id);
      showToast('Nueva versión ' + doc.version + ' subida');
    }
  };
  input.click();
}

function docAddComentario(id) {
  const input = document.getElementById('doc-comment-input');
  const texto = input?.value.trim();
  if (!texto) return;
  const archivos = docGetArchivos(_docCliente, _docCarpetaId);
  const doc = archivos.find(x=>x.id===id);
  if (doc) {
    if (!doc.comentarios) doc.comentarios = [];
    doc.comentarios.push({ autor:'Adrián Redondo', fecha:new Date().toLocaleDateString('es-ES'), texto });
    docShowDetail(id);
    showToast('Comentario añadido');
  }
}

function docCambiarEstado(id, estado) {
  const archivos = docGetArchivos(_docCliente, _docCarpetaId);
  const doc = archivos.find(x=>x.id===id);
  if (doc) { doc.estado = estado; renderDocContent(); docShowDetail(id); showToast('Estado actualizado: ' + estado); }
}

// Hook into switchTab for documentos
const _origSwitchTabDoc = switchTab;
switchTab = function(name) {
  _origSwitchTabDoc(name);
  if (name === 'documentos') {
    const clienteNombre = document.getElementById('dc-nombre')?.textContent || 'Inditex SA';
    _docCliente = clienteNombre;
    _docCarpetaId = null;
    _docSelected = null;
    setTimeout(() => {
      renderDocTree();
      renderDocBreadcrumb();
      renderDocContent();
    }, 30);
  }
};

showView('dashboard');