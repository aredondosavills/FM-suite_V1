const actividadData = {
  'Inditex SA': {
    operacional: [
      { id:'op1', titulo:'Resolución OT-2847 — Avería climatización', descripcion:'Avería en sistema HVAC planta 3 Sede Central. Técnico J.López asignado, pendiente diagnóstico y presupuesto reparación.', estado:'en_curso', prioridad:'alta', responsable:'Adrián Redondo', fecha:'16/05/2026', modulo:{ tipo:'ot', ref:'OT-2847' }, creado:'13/05/2026' },
      { id:'op2', titulo:'Seguimiento renovación contrato FM', descripcion:'Contrato vence 15/06/2026. Enviar propuesta de renovación con incremento del 8%. Pendiente validación interna.', estado:'pendiente', prioridad:'alta', responsable:'Adrián Redondo', fecha:'25/05/2026', modulo:{ tipo:null, ref:null }, creado:'10/05/2026' },
      { id:'op3', titulo:'Confirmar presupuesto SAV-IND-26-002 con cliente', descripcion:'Presupuesto iluminación LED aprobado internamente. Pendiente confirmación formal por escrito de Sara Rodríguez.', estado:'pendiente', prioridad:'media', responsable:'Adrián Redondo', fecha:'20/05/2026', modulo:{ tipo:'pres', ref:'SAV-IND-26-002' }, creado:'05/05/2026' },
      { id:'op4', titulo:'Revisión mantenimiento preventivo HVAC Zaragoza', descripcion:'Revisión anual programada para Q2. Coordinar acceso con responsable de almacén. TechFacilities confirma disponibilidad semana del 20.', estado:'pendiente', prioridad:'media', responsable:'Pablo Ferrer', fecha:'22/05/2026', modulo:{ tipo:'ot', ref:'OT-2840' }, creado:'01/05/2026' },
      { id:'op5', titulo:'Encargo firmado SRV-003 — Electricidad y BT', descripcion:'Servicio activo pero sin encargo firmado. Solicitar firma a Carlos Moreno (contabilidad) antes de próxima facturación.', estado:'bloqueado', prioridad:'media', responsable:'Adrián Redondo', fecha:'18/05/2026', modulo:{ tipo:null, ref:'SRV-003' }, creado:'08/05/2026' },
      { id:'op6', titulo:'Cierre operativo control de accesos SAV-IND-26-001', descripcion:'Instalación completada. Pendiente formación final de uso con el equipo de seguridad del cliente. Coordinar fecha.', estado:'en_curso', prioridad:'baja', responsable:'Adrián Redondo', fecha:'30/05/2026', modulo:{ tipo:'pres', ref:'SAV-IND-26-001' }, creado:'14/05/2026' },
    ],
    alertas: [
      { id:'al1', tipo:'renovacion', descripcion:'Contrato FM vence en 33 días. Preaviso de cancelación: 90 días. Inicio negociación urgente.', fecha_limite:'15/06/2026', estado:'activa', responsable:'Adrián Redondo', urgencia:'critica', doc_ref:'Contrato FM 2021' },
      { id:'al2', tipo:'firma_pendiente', descripcion:'Servicio SRV-003 (Electricidad y BT) activo sin encargo de trabajo firmado desde 01/04/2021.', fecha_limite:'18/05/2026', estado:'activa', responsable:'Adrián Redondo', urgencia:'alta', doc_ref:'SRV-003' },
      { id:'al3', tipo:'presupuesto', descripcion:'SAV-IND-26-002 (iluminación LED) aprobado pero sin PO del cliente. Facturación bloqueada.', fecha_limite:'20/05/2026', estado:'en_gestion', responsable:'Adrián Redondo', urgencia:'alta', doc_ref:'SAV-IND-26-002' },
      { id:'al4', tipo:'sla', descripcion:'SLA de respuesta a incidencias críticas: 4h. Última OT crítica (OT-2847) sin técnico asignado durante 3h. Revisar protocolo.', fecha_limite:'31/05/2026', estado:'activa', responsable:'Adrián Redondo', urgencia:'media', doc_ref:null },
    ],
    notas: [
      { id:'n1', titulo:'Reunión revisión trimestral — junio', texto:'Juan Méndez confirma reunión presencial el 10/06. Temas: renovación contrato, estado OTs, propuesta nuevos servicios seguridad perimetral. Preparar deck con KPIs y propuesta económica.', fecha:'13/05/2026', autor:'Adrián Redondo', etiquetas:['reunion'], fijada:true, adjunto:null },
      { id:'n2', titulo:'Warning: sensibilidad con proveedor CleanCorp', texto:'Sara Rodríguez (Resp. Facilities) ha expresado malestar con la calidad del servicio de limpieza en planta 2. No ha puesto reclamación formal pero lo ha mencionado en dos llamadas. Vigilar y valorar cambio de subcontrata si persiste.', fecha:'10/05/2026', autor:'Adrián Redondo', etiquetas:['warning','feedback'], fijada:true, adjunto:null },
      { id:'n3', titulo:'Acuerdo verbal — incremento 8% en renovación', texto:'Llamada con Juan Méndez. Acepta verbalmente incremento del 8% sobre tarifa actual para la renovación. Pide que la propuesta formal llegue antes del 30/05. No comunicar a contabilidad hasta tener PO firmada.', fecha:'08/05/2026', autor:'Adrián Redondo', etiquetas:['llamada','acuerdo'], fijada:false, adjunto:null },
      { id:'n4', titulo:'Cambio de interlocutor en facilities', texto:'Sara Rodríguez pasa a jornada reducida desde junio. Su sustituta será Marta Villar (aún sin correo corporativo). Actualizar contactos cuando confirmen datos. Programar presentación con Marta antes del 15/06.', fecha:'05/05/2026', autor:'Adrián Redondo', etiquetas:['contexto'], fijada:false, adjunto:null },
    ]
  }
};

