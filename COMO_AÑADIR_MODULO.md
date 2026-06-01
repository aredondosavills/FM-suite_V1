# Cómo añadir un nuevo módulo a FM Suite

## Estructura de un módulo

Crea el archivo `js/modules/nombre_modulo.js` con esta estructura:

```javascript
window.FMSuite.register('nombre_modulo', {

  // Datos del módulo (opcional)
  data: [],

  // init() se llama automáticamente al navegar a esta vista
  init() {
    this.render();
  },

  // Lógica del módulo
  render() {
    const container = document.getElementById('view-nombre_modulo');
    // ... tu código aquí
  }
});
```

## Pasos para añadir un módulo nuevo

### 1. Crea el archivo JS
`js/modules/facturacion.js` (ejemplo)

### 2. Añade la vista HTML en index.html
Dentro de `<main>`, antes del `</main>`:
```html
<div id="view-facturacion" class="hidden">
  <!-- contenido del módulo -->
</div>
```

### 3. Añade el ítem en el sidebar (index.html)
```html
<div class="nav-item" onclick="FMSuite.navigate('facturacion')">
  <svg ...></svg>
  Facturación
</div>
```

### 4. Registra la vista en app.js
En el array `views` de `app.js`:
```javascript
views: ['dashboard','clientes',...,'facturacion'],
```

### 5. Carga el script en index.html
Al final del body, en la sección de módulos:
```html
<script src="js/modules/facturacion.js"></script>
```

### 6. Sube a GitHub
Solo necesitas subir los archivos modificados:
- `js/modules/facturacion.js` (nuevo)
- `index.html` (modificado — vista + nav + script tag)
- `js/app.js` (modificado — array views)

## Reglas importantes

- **Nunca** pongas lógica en `index.html`, solo estructura HTML
- **Nunca** toques `core.js` para añadir módulos
- **Siempre** usa `window.FMSuite.register()` para registrar
- **Siempre** carga los scripts en orden: app.js → data.js → core.js → módulos → boot
- El archivo más grande permitido por módulo: **100KB**
- Si un módulo supera 100KB, divídelo en submódulos

## Módulos en desarrollo (próximos)

- `facturacion.js` — Gestión de facturas y cobros
- `preventivos.js` — Mantenimiento preventivo global
- `reporting.js` — Informes y KPIs
- `esg.js` — Sostenibilidad y ESG
