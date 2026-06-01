README.md — pégalo tal cual:
markdown# FM Suite v1.0 — Facility Management Platform

Plataforma web de gestión integral de Facility Management desarrollada para Savills.

## Estado: v1.0 — Release inicial

## Módulos activos
- Dashboard — KPIs globales, alertas, OTs recientes
- Clientes — Cartera de 30 clientes con ficha 360° (7 pestañas)
- Servicios — Listado de servicios activos por cliente
- Órdenes de Trabajo — Gestión y seguimiento de OTs
- Proveedores — Ficha 360°, asignación cliente-servicio, documentación
- Presupuestos — Editor con partidas y descarga PDF
- Sedes — Mapa de ubicaciones con Leaflet
- Actividad — Seguimiento operacional por cliente
- Documentos — Repositorio documental con árbol de carpetas

## Módulos en desarrollo
- Facturación
- Preventivos
- Reporting

## Arquitectura
index.html              ← shell HTML
css/styles.css          ← estilos globales
js/app.js               ← router central (window.FMSuite)
js/modules/
data.js               ← datos globales
core.js               ← navegación y funciones base
presupuestos.js       ← módulo presupuestos
sedes.js              ← módulo sedes
actividad.js          ← módulo actividad
documentos.js         ← módulo documentos
proveedores.js        ← módulo proveedores

## Cómo añadir un módulo nuevo
Ver `COMO_AÑADIR_MODULO.md`

## Acceso
https://aredondosavills.github.io/FM-suite_v1

## Stack
HTML · CSS · JavaScript vanilla · GitHub Pages

Mensaje del primer commit:
feat: FM Suite v1.0 — arquitectura modular inicial

- Estructura multiarchivo: index.html + css/ + js/modules/
- Router central window.FMSuite con navegación modular
- Módulos: dashboard, clientes, servicios, OTs, proveedores,
  presupuestos, sedes, actividad, documentos
- Sin dependencias de build · compatible GitHub Pages