let _actCurrentCliente = 'Inditex SA';
let _actModalType = 'op'; // 'op' | 'alerta' | 'nota'
let _actEditId = null;
let _actOpFilter = '';
let _actNotaFilter = '';

// ---- Data accessors ----
function actData(cliente) {
  if (!actividadData[cliente]) {
    actividadData[cliente] = { operacional:[], alertas:[], notas:[] };
  }
  return actividadData[cliente];
}

// ---- Render ----
function renderActividad(cliente) {
  _actCurrentCliente = cliente || _actCurrentCliente;
  const d = actData(_actCurrentCliente);
  renderActOp(d.operacional);
  renderActAlertas(d.alertas);
  renderActNotas(d.notas);
  updateActSummary(d);
}

function updateActSummary(d) {
  const opActivos = d.operacional.filter(x => x.estado !== 'completado').length;
  const alertasActivas = d.alertas.filter(x => x.estado !== 'resuelta').length;
  const notasFijadas = d.notas.filter(x => x.fijada).length;
  setEl('act-n-asuntos', opActivos);
  setEl('act-n-alertas', alertasActivas);
  setEl('act-n-notas', notasFijadas);
  // Próxima fecha compromiso
  const proximas = d.operacional.filter(x => x.estado !== 'completado' && x.fecha).sort((a,b) => parseFecha(a.fecha) - parseFecha(b.fecha));
  setEl('act-proxima-fecha', proximas.length ? proximas[0].fecha + ' — ' + proximas[0].titulo.substring(0,22) + '…' : 'Sin compromisos');
  // Color chip alertas
  const chip = document.getElementById('act-chip-alertas');
  if (chip) chip.style.borderColor = alertasActivas > 0 ? 'var(--danger)' : 'var(--border)';
}

function parseFecha(s) {
  if (!s) return Infinity;
  const [d,m,y] = s.split('/');
  return new Date(+y, +m-1, +d).getTime();
}

function setEl(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }

// ---- OPERACIONAL ----
const OP_PRIO_COLOR = { alta:'var(--danger)', media:'var(--warn)', baja:'var(--text-3)' };
const OP_ESTADO_LABEL = { pendiente:'Pendiente', en_curso:'En curso', bloqueado:'Bloqueado', completado:'Completado' };
const OP_ESTADO_STYLE = {
  pendiente: 'background:var(--warn-light);color:var(--warn);',
  en_curso:  'background:var(--accent-light);color:var(--accent);',
  bloqueado: 'background:var(--danger-light);color:var(--danger);',
  completado:'background:var(--accent-2-light);color:var(--accent-2);'
};
const OP_MODULO_LABEL = { ot:'OT', pres:'Presupuesto', prov:'Proveedor' };

function renderActOp(items) {
  const list = document.getElementById('act-op-list');
  if (!list) return;
  let filtered = items.filter(x => x.estado !== 'completado');
  if (_actOpFilter === 'bloqueado') filtered = filtered.filter(x => x.estado === 'bloqueado');
  else if (_actOpFilter) filtered = filtered.filter(x => x.prioridad === _actOpFilter);
  const count = document.getElementById('act-op-count');
  if (count) count.textContent = filtered.length + ' activo' + (filtered.length !== 1 ? 's' : '');
  if (filtered.length === 0) {
    list.innerHTML = `<div style="padding:24px;text-align:center;color:var(--text-3);font-size:13px;">✓ Sin asuntos operacionales activos</div>`;
    return;
  }
  list.innerHTML = filtered.map(item => `
    <div style="padding:13px 18px;border-bottom:1px solid var(--border);display:flex;align-items:flex-start;gap:12px;" id="acti-${item.id}">
      <!-- Prioridad dot -->
      <div style="margin-top:4px;flex-shrink:0;">
        <div style="width:9px;height:9px;border-radius:50%;background:${OP_PRIO_COLOR[item.prioridad]};box-shadow:0 0 0 2px white, 0 0 0 3px ${OP_PRIO_COLOR[item.prioridad]}44;"></div>
      </div>
      <!-- Contenido -->
      <div style="flex:1;min-width:0;">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:3px;">
          <span style="font-size:13px;font-weight:600;">${item.titulo}</span>
          <span style="font-size:10.5px;padding:1px 7px;border-radius:10px;font-weight:500;${OP_ESTADO_STYLE[item.estado]}">${OP_ESTADO_LABEL[item.estado]}</span>
          ${item.modulo?.tipo ? `<span style="font-size:10.5px;background:var(--bg);border:1px solid var(--border);padding:1px 6px;border-radius:4px;color:var(--text-2);">${OP_MODULO_LABEL[item.modulo.tipo]} ${item.modulo.ref}</span>` : ''}
        </div>
        <div style="font-size:12px;color:var(--text-2);margin-bottom:5px;line-height:1.5;">${item.descripcion}</div>
        <div style="display:flex;align-items:center;gap:12px;font-size:11px;color:var(--text-3);">
          <span>📅 ${item.fecha}</span>
          <span>👤 ${item.responsable}</span>
        </div>
      </div>
      <!-- Acciones -->
      <div style="display:flex;gap:5px;flex-shrink:0;align-items:flex-start;">
        ${item.estado !== 'completado' ? `
        <select onchange="actCambiarEstado('${item.id}',this.value)" style="font-size:11px;padding:4px 6px;border:1px solid var(--border);border-radius:5px;background:var(--surface);font-family:inherit;cursor:pointer;color:var(--text);">
          <option value="">Estado</option>
          <option value="pendiente">Pendiente</option>
          <option value="en_curso">En curso</option>
          <option value="bloqueado">Bloqueado</option>
          <option value="completado">✓ Completar</option>
        </select>` : ''}
        <button onclick="actEditarOp('${item.id}')" style="background:none;border:1px solid var(--border);border-radius:5px;padding:4px 7px;cursor:pointer;color:var(--text-2);font-size:11px;" title="Editar">✏️</button>
        <button onclick="actEliminarOp('${item.id}')" style="background:none;border:1px solid var(--border);border-radius:5px;padding:4px 7px;cursor:pointer;color:var(--text-3);font-size:11px;" title="Eliminar">✕</button>
      </div>
    </div>
  `).join('');
}

