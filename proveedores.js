// ============================================================
// MÓDULO: proveedores.js
// FM Suite — Facility Management Platform
// ============================================================
// Registra este módulo en el sistema global
window.FMSuite.register('proveedores', {

  // ── DATOS ────────────────────────────────────────────────
  data: [
    { id:'PRV-001', nombre:'TechFacilities SA', cif:'B-82301234',
      dir:'Calle Gran Vía 45, 28013 Madrid',
      categoria:'climatizacion', cobertura:['Madrid','Barcelona','Zaragoza'],
      estado:'activo', finicio:'01/04/2021', ffin:'31/03/2027',
      sla:'Crítica 4h · urgente 24h · normal 72h', evaluacion:4,
      responsable:'Adrián Redondo',
      contacto_comercial:{nombre:'Javier Martín',email:'j.martin@techfacilities.com',tel:'+34 912 345 678'},
      contacto_operativo:{nombre:'Carmen López',email:'c.lopez@techfacilities.com',tel:'+34 612 345 678'},
      observaciones:'Proveedor principal climatización. Buen tiempo de respuesta.' },
    { id:'PRV-002', nombre:'CleanCorp SL', cif:'B-91234567',
      dir:'Avda. Industria 12, 28108 Alcobendas',
      categoria:'limpieza', cobertura:['Madrid','Valencia'],
      estado:'activo', finicio:'01/04/2021', ffin:'31/03/2026',
      sla:'Diario L-V · incidencias 2h', evaluacion:3,
      responsable:'Adrián Redondo',
      contacto_comercial:{nombre:'Ana Ruiz',email:'aruiz@cleancorp.es',tel:'+34 911 234 567'},
      contacto_operativo:{nombre:'Miguel Torres',email:'m.torres@cleancorp.es',tel:'+34 661 234 567'},
      observaciones:'Pendiente revisar calidad planta 2 Inditex.' },
    { id:'PRV-003', nombre:'ElecPro', cif:'A-12345678',
      dir:'Pol. Industrial Norte, Nave 8, 50012 Zaragoza',
      categoria:'electricidad', cobertura:['Zaragoza','Madrid','Bilbao'],
      estado:'activo', finicio:'01/04/2021', ffin:'31/12/2026',
      sla:'Emergencias 2h · preventivo según programa', evaluacion:4,
      responsable:'Pablo Ferrer',
      contacto_comercial:{nombre:'Roberto Sanz',email:'r.sanz@elecpro.es',tel:'+34 976 123 456'},
      contacto_operativo:{nombre:'Lucía Vega',email:'l.vega@elecpro.es',tel:'+34 676 123 456'},
      observaciones:'' },
    { id:'PRV-004', nombre:'FireTech SL', cif:'B-23456789',
      dir:'Calle Metalurgia 6, 08038 Barcelona',
      categoria:'contra_incendios', cobertura:['Barcelona','Madrid','Valencia'],
      estado:'activo', finicio:'01/04/2021', ffin:'31/03/2026',
      sla:'Emergencias 1h · revisiones normativa', evaluacion:5,
      responsable:'Adrián Redondo',
      contacto_comercial:{nombre:'Pedro Blanco',email:'p.blanco@firetech.es',tel:'+34 934 567 890'},
      contacto_operativo:{nombre:'Sofía Mora',email:'s.mora@firetech.es',tel:'+34 634 567 890'},
      observaciones:'Certificado RIPCI vigente. Renovación noviembre 2026.' },
    { id:'PRV-005', nombre:'SecureGuard', cif:'A-34567890',
      dir:'Pº de la Castellana 200, 28046 Madrid',
      categoria:'seguridad', cobertura:['Madrid','Barcelona','Valencia'],
      estado:'activo', finicio:'01/06/2021', ffin:'31/05/2026',
      sla:'Vigilancia 24/7 · alarma 15min', evaluacion:4,
      responsable:'Adrián Redondo',
      contacto_comercial:{nombre:'Marcos Gil',email:'m.gil@secureguard.es',tel:'+34 914 567 890'},
      contacto_operativo:{nombre:'Elena Díaz',email:'e.diaz@secureguard.es',tel:'+34 614 567 890'},
      observaciones:'' },
    { id:'PRV-006', nombre:'GreenSpaces', cif:'B-45678901',
      dir:'Camino Jardinería 3, 28223 Pozuelo',
      categoria:'jardineria', cobertura:['Madrid','Guadalajara'],
      estado:'activo', finicio:'15/05/2021', ffin:'14/05/2026',
      sla:'Semanal · incidencias 48h', evaluacion:4,
      responsable:'Adrián Redondo',
      contacto_comercial:{nombre:'Isabel Prado',email:'i.prado@greenspaces.es',tel:'+34 916 789 012'},
      contacto_operativo:{nombre:'Carlos Ramos',email:'c.ramos@greenspaces.es',tel:'+34 616 789 012'},
      observaciones:'' },
    { id:'PRV-007', nombre:'Otis Ibérica', cif:'A-56789012',
      dir:'Calle Orense 34, 28020 Madrid',
      categoria:'ascensores', cobertura:['Madrid','Barcelona','Sevilla'],
      estado:'baja', finicio:'01/04/2021', ffin:'28/02/2025',
      sla:'Mensual · emergencias 2h', evaluacion:3,
      responsable:'Pablo Ferrer',
      contacto_comercial:{nombre:'Juan Herrero',email:'j.herrero@otis.com',tel:'+34 915 678 901'},
      contacto_operativo:{nombre:'Nuria Castillo',email:'n.castillo@otis.com',tel:'+34 615 678 901'},
      observaciones:'Contrato rescindido feb 2025.' },
    { id:'PRV-008', nombre:'PestControl Pro', cif:'B-67890123',
      dir:'Calle Industria 45, 46023 Valencia',
      categoria:'control_plagas', cobertura:['Valencia','Madrid','Murcia'],
      estado:'homologacion', finicio:'01/09/2022', ffin:'31/08/2025',
      sla:'Mensual · emergencias 24h', evaluacion:3,
      responsable:'Elena Vidal',
      contacto_comercial:{nombre:'Tomás Vidal',email:'t.vidal@pestcontrolpro.es',tel:'+34 963 456 789'},
      contacto_operativo:{nombre:'Rosa Ferrer',email:'r.ferrer@pestcontrolpro.es',tel:'+34 663 456 789'},
      observaciones:'Pendiente certificado RC para completar homologación.' },
  ],

  CAT_LABEL: {
    limpieza:'Limpieza', climatizacion:'Climatización/HVAC', electricidad:'Electricidad',
    seguridad:'Seguridad', contra_incendios:'Contra incendios', jardineria:'Jardinería',
    ascensores:'Ascensores', control_plagas:'Control de plagas', fontaneria:'Fontanería',
    it:'IT / Tecnología', otros:'Otros'
  },
  CAT_COLOR: {
    limpieza:'#0D9373', climatizacion:'#1F6FEB', electricidad:'#D97706',
    seguridad:'#DC2626', contra_incendios:'#EF4444', jardineria:'#16A34A',
    ascensores:'#8B5CF6', control_plagas:'#78716C', fontaneria:'#0EA5E9',
    it:'#6366F1', otros:'#9E9B95'
  },
  CAT_ICON: {
    limpieza:'🧹', climatizacion:'❄️', electricidad:'⚡', seguridad:'🔐',
    contra_incendios:'🔥', jardineria:'🌿', ascensores:'🛗',
    control_plagas:'🐜', fontaneria:'🚿', it:'💻', otros:'🔧'
  },

  _editId: null,
  _currentId: null,
  _tabActiva: 'general',

  // ── INIT (llamado por app.js al registrar la vista) ──────
  init() {
    this.render();
  },

  // ── HELPERS ──────────────────────────────────────────────
  getServiciosActivos(nombre) {
    return (window.serviciosData||[]).filter(s => s.proveedor===nombre && s.estado==='activo');
  },
  getClientes(nombre) {
    return [...new Set(this.getServiciosActivos(nombre).map(s => s.cliente))];
  },
  stars(n) {
    return Array.from({length:5},(_,i)=>`<span style="color:${i<n?'#D97706':'#E5E3DE'}">★</span>`).join('');
  },
  badgeHtml(estado) {
    const map = {
      activo: 'background:var(--accent-2-light);color:var(--accent-2)',
      homologacion: 'background:var(--warn-light);color:var(--warn)',
      baja: 'background:#F3F4F6;color:#6B7280'
    };
    const labels = {activo:'Activo', homologacion:'Homologación', baja:'Baja'};
    return `<span style="font-size:11px;padding:2px 8px;border-radius:10px;font-weight:500;${map[estado]||''}">${labels[estado]||estado}</span>`;
  },

  // ── RENDER LISTADO ────────────────────────────────────────
  render() {
    const q    = (document.getElementById('pv-search')?.value||'').toLowerCase();
    const fCat = document.getElementById('pv-f-cat')?.value||'';
    const fEst = document.getElementById('pv-f-estado')?.value||'';
    const fRes = document.getElementById('pv-f-responsable')?.value||'';

    const filtered = this.data.filter(p => {
      if (q && !(p.nombre+p.cif).toLowerCase().includes(q)) return false;
      if (fCat && p.categoria!==fCat) return false;
      if (fEst && p.estado!==fEst) return false;
      if (fRes && p.responsable!==fRes) return false;
      return true;
    });

    const set = (id,v) => { const el=document.getElementById(id); if(el) el.textContent=v; };
    set('pv-kpi-total',    this.data.length);
    set('pv-kpi-activos',  this.data.filter(p=>p.estado==='activo').length);
    set('pv-kpi-homo',     this.data.filter(p=>p.estado==='homologacion').length);
    set('pv-kpi-servicios',this.data.reduce((a,p)=>a+this.getServiciosActivos(p.nombre).length,0));
    set('pv-count', filtered.length+' proveedor'+(filtered.length!==1?'es':''));

    const tbody = document.getElementById('pv-tbody');
    if (!tbody) return;
    if (!filtered.length) {
      tbody.innerHTML = '<tr><td colspan="7" style="padding:32px;text-align:center;color:var(--text-3)">Sin resultados</td></tr>';
      return;
    }

    const self = this;
    tbody.innerHTML = filtered.map(p => {
      const srvs = self.getServiciosActivos(p.nombre);
      const clis = self.getClientes(p.nombre);
      const col  = self.CAT_COLOR[p.categoria]||'#9E9B95';
      return `<tr style="border-bottom:1px solid var(--border);cursor:pointer"
        onclick="window.FMSuite.modules.proveedores.openDetalle('${p.id}')"
        onmouseenter="this.style.background='var(--surface-2)'"
        onmouseleave="this.style.background=''">
        <td style="padding:11px 14px">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="width:36px;height:36px;border-radius:8px;background:${col}22;display:flex;align-items:center;justify-content:center;font-size:18px">${self.CAT_ICON[p.categoria]||'🔧'}</div>
            <div>
              <div style="font-size:13.5px;font-weight:600">${p.nombre}</div>
              <div style="font-size:11px;color:var(--text-3)">${p.cif} · ${(p.cobertura||[]).join(', ')}</div>
            </div>
          </div>
        </td>
        <td style="padding:11px 14px"><span style="font-size:11px;padding:2px 8px;border-radius:10px;font-weight:500;background:${col}22;color:${col}">${self.CAT_LABEL[p.categoria]||p.categoria}</span></td>
        <td style="padding:11px 14px;font-size:12.5px">${clis.join('<br>')||'<span style="color:var(--text-3)">Sin asignar</span>'}</td>
        <td style="padding:11px 14px;font-size:13px;font-weight:600;color:var(--accent)">${srvs.length}</td>
        <td style="padding:11px 14px"><div style="font-weight:500">${p.contacto_operativo?.nombre||'—'}</div><div style="font-size:11px;color:var(--text-3)">${p.contacto_operativo?.tel||''}</div></td>
        <td style="padding:11px 14px"><div style="display:flex;align-items:center;gap:6px"><div style="width:20px;height:20px;border-radius:50%;background:${window.avatarColor?avatarColor(p.responsable):'#1F6FEB'};display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#fff">${p.responsable.split(' ').map(w=>w[0]).slice(0,2).join('')}</div><span style="font-size:12px">${p.responsable}</span></div></td>
        <td style="padding:11px 14px">${self.badgeHtml(p.estado)}</td>
      </tr>`;
    }).join('');
  },

  // ── DETALLE ───────────────────────────────────────────────
  openDetalle(id) {
    this._currentId = id;
    const p = this.data.find(x=>x.id===id);
    if (!p) return;
    const s=(id,v)=>{const el=document.getElementById(id);if(el)el.innerHTML=v;};
    s('dpv-nombre', p.nombre);
    s('dpv-meta', `${this.CAT_LABEL[p.categoria]||p.categoria} · ${p.cif} · ${(p.cobertura||[]).join(', ')}`);
    s('dpv-badge', this.badgeHtml(p.estado));
    window.FMSuite.navigate('detalle-proveedor');
    this.switchTab('general');
  },

  switchTab(name) {
    this._tabActiva = name;
    document.querySelectorAll('[data-pvtab]').forEach(el =>
      el.classList.toggle('active', el.dataset.pvtab===name));
    this.renderTab(name);
  },

  renderTab(name) {
    const p = this.data.find(x=>x.id===this._currentId);
    if (!p) return;
    const container = document.getElementById('dpv-tab-content');
    if (!container) return;
    const irow = (l,v) => `<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--surface-2)"><span style="font-size:12px;color:var(--text-3)">${l}</span><span style="font-size:13px">${v}</span></div>`;
    const col = this.CAT_COLOR[p.categoria]||'#9E9B95';
    const ini = p.responsable.split(' ').map(w=>w[0]).slice(0,2).join('');
    const avCol = window.avatarColor ? avatarColor(p.responsable) : '#1F6FEB';

    if (name==='general') {
      const srvs = this.getServiciosActivos(p.nombre);
      const clis = this.getClientes(p.nombre);
      container.innerHTML = `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
          <div class="card" style="padding:20px">
            <div style="font-size:11px;font-weight:600;color:var(--text-3);text-transform:uppercase;letter-spacing:.6px;margin-bottom:14px">Datos empresa</div>
            ${irow('Razón social','<strong>'+p.nombre+'</strong>')}
            ${irow('CIF',p.cif)}
            ${irow('Dirección',p.dir||'—')}
            ${irow('Categoría','<span style="font-size:11px;padding:2px 8px;border-radius:10px;background:'+col+'22;color:'+col+';font-weight:500">'+this.CAT_LABEL[p.categoria]+'</span>')}
            ${irow('Cobertura',(p.cobertura||[]).join(', ')||'—')}
            ${irow('Responsable FM','<div style="display:flex;align-items:center;gap:6px"><div style="width:20px;height:20px;border-radius:50%;background:'+avCol+';display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#fff">'+ini+'</div>'+p.responsable+'</div>')}
            ${irow('Inicio',p.finicio||'—')}
            ${irow('Fin contrato','<span style="color:var(--danger)">'+(p.ffin||'—')+'</span>')}
            ${irow('SLA',p.sla||'—')}
            ${irow('Evaluación',this.stars(p.evaluacion||0))}
          </div>
          <div style="display:flex;flex-direction:column;gap:12px">
            <div class="card" style="padding:18px">
              <div style="font-size:11px;font-weight:600;color:var(--text-3);text-transform:uppercase;letter-spacing:.6px;margin-bottom:12px">Contactos</div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
                <div><div style="font-size:11px;font-weight:600;color:var(--text-2);margin-bottom:8px">Comercial</div><div style="font-weight:500">${p.contacto_comercial?.nombre||'—'}</div><div style="font-size:12px;color:var(--accent)">${p.contacto_comercial?.email||''}</div><div style="font-size:12px;color:var(--text-3)">${p.contacto_comercial?.tel||''}</div></div>
                <div><div style="font-size:11px;font-weight:600;color:var(--text-2);margin-bottom:8px">Operativo</div><div style="font-weight:500">${p.contacto_operativo?.nombre||'—'}</div><div style="font-size:12px;color:var(--accent)">${p.contacto_operativo?.email||''}</div><div style="font-size:12px;color:var(--text-3)">${p.contacto_operativo?.tel||''}</div></div>
              </div>
            </div>
            <div class="card" style="padding:18px">
              <div style="font-size:11px;font-weight:600;color:var(--text-3);text-transform:uppercase;letter-spacing:.6px;margin-bottom:12px">Métricas</div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
                ${[['Servicios activos',srvs.length,'var(--accent)'],['Clientes',clis.length,'var(--text-2)']].map(([l,v,c])=>`<div style="background:var(--surface-2);border-radius:6px;padding:10px 12px"><div style="font-size:20px;font-weight:700;color:${c}">${v}</div><div style="font-size:11px;color:var(--text-3);margin-top:2px">${l}</div></div>`).join('')}
              </div>
            </div>
            ${p.observaciones?`<div class="card" style="padding:18px"><div style="font-size:11px;font-weight:600;color:var(--text-3);text-transform:uppercase;letter-spacing:.6px;margin-bottom:8px">Observaciones</div><div style="font-size:13px;color:var(--text-2);line-height:1.6">${p.observaciones}</div></div>`:''}
          </div>
        </div>`;

    } else if (name==='servicios') {
      const srvs = (window.serviciosData||[]).filter(s=>s.proveedor===p.nombre);
      const rows = srvs.map(s=>{
        const moPct = s.precioMes>0?(((s.precioMes-s.costeMes)/s.precioMes)*100).toFixed(1)+'%':'—';
        return `<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 14px;font-weight:500">${s.nombre}</td><td style="padding:10px 14px">${s.cliente}</td><td style="padding:10px 14px;color:var(--text-2);font-size:12px">${s.frecuencia}</td><td style="padding:10px 14px;font-weight:600">${typeof fmtNum==='function'?'€'+fmtNum(s.precioMes):s.precioMes}</td><td style="padding:10px 14px;font-weight:600;color:var(--accent-2)">${moPct}</td><td style="padding:10px 14px"><span class="badge ${s.estado}">${s.estado}</span></td></tr>`;
      }).join('');
      container.innerHTML = `<div class="card" style="overflow:hidden"><table style="width:100%;border-collapse:collapse"><thead><tr style="background:var(--surface-2)">${['Servicio','Cliente','Frecuencia','Precio/mes','MO%','Estado'].map(h=>`<th style="padding:9px 14px;text-align:left;font-size:10.5px;font-weight:600;color:var(--text-3);text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid var(--border)">${h}</th>`).join('')}</tr></thead><tbody>${rows||'<tr><td colspan="6" style="padding:32px;text-align:center;color:var(--text-3)">Sin servicios asignados</td></tr>'}</tbody></table></div>`;

    } else if (name==='asignacion') {
      const srvs = (window.serviciosData||[]).filter(s=>s.proveedor===p.nombre&&s.estado==='activo');
      const clis = [...new Set(srvs.map(s=>s.cliente))].sort();
      container.innerHTML = `
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px">
          ${[['Servicios activos',srvs.length],['Clientes asignados',clis.length],['Ratio',clis.length>0?(srvs.length/clis.length).toFixed(1):'—']].map(([l,v])=>`<div class="card" style="padding:12px 14px"><div style="font-size:20px;font-weight:700;color:var(--accent)">${v}</div><div style="font-size:11px;color:var(--text-3);margin-top:2px">${l}</div></div>`).join('')}
        </div>
        <div class="card" style="overflow:hidden">
          <div style="padding:12px 16px;border-bottom:1px solid var(--border);background:var(--surface-2)"><span style="font-size:11px;font-weight:600;color:var(--text-3);text-transform:uppercase;letter-spacing:.6px">Tabla cruzada Cliente × Servicio</span></div>
          <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse">
            <thead><tr style="background:var(--surface-2)">
              <th style="padding:9px 14px;text-align:left;font-size:11px;font-weight:600;color:var(--text-3);border-bottom:1px solid var(--border)">Cliente</th>
              ${srvs.map(s=>`<th style="padding:9px 10px;text-align:center;font-size:10.5px;font-weight:600;color:var(--text-3);border-bottom:1px solid var(--border)">${s.nombre}</th>`).join('')}
            </tr></thead>
            <tbody>
              ${clis.map(cli=>`<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 14px;font-weight:500">${cli}</td>${srvs.map(s=>{const t=(window.serviciosData||[]).some(x=>x.proveedor===p.nombre&&x.cliente===cli&&x.nombre===s.nombre&&x.estado==='activo');return`<td style="padding:10px;text-align:center">${t?'<span style="color:var(--accent-2);font-size:16px">✓</span>':'<span style="color:var(--border)">—</span>'}</td>`;}).join('')}</tr>`).join('')}
            </tbody>
          </table></div>
        </div>`;

    } else if (name==='documentos') {
      container.innerHTML = `<div class="card" style="padding:40px;text-align:center;color:var(--text-3)"><div style="font-size:32px;margin-bottom:10px">📁</div><div style="font-size:14px;font-weight:500;margin-bottom:4px">Documentación de ${p.nombre}</div><div style="font-size:12px">01. Legal · 02. Contrato marco · 03. Encargos por cliente</div><div style="margin-top:16px"><button class="btn btn-primary btn-sm">Subir documento</button></div></div>`;

    } else if (name==='actividad') {
      container.innerHTML = `<div class="card" style="padding:40px;text-align:center;color:var(--text-3)"><div style="font-size:32px;margin-bottom:10px">📋</div><div style="font-size:14px;font-weight:500;margin-bottom:4px">Sin asuntos activos</div><div style="font-size:12px">Añade notas, alertas o seguimientos sobre ${p.nombre}</div></div>`;
    }
  },

  // ── MODAL ────────────────────────────────────────────────
  openModal(id) {
    this._editId = id||null;
    document.getElementById('pv-modal-title').textContent = id?'Editar proveedor':'Nuevo proveedor';
    document.getElementById('pvm-save-btn').textContent   = id?'Guardar cambios':'Crear proveedor';
    const s=(id,v)=>{const el=document.getElementById(id);if(el)el.value=v||'';};
    if (id) {
      const p=this.data.find(x=>x.id===id);
      if(p){
        s('pvm-nombre',p.nombre);s('pvm-cif',p.cif);s('pvm-dir',p.dir);
        s('pvm-cat',p.categoria);s('pvm-estado',p.estado);
        s('pvm-cobertura',(p.cobertura||[]).join(', '));
        s('pvm-responsable',p.responsable);s('pvm-finicio',p.finicio);
        s('pvm-ffin',p.ffin);s('pvm-sla',p.sla);s('pvm-eval',p.evaluacion||3);
        s('pvm-com-nom',p.contacto_comercial?.nombre);s('pvm-com-email',p.contacto_comercial?.email);s('pvm-com-tel',p.contacto_comercial?.tel);
        s('pvm-op-nom',p.contacto_operativo?.nombre);s('pvm-op-email',p.contacto_operativo?.email);s('pvm-op-tel',p.contacto_operativo?.tel);
      }
    } else {
      ['pvm-nombre','pvm-cif','pvm-dir','pvm-cobertura','pvm-sla','pvm-finicio','pvm-ffin',
       'pvm-com-nom','pvm-com-email','pvm-com-tel','pvm-op-nom','pvm-op-email','pvm-op-tel'
      ].forEach(id=>s(id,''));
    }
    openModal('modal-proveedor');
  },

  save() {
    const g=id=>document.getElementById(id)?.value||'';
    const nombre=g('pvm-nombre').trim();
    if(!nombre){document.getElementById('pvm-nombre').style.borderColor='var(--danger)';return;}
    const obj={
      id:this._editId||('PRV-'+String(this.data.length+1).padStart(3,'0')),
      nombre,cif:g('pvm-cif'),dir:g('pvm-dir'),
      categoria:g('pvm-cat'),
      cobertura:g('pvm-cobertura').split(',').map(s=>s.trim()).filter(Boolean),
      estado:g('pvm-estado'),finicio:g('pvm-finicio'),ffin:g('pvm-ffin'),
      sla:g('pvm-sla'),evaluacion:parseInt(g('pvm-eval'))||3,
      responsable:g('pvm-responsable'),
      contacto_comercial:{nombre:g('pvm-com-nom'),email:g('pvm-com-email'),tel:g('pvm-com-tel')},
      contacto_operativo:{nombre:g('pvm-op-nom'),email:g('pvm-op-email'),tel:g('pvm-op-tel')},
      observaciones:''
    };
    if(this._editId){
      const idx=this.data.findIndex(x=>x.id===this._editId);
      if(idx>=0)this.data[idx]=obj;
    } else {
      this.data.push(obj);
    }
    closeModal('modal-proveedor');
    if(typeof showToast==='function') showToast((this._editId?'Proveedor actualizado':'Proveedor creado')+': '+nombre);
    this._editId=null;
    this.render();
  }
});
