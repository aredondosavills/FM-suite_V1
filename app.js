// ============================================================
// app.js — FM Suite Core Router
// ============================================================
// Namespace global. Todo vive aquí. Nada en window directamente.
window.FMSuite = {

  // Módulos registrados: { nombre: moduloObj }
  modules: {},

  // Vistas HTML registradas (para hide/show)
  views: ['dashboard','clientes','detalle-cliente','servicios','ots',
          'proveedores','detalle-proveedor'],

  // ── REGISTRO DE MÓDULOS ──────────────────────────────────
  // Cada módulo llama: window.FMSuite.register('nombre', { init(){}, ... })
  register(name, mod) {
    this.modules[name] = mod;
    console.log('[FMSuite] Módulo registrado:', name);
  },

  // ── NAVEGACIÓN CENTRAL ───────────────────────────────────
  navigate(viewId) {
    // Ocultar todas las vistas
    this.views.forEach(v => {
      const el = document.getElementById('view-' + v);
      if (el) el.classList.add('hidden');
    });

    // Mostrar la vista destino
    const target = document.getElementById('view-' + viewId);
    if (target) {
      target.classList.remove('hidden');
    } else {
      console.warn('[FMSuite] Vista no encontrada:', viewId);
    }

    // Actualizar nav sidebar
    document.querySelectorAll('.nav-item').forEach(el => {
      const onclick = el.getAttribute('onclick') || '';
      el.classList.toggle('active',
        onclick.indexOf("'" + viewId + "'") >= 0 ||
        onclick.indexOf('"' + viewId + '"') >= 0
      );
    });

    // Llamar al init del módulo si existe y tiene vista propia
    if (this.modules[viewId] && typeof this.modules[viewId].init === 'function') {
      this.modules[viewId].init();
    }

    // Casos especiales del core (vistas sin módulo propio)
    if (viewId === 'clientes')          renderClientes(clientes);
    if (viewId === 'servicios')         renderServicios();
    if (viewId === 'ots')              renderOTs();
    if (viewId === 'dashboard')        renderDashboard();
  },

  // ── ARRANQUE ─────────────────────────────────────────────
  boot() {
    console.log('[FMSuite] Iniciando...');
    console.log('[FMSuite] Módulos cargados:', Object.keys(this.modules));
    this.navigate('dashboard');
  }
};

// Compatibilidad con llamadas legacy (showView aún existe en el HTML)
function showView(v) {
  window.FMSuite.navigate(v);
}