function actFilterOp(val) { _actOpFilter = val; const d = actData(_actCurrentCliente); renderActOp(d.operacional); }

function actCambiarEstado(id, estado) {
  if (!estado) return;
  const d = actData(_actCurrentCliente);
  const item = d.operacional.find(x => x.id === id);
  if (!item) return;
  item.estado = estado;
  if (estado === 'completado') showToast('Ítem "' + item.titulo.substring(0,30) + '…" marcado como completado');
  renderActOp(d.operacional);
  updateActSummary(d);
}

function actEliminarOp(id) {
  const d = actData(_actCurrentCliente);
  d.operacional = d.operacional.filter(x => x.id !== id);
  renderActOp(d.operacional);
  updateActSummary(d);
  showToast('Ítem eliminado');
}

function actEditarOp(id) {
  _actEditId = id;
  actOpenModal('op');
}

// ---- ALERTAS ----
const ALERTA_TIPO_LABEL = { renovacion:'Renovación', firma_pendiente:'Firma pendiente', presupuesto:'Presupuesto', sla:'SLA', addenda:'Addenda', pricing:'Pricing' };
const ALERTA_URGENCIA_STYLE = { critica:'background:#FEF2F2;border-left:4px solid var(--danger);', alta:'background:#FEF3C7;border-left:4px solid var(--warn);', media:'background:#F0F9FF;border-left:4px solid var(--accent);' };
const ALERTA_URGENCIA_BADGE = { critica:'background:var(--danger-light);color:var(--danger);', alta:'background:var(--warn-light);color:var(--warn);', media:'background:var(--accent-light);color:var(--accent);' };

function renderActAlertas(alertas) {
  const list = document.getElementById('act-alerta-list');
  if (!list) return;
  const activas = alertas.filter(x => x.estado !== 'resuelta');
  const count = document.getElementById('act-alerta-count');
  if (count) count.textContent = activas.length + ' activa' + (activas.length !== 1 ? 's' : '');
  if (activas.length === 0) {
    list.innerHTML = `<div style="padding:16px;text-align:center;color:var(--text-3);font-size:13px;">✓ Sin alertas contractuales activas</div>`;
    return;
  }
  list.innerHTML = activas.map(al => `
    <div style="padding:12px 14px;border-radius:8px;display:flex;align-items:flex-start;gap:12px;${ALERTA_URGENCIA_STYLE[al.urgencia]||''}" id="actal-${al.id}">
      <div style="flex:1;min-width:0;">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px;">
          <span style="font-size:10.5px;padding:1px 7px;border-radius:10px;font-weight:600;${ALERTA_URGENCIA_BADGE[al.urgencia]||''}">${al.urgencia.toUpperCase()}</span>
          <span style="font-size:11px;font-weight:600;background:var(--surface);border:1px solid var(--border);padding:1px 6px;border-radius:4px;color:var(--text-2);">${ALERTA_TIPO_LABEL[al.tipo]||al.tipo}</span>
          <span style="font-size:11px;color:var(--text-2);">Límite: <strong>${al.fecha_limite}</strong></span>
        </div>
        <div style="font-size:12.5px;color:var(--text);margin-bottom:3px;">${al.descripcion}</div>
        <div style="font-size:11px;color:var(--text-3);">Responsable: ${al.responsable}${al.doc_ref ? ' · Ref: '+al.doc_ref : ''}</div>
      </div>
      <div style="display:flex;gap:5px;flex-shrink:0;">
        ${al.estado === 'activa' ? `<button onclick="actAlertaGestion('${al.id}')" style="font-size:11px;padding:4px 9px;border:1px solid var(--border);border-radius:5px;background:var(--surface);cursor:pointer;color:var(--text-2);">En gestión</button>` : `<span style="font-size:11px;color:var(--accent);padding:4px 6px;">En gestión</span>`}
        <button onclick="actAlertaResolver('${al.id}')" style="font-size:11px;padding:4px 9px;border:1px solid var(--accent-2);border-radius:5px;background:var(--accent-2-light);cursor:pointer;color:var(--accent-2);font-weight:500;">✓ Resolver</button>
      </div>
    </div>
  `).join('');
}

function actAlertaGestion(id) {
  const d = actData(_actCurrentCliente);
  const al = d.alertas.find(x => x.id === id);
  if (al) { al.estado = 'en_gestion'; renderActAlertas(d.alertas); updateActSummary(d); showToast('Alerta marcada como en gestión'); }
}

function actAlertaResolver(id) {
  const d = actData(_actCurrentCliente);
  const al = d.alertas.find(x => x.id === id);
  if (al) { al.estado = 'resuelta'; renderActAlertas(d.alertas); updateActSummary(d); showToast('Alerta resuelta'); }
}

// ---- NOTAS ----
const NOTA_TAG_STYLE = {
  llamada:  'background:#EEF4FF;color:#1F6FEB;',
  reunion:  'background:#E8F7F3;color:#0D9373;',
  acuerdo:  'background:#F5F0FF;color:#8B5CF6;',
  warning:  'background:var(--danger-light);color:var(--danger);',
  feedback: 'background:var(--warn-light);color:var(--warn);',
  contexto: 'background:var(--bg);color:var(--text-2);border:1px solid var(--border);'
};
const NOTA_TAG_LABEL = { llamada:'📞 Llamada', reunion:'🤝 Reunión', acuerdo:'🖊 Acuerdo', warning:'⚠️ Warning', feedback:'💬 Feedback', contexto:'📌 Contexto' };

function renderActNotas(notas) {
  const list = document.getElementById('act-notas-list');
  if (!list) return;
  let filtered = [...notas];
  if (_actNotaFilter) filtered = filtered.filter(n => n.etiquetas.includes(_actNotaFilter));
  // Fijadas primero
  filtered.sort((a,b) => (b.fijada ? 1 : 0) - (a.fijada ? 1 : 0) || parseFecha(b.fecha) - parseFecha(a.fecha));
  const count = document.getElementById('act-notas-count');
  if (count) count.textContent = notas.length + ' nota' + (notas.length !== 1 ? 's' : '');
  if (filtered.length === 0) {
    list.innerHTML = `<div style="padding:16px;text-align:center;color:var(--text-3);font-size:13px;">Sin notas. Añade la primera.</div>`;
    return;
  }
  list.innerHTML = filtered.map(nota => `
    <div style="border:1px solid var(--border);border-radius:8px;overflow:hidden;${nota.fijada ? 'border-color:#FCD34D;' : ''}" id="actnota-${nota.id}">
      <div style="padding:12px 14px;${nota.fijada ? 'background:#FFFBEB;' : 'background:var(--surface);}'}">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:6px;">
          <div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap;">
            ${nota.fijada ? '<span style="font-size:13px;" title="Nota fijada">📌</span>' : ''}
            <span style="font-size:13px;font-weight:600;">${nota.titulo}</span>
          </div>
          <div style="display:flex;gap:4px;flex-shrink:0;">
            <button onclick="actTogglePin('${nota.id}')" style="background:none;border:1px solid var(--border);border-radius:5px;padding:3px 6px;cursor:pointer;font-size:11px;color:var(--text-3);" title="${nota.fijada ? 'Desfijar' : 'Fijar'}">${nota.fijada ? '📌' : '📍'}</button>
            <button onclick="actEliminarNota('${nota.id}')" style="background:none;border:1px solid var(--border);border-radius:5px;padding:3px 6px;cursor:pointer;font-size:11px;color:var(--text-3);" title="Eliminar">✕</button>
          </div>
        </div>
        <div style="font-size:12.5px;color:var(--text-2);line-height:1.6;margin-bottom:8px;">${nota.texto}</div>
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px;">
          <div style="display:flex;gap:5px;flex-wrap:wrap;">
            ${nota.etiquetas.map(t => `<span style="font-size:10.5px;padding:1px 7px;border-radius:10px;font-weight:500;${NOTA_TAG_STYLE[t]||''}">${NOTA_TAG_LABEL[t]||t}</span>`).join('')}
          </div>
          <div style="font-size:11px;color:var(--text-3);">${nota.fecha} · ${nota.autor}</div>
        </div>
      </div>
    </div>
  `).join('');

function actFilterNotas(val) { _actNotaFilter = val; const d = actData(_actCurrentCliente); renderActNotas(d.notas); }

function actTogglePin(id) {
  const d = actData(_actCurrentCliente);
  const n = d.notas.find(x => x.id === id);
  if (n) { n.fijada = !n.fijada; renderActNotas(d.notas); updateActSummary(d); }
}

function actEliminarNota(id) {
  const d = actData(_actCurrentCliente);
  d.notas = d.notas.filter(x => x.id !== id);
  renderActNotas(d.notas);
  updateActSummary(d);
  showToast('Nota eliminada');
}

// ---- MODAL ----
function actOpenModal(tipo) {
  _actModalType = tipo;
  const titles = { op:'Añadir asunto operacional', alerta:'Añadir alerta contractual', nota:'Nueva nota del gestor' };
  const subs = { op:'Registra un asunto activo con estado, prioridad y fecha compromiso', alerta:'Alerta contractual que requiere seguimiento activo', nota:'Contexto cualitativo importante sobre el cliente' };
  setEl('act-modal-title', titles[tipo]);
  setEl('act-modal-sub', subs[tipo]);

  let body = '';
  if (tipo === 'op') {
    // Pre-fill if editing
    let item = null;
    if (_actEditId) { item = actData(_actCurrentCliente).operacional.find(x => x.id === _actEditId); }
    body = `
      <div class="form-group"><label class="form-label">Título *</label><input type="text" class="form-input" id="am-titulo" placeholder="Ej: Seguimiento OT-2847" value="${item?.titulo||''}"></div>
      <div class="form-group"><label class="form-label">Descripción</label><textarea class="form-textarea" id="am-desc" placeholder="Detalla el contexto y qué hay que hacer..." style="min-height:70px;">${item?.descripcion||''}</textarea></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div class="form-group" style="margin-bottom:0"><label class="form-label">Estado</label>
          <select class="form-select" id="am-estado">
            <option value="pendiente" ${item?.estado==='pendiente'?'selected':''}>Pendiente</option>
            <option value="en_curso" ${item?.estado==='en_curso'?'selected':''}>En curso</option>
            <option value="bloqueado" ${item?.estado==='bloqueado'?'selected':''}>Bloqueado</option>
          </select>
        </div>
        <div class="form-group" style="margin-bottom:0"><label class="form-label">Prioridad</label>
          <select class="form-select" id="am-prioridad">
            <option value="alta" ${item?.prioridad==='alta'?'selected':''}>Alta</option>
            <option value="media" ${(!item||item?.prioridad==='media')?'selected':''}>Media</option>
            <option value="baja" ${item?.prioridad==='baja'?'selected':''}>Baja</option>
          </select>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px;">
        <div class="form-group" style="margin-bottom:0"><label class="form-label">Responsable</label>
          <select class="form-select" id="am-responsable">
            <option>Adrián Redondo</option><option>Laura Sánchez</option><option>Pablo Ferrer</option><option>Marta Iglesias</option><option>Sergio Molina</option><option>Elena Vidal</option>
          </select>
        </div>
        <div class="form-group" style="margin-bottom:0"><label class="form-label">Fecha compromiso</label>
          <input type="text" class="form-input" id="am-fecha" placeholder="DD/MM/AAAA" value="${item?.fecha||''}">
        </div>
      </div>`;
  } else if (tipo === 'alerta') {
    body = `
      <div class="form-group"><label class="form-label">Tipo de alerta</label>
        <select class="form-select" id="am-tipo-alerta">
          <option value="renovacion">Renovación de contrato</option>
          <option value="firma_pendiente">Servicio sin firma</option>
          <option value="presupuesto">Presupuesto pendiente</option>
          <option value="sla">SLA pendiente de validar</option>
          <option value="addenda">Addenda pendiente</option>
          <option value="pricing">Actualización de pricing</option>
        </select>
      </div>
      <div class="form-group"><label class="form-label">Descripción *</label><textarea class="form-textarea" id="am-desc" placeholder="Describe la alerta y qué se necesita..." style="min-height:70px;"></textarea></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div class="form-group" style="margin-bottom:0"><label class="form-label">Urgencia</label>
          <select class="form-select" id="am-urgencia"><option value="critica">Crítica</option><option value="alta" selected>Alta</option><option value="media">Media</option></select>
        </div>
        <div class="form-group" style="margin-bottom:0"><label class="form-label">Fecha límite</label>
          <input type="text" class="form-input" id="am-fecha" placeholder="DD/MM/AAAA">
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px;">
        <div class="form-group" style="margin-bottom:0"><label class="form-label">Responsable</label>
          <select class="form-select" id="am-responsable"><option>Adrián Redondo</option><option>Laura Sánchez</option><option>Pablo Ferrer</option><option>Marta Iglesias</option><option>Sergio Molina</option><option>Elena Vidal</option></select>
        </div>
        <div class="form-group" style="margin-bottom:0"><label class="form-label">Referencia doc.</label>
          <input type="text" class="form-input" id="am-doc-ref" placeholder="Ej: Contrato FM 2021">
        </div>
      </div>`;
  } else { // nota
    body = `
      <div class="form-group"><label class="form-label">Título *</label><input type="text" class="form-input" id="am-titulo" placeholder="Ej: Reunión con Juan Méndez"></div>
      <div class="form-group"><label class="form-label">Texto libre</label><textarea class="form-textarea" id="am-desc" placeholder="Escribe el contexto, acuerdo, feedback o warning..." style="min-height:90px;"></textarea></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div class="form-group" style="margin-bottom:0"><label class="form-label">Etiquetas</label>
          <select class="form-select" id="am-etiqueta"><option value="llamada">📞 Llamada</option><option value="reunion">🤝 Reunión</option><option value="acuerdo">🖊 Acuerdo verbal</option><option value="warning">⚠️ Warning</option><option value="feedback">💬 Feedback cliente</option><option value="contexto">📌 Contexto</option></select>
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">Fijar nota</label>
          <label style="display:flex;align-items:center;gap:8px;margin-top:8px;cursor:pointer;font-size:13px;">
            <input type="checkbox" id="am-fijada" style="accent-color:var(--warn);width:15px;height:15px;"> 📌 Fijar en la parte superior
          </label>
        </div>
      </div>`;
  }
  document.getElementById('act-modal-body').innerHTML = body;
  openModal('modal-actividad');
}

function actModalGuardar() {
  const d = actData(_actCurrentCliente);
  const now = new Date().toLocaleDateString('es-ES');
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2,5);

  if (_actModalType === 'op') {
    const titulo = document.getElementById('am-titulo')?.value.trim();
    if (!titulo) { document.getElementById('am-titulo').style.borderColor='var(--danger)'; return; }
    if (_actEditId) {
      const item = d.operacional.find(x => x.id === _actEditId);
      if (item) {
        item.titulo = titulo;
        item.descripcion = document.getElementById('am-desc')?.value||'';
        item.estado = document.getElementById('am-estado')?.value||'pendiente';
        item.prioridad = document.getElementById('am-prioridad')?.value||'media';
        item.responsable = document.getElementById('am-responsable')?.value||'Adrián Redondo';
        item.fecha = document.getElementById('am-fecha')?.value||'';
      }
      _actEditId = null;
    } else {
      d.operacional.unshift({ id:uid(), titulo, descripcion:document.getElementById('am-desc')?.value||'', estado:document.getElementById('am-estado')?.value||'pendiente', prioridad:document.getElementById('am-prioridad')?.value||'media', responsable:document.getElementById('am-responsable')?.value||'Adrián Redondo', fecha:document.getElementById('am-fecha')?.value||'', modulo:{tipo:null,ref:null}, creado:now });
    }
    renderActOp(d.operacional);
  } else if (_actModalType === 'alerta') {
    const desc = document.getElementById('am-desc')?.value.trim();
    if (!desc) { document.getElementById('am-desc').style.borderColor='var(--danger)'; return; }
    d.alertas.unshift({ id:uid(), tipo:document.getElementById('am-tipo-alerta')?.value||'renovacion', descripcion:desc, fecha_limite:document.getElementById('am-fecha')?.value||'', estado:'activa', responsable:document.getElementById('am-responsable')?.value||'Adrián Redondo', urgencia:document.getElementById('am-urgencia')?.value||'alta', doc_ref:document.getElementById('am-doc-ref')?.value||'' });
    renderActAlertas(d.alertas);
  } else {
    const titulo = document.getElementById('am-titulo')?.value.trim();
    if (!titulo) { document.getElementById('am-titulo').style.borderColor='var(--danger)'; return; }
    d.notas.unshift({ id:uid(), titulo, texto:document.getElementById('am-desc')?.value||'', fecha:now, autor:'Adrián Redondo', etiquetas:[document.getElementById('am-etiqueta')?.value||'contexto'], fijada:document.getElementById('am-fijada')?.checked||false, adjunto:null });
    renderActNotas(d.notas);
  }
  updateActSummary(d);
  closeModal('modal-actividad');
  showToast('Guardado correctamente');
}

// Hook into switchTab for actividad
const _origSwitchTabAct = switchTab;
switchTab = function(name) {
  _origSwitchTabAct(name);
  if (name === 'actividad') {
    const clienteNombre = document.getElementById('dc-nombre')?.textContent || 'Inditex SA';
    renderActividad(clienteNombre);
  }
};

// ===== CALENDARIO / PLANIFICACIÓN ANUAL =====
const MESES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const MESES_FULL = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const FRECUENCIA_MESES = {
  'Diaria':     [1,2,3,4,5,6,7,8,9,10,11,12],
  'Semanal':    [1,2,3,4,5,6,7,8,9,10,11,12],
  'Quincenal':  [1,2,3,4,5,6,7,8,9,10,11,12],
  'Mensual':    [1,2,3,4,5,6,7,8,9,10,11,12],
  'Bimestral':  [1,3,5,7,9,11],
  'Trimestral': [1,4,7,10],
  'Semestral':  [1,7],
  'Anual':      [1],
  'Continua':   [1,2,3,4,5,6,7,8,9,10,11,12],
  'A demanda':  []
};

const FREQ_ICON = {
  'Diaria':'⚡','Semanal':'📅','Quincenal':'📅','Mensual':'🔄',
  'Bimestral':'🔄','Trimestral':'🔁','Semestral':'📆','Anual':'📌',
  'Continua':'♾️','A demanda':'📋'
};

// Eventos programados — en producción vendrían de BD
// { srvCod, mes (1-12), estado, nota }
const calEventos = {
  'SRV-001': [
    {mes:1,estado:'realizado'},{mes:2,estado:'realizado'},{mes:3,estado:'realizado'},
    {mes:4,estado:'realizado'},{mes:5,estado:'realizado'},{mes:6,estado:'programado'},
    {mes:7,estado:'programado'},{mes:8,estado:'programado'},{mes:9,estado:'programado'},
    {mes:10,estado:'programado'},{mes:11,estado:'programado'},{mes:12,estado:'programado'}
  ],
  'SRV-002': [
    {mes:1,estado:'realizado'},{mes:2,estado:'realizado'},{mes:3,estado:'realizado'},
    {mes:4,estado:'realizado',nota:'Revisión filtros adicional'},{mes:5,estado:'incidencia',nota:'Avería unidad 7 — OT-2847'},
    {mes:6,estado:'pendiente'},{mes:7,estado:'programado'},{mes:8,estado:'programado'},
    {mes:9,estado:'programado'},{mes:10,estado:'programado'},{mes:11,estado:'programado'},{mes:12,estado:'programado'}
  ],
  'SRV-003': [
    {mes:1,estado:'realizado'},{mes:2,estado:'realizado'},{mes:3,estado:'realizado'},
    {mes:4,estado:'realizado'},{mes:5,estado:'pendiente'},{mes:6,estado:'programado'},
    {mes:7,estado:'programado'},{mes:8,estado:'programado'},{mes:9,estado:'programado'},
    {mes:10,estado:'programado'},{mes:11,estado:'programado'},{mes:12,estado:'programado'}
  ],
  'SRV-004': [
    {mes:1,estado:'realizado'},{mes:2,estado:'realizado'},{mes:3,estado:'realizado'},
    {mes:4,estado:'realizado'},{mes:5,estado:'realizado'},{mes:6,estado:'programado'},
    {mes:7,estado:'programado'},{mes:8,estado:'programado'},{mes:9,estado:'programado'},
    {mes:10,estado:'programado'},{mes:11,estado:'programado'},{mes:12,estado:'programado'}
  ],
  'SRV-005': [
    {mes:1,estado:'realizado'},{mes:4,estado:'pendiente'},{mes:7,estado:'programado'},{mes:10,estado:'programado'}
  ],
  'SRV-006': [
    {mes:1,estado:'realizado'},{mes:2,estado:'realizado'},{mes:3,estado:'realizado'},
    {mes:4,estado:'realizado'},{mes:5,estado:'realizado'},{mes:6,estado:'programado'},
    {mes:7,estado:'programado'},{mes:8,estado:'programado'},{mes:9,estado:'programado'},
    {mes:10,estado:'programado'},{mes:11,estado:'programado'},{mes:12,estado:'programado'}
  ],
};

let _calYear = new Date().getFullYear();
let _calClienteNombre = 'Inditex SA';
let _calSrvFilter = '';

function calPrevYear() { _calYear--; renderCalendario(); }
function calNextYear() { _calYear++; renderCalendario(); }

function renderCalendario() {
  const clienteNombre = document.getElementById('dc-nombre')?.textContent || _calClienteNombre;
  _calClienteNombre = clienteNombre;
  _calSrvFilter = document.getElementById('cal-filter-servicio')?.value || '';

  const hoy = new Date();
  const mesActual = hoy.getMonth() + 1; // 1-12
  const anioActual = hoy.getFullYear();

  // Servicios activos del cliente
  let servicios = serviciosData.filter(s => s.cliente === clienteNombre && s.estado === 'activo');
  if (_calSrvFilter) servicios = servicios.filter(s => s.cod === _calSrvFilter);

  // Populate filter select
  const sel = document.getElementById('cal-filter-servicio');
  if (sel && sel.options.length <= 1) {
    const all = serviciosData.filter(s => s.cliente === clienteNombre && s.estado === 'activo');
    all.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.cod; opt.textContent = s.nombre;
      sel.appendChild(opt);
    });
  }

  // KPI strip
  const allEventos = servicios.flatMap(s => (calEventos[s.cod]||[]).filter(e => !_calYear || true));
  const nRealizados  = allEventos.filter(e => e.estado === 'realizado').length;
  const nProgramados = allEventos.filter(e => e.estado === 'programado').length;
  const nPendientes  = allEventos.filter(e => e.estado === 'pendiente').length;
  const nIncidencias = allEventos.filter(e => e.estado === 'incidencia').length;
  const cumplimiento = allEventos.length > 0 ? Math.round((nRealizados / (nRealizados + nPendientes + nIncidencias)) * 100) || 0 : 0;

  const kpiEl = document.getElementById('cal-kpi-strip');
  if (kpiEl) kpiEl.innerHTML = [
    { label:'Servicios activos', val: servicios.length, color:'var(--accent)', bg:'var(--accent-light)' },
    { label:'Realizados', val: nRealizados, color:'#1F6FEB', bg:'#EBF2FF' },
    { label:'Programados', val: nProgramados, color:'#0D9373', bg:'#E8F7F3' },
    { label:'Pendientes', val: nPendientes, color:'#D97706', bg:'#FEF3C7' },
    { label:'Cumplimiento anual', val: cumplimiento + '%', color: cumplimiento >= 80 ? '#0D9373' : cumplimiento >= 60 ? '#D97706' : '#DC2626', bg: cumplimiento >= 80 ? '#E8F7F3' : cumplimiento >= 60 ? '#FEF3C7' : '#FEF2F2' },
  ].map(k => `
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:11px 14px;display:flex;align-items:center;gap:10px;">
      <div style="width:32px;height:32px;border-radius:7px;background:${k.bg};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <span style="font-size:14px;font-weight:800;color:${k.color};">${k.val}</span>
      </div>
      <div style="font-size:11px;color:var(--text-2);line-height:1.3;">${k.label}</div>
    </div>`).join('');

  // Build calendar grid
  const wrap = document.getElementById('cal-grid-wrap');
  if (!wrap) return;

  const ESTADO_ICON = { realizado:'✓', programado:'◉', pendiente:'○', incidencia:'⚠' };
  const ESTADO_LABEL = { realizado:'Realizado', programado:'Programado', pendiente:'Pendiente', incidencia:'Incidencia' };

  if (servicios.length === 0) {
    wrap.innerHTML = `<div style="padding:40px;text-align:center;color:var(--text-3);font-size:13px;">Sin servicios activos para este cliente.</div>`;
    return;
  }

  let html = `<table class="cal-table"><thead><tr>
    <th class="cal-service-col" style="position:sticky;left:0;z-index:2;background:var(--surface-2);">
      Servicio · Frecuencia
      <div style="font-size:9px;font-weight:400;color:var(--text-3);margin-top:1px;">${servicios.length} servicios · ${_calYear}</div>
    </th>`;

  MESES.forEach((m, i) => {
    const isToday = (i + 1) === mesActual && _calYear === anioActual;
    html += `<th style="${isToday ? 'color:var(--accent);background:#EBF2FF;' : ''}">${m}${isToday ? '<div style="width:5px;height:5px;background:var(--accent);border-radius:50%;margin:2px auto 0;"></div>' : ''}</th>`;
  });
  html += `</tr></thead><tbody>`;

  servicios.forEach((srv, ri) => {
    const frecMeses = FRECUENCIA_MESES[srv.frecuencia] || [];
    const eventos = calEventos[srv.cod] || [];
    const rowClass = ri % 2 === 1 ? 'cal-row-alt' : '';

    html += `<tr class="${rowClass}">
      <td style="position:sticky;left:0;z-index:1;${ri%2===1?'background:var(--surface-2);':'background:var(--surface);'}">
        <div class="cal-service-cell">
          <div class="cal-service-name" title="${srv.nombre}">${srv.nombre}</div>
          <div class="cal-service-freq">${FREQ_ICON[srv.frecuencia]||''} ${srv.frecuencia} · ${srv.proveedor}</div>
        </div>
      </td>`;

    for (let m = 1; m <= 12; m++) {
      const isToday = m === mesActual && _calYear === anioActual;
      const isScheduled = frecMeses.includes(m);
      const evento = eventos.find(e => e.mes === m);

      let cellContent = '';
      if (evento) {
        const tip = evento.nota ? ` title="${evento.nota}"` : '';
        cellContent = `<div class="cal-event ${evento.estado}"${tip} onclick="calShowDetail('${srv.cod}',${m},'${srv.nombre}','${evento.estado}',${JSON.stringify(evento.nota||'')})">
          <span>${ESTADO_ICON[evento.estado]}</span>
          <span>${ESTADO_LABEL[evento.estado].substring(0,4)}.</span>
        </div>`;
      } else if (isScheduled) {
        cellContent = `<div class="cal-event pendiente" title="No registrado — frecuencia: ${srv.frecuencia}" onclick="calShowDetail('${srv.cod}',${m},'${srv.nombre}','sin_registro','')">
          <span>—</span>
        </div>`;
      } else {
        cellContent = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;opacity:0.2;font-size:10px;color:var(--text-3);">·</div>`;
      }

      html += `<td class="cal-month-cell${isToday ? ' today-month' : ''}" style="${isToday ? 'background:rgba(31,111,235,0.06);' : ''}">${cellContent}</td>`;
    }
    html += `</tr>`;
  });

  // Totals row
  html += `<tr style="background:var(--surface-2);">
    <td style="position:sticky;left:0;z-index:1;background:var(--surface-2);">
      <div class="cal-service-cell" style="padding:8px 14px;">
        <div style="font-size:11px;font-weight:600;color:var(--text-2);">Intervenciones totales / mes</div>
      </div>
    </td>`;
  for (let m = 1; m <= 12; m++) {
    const total = servicios.reduce((acc, srv) => {
      const ev = (calEventos[srv.cod]||[]).find(e => e.mes === m);
      const freq = (FRECUENCIA_MESES[srv.frecuencia]||[]).includes(m);
      return acc + (ev || freq ? 1 : 0);
    }, 0);
    html += `<td style="text-align:center;padding:6px 0;font-size:11px;font-weight:600;color:var(--text-2);">${total > 0 ? total : '—'}</td>`;
  }
  html += `</tr></tbody></table>`;

  wrap.innerHTML = html;
  setEl('cal-year-label', _calYear);
}

function calShowDetail(cod, mes, nombre, estado, nota) {
  const panel = document.getElementById('cal-detail-panel');
  if (!panel) return;

  const ESTADO_COLOR = { realizado:'var(--accent)', programado:'var(--accent-2)', pendiente:'var(--warn)', incidencia:'var(--danger)', sin_registro:'var(--text-3)' };
  const ESTADO_LABEL = { realizado:'Realizado ✓', programado:'Programado', pendiente:'Pendiente de registro', incidencia:'Incidencia', sin_registro:'Sin registrar' };

  panel.style.display = 'block';
  panel.innerHTML = `
    <div class="card" style="overflow:hidden;">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:13px 18px;border-bottom:1px solid var(--border);background:var(--surface-2);">
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="font-size:12px;font-weight:600;color:var(--text-2);text-transform:uppercase;letter-spacing:0.5px;">Detalle intervención</span>
          <span style="font-size:11px;padding:2px 8px;border-radius:10px;font-weight:600;background:${ESTADO_COLOR[estado]}22;color:${ESTADO_COLOR[estado]};">${ESTADO_LABEL[estado]}</span>
        </div>
        <button onclick="document.getElementById('cal-detail-panel').style.display='none'" class="btn btn-ghost btn-sm" style="font-size:12px;">✕ Cerrar</button>
      </div>
      <div style="padding:18px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;">
        <div>
          <div style="font-size:10.5px;color:var(--text-3);text-transform:uppercase;letter-spacing:0.4px;margin-bottom:4px;">Servicio</div>
          <div style="font-size:13.5px;font-weight:600;">${nombre}</div>
          <div style="font-size:11.5px;color:var(--text-2);margin-top:2px;">${MESES_FULL[mes-1]} ${_calYear}</div>
        </div>
        <div>
          <div style="font-size:10.5px;color:var(--text-3);text-transform:uppercase;letter-spacing:0.4px;margin-bottom:4px;">Estado</div>
          <div style="font-size:13.5px;font-weight:600;color:${ESTADO_COLOR[estado]};">${ESTADO_LABEL[estado]}</div>
        </div>
        <div>
          <div style="font-size:10.5px;color:var(--text-3);text-transform:uppercase;letter-spacing:0.4px;margin-bottom:4px;">Notas</div>
          <div style="font-size:12.5px;color:var(--text-2);">${nota || 'Sin notas adicionales'}</div>
        </div>
      </div>
      <div style="padding:12px 18px;border-top:1px solid var(--border);display:flex;gap:8px;">
        ${estado === 'pendiente' || estado === 'sin_registro'
          ? `<button class="btn btn-primary btn-sm" onclick="calMarcarRealizado('${cod}',${mes});document.getElementById('cal-detail-panel').style.display='none'">✓ Marcar como realizado</button>
             <button class="btn btn-secondary btn-sm" onclick="calMarcarIncidencia('${cod}',${mes});document.getElementById('cal-detail-panel').style.display='none'">⚠ Registrar incidencia</button>`
          : estado === 'realizado'
          ? `<button class="btn btn-secondary btn-sm" onclick="calMarcarIncidencia('${cod}',${mes});document.getElementById('cal-detail-panel').style.display='none'">⚠ Convertir en incidencia</button>`
          : `<button class="btn btn-primary btn-sm" onclick="calMarcarRealizado('${cod}',${mes});document.getElementById('cal-detail-panel').style.display='none'">✓ Marcar como realizado</button>`
        }
        <button class="btn btn-ghost btn-sm" onclick="showToast('Ir a OT — funcionalidad en desarrollo')">→ Ver OT relacionada</button>
      </div>
    </div>`;
}

function calMarcarRealizado(cod, mes) {
  if (!calEventos[cod]) calEventos[cod] = [];
  const ev = calEventos[cod].find(e => e.mes === mes);
  if (ev) ev.estado = 'realizado'; else calEventos[cod].push({mes, estado:'realizado'});
  renderCalendario();
  showToast('Intervención marcada como realizada');
}

function calMarcarIncidencia(cod, mes) {
  if (!calEventos[cod]) calEventos[cod] = [];
  const ev = calEventos[cod].find(e => e.mes === mes);
  if (ev) ev.estado = 'incidencia'; else calEventos[cod].push({mes, estado:'incidencia'});
  renderCalendario();
  showToast('Incidencia registrada');
}

// Hook into switchTab for calendario
const _origSwitchTabCal = switchTab;
switchTab = function(name) {
  _origSwitchTabCal(name);
  if (name === 'calendario') {
    setTimeout(() => renderCalendario(), 30);
  }
};

// ===== DOCUMENTOS MODULE =====