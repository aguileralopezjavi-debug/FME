import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './App.css';

type Language = 'es' | 'en' | 'nl' | 'fr';
type Tab = 'retail' | 'foodservice';

const translations: Record<Language, Record<string, string>> = {
  es: {
    'nav.back': 'Inicio', 'nav.qs': 'Quiénes somos',
    'hero.badge': 'Productores directos · Sin intermediarios',
    'hero.h1a': 'Suministro Directo.',
    'hero.h1b': 'Especialistas en Producto.',
    'hero.sub': 'Maximizamos el margen de Retail y Foodservice con un <strong>Fill Rate del 99%</strong>.<br>Desde nuestras plantas logísticas en Europa hasta su cocina o lineal.',
    'hero.cta': 'Retail o Foodservice',
    'stats.eyebrow': 'NUESTRO MÚSCULO EN DATOS CLAVE',
    'stats.t': 'Facturación 2025',
    'stats.l': 'Centrales Logísticas Europeas',
    'stats.s': 'Días de Suministro Garantizado',
    'stats.c': 'Certificados IFS, BRC & GlobalGap',
    'trust.title': 'Homologados en Grandes Cuentas Europeas',
    'gate.h2': '¿Para qué canal compras?',
    'gate.sub': 'Selecciona tu perfil. El contenido cambiará por completo.',
    'tab.r.main': 'Soy RETAIL', 'tab.r.sub': 'Jefe / Director de Compras',
    'tab.f.main': 'Soy FOODSERVICE', 'tab.f.sub': 'Director Compras / Chef Ejecutivo',
    'pc.retail.em': 'Soluciones Estratégicas', 'pc.retail.rest': 'para RETAIL',
    'pc.retail.p': '5 líneas de negocio diseñadas para atrapar al consumidor actual, subir el ticket medio y blindar tu rentabilidad de categoría.',
    'card.more': 'Ver solución completa', 'r.new': 'NUEVO',
    'r1.k': 'CULTIVO. EL ORIGEN', 'r1.h': 'SOMOS CULTIVADORES. Garantía de suministro directo',
    'r1.b': 'Volumen 365 días · Frescura <24h · Certificación IFS. Controlamos el 100% de la cadena, del sustrato al lineal.',
    'r2.k': 'ESPECIALIZACIÓN', 'r2.h': 'ESPECIALIZACIÓN: Todo el Reino Fungi en un solo proveedor.',
    'r2.b': 'Del cultivo masivo a la recolección silvestre. Dominamos cada variedad para que tú no tengas que buscar fuera. Portfolio integral, conocimiento técnico y eficiencia logística en un único partner.',
    'r3.k': 'DIFERENCIACIÓN', 'r3.h': 'INNOVACIÓN: Dinamizamos tu Lineal y creamos ocasiones de consumo.',
    'r3.b': 'Creamos ocasiones de consumo que elevan tu ticket medio: mixes laminados estandarizados, soluciones Ready-to-Cook y estrategia DROPS con calendario IN-OUT para maximizar margen.',
    'r4.k': 'SERVICIO VMI', 'r4.h': 'PARA CLIENTES PREMIUM. Gestión activa del stock para reducir la merma a 0.',
    'r4.b': 'Logística de precisión y gestión inteligente para un lineal siempre perfecto. VMI & Reposición, logística inversa y merma cero para eliminar roturas de stock y optimizar la operativa.',
    'r5.k': 'Gestión Logística VMI', 'r5.h': 'Nos conectamos. Tú solo vendes.',
    'r5.b': 'Mermas asumidas, reposición autónoma. Riesgo logístico a cero.',
    'f1.k': 'Distribución Horeca', 'f1.h': 'Volumen garantizado para mayoristas',
    'f1.b': 'Máxima vida útil. Cadena de frío ininterrumpida hasta tu almacén.',
    'f2.k': 'Restauración Organizada', 'f2.h': 'El mismo sabor en todas tus franquicias',
    'f2.b': 'Estandarizamos tus recetas para que clones el éxito en cada local.',
    'f3.k': 'Formatos Ready to Cook', 'f3.h': 'Clava tu coste por ración al céntimo',
    'f3.b': 'Cero mermas en cocina. 100% rendimiento desde el primer día.',
    'f4.k': 'Suministro Constante 365 Días', 'f4.h': 'Soberanía productiva total',
    'f4.b': 'Precios estables los 365 días. Tu carta nunca cojea.',
    'pc.fs.em': 'Soluciones para FOODSERVICE', 'pc.fs.rest': 'e INDUSTRIA',
    'pc.fs.p': 'Desde distribuidores mayoristas hasta restauración organizada y colectividades. Un solo proveedor, un solo estándar, cero sorpresas.',
    'qs.badge': 'QUIÉNES SOMOS', 'qs.h2em': 'Soberanía Productiva 360º.',
    'qs.h2rest': 'Cero intermediarios.',
    'qs.sub': 'No somos un simple trader. Somos el ecosistema productor y logístico que blinda la rentabilidad de las mayores cadenas de Europa.',
    'qs.p1h': 'Cultivo Propio',
    'qs.p1p': 'Control total desde la espora. Instalaciones en La Rioja, Lleida y Holanda. Volumen asegurado los 365 días del año.',
    'qs.p2h': 'Procesado y Calidad',
    'qs.p2p': 'Tecnología de envasado de última generación y procesado de IV Gama bajo certificaciones IFS y BRC. Sin compromisos en trazabilidad.',
    'qs.p3h': 'Plataformas Logísticas',
    'qs.p3p': '3 centrales logísticas en Europa. Conexión directa con tus plataformas para entregarte frescura y retirar el riesgo de tu cuenta de resultados.',
    'dd.what': 'Qué es', 'dd.for': 'Para quién', 'dd.result': 'Resultado',
    'd_drops.h': 'INNOVACIÓN: Dinamizamos tu Lineal y creamos ocasiones de consumo.',
    'd_drops.w': '<strong>La innovación solo es rentable si es reproducible.</strong> Gracias a nuestra <strong>línea automatizada de procesado</strong>, garantizamos que cada barqueta de nuestros Mixes Laminados (Shiitake, Cardo, Ostra) mantiene una uniformidad absoluta en corte, calibre y frescura. Eliminamos la incertidumbre del factor humano para entregarte un producto premium con la seguridad industrial y el <strong>estándar IFS</strong> que tu cadena logística exige.',
    'd_drops.f': '<strong>No vendemos ingredientes; vendemos tiempo</strong>. Con nuestros <strong>Portobellos Rellenos</strong> y formatos <strong>\'Ready-to-Cook\'</strong>, eliminamos todas las barreras de preparación. Estos productos están diseñados para cocinar directamente en el envase (Airfryer/Horno), ofreciendo una solución de cena saludable sin esfuerzo. Atrapamos al perfil de consumidor joven y gourmet que busca calidad "restaurante" en su propia casa.',
    'd_drops.r': '<strong>Transformamos tu lineal en un destino.</strong> Diseñamos un calendario estratégico de <strong>lanzamientos IN-OUT</strong> con variedades exóticas y ediciones limitadas. Esta rotación planificada no solo rompe la monotonía del lineal, sino que genera picos de demanda por impulso y <strong>maximiza la rentabilidad por metro cuadrado.</strong> Si el lineal cambia, el cliente vuelve para ver qué hay de nuevo.',
    'd_comm.h': 'COMMODITIES: Garantía de Suministro Directo.',
    'd_comm.w': '<strong>Somos el origen</strong>. Controlamos toda la cadena: desde el sustrato hasta tu plataforma. Nuestra capacidad masiva garantiza una <strong>tasa de servicio del 99%</strong>, blindando tu lineal incluso en picos criticos. Eliminamos eslabones innecesarios para entregarte <strong>estabilidad de precio</strong> y seguridad de suministro los <strong>365 dias</strong> del año.',
    'd_comm.f': 'Nuestro modelo de logística integrada fulmina los tiempos de espera: <strong>del cultivo a tu plataforma en menos de 24 horas.</strong> Esta velocidad entrega directamente <strong>+2 días de vida útil</strong> al consumidor final. No solo vendemos producto; reducimos drásticamente tus mermas y blindamos la percepción de calidad en tu sección de frescos.',
    'd_comm.r': 'La excelencia no es negociable. Seleccionamos manualmente cada pieza para asegurar <strong>calibres uniformes y una estetica impecable.</strong> Respaldados por las maximas certificaciones internacionales, garantizamos que tu suministro cumple con el rigor tecnico que exigen las grandes cuentas de Europa. <strong>Seguridad total en cada entrega.</strong>',
    'd_espec.h': 'ESPECIALIZACIÓN: Todo el Reino Fungi en un solo proveedor.',
    'd_espec.w': 'Nuestra escala nos permite mantener una <strong>posición dominante en la importación de producto asiático</strong>. Al controlar los flujos directos de variedades como <strong>el Shimeji (blanco y marrón) y Enoki</strong>, eliminamos capas de costes y garantizamos una frescura y continuidad que otros proveedores no pueden igualar. No dependemos de mercados secundarios; somos el puente directo entre los mejores centros de cultivo del mundo y tu lineal.',
    'd_espec.f': 'La estacionalidad deja de ser un límite. Hemos tejido una <strong>red de suministro mundial</strong> que sigue la temporada de recolección silvestre a través de los cinco continentes. Desde el <strong>Boletus de los Cárpatos hasta la Trompeta de Sudáfrica</strong>, nuestra estructura logística internacional asegura que variedades como la Chantarela o la Colmenilla estén disponibles para tus clientes cuando otros solo ofrecen producto seco o congelado.',
    'd_espec.r': 'Nuestra especialización es tu ventaja competitiva. Ofrecemos <strong>disponibilidad total de especialidades exóticas y raras</strong> que dinamizan tu categoría y atraen al consumidor más exigente. Al integrar estas joyas mundiales en tus flujos de gran volumen, transformamos tu sección de frescos en un destino gourmet, optimizando tu logística al consolidar todo el universo fungi bajo un mismo sello de confianza.',
    'd_inout.h': 'Dinamismo en el Lineal: IN/OUT y Silvestres',
    'd_inout.w': 'Seta de Cardo, Níscalo, Trompeta Negra, mezclas otoñales, surtidos navideños. Disponibilidad puntual y controlada por campaña.',
    'd_inout.f': 'Retailers que quieren activar campañas estacionales y captar al consumidor más exigente y dispuesto a pagar más.',
    'd_inout.r': 'Rompe monotonía. Campañas estacionales de alto margen. Tráfico incremental y compra por impulso.',
    'd_vmi.h': 'PARA CLIENTES PREMIUM. Gestión activa del stock para reducir la merma a 0.',
    'd_vmi.w': '<strong>Olvida la gestión manual de pedidos.</strong> Mediante la integración de nuestro sistema VMI, monitorizamos tus niveles de inventario en tiempo real. No esperamos a que se genere la rotura; <strong>ejecutamos la reposición</strong> de forma proactiva basándonos en algoritmos de demanda real y flujos EDI.',
    'd_vmi.f': '<strong>Anticipación Proactiva:</strong><br/>Utilizamos análisis de históricos y picos estacionales para garantizar que el producto esté en el lineal antes de que el cliente lo busque. <strong>Fill Rate garantizado del 99%.</strong><br/><br/><strong>Eficiencia Merma Cero:</strong><br/>Ajustamos el suministro al ritmo de venta real de cada plataforma. <strong>Menos stock inmovilizado significa producto más fresco</strong> y una reducción drástica del desperdicio alimentario.',
    'd_vmi.r': '<p>Mediante la sincronización EDI diaria, dispones de una trazabilidad absoluta sobre pedidos, albaranes y niveles de stock en tiempo real.</p><p><strong>Si el producto no rota según nuestra previsión, nosotros absorbemos el coste</strong>, eliminando tu riesgo operativo y asegurando la máxima salud financiera de tu sección de frescos.</p>',
    'd_cultivo.h': 'COMMODITIES: Músculo Agrícola y Origen.',
    'd_cultivo.w': 'No somos un revendedor: somos el <strong>origen</strong>. Escala masiva de champiñón, portobello y pleurotus para que un Mercado Central tenga <strong>camiones diarios</strong> y la <strong>Industria</strong> disponga de materia prima constante para sus procesos, sin depender de la variabilidad del mercado secundario.',
    'd_cultivo.f': 'Mercados Centrales, transformación y <strong>Industria</strong> que exigen volumen diario, precio estable y ausencia de quiebres en su cadena de aprovisionamiento.',
    'd_cultivo.r': '<strong>Suministro directo sin quiebres de stock.</strong> Capacidad de respuesta para <strong>Industria</strong> y Mercados Centrales con logística de alta frecuencia.',
    'd_distrib.h': 'Control de Escandallos: Margen en el Canal.',
    'd_distrib.w': 'Para el canal de <strong>Distribución</strong>, el riesgo no es solo el precio de compra: es la variabilidad de merma, reclamaciones y rendimiento real en destino. Nuestro producto IV Gama se comporta como un activo predecible: alta rotación, gestión simplificada de residuos y rendimiento neto homogéneo.',
    'd_distrib.f': 'Distribuidores y mayoristas que buscan SKUs de frescos con margen defendible, menos incidencias operativas y clientes finales satisfechos.',
    'd_distrib.r': '<strong>Optimizamos el margen operativo del canal de Distribución.</strong> Producto de alta rotación que reduce la gestión de residuos y apunta a un rendimiento neto del 100% en destino, con escandallo estable.',
    'd_org.h': 'Restauración Organizada: Estandarización Total',
    'd_org.w': 'Estandarizamos el corte, calibre y gramaje para que repliques tu receta en cada local. Mismo producto, misma presentación, mismo coste por ración.',
    'd_org.f': 'Cadenas de restauración, franquicias y grupos de restaurantes que necesitan replicar su producto en múltiples ubicaciones sin variación.',
    'd_org.r': 'Garantía IFS/BRC Higher Level. Trazabilidad total desde el sustrato hasta la entrega. Fichas técnicas y boletines analíticos en 24h. Ideal para hoteles y colectividades.',
    'd_rtc.h': 'IV Gama Profesional: Estandarización de Cadena.',
    'd_rtc.w': 'Vendemos <strong>estandarización de procesos</strong>, no solo “cortes”: el mismo calibre, la misma presentación y el mismo rendimiento en cada expedición. Así reduces la variabilidad que encarece la operativa y rompe la consistencia entre centros.',
    'd_rtc.f': '<strong>Restauración Organizada</strong> y cadenas que necesitan replicar el mismo resultado en decenas o cientos de locales sin sorpresas en cocina.',
    'd_rtc.r': '<strong>Cortes uniformes que garantizan homogeneidad en cada punto de venta.</strong> Ideal para <strong>Restauración Organizada</strong> que busca replicar calidad y simplificar la operativa en local.',
    'd_sumin.h': 'Suministro 365: Precio Estable Todo el Año',
    'd_sumin.w': 'Precio cerrado por temporada. Cultivo propio + importación directa = soberanía total. Sin intermediarios que especulen con tu cuenta de resultados.',
    'd_sumin.f': 'Cualquier operador de foodservice que necesite certeza en precio y disponibilidad para mantener su carta estable todo el año.',
    'd_sumin.r': 'Suministro Garantizado 365 días. Fill Rate auditado mensualmente. Sin roturas estacionales. Entrega D+1 para pedidos antes de las 14h.',
    'cta.contact': 'Hablar con un Especialista',
    'cta.formats': 'Ver Formatos y Catálogo',
    'ft.brand': 'Productores e importadores de setas y champiñones. Control 360º desde el cultivo hasta la plataforma logística de nuestros clientes.',
    'ft.areas': 'Áreas', 'ft.q': 'Quiénes Somos', 'ft.contact': 'Contacto directo',
    'ft.form': 'Contacto rápido', 'ft.legal': 'Aviso legal · Política de privacidad',
    'form.submit': 'Enviar consulta',

    /* Foodservice: Mix Logístico (nuevo) */
    'f5.k': 'Mix Logístico',
    'f5.h': 'Especialidades & Silvestre',
    'f5.b': 'Completa tu palet. Cero portes extra.',
    'd_silvestres.h': 'Especialidades y Silvestres: Proveedor Único.',
    'd_silvestres.w': 'Consolidamos exóticas, importación directa y silvestres en el mismo flujo logístico que tus compras de base. El distribuidor no tiene que dispersar pedidos; la <strong>Industria</strong> integra ingredientes en un solo camión; la <strong>Restauración Organizada</strong> enriquece carta sin multiplicar proveedores.',
    'd_silvestres.f': 'Especialistas, Horeca premium y operadores que quieren ampliar portfolio sin pagar tres veces transporte ni asumir trazabilidades paralelas.',
    'd_silvestres.r': '<strong>Tu Hub Global Fungi.</strong> Consolidamos variedades exóticas e importación directa para simplificar la compra de especialistas y canal Horeca: un partner, una factura, menos variabilidad logística.',
    'fs.segments': 'Soluciones específicas para:',
    'fs.segment.dist': 'Distribución',
    'fs.segment.rest': 'Restauración Organizada',
    'fs.segment.mc': 'Mercados Centrales',
    'fs.segment.ind': 'Industria',
    'fs.hero.em': 'Cadena de suministro blindada',
    'fs.hero.span': 'en Foodservice e Industria.',
    'hero.p': 'Lideramos el mercado con nuevos conceptos y formatos que dinamizan el consumo en Retail y Foodservice eliminando el riesgo en tu operativa.',
    'pc.retail.em': 'RETAIL: Rentabilidad y Suministro Blindado.',
    'pc.retail.p': 'Optimización de stock en tiempo real y dinamización de categoría para elevar el ticket medio.',
    'rl.comm.what': 'Sin intermediarios. Sin excusas.',
    'rl.comm.for': 'CADA HORA CUENTA. EL TIEMPO ES FRESCURA.',
    'rl.comm.result': 'CONSTANCIA ABSOLUTA. CALIDAD SIN SORPRESAS.',
    'rl.espec.what': 'Liderazgo en Cultivo Asiático: Importación Directa',
    'rl.espec.for': 'Cadena de Suministro Global: Setas Silvestres sin fronteras',
    'rl.espec.result': 'Especialistas en lo Imposible: El catálogo Fungi definitivo',
    'rl.drops.what': 'Calidad Estandarizada: El fin de la variabilidad.',
    'rl.drops.for': 'Conveniencia Real: De la balda a la mesa en 6\'.',
    'rl.drops.result': 'Categoría Viva: Calendario de Drops y Promociones.',
    'rl.vmi.what': 'Tu stock, bajo nuestro radar.',
    'rl.vmi.for': 'Los Pilares Operativos',
    'rl.vmi.result': 'Sincronización y KPI.',
    'tc.comm.title': 'Catálogo Retail: Commodities',
    'tc.comm.button': 'Nuestros productos base: formatos y gramajes',
    'tc.comm.col1': 'Producto',
    'tc.comm.col2': 'Tipo de envase',
    'tc.comm.col3': 'Formatos disponibles',
    'tc.comm.col4': 'Vida útil',
    'tc.espec.title': 'Catálogo Retail: Especialización',
    'tc.espec.button': 'Calendario de Disponibilidad',
    'tc.espec.col1': 'Producto',
    'tc.espec.col2': 'Tipo de envase',
    'tc.espec.col3': 'Formatos disponibles',
    'tc.espec.col4': 'Vida útil',
    'tc.drops.title': 'Catálogo Retail: Mixes y Drops',
    'tc.drops.button': 'Inspiración',
    'tc.drops.col1': 'Referencia',
    'tc.drops.col2': 'Código',
    'tc.drops.col3': 'Formato',
    'tc.drops.col4': 'Detalle',
    'tc.vmi.title': 'Catálogo Retail: Logística VMI',
    'tc.vmi.button': 'VMI. Servicio PREMIUM.',
    'tc.vmi.col1': 'Referencia',
    'tc.vmi.col2': 'Código',
    'tc.vmi.col3': 'Formato',
    'tc.vmi.col4': 'Detalle',
    'nav.inicio': 'INICIO',
    'ft.es.title': 'España',
    'ft.es.att': 'Atención comercial ES',
    'ft.es.loc': 'La Rioja · Lleida · Madrid',
    'ft.es.addr': 'Av. Logística 101, 26007 Logroño (Demo)',
    'ft.nl.title': 'Países Bajos / Bélgica',
    'ft.nl.att': 'Atención comercial NL/BE',
    'ft.nl.loc': 'Hub logístico Nederland',
    'ft.nl.addr': 'Stationsweg 22, 3013 AJ Rotterdam (Demo)',
    'ft.fr.title': 'Francia',
    'ft.fr.att': 'Atención comercial FR',
    'ft.fr.loc': 'Cobertura nacional',
    'ft.fr.addr': '12 Rue du Marché, 69002 Lyon (Demo)',
  },
  en: {
    'nav.back': 'Home', 'nav.qs': 'About us',
    'hero.badge': 'Direct producers · No middlemen',
    'hero.h1a': 'Direct Supply.',
    'hero.h1b': 'Product Specialists.',
    'hero.sub': 'We protect your margin and guarantee your supply. From our own cultivation and direct import, to your logistics platform.',
    'hero.cta': 'Retail or Foodservice',
    'stats.eyebrow': 'OUR STRENGTH IN KEY FIGURES',
    'stats.t': 'Turnover 2025', 'stats.l': 'European Logistics Hubs',
    'stats.s': 'Days Guaranteed Supply', 'stats.c': 'Certified IFS, BRC & GlobalGap',
    'trust.title': "Trusted by Europe's Leading Accounts",
    'gate.h2': 'Which channel do you buy for?',
    'gate.sub': 'Select your profile. The content will change completely.',
    'tab.r.main': "I'm RETAIL", 'tab.r.sub': 'Buying Manager / Purchasing Director',
    'tab.f.main': "I'm FOODSERVICE", 'tab.f.sub': 'Purchasing Director / Executive Chef',
    'pc.retail.em': 'Strategic Solutions', 'pc.retail.rest': 'for RETAIL',
    'pc.retail.p': "5 business lines designed to capture today's consumer, lift average basket and shield your category profitability.",
    'card.more': 'See full solution', 'r.new': 'NEW',
    'r1.k': 'CULTIVATION. THE SOURCE', 'r1.h': 'WE ARE GROWERS. Direct supply guarantee',
    'r1.b': 'Volume 365 days · Freshness <24h · IFS Certification. We control 100% of the chain, from substrate to shelf.',
    'r2.k': 'SPECIALISATION', 'r2.h': 'SPECIALISATION: The full fungi universe from one supplier.',
    'r2.b': 'From mass cultivation to wild harvesting. We master every variety so you never need to look elsewhere. Full portfolio, technical knowledge and logistics efficiency in one partner.',
    'r3.k': 'DIFFERENTIATION', 'r3.h': 'INNOVATION: We energise your shelf and create consumption occasions.',
    'r3.b': 'We create consumption occasions that raise your average basket: standardised sliced mixes, Ready-to-Cook solutions and DROPS strategy with IN-OUT calendar to maximise margin.',
    'r4.k': 'VMI SERVICE', 'r4.h': 'FOR PREMIUM CLIENTS. Active stock management to drive shrink towards zero.',
    'r4.b': 'Precision logistics and intelligent management for a perfect shelf. VMI & Replenishment, reverse logistics and zero shrink to eliminate stock-outs and optimise operations.',
    'r5.k': 'VMI Logistics Management', 'r5.h': 'We connect in. You just sell.',
    'r5.b': 'Shrinkage absorbed, autonomous replenishment. Logistics risk to zero.',
    'f1.k': 'Horeca Distribution', 'f1.h': 'Guaranteed volume for wholesalers',
    'f1.b': 'Maximum shelf life. Uninterrupted cold chain to your warehouse.',
    'f2.k': 'Organised Catering', 'f2.h': 'The same taste across all your franchises',
    'f2.b': 'We standardise your recipes so you clone success in every location.',
    'f3.k': 'Ready to Cook Formats', 'f3.h': 'Nail your cost per portion to the cent',
    'f3.b': 'Zero kitchen waste. 100% yield from day one.',
    'f4.k': 'Constant Supply 365 Days', 'f4.h': 'Total production sovereignty',
    'f4.b': 'Stable prices 365 days. Your menu never limps.',
    'pc.fs.em': 'Solutions for FOODSERVICE', 'pc.fs.rest': '& INDUSTRY',
    'pc.fs.p': 'From wholesale distributors to organised catering and collectives. One supplier, one standard, zero surprises.',
    'qs.badge': 'WHO WE ARE', 'qs.h2em': '360° Production Sovereignty.',
    'qs.h2rest': 'Zero middlemen.',
    'qs.sub': "We are not a simple trader. We are the production and logistics ecosystem that shields the profitability of Europe's largest chains.",
    'qs.p1h': 'Own Cultivation',
    'qs.p1p': 'Total control from the spore. Facilities in La Rioja, Lleida and the Netherlands. Volume secured 365 days a year.',
    'qs.p2h': 'Processing & Quality',
    'qs.p2p': 'State-of-the-art packaging technology and convenience processing under IFS and BRC certifications.',
    'qs.p3h': 'Logistics Platforms',
    'qs.p3p': '3 logistics hubs in Europe. Direct connection with your platforms to deliver freshness and remove P&L risk.',
    'dd.what': 'What is it', 'dd.for': 'Who for', 'dd.result': 'Result',
    'd_drops.h': 'INNOVATION: We energise your shelf and create consumption occasions.',
    'd_drops.w': '<strong>Innovation is only profitable if it is reproducible.</strong> Thanks to our <strong>automated processing line</strong>, we guarantee that every tray of our Sliced Mixes (Shiitake, Cardoon, Oyster) maintains absolute uniformity in cut, calibre and freshness. We eliminate human factor uncertainty to deliver a premium product with the industrial safety and <strong>IFS standard</strong> your logistics chain demands.',
    'd_drops.f': '<strong>We do not sell ingredients; we sell time</strong>. With our <strong>Stuffed Portobellos</strong> and <strong>Ready-to-Cook</strong> formats, we eliminate all preparation barriers. These products are designed to cook directly in the packaging (Airfryer/Oven), offering an effortless healthy dinner solution. We capture the young gourmet consumer seeking restaurant quality at home.',
    'd_drops.r': '<strong>We transform your shelf into a destination.</strong> We design a strategic calendar of <strong>IN-OUT launches</strong> with exotic varieties and limited editions. This planned rotation breaks shelf monotony and generates impulse demand peaks that <strong>maximise profitability per square metre.</strong> When the shelf changes, customers come back to see what is new.',
    'd_comm.h': 'COMMODITIES: Direct Supply Guarantee.',
    'd_comm.w': '<strong>We are the source</strong>. We control the entire chain: from substrate to your platform. Our massive capacity guarantees a <strong>99% service rate</strong>, protecting your shelf even during critical peaks. We eliminate unnecessary links to deliver <strong>price stability</strong> and supply security <strong>365 days</strong> a year.',
    'd_comm.f': 'Our integrated logistics model eliminates waiting times: <strong>from cultivation to your platform in less than 24 hours.</strong> This speed directly delivers <strong>+2 days of shelf life</strong> to the end consumer. We do not just sell product; we drastically reduce your shrinkage and protect quality perception in your fresh section.',
    'd_comm.r': 'Excellence is non-negotiable. We manually select each piece to ensure <strong>uniform calibres and impeccable aesthetics.</strong> Backed by the highest international certifications, we guarantee your supply meets the technical rigour demanded by Europe\'s largest accounts. <strong>Total security in every delivery.</strong>',
    'd_espec.h': 'SPECIALISATION: The entire Fungi Kingdom from one supplier.',
    'd_espec.w': 'Our scale allows us to maintain a <strong>dominant position in Asian product imports</strong>. By controlling direct flows of varieties such as <strong>Shimeji (white and brown) and Enoki</strong>, we eliminate cost layers and guarantee freshness and continuity that other suppliers cannot match. We do not depend on secondary markets; we are the direct bridge between the world\'s best cultivation centres and your shelf.',
    'd_espec.f': 'Seasonality is no longer a limit. We have built a <strong>global supply network</strong> that follows the wild harvest season across five continents. From <strong>Carpathian Porcini to South African Trumpet</strong>, our international logistics structure ensures varieties like Chanterelle and Morel are available to your customers when others only offer dried or frozen product.',
    'd_espec.r': 'Our specialisation is your competitive advantage. We offer <strong>full availability of exotic and rare specialities</strong> that energise your category and attract the most demanding consumer. By integrating these global gems into your high-volume flows, we transform your fresh section into a gourmet destination, optimising your logistics by consolidating the entire fungi universe under one trusted seal.',
    'd_inout.h': 'Shelf Dynamism: IN/OUT & Wild',
    'd_inout.w': 'Oyster, Chanterelle, Black Trumpet, autumn blends, Christmas assortments. Campaign-controlled availability.',
    'd_inout.f': 'Retailers wanting to activate seasonal campaigns and capture the most demanding consumer willing to pay premium.',
    'd_inout.r': 'Break the monotony. High-margin seasonal campaigns. Incremental traffic and impulse purchase.',
    'd_vmi.h': 'FOR PREMIUM CLIENTS. Active stock management to drive shrinkage to zero.',
    'd_vmi.w': '<strong>Forget manual order management.</strong> Through our VMI system integration, we monitor your inventory levels in real time. We do not wait for a stockout; <strong>we execute replenishment</strong> proactively based on real demand algorithms and EDI flows.',
    'd_vmi.f': '<strong>Proactive Anticipation:</strong><br/>We use historical analysis and seasonal peaks to guarantee product is on the shelf before the customer looks for it. <strong>Guaranteed 99% Fill Rate.</strong><br/><br/><strong>Zero Shrinkage Efficiency:</strong><br/>We adjust supply to the real sales pace of each platform. <strong>Less immobilised stock means fresher product</strong> and a drastic reduction in food waste.',
    'd_vmi.r': '<p>Through daily EDI synchronisation, you have absolute traceability over orders, delivery notes and stock levels in real time.</p><p><strong>If the product does not rotate as per our forecast, we absorb the cost</strong>, eliminating your operational risk and ensuring maximum financial health of your fresh section.</p>',
    'd_cultivo.h': 'COMMODITIES: Agricultural Muscle at Source.',
    'd_cultivo.w': 'We are not a reseller: we are the <strong>source</strong>. Mass-scale button, portobello and oyster supply so wholesale markets get <strong>daily trucks</strong> and <strong>Industry</strong> gets consistent raw material for processing—without secondary-market variability.',
    'd_cultivo.f': 'Central markets, manufacturing and <strong>Industry</strong> that need daily volume, stable pricing and zero supply breaks.',
    'd_cultivo.r': '<strong>Direct supply without stockouts.</strong> Response capacity for <strong>Industry</strong> and wholesale markets with high-frequency logistics.',
    'd_distrib.h': 'Recipe Cost Control: Margin in the Channel.',
    'd_distrib.w': 'For the <strong>Distribution</strong> channel, risk is not just buy price: it is variability in shrinkage, claims and real yield downstream. Our professional IV Gama behaves like a predictable asset: high rotation, simpler waste handling and homogeneous net performance.',
    'd_distrib.f': 'Distributors and wholesalers seeking defendable margin on fresh SKUs, fewer operational incidents and satisfied end customers.',
    'd_distrib.r': '<strong>We protect operating margin in the Distribution channel.</strong> High-rotation product that cuts waste handling and targets 100% net yield downstream—with stable recipe costing.',
    'd_org.h': 'Organised Catering: Total Standardisation',
    'd_org.w': 'We standardise cut, calibre and weight so you replicate your recipe in every location. Same product, same presentation, same cost per portion.',
    'd_org.f': 'Restaurant chains, franchises and restaurant groups needing to replicate their product across multiple locations without variation.',
    'd_org.r': 'Same taste across all your franchises. Controlled cost per portion. Zero variation between locations. Scale without losing quality.',
    'd_rtc.h': 'Professional IV Gama: Supply-Chain Standardisation.',
    'd_rtc.w': 'We sell <strong>process standardisation</strong>, not just “cuts”: same calibre, same presentation and same yield batch after batch. That removes the variability that inflates cost and breaks consistency across sites.',
    'd_rtc.f': '<strong>Organised Restaurant Groups</strong> and chains that must replicate the same outcome across dozens or hundreds of sites—without kitchen surprises.',
    'd_rtc.r': '<strong>Uniform cuts that guarantee homogeneity at every point of sale.</strong> Ideal for <strong>Organised Restaurant Groups</strong> seeking replicated quality and simpler in-store operations.',
    'd_sumin.h': 'Year-Round Supply: Stable All-Year Pricing',
    'd_sumin.w': 'Season-locked pricing. Own cultivation + direct import = total sovereignty. No middlemen speculating with your P&L.',
    'd_sumin.f': 'Any foodservice operator needing price and availability certainty to keep their menu stable all year.',
    'd_sumin.r': 'Stable prices 365 days. Your menu never breaks from product shortage. Plan your P&L with no market surprises.',
    'cta.contact': 'Speak with a Specialist',
    'cta.formats': 'View Formats & Catalogue',
    'ft.brand': "Producers and importers of mushrooms. 360° control from cultivation to our clients' logistics platform.",
    'ft.areas': 'Areas', 'ft.q': 'About Us', 'ft.contact': 'Direct contact',
    'ft.form': 'Quick contact', 'ft.legal': 'Legal notice · Privacy policy',
    'form.submit': 'Send enquiry',
    'd_silvestres.h': 'Specialities & Wild: Single Partner.',
    'd_silvestres.w': 'We consolidate exotics, direct import and wild lines in the same flow as your base buys. You split fewer POs; <strong>Industry</strong> loads more ingredients on one truck; upscale <strong>Organised Restaurant Groups</strong> widen the menu without multiplying suppliers.',
    'd_silvestres.f': 'Specialists, premium horeca and operators who want portfolio breadth without paying freight three times or juggling parallel traceability.',
    'd_silvestres.r': '<strong>Your Global Fungi Hub.</strong> We consolidate exotics and direct import to simplify buying for specialists and the horeca channel: one partner, one invoice, less logistics variability.',
    'fs.segments': 'Tailored solutions for:',
    'fs.segment.dist': 'Distribution',
    'fs.segment.rest': 'Organised Restaurant Groups',
    'fs.segment.mc': 'Wholesale Markets',
    'fs.segment.ind': 'Industry',
    'fs.hero.em': 'Resilient supply chain',
    'fs.hero.span': 'for Foodservice & Industry.',
    'hero.p': 'We lead the market with new concepts and formats that boost consumption in Retail and Foodservice, eliminating operational risk.',
    'pc.retail.em': 'RETAIL: Profitability & Secured Supply.',
    'pc.retail.p': 'Real-time stock optimisation and category dynamism to lift average basket value.',
    'rl.comm.what': 'No middlemen. No excuses.',
    'rl.comm.for': 'EVERY HOUR COUNTS. TIME IS FRESHNESS.',
    'rl.comm.result': 'ABSOLUTE CONSISTENCY. QUALITY WITHOUT SURPRISES.',
    'rl.espec.what': 'Asian Cultivation Leadership: Direct Import',
    'rl.espec.for': 'Global Supply Chain: Wild Mushrooms without borders',
    'rl.espec.result': 'Specialists in the Impossible: The definitive Fungi catalogue',
    'rl.drops.what': 'Standardised Quality: The end of variability.',
    'rl.drops.for': 'Real Convenience: From shelf to table in 6\'.',
    'rl.drops.result': 'Living Category: Drops and Promotions Calendar.',
    'rl.vmi.what': 'Your stock, under our radar.',
    'rl.vmi.for': 'The Operational Pillars',
    'rl.vmi.result': 'Synchronisation and KPIs.',
    'tc.comm.title': 'Retail Catalogue: Commodities',
    'tc.comm.button': 'Our base products: formats and weights',
    'tc.comm.col1': 'Product',
    'tc.comm.col2': 'Packaging type',
    'tc.comm.col3': 'Available formats',
    'tc.comm.col4': 'Shelf life',
    'tc.espec.title': 'Retail Catalogue: Specialities',
    'tc.espec.button': 'Availability Calendar',
    'tc.espec.col1': 'Product',
    'tc.espec.col2': 'Packaging type',
    'tc.espec.col3': 'Available formats',
    'tc.espec.col4': 'Shelf life',
    'tc.drops.title': 'Retail Catalogue: Mixes & Drops',
    'tc.drops.button': 'Inspiration',
    'tc.drops.col1': 'Reference',
    'tc.drops.col2': 'Code',
    'tc.drops.col3': 'Format',
    'tc.drops.col4': 'Detail',
    'tc.vmi.title': 'Retail Catalogue: VMI Logistics',
    'tc.vmi.button': 'VMI. PREMIUM Service.',
    'tc.vmi.col1': 'Reference',
    'tc.vmi.col2': 'Code',
    'tc.vmi.col3': 'Format',
    'tc.vmi.col4': 'Detail',
    'nav.inicio': 'HOME',
    'ft.es.title': 'Spain',
    'ft.es.att': 'Commercial enquiries ES',
    'ft.es.loc': 'La Rioja · Lleida · Madrid',
    'ft.es.addr': 'Av. Logística 101, 26007 Logroño (Demo)',
    'ft.nl.title': 'Netherlands / Belgium',
    'ft.nl.att': 'Commercial enquiries NL/BE',
    'ft.nl.loc': 'Netherlands logistics hub',
    'ft.nl.addr': 'Stationsweg 22, 3013 AJ Rotterdam (Demo)',
    'ft.fr.title': 'France',
    'ft.fr.att': 'Commercial enquiries FR',
    'ft.fr.loc': 'National coverage',
    'ft.fr.addr': '12 Rue du Marché, 69002 Lyon (Demo)',
  },
  nl: {
    'nav.back': 'Begin', 'nav.qs': 'Wie zijn wij',
    'hero.badge': 'Directe producenten · Geen tussenpersonen',
    'hero.h1a': 'Directe Levering.',
    'hero.h1b': 'Productspecialisten.',
    'hero.sub': 'Wij beschermen uw marge en garanderen uw levering. Van onze eigen kweek en directe import tot uw logistiek platform.',
    'hero.cta': 'Retail of Foodservice',
    'stats.eyebrow': 'ONZE KRACHT IN CIJFERS',
    'stats.t': 'Omzet 2025', 'stats.l': 'Europese Logistieke Hubs',
    'stats.s': 'Dagen Gegarandeerde Levering', 'stats.c': 'Gecertificeerd IFS, BRC & GlobalGap',
    'trust.title': 'Erkend door Europese Grootrekeningen',
    'gate.h2': 'Voor welk kanaal koopt u?',
    'gate.sub': 'Selecteer uw profiel. De inhoud wijzigt volledig.',
    'tab.r.main': 'Ik ben RETAIL', 'tab.r.sub': 'Inkoopmanager / Inkoopdirecteur',
    'tab.f.main': 'Ik ben FOODSERVICE', 'tab.f.sub': 'Inkoopdirecteur / Chef-kok',
    'pc.retail.em': 'Strategische Oplossingen', 'pc.retail.rest': 'voor RETAIL',
    'pc.retail.p': '5 bedrijfslijnen voor de hedendaagse consument, hogere bonwaarde en bescherming van uw categoriemarge.',
    'card.more': 'Volledige oplossing bekijken', 'r.new': 'NIEUW',
    'r1.k': 'TEELT. DE BRON', 'r1.h': 'WIJ ZIJN TELERS. Directe leveringsgarantie',
    'r1.b': 'Volume 365 dagen · Versheid <24u · IFS-certificering. Wij beheersen 100% van de keten, van substraat tot schap.',
    'r2.k': 'SPECIALISATIE', 'r2.h': 'SPECIALISATIE: Het volledige fungi-universum van één leverancier.',
    'r2.b': 'Van massateelt tot wilde pluk. Wij beheersen elke variëteit zodat u nergens anders hoeft te zoeken. Volledig portfolio, technische kennis en logistieke efficiëntie in één partner.',
    'r3.k': 'DIFFERENTIATIE', 'r3.h': 'INNOVATIE: Wij dynamiseren uw schap en creëren consumptiegelegenheden.',
    'r3.b': 'Wij creëren consumptiegelegenheden die uw gemiddelde bon verhogen: gestandaardiseerde gesneden mengsels, Ready-to-Cook oplossingen en DROPS-strategie met IN-OUT kalender om marge te maximaliseren.',
    'r4.k': 'VMI SERVICE', 'r4.h': 'VOOR PREMIUM KLANTEN. Actief voorraadbeheer om derving naar nul te brengen.',
    'r4.b': 'Precisielogistiek en intelligent beheer voor een altijd perfect schap. VMI & Aanvulling, retourlogistiek en nul derving om stockbreuken te elimineren en de operatie te optimaliseren.',
    'r5.k': 'VMI Logistiek Management', 'r5.h': 'Wij koppelen in. U verkoopt gewoon.',
    'r5.b': 'Derving geabsorbeerd, autonome aanvulling. Logistiek risico naar nul.',
    'f1.k': 'Horeca Distributie', 'f1.h': 'Gegarandeerd volume voor groothandels',
    'f1.b': 'Maximale houdbaarheid. Ononderbroken koelketen tot uw magazijn.',
    'f2.k': 'Georganiseerde Restauratie', 'f2.h': 'Dezelfde smaak in al uw franchises',
    'f2.b': 'Wij standaardiseren uw recepten zodat u succes kunt klonen.',
    'f3.k': 'Ready to Cook Formaten', 'f3.h': 'Portiekosten tot op de cent',
    'f3.b': 'Nul keukenverliezen. 100% rendement vanaf dag één.',
    'f4.k': 'Constant Aanbod 365 Dagen', 'f4.h': 'Totale productiesouvereiniteit',
    'f4.b': 'Stabiele prijzen 365 dagen. Uw kaart holt nooit.',
    'pc.fs.em': 'Oplossingen voor FOODSERVICE', 'pc.fs.rest': '& INDUSTRIE',
    'pc.fs.p': 'Van groothandelsdistributeurs tot georganiseerde horeca. Één leverancier, één standaard, nul verrassingen.',
    'qs.badge': 'WIE ZIJN WIJ', 'qs.h2em': '360° Productiesouvereiniteit.',
    'qs.h2rest': 'Geen tussenpersonen.',
    'qs.sub': "Wij zijn geen simpele trader. Wij zijn het productie- en logistiek ecosysteem dat de rentabiliteit van Europa's grootste ketens beschermt.",
    'qs.p1h': 'Eigen Kweek',
    'qs.p1p': 'Totale controle van spore tot schap. La Rioja, Lleida en Nederland. Volume geborgd 365 dagen.',
    'qs.p2h': 'Verwerking & Kwaliteit',
    'qs.p2p': 'Geavanceerde verpakkingstechnologie en IV Gama verwerking onder IFS en BRC certificeringen.',
    'qs.p3h': 'Logistieke Platforms',
    'qs.p3p': '3 logistieke hubs in Europa. Directe koppeling voor frisheid en risicovrije levering.',
    'dd.what': 'Wat is het', 'dd.for': 'Voor wie', 'dd.result': 'Resultaat',
    'd_drops.h': 'INNOVATIE: Wij dynamiseren uw schap en creëren consumptiegelegenheden.',
    'd_drops.w': '<strong>Innovatie is alleen rendabel als het reproduceerbaar is.</strong> Dankzij onze <strong>geautomatiseerde verwerkingslijn</strong> garanderen wij dat elke schaal van onze Gesneden Mengsels (Shiitake, Distelzwam, Oesterzwam) absolute uniformiteit in snede, kaliber en versheid behoudt. Wij elimineren de onzekerheid van de menselijke factor om u een premium product te leveren met de industriële veiligheid en de <strong>IFS-standaard</strong> die uw logistieke keten vereist.',
    'd_drops.f': '<strong>Wij verkopen geen ingrediënten; wij verkopen tijd</strong>. Met onze <strong>Gevulde Portobellos</strong> en <strong>Ready-to-Cook</strong> formaten elimineren wij alle bereidingsdrempels. Deze producten zijn ontworpen om direct in de verpakking te koken (Airfryer/Oven), en bieden een moeiteloze gezonde maaltijdoplossing. Wij vangen het jonge gastronomische consumentenprofiel dat restaurantkwaliteit thuis zoekt.',
    'd_drops.r': '<strong>Wij transformeren uw schap in een bestemming.</strong> Wij ontwerpen een strategische kalender van <strong>IN-OUT lanceringen</strong> met exotische variëteiten en beperkte edities. Deze geplande rotatie doorbreekt de monotonie van het schap en genereert impulsvraagpieken die <strong>de winstgevendheid per vierkante meter maximaliseren.</strong> Als het schap verandert, komen klanten terug om te zien wat er nieuw is.',
    'd_comm.h': 'COMMODITIES: Garantie van Directe Levering.',
    'd_comm.w': '<strong>Wij zijn de bron</strong>. Wij beheersen de volledige keten: van substraat tot uw platform. Onze massale capaciteit garandeert een <strong>serviceniveau van 99%</strong>, waarmee uw schap zelfs tijdens kritieke pieken beschermd blijft. Wij elimineren onnodige schakels om u <strong>prijsstabiliteit</strong> en leveringszekerheid gedurende <strong>365 dagen</strong> per jaar te bieden.',
    'd_comm.f': 'Ons geïntegreerde logistieke model elimineert wachttijden: <strong>van teelt tot uw platform in minder dan 24 uur.</strong> Deze snelheid levert direct <strong>+2 dagen houdbaarheidsdatum</strong> aan de eindconsument. Wij verkopen niet alleen product; wij verminderen drastisch uw derving en beschermen de kwaliteitsperceptie in uw versafdeling.',
    'd_comm.r': 'Excellentie is niet onderhandelbaar. Wij selecteren elk stuk handmatig om <strong>uniforme kalibers en een onberispelijke esthetiek</strong> te garanderen. Gesteund door de hoogste internationale certificeringen garanderen wij dat uw levering voldoet aan de technische strengheid die de grote Europese accounts eisen. <strong>Totale zekerheid bij elke levering.</strong>',
    'd_espec.h': 'SPECIALISATIE: Het volledige Fungi Koninkrijk van één leverancier.',
    'd_espec.w': 'Onze schaal stelt ons in staat een <strong>dominante positie in de import van Aziatisch product</strong> te handhaven. Door directe stromen van variëteiten zoals <strong>Shimeji (wit en bruin) en Enoki</strong> te beheersen, elimineren wij kostenlagen en garanderen wij versheid en continuïteit die andere leveranciers niet kunnen evenaren. Wij zijn niet afhankelijk van secundaire markten; wij zijn de directe brug tussen de beste teeltcentra ter wereld en uw schap.',
    'd_espec.f': 'Seizoensgebondenheid is geen beperking meer. Wij hebben een <strong>wereldwijd leveringsnetwerk</strong> opgebouwd dat het wilde oogstseizoen over vijf continenten volgt. Van <strong>Karpaten Porcini tot Zuid-Afrikaanse Trompet</strong>, onze internationale logistieke structuur zorgt ervoor dat variëteiten zoals Cantarel en Morille beschikbaar zijn voor uw klanten wanneer anderen alleen gedroogd of bevroren product aanbieden.',
    'd_espec.r': 'Onze specialisatie is uw concurrentievoordeel. Wij bieden <strong>volledige beschikbaarheid van exotische en zeldzame specialiteiten</strong> die uw categorie dynamiseren en de meest veeleisende consument aantrekken. Door deze wereldse parels te integreren in uw grootvolume stromen, transformeren wij uw versafdeling in een gourmetbestemming, waarbij wij uw logistiek optimaliseren door het volledige fungi-universum onder één vertrouwd keurmerk te consolideren.',
    'd_inout.h': 'Schap Dynamiek: IN/OUT & Wild',
    'd_inout.w': 'Oesterzwam, Cantharel, Zwarte Trompet, herfstmengsels, kerst assortimenten. Campagnegestuurde beschikbaarheid.',
    'd_inout.f': 'Retailers die seizoenscampagnes willen activeren en de meest veeleisende consument willen vangen die bereid is premium te betalen.',
    'd_inout.r': 'Doorbreek de monotonie. Seizoenscampagnes met hoge marge. Incrementeel verkeer en impulsaankoop.',
    'd_vmi.h': 'VOOR PREMIUM KLANTEN. Actief voorraadbeheer om derving naar nul te brengen.',
    'd_vmi.w': '<strong>Vergeet handmatig orderbeheer.</strong> Via de integratie van ons VMI-systeem monitoren wij uw voorraadniveaus in realtime. Wij wachten niet tot een stockbreuk optreedt; <strong>wij voeren de aanvulling</strong> proactief uit op basis van algoritmen voor werkelijke vraag en EDI-stromen.',
    'd_vmi.f': '<strong>Proactieve Anticipatie:</strong><br/>Wij gebruiken historische analyses en seizoenspieken om te garanderen dat het product in het schap staat voordat de klant ernaar zoekt. <strong>Gegarandeerd 99% Fill Rate.</strong><br/><br/><strong>Efficiëntie Nul Derving:</strong><br/>Wij passen het aanbod aan het werkelijke verkooptempo van elk platform aan. <strong>Minder geïmmobiliseerde voorraad betekent verser product</strong> en een drastische vermindering van voedselverspilling.',
    'd_vmi.r': '<p>Via dagelijkse EDI-synchronisatie beschikt u over absolute traceerbaarheid van bestellingen, pakbonnen en voorraadniveaus in realtime.</p><p><strong>Als het product niet roteert volgens onze prognose, absorberen wij de kosten</strong>, waardoor uw operationeel risico wordt geëlimineerd en de maximale financiële gezondheid van uw versafdeling wordt gegarandeerd.</p>',
    'd_cultivo.h': 'COMMODITIES: Landbouwmotor aan de Bron.',
    'd_cultivo.w': 'Geen wederverkoper: wij zijn de <strong>bron</strong>. Massale aanvoer van champignon, portobello en oesterzwam zodat centrale markten <strong>dagelijkse vrachten</strong> krijgen en <strong>Industrie</strong> constante grondstof voor verwerking heeft—zonder variatie op secundaire markten.',
    'd_cultivo.f': 'Centrale markten, verwerking en <strong>Industrie</strong> die dagelijks volume, stabiele prijs en geen leveringsbreuken eisen.',
    'd_cultivo.r': '<strong>Directe levering zonder voorraadbreuken.</strong> Respons voor <strong>Industrie</strong> en centrale markten met hoogfrequente logistiek.',
    'd_distrib.h': 'Escandallo- en Margeregeling in het Kanaal.',
    'd_distrib.w': 'Voor <strong>Distributie</strong> is risico niet enkel de inkoopprijs: het is variatie in shrinkage, claims en reële rendement downstream. Professionele IV Gama gedraagt zich als een voorspelbare asset: hoge rotatie, eenvoudiger afvalbeheer en homogeen nettorendement.',
    'd_distrib.f': 'Distributeurs en groothandels die verdedigbare marge op verse SKU’s, minder incidenten en tevreden eindklanten willen.',
    'd_distrib.r': '<strong>We beveiligen operationele marge in het distributiekanaal.</strong> Hoog-rotatie product met minder afvalbeheer en stabiele receptkosten.',
    'd_org.h': 'Georganiseerde Horeca: Totale Standaardisatie',
    'd_org.w': 'Wij standaardiseren snede, kaliber en gewicht zodat u uw recept op elke locatie repliceert. Zelfde product, zelfde presentatie, zelfde kosten per portie.',
    'd_org.f': 'Restaurantketens, franchises en restaurantgroepen die hun product over meerdere locaties moeten repliceren zonder variatie.',
    'd_org.r': 'Dezelfde smaak in al uw franchises. Gecontroleerde kosten per portie. Nul variatie tussen locaties. Schaal zonder kwaliteitsverlies.',
    'd_rtc.h': 'Professionele IV Gama: Standaardisatie van de Keten.',
    'd_rtc.w': 'We verkopen <strong>processtandaardisatie</strong>, niet enkel “sneden”: hetzelfde kaliber, dezelfde presentatie en hetzelfde rendement levering na levering. Zo vermindert u variatie die kosten opdrijft en consistentie tussen locaties breekt.',
    'd_rtc.f': '<strong>Georganiseerde restauratie</strong> en ketens die hetzelfde resultaat op tientallen of honderden locaties moeten repliceren—zonder verrassingen in de keuken.',
    'd_rtc.r': '<strong>Uniforme sneden die homogeniteit op elk verkooppunt garanderen.</strong> Ideaal voor <strong>georganiseerde restauratie</strong> die kwaliteit wil herhalen en lokale operatie wil vereenvoudigen.',
    'd_sumin.h': 'Jaarrond Levering: Stabiele Prijzen Heel Het Jaar',
    'd_sumin.w': 'Seizoen-vergrendelde prijzen. Eigen teelt + directe import = totale souvereiniteit. Geen tussenpersonen die speculeren met uw P&L.',
    'd_sumin.f': 'Elke foodservice operator die prijs- en beschikbaarheidszekerheid nodig heeft om hun menu het hele jaar stabiel te houden.',
    'd_sumin.r': 'Stabiele prijzen 365 dagen. Uw menu breekt nooit door producttekort. Plan uw P&L zonder marktverrassingen.',
    'cta.contact': 'Spreek met een Specialist',
    'cta.formats': 'Bekijk Formaten & Catalogus',
    'ft.brand': 'Telers en importeurs van paddenstoelen. 360° controle van teelt tot logistiek platform.',
    'ft.areas': 'Gebieden', 'ft.q': 'Over Ons', 'ft.contact': 'Direct contact',
    'ft.form': 'Snel contact', 'ft.legal': 'Juridische kennisgeving · Privacybeleid',
    'form.submit': 'Vraag verzenden',
    'd_silvestres.h': 'Specialiteiten & Wild: Eén Partner.',
    'd_silvestres.w': 'We bundelen exotisch, directe import en wild in dezelfde stroom als uw basisinkopen. Minder bestellingen verspreiden; <strong>Industrie</strong> laadt meer op één vrachtwagen; <strong>georganiseerde restauratie</strong> breidt het menu uit zonder leveranciers te vermenigvuldigen.',
    'd_silvestres.f': 'Specialisten, premium horeca en operators die portfolio willen verbreden zonder driemaal vracht te betalen.',
    'd_silvestres.r': '<strong>Uw Global Fungi Hub.</strong> We consolideren exotisch en directe import om inkoop voor specialisten en horeca te vereenvoudigen: één partner, één factuur, minder logistieke variatie.',
    'fs.segments': 'Oplossingen op maat voor:',
    'fs.segment.dist': 'Distributie',
    'fs.segment.rest': 'Georganiseerde restauratie',
    'fs.segment.mc': 'Centrale markten',
    'fs.segment.ind': 'Industrie',
    'fs.hero.em': 'Beveiligde supply chain',
    'fs.hero.span': 'voor Foodservice & Industrie.',
    'hero.p': 'Wij leiden de markt met nieuwe concepten en formaten die de consumptie in Retail en Foodservice stimuleren en het operationele risico elimineren.',
    'pc.retail.em': 'RETAIL: Rentabiliteit & Gegarandeerde Levering.',
    'pc.retail.p': 'Realtime voorraadoptimalisatie en categoriedynamiek om de gemiddelde bonwaarde te verhogen.',
    'rl.comm.what': 'Geen tussenpersonen. Geen excuses.',
    'rl.comm.for': 'ELK UUR TELT. TIJD IS VERSHEID.',
    'rl.comm.result': 'ABSOLUTE CONSISTENTIE. KWALITEIT ZONDER VERRASSINGEN.',
    'rl.espec.what': 'Leiderschap in Aziatische Teelt: Directe Import',
    'rl.espec.for': 'Wereldwijde Toeleveringsketen: Wilde Paddenstoelen zonder grenzen',
    'rl.espec.result': 'Specialisten in het Onmogelijke: De definitieve Fungi catalogus',
    'rl.drops.what': 'Gestandaardiseerde Kwaliteit: Het einde van variabiliteit.',
    'rl.drops.for': 'Echte Gemak: Van schap naar tafel in 6\'.',
    'rl.drops.result': 'Levende Categorie: Kalender van Drops en Promoties.',
    'rl.vmi.what': 'Uw voorraad, onder onze radar.',
    'rl.vmi.for': 'De Operationele Pijlers',
    'rl.vmi.result': 'Synchronisatie en KPI\'s.',
    'tc.comm.title': 'Retail Catalogus: Commodities',
    'tc.comm.button': 'Onze basisproducten: formaten en gewichten',
    'tc.comm.col1': 'Product',
    'tc.comm.col2': 'Verpakkingstype',
    'tc.comm.col3': 'Beschikbare formaten',
    'tc.comm.col4': 'Houdbaarheidsdatum',
    'tc.espec.title': 'Retail Catalogus: Specialiteiten',
    'tc.espec.button': 'Beschikbaarheidskalender',
    'tc.espec.col1': 'Product',
    'tc.espec.col2': 'Verpakkingstype',
    'tc.espec.col3': 'Beschikbare formaten',
    'tc.espec.col4': 'Houdbaarheidsdatum',
    'tc.drops.title': 'Retail Catalogus: Mengsels & Drops',
    'tc.drops.button': 'Inspiratie',
    'tc.drops.col1': 'Referentie',
    'tc.drops.col2': 'Code',
    'tc.drops.col3': 'Formaat',
    'tc.drops.col4': 'Detail',
    'tc.vmi.title': 'Retail Catalogus: VMI Logistiek',
    'tc.vmi.button': 'VMI. PREMIUM Service.',
    'tc.vmi.col1': 'Referentie',
    'tc.vmi.col2': 'Code',
    'tc.vmi.col3': 'Formaat',
    'tc.vmi.col4': 'Detail',
    'nav.inicio': 'HOME',
    'ft.es.title': 'Spanje',
    'ft.es.att': 'Commerciële vragen ES',
    'ft.es.loc': 'La Rioja · Lleida · Madrid',
    'ft.es.addr': 'Av. Logística 101, 26007 Logroño (Demo)',
    'ft.nl.title': 'Nederland / België',
    'ft.nl.att': 'Commerciële vragen NL/BE',
    'ft.nl.loc': 'Logistiek hub Nederland',
    'ft.nl.addr': 'Stationsweg 22, 3013 AJ Rotterdam (Demo)',
    'ft.fr.title': 'Frankrijk',
    'ft.fr.att': 'Commerciële vragen FR',
    'ft.fr.loc': 'Nationale dekking',
    'ft.fr.addr': '12 Rue du Marché, 69002 Lyon (Demo)',
  },
  fr: {
    'nav.back': 'Accueil', 'nav.qs': 'Qui sommes-nous',
    'hero.badge': 'Producteurs directs · Sans intermédiaires',
    'hero.h1a': 'Approvisionnement Direct.',
    'hero.h1b': 'Spécialistes Produit.',
    'hero.sub': "Nous protégeons votre marge et garantissons votre approvisionnement. De nos cultures et importation directe jusqu'à votre plateforme logistique.",
    'hero.cta': 'Retail ou Foodservice',
    'stats.eyebrow': 'NOTRE FORCE EN CHIFFRES CLÉS',
    'stats.t': "Chiffre d'affaires 2025", 'stats.l': 'Plateformes Logistiques Européennes',
    'stats.s': "Jours d'Approvisionnement Garanti", 'stats.c': 'Certifiés IFS, BRC & GlobalGap',
    'trust.title': 'Référencés dans les Grands Comptes Européens',
    'gate.h2': 'Pour quel canal achetez-vous ?',
    'gate.sub': 'Sélectionnez votre profil. Le contenu changera complètement.',
    'tab.r.main': 'Je suis RETAIL', 'tab.r.sub': 'Responsable / Directeur des Achats',
    'tab.f.main': 'Je suis FOODSERVICE', 'tab.f.sub': 'Directeur Achats / Chef Exécutif',
    'pc.retail.em': 'Solutions Stratégiques', 'pc.retail.rest': 'pour RETAIL',
    'pc.retail.p': 'pour RETAIL',
    'card.more': 'Voir la solution complète', 'r.new': 'NOUVEAU',
    'r1.k': 'CULTURE. LA SOURCE', 'r1.h': 'NOUS SOMMES CULTIVATEURS. Garantie d\'approvisionnement direct',
    'r1.b': 'Volume 365 jours · Fraîcheur <24h · Certification IFS. Nous contrôlons 100% de la chaîne, du substrat au rayon.',
    'r2.k': 'SPÉCIALISATION', 'r2.h': 'SPÉCIALISATION : Tout l\'univers fungi chez un seul fournisseur.',
    'r2.b': 'De la culture massive à la cueillette sauvage. Nous maîtrisons chaque variété pour que vous n\'ayez jamais besoin de chercher ailleurs. Portfolio complet, expertise technique et efficacité logistique en un seul partenaire.',
    'r3.k': 'DIFFÉRENCIATION', 'r3.h': 'INNOVATION : Nous dynamistons votre rayon et créons des occasions de consommation.',
    'r3.b': 'Nous créons des occasions de consommation qui augmentent votre panier moyen : mélanges tranchés standardisés, solutions Ready-to-Cook et stratégie DROPS avec calendrier IN-OUT pour maximiser la marge.',
    'r4.k': 'SERVICE VMI', 'r4.h': 'POUR CLIENTS PREMIUM. Gestion active du stock pour réduire la démarque à zéro.',
    'r4.b': 'Logistique de précision et gestion intelligente pour un rayon toujours parfait. VMI & Réapprovisionnement, logistique inverse et démarque zéro pour éliminer les ruptures et optimiser les opérations.',
    'r5.k': 'Gestion Logistique VMI', 'r5.h': 'Nous nous connectons. Vous vendez.',
    'r5.b': 'Pertes absorbées, réapprovisionnement autonome. Risque logistique à zéro.',
    'f1.k': 'Distribution Horeca', 'f1.h': 'Volume garanti pour les grossistes',
    'f1.b': "Durée de vie maximale. Chaîne du froid ininterrompue jusqu'à votre entrepôt.",
    'f2.k': 'Restauration Organisée', 'f2.h': 'Le même goût dans toutes vos franchises',
    'f2.b': 'Nous standardisons vos recettes pour que vous cloniez le succès partout.',
    'f3.k': 'Formats Ready to Cook', 'f3.h': 'Maîtrisez votre coût par portion au centime',
    'f3.b': 'Zéro perte en cuisine. 100% rendement dès le premier jour.',
    'f4.k': 'Approvisionnement Constant 365 Jours', 'f4.h': 'Souveraineté productive totale',
    'f4.b': 'Prix stables 365 jours. Votre carte ne boite jamais.',
    'pc.fs.em': 'Solutions pour FOODSERVICE', 'pc.fs.rest': '& INDUSTRIE',
    'pc.fs.p': 'Des grossistes aux restaurants organisés et collectivités. Un seul fournisseur, un seul standard, zéro surprise.',
    'qs.badge': 'QUI SOMMES-NOUS', 'qs.h2em': 'Souveraineté Productive 360°.',
    'qs.h2rest': 'Zéro intermédiaires.',
    'qs.sub': "Nous ne sommes pas un simple trader. Nous sommes l'écosystème producteur et logistique qui protège la rentabilité des plus grandes enseignes européennes.",
    'qs.p1h': 'Culture Propre',
    'qs.p1p': 'Contrôle total depuis la spore. La Rioja, Lleida et Pays-Bas. Volume assuré 365 jours par an.',
    'qs.p2h': 'Traitement & Qualité',
    'qs.p2p': "Technologie d'emballage de dernière génération et traitement IV Gama sous certifications IFS et BRC.",
    'qs.p3h': 'Plateformes Logistiques',
    'qs.p3p': '3 plateformes logistiques en Europe. Connexion directe pour vous livrer de la fraîcheur et retirer le risque.',
    'dd.what': 'Qu\'est-ce que c\'est', 'dd.for': 'Pour qui', 'dd.result': 'Résultat',
    'd_drops.h': 'INNOVATION : Nous dynamistons votre rayon et créons des occasions de consommation.',
    'd_drops.w': '<strong>L\'innovation n\'est rentable que si elle est reproductible.</strong> Grâce à notre <strong>ligne de traitement automatisée</strong>, nous garantissons que chaque barquette de nos Mélanges Tranchés (Shiitake, Pleurote, Huître) maintient une uniformité absolue en coupe, calibre et fraîcheur. Nous éliminons l\'incertitude du facteur humain pour vous livrer un produit premium avec la sécurité industrielle et la <strong>norme IFS</strong> qu\'exige votre chaîne logistique.',
    'd_drops.f': '<strong>Nous ne vendons pas des ingrédients ; nous vendons du temps</strong>. Avec nos <strong>Portobellos Farcis</strong> et les formats <strong>Ready-to-Cook</strong>, nous éliminons toutes les barrières de préparation. Ces produits sont conçus pour cuire directement dans l\'emballage (Airfryer/Four), offrant une solution de dîner sain sans effort. Nous capturons le profil de consommateur jeune et gourmet qui recherche la qualité restaurant chez lui.',
    'd_drops.r': '<strong>Nous transformons votre rayon en destination.</strong> Nous concevons un calendrier stratégique de <strong>lancements IN-OUT</strong> avec des variétés exotiques et des éditions limitées. Cette rotation planifiée rompt la monotonie du rayon et génère des pics de demande par impulsion qui <strong>maximisent la rentabilité par mètre carré.</strong> Quand le rayon change, le client revient pour voir ce qu\'il y a de nouveau.',
    'd_comm.h': 'COMMODITÉS : Garantie d\'Approvisionnement Direct.',
    'd_comm.w': '<strong>Nous sommes la source</strong>. Nous contrôlons toute la chaîne : du substrat à votre plateforme. Notre capacité massive garantit un <strong>taux de service de 99%</strong>, protégeant votre rayon même lors des pics critiques. Nous éliminons les maillons inutiles pour vous livrer <strong>stabilité des prix</strong> et sécurité d\'approvisionnement les <strong>365 jours</strong> de l\'année.',
    'd_comm.f': 'Notre modèle logistique intégré élimine les délais d\'attente : <strong>de la culture à votre plateforme en moins de 24 heures.</strong> Cette rapidité livre directement <strong>+2 jours de durée de vie</strong> au consommateur final. Nous ne vendons pas seulement du produit ; nous réduisons drastiquement votre démarque et protégeons la perception de qualité dans votre rayon frais.',
    'd_comm.r': 'L\'excellence n\'est pas négociable. Nous sélectionnons manuellement chaque pièce pour garantir <strong>des calibres uniformes et une esthétique impeccable.</strong> Soutenus par les plus hautes certifications internationales, nous garantissons que votre approvisionnement respecte la rigueur technique exigée par les grands comptes européens. <strong>Sécurité totale à chaque livraison.</strong>',
    'd_espec.h': 'SPÉCIALISATION : Tout le Royaume Fungi chez un seul fournisseur.',
    'd_espec.w': 'Notre échelle nous permet de maintenir une <strong>position dominante dans l\'importation de produits asiatiques</strong>. En contrôlant les flux directs de variétés telles que <strong>le Shimeji (blanc et brun) et l\'Enoki</strong>, nous éliminons les couches de coûts et garantissons une fraîcheur et une continuité que d\'autres fournisseurs ne peuvent égaler. Nous ne dépendons pas des marchés secondaires ; nous sommes le pont direct entre les meilleurs centres de culture du monde et votre rayon.',
    'd_espec.f': 'La saisonnalité n\'est plus une limite. Nous avons tissé un <strong>réseau d\'approvisionnement mondial</strong> qui suit la saison de cueillette sauvage à travers les cinq continents. Des <strong>Cèpes des Carpates à la Trompette d\'Afrique du Sud</strong>, notre structure logistique internationale garantit que des variétés comme la Chanterelle ou la Morille sont disponibles pour vos clients quand d\'autres n\'offrent que du produit sec ou congelé.',
    'd_espec.r': 'Notre spécialisation est votre avantage concurrentiel. Nous offrons <strong>une disponibilité totale de spécialités exotiques et rares</strong> qui dynamisent votre catégorie et attirent le consommateur le plus exigeant. En intégrant ces joyaux mondiaux dans vos flux de grand volume, nous transformons votre rayon frais en destination gastronomique, optimisant votre logistique en consolidant tout l\'univers fungi sous un même label de confiance.',
    'd_inout.h': 'Dynamisme Linéaire: IN/OUT & Sauvages',
    'd_inout.w': 'Pleurote, Girolle, Trompette Noire, mélanges automnaux, assortiments de Noël. Disponibilité contrôlée par campagne.',
    'd_inout.f': 'Retailers voulant activer des campagnes saisonnières et capter le consommateur le plus exigeant prêt à payer premium.',
    'd_inout.r': 'Cassez la monotonie. Campagnes saisonnières à forte marge. Trafic incrémental et achat d\'impulsion.',
    'd_vmi.h': 'POUR CLIENTS PREMIUM. Gestion active du stock pour réduire la démarque à zéro.',
    'd_vmi.w': '<strong>Oubliez la gestion manuelle des commandes.</strong> Grâce à l\'intégration de notre système VMI, nous surveillons vos niveaux de stock en temps réel. Nous n\'attendons pas qu\'une rupture se produise ; <strong>nous exécutons le réapprovisionnement</strong> de manière proactive sur la base d\'algorithmes de demande réelle et de flux EDI.',
    'd_vmi.f': '<strong>Anticipation Proactive :</strong><br/>Nous utilisons l\'analyse des historiques et des pics saisonniers pour garantir que le produit est en rayon avant que le client ne le cherche. <strong>Taux de service garanti de 99%.</strong><br/><br/><strong>Efficacité Démarque Zéro :</strong><br/>Nous ajustons l\'approvisionnement au rythme de vente réel de chaque plateforme. <strong>Moins de stock immobilisé signifie un produit plus frais</strong> et une réduction drastique du gaspillage alimentaire.',
    'd_vmi.r': '<p>Grâce à la synchronisation EDI quotidienne, vous disposez d\'une traçabilité absolue sur les commandes, bons de livraison et niveaux de stock en temps réel.</p><p><strong>Si le produit ne tourne pas selon nos prévisions, nous absorbons le coût</strong>, éliminant votre risque opérationnel et assurant la santé financière maximale de votre rayon frais.</p>',
    'd_cultivo.h': 'COMMODITIES: Masse Agricole à la Source.',
    'd_cultivo.w': 'Nous ne sommes pas un revendeur : nous sommes l\'<strong>origine</strong>. Volume massif de champignon, portobello et pleurote pour que les marchés de gros aient des <strong>camions quotidiens</strong> et l\'<strong>Industrie</strong> dispose de matière première continue—sans variabilité du marché secondaire.',
    'd_cultivo.f': 'Marchés centraux et <strong>Industrie</strong> qui exigent un volume quotidien, un prix stable et zéro rupture d\'approvisionnement.',
    'd_cultivo.r': '<strong>Approvisionnement direct sans ruptures.</strong> Capacité de réponse pour l\'<strong>Industrie</strong> et les marchés de gros avec logistique haute fréquence.',
    'd_distrib.h': 'Contrôle des Écarts : Marge sur le Canal.',
    'd_distrib.w': 'Pour le canal de <strong>Distribution</strong>, le risque n\'est pas seulement le prix d\'achat : c\'est la variabilité de la casse, des réclamations et du rendement réel en aval. Notre IV Gama professionnelle se comporte comme un actif prévisible : forte rotation, gestion simplifiée des pertes et rendement net homogène.',
    'd_distrib.f': 'Distributeurs et grossistes qui cherchent une marge défendable sur les SKU frais, moins d\'incidents opérationnels et des clients finaux satisfaits.',
    'd_distrib.r': '<strong>Nous optimisons la marge opérationnelle du canal Distribution.</strong> Produit à forte rotation qui réduit la gestion des déchets et vise 100% de rendement net en aval avec un écart maîtrisé.',
    'd_org.h': 'Restauration Organisée: Standardisation Totale',
    'd_org.w': 'Nous standardisons la coupe, calibre et grammage pour que vous répliquiez votre recette dans chaque local. Même produit, même présentation, même coût par portion.',
    'd_org.f': 'Chaînes de restauration, franchises et groupes de restaurants nécessitant répliquer leur produit sur multiples emplacements sans variation.',
    'd_org.r': 'Le même goût dans toutes vos franchises. Coût contrôlé par portion. Zéro variation entre locaux. Grandissez sans perdre la qualité.',
    'd_rtc.h': 'IV Gama Professionnelle : Standardisation de Chaîne.',
    'd_rtc.w': 'Nous vendons une <strong>standardisation des process</strong>, pas seulement des “coupes” : le même calibre, la même présentation et le même rendement lot après lot. Vous réduisez la variabilité qui gonfle les coûts et casse la cohérence entre sites.',
    'd_rtc.f': '<strong>Restauration Organisée</strong> et enseignes qui doivent répliquer le même résultat sur des dizaines ou centaines de sites—sans surprises en cuisine.',
    'd_rtc.r': '<strong>Coupes uniformes qui garantissent l\'homogénéité à chaque point de vente.</strong> Idéal pour la <strong>Restauration Organisée</strong> qui vise à répliquer la qualité et simplifier l\'opération locale.',
    'd_sumin.h': 'Approvisionnement 365: Prix Stable Toute l\'Année',
    'd_sumin.w': 'Prix bloqué par saison. Culture propre + importation directe = souveraineté totale. Pas d\'intermédiaires spéculant avec votre P&L.',
    'd_sumin.f': 'Tout opérateur foodservice nécessitant certitude de prix et disponibilité pour maintenir sa carte stable toute l\'année.',
    'd_sumin.r': 'Prix stables 365 jours. Votre carte ne boite jamais par manque de produit. Planifiez votre P&L sans surprises de marché.',
    'cta.contact': 'Parler avec un Spécialiste',
    'cta.formats': 'Voir Formats et Catalogue',
    'ft.brand': 'Producteurs et importateurs de champignons. Contrôle 360° de la culture à la plateforme logistique.',
    'ft.areas': 'Espaces', 'ft.q': 'Qui Sommes-Nous', 'ft.contact': 'Contact direct',
    'ft.form': 'Contact rapide', 'ft.legal': 'Mentions légales · Politique de confidentialité',
    'form.submit': 'Envoyer la demande',
    'd_silvestres.h': 'Spécialités & Sauvages : Partenaire Unique.',
    'd_silvestres.w': 'Nous consolidons exotiques, import direct et sauvages dans le même flux que vos achats de base. Moins de commandes éclatées ; l\'<strong>Industrie</strong> charge davantage sur un seul camion ; la <strong>Restauration Organisée</strong> élargit la carte sans multiplier les fournisseurs.',
    'd_silvestres.f': 'Spécialistes, horeca premium et opérateurs qui veulent élargir le portefeuille sans payer trois fois le transport.',
    'd_silvestres.r': '<strong>Votre Hub Global Fungi.</strong> Nous consolidons exotiques et import direct pour simplifier l\'achat des spécialistes et du canal horeca : un partenaire, une facture, moins de variabilité logistique.',
    'fs.segments': 'Solutions dédiées pour :',
    'fs.segment.dist': 'Distribution',
    'fs.segment.rest': 'Restauration Organisée',
    'fs.segment.mc': 'Marchés Centraux',
    'fs.segment.ind': 'Industrie',
    'fs.hero.em': 'Chaîne d\'approvisionnement sécurisée',
    'fs.hero.span': 'pour Foodservice & Industrie.',
    'hero.p': 'Nous menons le marché avec de nouveaux concepts et formats qui dynamisent la consommation en Retail et Foodservice en éliminant le risque opérationnel.',
    'pc.retail.em': 'RETAIL: Rentabilité & Approvisionnement Sécurisé.',
    'pc.retail.p': 'Optimisation des stocks en temps réel et dynamisation de catégorie pour augmenter le panier moyen.',
    'rl.comm.what': 'Sans intermédiaires. Sans excuses.',
    'rl.comm.for': 'CHAQUE HEURE COMPTE. LE TEMPS C\'EST LA FRAÎCHEUR.',
    'rl.comm.result': 'CONSTANCE ABSOLUE. QUALITÉ SANS SURPRISES.',
    'rl.espec.what': 'Leadership en Culture Asiatique : Importation Directe',
    'rl.espec.for': 'Chaîne d\'Approvisionnement Mondiale : Champignons Sauvages sans frontières',
    'rl.espec.result': 'Spécialistes de l\'Impossible : Le catalogue Fungi définitif',
    'rl.drops.what': 'Qualité Standardisée : La fin de la variabilité.',
    'rl.drops.for': 'Commodité Réelle : De l\'étagère à la table en 6\'.',
    'rl.drops.result': 'Catégorie Vivante : Calendrier de Drops et Promotions.',
    'rl.vmi.what': 'Votre stock, sous notre radar.',
    'rl.vmi.for': 'Les Piliers Opérationnels',
    'rl.vmi.result': 'Synchronisation et KPIs.',
    'tc.comm.title': 'Catalogue Retail : Commodités',
    'tc.comm.button': 'Nos produits de base : formats et grammages',
    'tc.comm.col1': 'Produit',
    'tc.comm.col2': 'Type d\'emballage',
    'tc.comm.col3': 'Formats disponibles',
    'tc.comm.col4': 'Durée de vie',
    'tc.espec.title': 'Catalogue Retail : Spécialités',
    'tc.espec.button': 'Calendrier de Disponibilité',
    'tc.espec.col1': 'Produit',
    'tc.espec.col2': 'Type d\'emballage',
    'tc.espec.col3': 'Formats disponibles',
    'tc.espec.col4': 'Durée de vie',
    'tc.drops.title': 'Catalogue Retail : Mélanges & Drops',
    'tc.drops.button': 'Inspiration',
    'tc.drops.col1': 'Référence',
    'tc.drops.col2': 'Code',
    'tc.drops.col3': 'Format',
    'tc.drops.col4': 'Détail',
    'tc.vmi.title': 'Catalogue Retail : Logistique VMI',
    'tc.vmi.button': 'VMI. Service PREMIUM.',
    'tc.vmi.col1': 'Référence',
    'tc.vmi.col2': 'Code',
    'tc.vmi.col3': 'Format',
    'tc.vmi.col4': 'Détail',
    'nav.inicio': 'ACCUEIL',
    'ft.es.title': 'Espagne',
    'ft.es.att': 'Contact commercial ES',
    'ft.es.loc': 'La Rioja · Lleida · Madrid',
    'ft.es.addr': 'Av. Logística 101, 26007 Logroño (Demo)',
    'ft.nl.title': 'Pays-Bas / Belgique',
    'ft.nl.att': 'Contact commercial NL/BE',
    'ft.nl.loc': 'Hub logistique Pays-Bas',
    'ft.nl.addr': 'Stationsweg 22, 3013 AJ Rotterdam (Demo)',
    'ft.fr.title': 'France',
    'ft.fr.att': 'Contact commercial FR',
    'ft.fr.loc': 'Couverture nationale',
    'ft.fr.addr': '12 Rue du Marché, 69002 Lyon (Demo)',
  },
};

interface DrawerProps {
  drawerId: string;
  isOpen: boolean;
  onClose: () => void;
  t: (key: string) => string;
  showFormat?: (imgSrc: string) => void;
  onPrev?: () => void;
  onNext?: () => void;
  canPrev?: boolean;
  canNext?: boolean;
  onOpenCatalog?: (sectionId: string) => void;
  catalogButtonLabel?: string;
}

const drawerImages: Record<string, string> = {
  drops: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80&fit=crop',
  comm: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80&fit=crop',
  espec: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&fit=crop',
  inout: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80&fit=crop',
  vmi: '/vmi_interior2.png',
  cultivo: '/landing_retail_commodities.png',
  distrib: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80&fit=crop',
  org: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&fit=crop',
  rtc: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80&fit=crop',
  sumin: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80&fit=crop',
  silvestres: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?w=800&q=80&fit=crop',
};

function RetailDrawer({ drawerId, isOpen, onClose, t, showFormat, onPrev, onNext, canPrev, canNext, onOpenCatalog, catalogButtonLabel }: DrawerProps) {
  if (!isOpen) return null;

  const formatImages: Record<string, string> = {
    comm: 'formatos-commodities.jpg',
    drops: 'formatos-drops.jpg',
    espec: 'formatos-laminadas.jpg',
    inout: 'formatos-inout.jpg',
  };

  const handleContactClick = () => {
    onClose();
    setTimeout(() => {
      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCTAClick = () => {
    if (drawerId === 'espec') {
      window.open('/calendario_disponibilidad.pdf', '_blank', 'noopener,noreferrer');
      return;
    }
    if (drawerId === 'drops') {
      if (showFormat) {
        showFormat('/drops_image.png');
      }
      return;
    }
    if (drawerId === 'vmi') {
      if (showFormat) {
        showFormat('/boton_vmi.png');
      }
      return;
    }
    if (onOpenCatalog) {
      onOpenCatalog(drawerId);
      return;
    }
    if (showFormat && formatImages[drawerId]) {
      showFormat(formatImages[drawerId]);
    } else {
      handleContactClick();
    }
  };

  const getButtonText = () => {
    return catalogButtonLabel || t('cta.formats') || 'Ver Formatos y Catálogo';
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const retailLabels: Record<string, { what: string; for: string; result: string }> = {
    comm: {
      what: t('rl.comm.what'),
      for: t('rl.comm.for'),
      result: t('rl.comm.result'),
    },
    espec: {
      what: t('rl.espec.what'),
      for: t('rl.espec.for'),
      result: t('rl.espec.result'),
    },
    drops: {
      what: t('rl.drops.what'),
      for: t('rl.drops.for'),
      result: t('rl.drops.result'),
    },
    vmi: {
      what: t('rl.vmi.what'),
      for: t('rl.vmi.for'),
      result: t('rl.vmi.result'),
    },
  };
  const labels = retailLabels[drawerId] || { what: t('dd.what'), for: t('dd.for'), result: t('dd.result') };
  const certLogos = ['/logo_globalgap.png', '/logo_ifs.png', '/logo_brc.png'];

  return createPortal(
    <>
      <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick}></div>
      <div id={`drawer-${drawerId}`} className={`drawer ${isOpen ? 'open' : ''} ${drawerId === 'vmi' ? 'drawer-vmi-compact' : ''}`}>
        <div className="drawer-inner">
          {drawerId === 'vmi' ? (
            <div className="drawer-img drawer-img-double">
              <img src="/vmi_interior.png" alt="VMI interior 1" />
              <img src="/vmi_interior2.png" alt="VMI interior 2" />
            </div>
          ) : (
            drawerId !== 'comm' && drawerId !== 'espec' && drawerId !== 'drops' && (
              <div className="drawer-img">
                <img
                  src={drawerImages[drawerId]}
                  alt={t(`d_${drawerId}.h`)}
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: '200px',
                    objectFit: 'cover',
                    objectPosition: 'center 25%',
                    display: 'block',
                    background: 'transparent',
                  }}
                />
              </div>
            )
          )}
          <div className="drawer-content">
            <button className="drawer-close" onClick={(e) => { e.stopPropagation(); onClose(); }}>✕</button>
            <button className={`drawer-nav drawer-nav-left ${!canPrev ? 'disabled' : ''}`} onClick={(e) => { e.stopPropagation(); if (canPrev && onPrev) onPrev(); }} aria-label="Anterior">‹</button>
            <button className={`drawer-nav drawer-nav-right ${!canNext ? 'disabled' : ''}`} onClick={(e) => { e.stopPropagation(); if (canNext && onNext) onNext(); }} aria-label="Siguiente">›</button>
            <h3>{t(`d_${drawerId}.h`)}</h3>
            {drawerId === 'comm' && (
              <div className="drawer-extra-gallery">
                <img src="/catalogo_retail_commodities1.png" alt="Commodities solucion 1" />
                <img src="/catalogo_retail_commodities2.png" alt="Commodities solucion 2" />
              </div>
            )}
            {drawerId === 'espec' && (
              <div className="drawer-extra-gallery">
                <img src="/retail_especializacion3.png" alt="Especializacion retail 1" />
                <img src="/hero_image.png" alt="Especializacion retail 2" />
              </div>
            )}
            {drawerId === 'drops' && (
              <div className="drawer-extra-gallery">
                <img src="/n2_retail_innovacion.png" alt="Innovacion retail 1" />
                <img src="/n2_retail_innovacion2.png?v=2" alt="Innovacion retail 2" />
              </div>
            )}
            <div className="drawer-cols">
              <div className={`drawer-col ${drawerId === 'comm' ? 'drawer-col-comm' : ''}`}>
                <div className="dc-label">{labels.what}</div>
                <div dangerouslySetInnerHTML={{__html: t(`d_${drawerId}.w`)}}></div>
                {drawerId !== 'espec' && drawerId !== 'drops' && drawerId !== 'vmi' && (
                  <div className="drawer-cert-logos">
                    {certLogos.map((logo) => (
                      <img key={`${drawerId}-${logo}`} src={logo} alt="Certificación" className="drawer-cert-logo" />
                    ))}
                  </div>
                )}
              </div>
              <div className={`drawer-col ${drawerId === 'comm' ? 'drawer-col-comm-mid' : ''}`}>
                <div className="dc-label">{labels.for}</div>
                <div dangerouslySetInnerHTML={{__html: t(`d_${drawerId}.f`)}}></div>
              </div>
              <div className={`drawer-col ${drawerId === 'comm' ? 'drawer-col-comm-right' : ''}`}>
                <div className="dc-label">{labels.result}</div>
                <div dangerouslySetInnerHTML={{__html: t(`d_${drawerId}.r`)}}></div>
              </div>
            </div>
            <button className="drawer-cta" onClick={handleCTAClick}>
              {drawerId === 'vmi' ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.5 11.5 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1C9.61 21 3 14.39 3 6a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.01l-2.21 2.21z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2V3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7V3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              <span>{getButtonText()}</span>
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

function FoodserviceDrawer({ drawerId, isOpen, onClose, t, onPrev, onNext, canPrev, canNext, onOpenCatalog, catalogButtonLabel }: DrawerProps) {
  if (!isOpen) return null;

  const handleCatalogClick = () => {
    if (onOpenCatalog) {
      onOpenCatalog(drawerId);
      return;
    }
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const foodserviceLabels: Record<string, { what: string; for: string; result: string }> = {
    cultivo: {
      what: 'SEGURIDAD DE SUMINISTRO',
      for: 'MERCADOS CENTRALES E INDUSTRIA',
      result: 'LOGISTICA DE ALTA FRECUENCIA',
    },
    rtc: {
      what: 'ESTANDARIZACION DE PROCESOS',
      for: 'RESTAURACIÓN ORGANIZADA',
      result: 'HOMOGENEIDAD EN CADA LOCAL',
    },
    distrib: {
      what: 'PREDICTIBILIDAD FINANCIERA',
      for: 'CANAL DE DISTRIBUCIÓN',
      result: 'MARGEN OPERATIVO PROTEGIDO',
    },
    silvestres: {
      what: 'PORTFOLIO INTEGRADO',
      for: 'ESPECIALISTAS Y HORECA',
      result: 'HUB GLOBAL FUNGI (ONE-STOP)',
    },
  };
  const labels = foodserviceLabels[drawerId] || { what: t('dd.what'), for: t('dd.for'), result: t('dd.result') };
  const certLogos = ['/logo_globalgap.png', '/logo_ifs.png', '/logo_brc.png'];

  return createPortal(
    <>
      <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick}></div>
      <div id={`drawer-${drawerId}`} className={`drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-inner">
          <div className="drawer-img">
            <img src={drawerImages[drawerId]} alt={t(`d_${drawerId}.h`)} style={{width:'100%',height:'100%',minHeight:'200px',objectFit:'cover',objectPosition:'center 25%',display:'block'}}/>
          </div>
          <div className="drawer-content">
            <button className="drawer-close" onClick={(e) => { e.stopPropagation(); onClose(); }}>✕</button>
            <button className={`drawer-nav drawer-nav-left ${!canPrev ? 'disabled' : ''}`} onClick={(e) => { e.stopPropagation(); if (canPrev && onPrev) onPrev(); }} aria-label="Anterior">‹</button>
            <button className={`drawer-nav drawer-nav-right ${!canNext ? 'disabled' : ''}`} onClick={(e) => { e.stopPropagation(); if (canNext && onNext) onNext(); }} aria-label="Siguiente">›</button>
            <h3>{t(`d_${drawerId}.h`)}</h3>
            <div className="drawer-cols">
              <div className="drawer-col">
                <div className="dc-label">{labels.what}</div>
                <div dangerouslySetInnerHTML={{__html: t(`d_${drawerId}.w`)}}></div>
                <div className="drawer-cert-logos">
                  {certLogos.map((logo) => (
                    <img key={`${drawerId}-${logo}`} src={logo} alt="Certificación" className="drawer-cert-logo" />
                  ))}
                </div>
              </div>
              <div className="drawer-col">
                <div className="dc-label">{labels.for}</div>
                <div dangerouslySetInnerHTML={{__html: t(`d_${drawerId}.f`)}}></div>
              </div>
              <div className="drawer-col">
                <div className="dc-label">{labels.result}</div>
                <div dangerouslySetInnerHTML={{__html: t(`d_${drawerId}.r`)}}></div>
              </div>
            </div>
            <button className="drawer-cta" onClick={handleCatalogClick}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span>{catalogButtonLabel || t('cta.formats')}</span>
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

function App() {
  const getInitialLanguage = (): Language => {
    const browserLang = navigator.language.slice(0, 2).toLowerCase();
    const supportedLangs: Language[] = ['es', 'en', 'nl', 'fr'];

    if (supportedLangs.includes(browserLang as Language)) {
      return browserLang as Language;
    }

    return 'en';
  };

  const [lang, setLang] = useState<Language>(getInitialLanguage());
  const [activeTab, setActiveTab] = useState<Tab | null>(null);
  const [openDrawer, setOpenDrawer] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [techModal, setTechModal] = useState<string | null>(null);

  const t = (key: string): string => translations[lang][key] || key;

  const showFormat = (imgSrc: string) => {
    setLightboxImage(imgSrc);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const switchTab = (tab: Tab) => {
    setActiveTab(prev => prev === tab ? null : tab);
    setOpenDrawer(null);

    const scrollToSectionAligned = (sectionId: string) => {
      const section = document.getElementById(sectionId);
      if (!section) return;
      const header = document.querySelector('header') as HTMLElement | null;
      const headerOffset = header ? header.offsetHeight : 0;
      const extraGap = 10;
      const targetY = section.getBoundingClientRect().top + window.scrollY - headerOffset - extraGap;

      window.scrollTo({ top: Math.max(targetY, 0), behavior: 'smooth' });
    };

    setTimeout(() => {
      scrollToSectionAligned('tabs');
    }, 120);
  };

  const toggleDrawer = (drawerId: string) => {
    if (openDrawer === drawerId) {
      setOpenDrawer(null);
    } else {
      setOpenDrawer(drawerId);
      setTimeout(() => {
        document.getElementById(`drawer-${drawerId}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 60);
    }
  };

  const retailCards = [
    {
      id: 'comm',
      img: '/landing_retail_commodities.png',
      icon: '✓',
      kicker: t('r1.k'),
      title: t('r1.h'),
      body: t('r1.b'),
    },
    {
      id: 'espec',
      img: '/landing_retail_especializacion.png',
      icon: '✓',
      kicker: t('r2.k'),
      title: t('r2.h'),
      body: t('r2.b'),
    },
    {
      id: 'drops',
      img: '/retail_diferenciacion2.png',
      icon: '✓',
      kicker: t('r3.k'),
      title: t('r3.h'),
      body: t('r3.b'),
    },
    {
      id: 'vmi',
      img: '/landing_vmi.png',
      icon: '✓',
      kicker: t('r4.k'),
      title: t('r4.h'),
      body: t('r4.b'),
    },
  ];

  const foodserviceCards = [
    {
      id: 'cultivo',
      img: '/landing_retail_commodities.png',
      icon: '✓',
      kicker: 'Commodities · Origen',
      title: 'Seguridad masiva para Mercados Centrales e Industria.',
      body: 'Origen productor, no revendedor: volumen diario y materia prima estable para grandes operadores sin variabilidad de stock.',
    },
    {
      id: 'rtc',
      img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80&fit=crop',
      icon: '✓',
      kicker: 'IV Gama · Cadena',
      title: 'Estandarización absoluta para Restauración Organizada.',
      body: 'Cortes y formatos que replican la misma calidad en cada local: menos variabilidad operativa y escandallo bajo control.',
    },
    {
      id: 'distrib',
      img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80&fit=crop',
      icon: '✓',
      kicker: 'Distribución · Margen',
      title: 'Producto predecible para el canal de Distribución.',
      body: 'IV Gama como activo financiero: alta rotación, menos reclamaciones y rendimiento neto homogéneo para tu red de clientes.',
    },
    {
      id: 'silvestres',
      img: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?w=800&q=80&fit=crop',
      icon: '✓',
      kicker: 'Especialidades · Hub',
      title: 'Tu proveedor único (One-Stop-Shop) en fungi.',
      body: 'Exóticas, silvestres e importación directa en el mismo flujo que tu compra base: un solo partner, menos variabilidad logística.',
    },
  ];

  const techCatalogs: Record<string, { title: string; button: string; photos: string[]; columns: string[]; rows: string[][] }> = {
    comm: {
      title: t('tc.comm.title'),
      button: t('tc.comm.button'),
      photos: ['/n2_retail_commodities.png', '/n2_retail_commodities1.png'],
      columns: [t('tc.comm.col1'), t('tc.comm.col2'), t('tc.comm.col3'), t('tc.comm.col4')],
      rows: [
        ['Champiñón blanco', 'Film extensible y Termosellado', '200g · 250g · 300g · 400g · 500g', '7-10 días'],
        ['Portobello mediano', 'Film extensible y Termosellado', '200g · 250g · 300g · 400g · 500g', '7-9 días'],
        ['Portobello gigante', 'Film extensible y Termosellado', '250g · 300g · 400g · 500g · 1kg', '6-8 días'],
        ['Pleurotus', 'Film extensible y Termosellado', '200g · 250g · 300g · 400g · 500g', '6-8 días'],
        ['Shiitake', 'Film extensible y Termosellado', '150g · 200g · 250g · 300g · 400g', '6-8 días'],
        ['Mix de 4 setas', 'Film extensible y Termosellado', '200g · 250g · 300g · 400g · 500g', '6-8 días'],
      ],
    },
    espec: {
      title: t('tc.espec.title'),
      button: t('tc.espec.button'),
      photos: ['/qs-procesado.png', '/champur_instalaciones.png'],
      columns: [t('tc.espec.col1'), t('tc.espec.col2'), t('tc.espec.col3'), t('tc.espec.col4')],
      rows: [
        ['Shiitake premium', 'Film extensible y Termosellado', '150g · 200g · 250g · 300g', '6-8 días'],
        ['Seta de cardo', 'Film extensible y Termosellado', '200g · 250g · 300g · 400g', '6-8 días'],
        ['Mix gourmet laminado', 'Film extensible y Termosellado', '200g · 250g · 300g · 400g', '7-9 días'],
      ],
    },
    drops: {
      title: t('tc.drops.title'),
      button: t('tc.drops.button'),
      photos: ['/drops_image.png'],
      columns: [t('tc.drops.col1'), t('tc.drops.col2'), t('tc.drops.col3'), t('tc.drops.col4')],
      rows: [
        ['Drop bimensual', '843700001201', '220g', '12 ud/caja'],
        ['Mix laminado gourmet', '843700001202', '300g', '10 ud/caja'],
        ['Mix salteado', '843700001203', '280g', '10 ud/caja'],
      ],
    },
    vmi: {
      title: t('tc.vmi.title'),
      button: t('tc.vmi.button'),
      photos: ['/qs-logistica1.jpg', '/qs-logistica2.png'],
      columns: [t('tc.vmi.col1'), t('tc.vmi.col2'), t('tc.vmi.col3'), t('tc.vmi.col4')],
      rows: [
        ['Modelo reposicion', 'EDI/API', 'Diario', 'Segun demanda'],
        ['Unidad minima', 'Palet mixto', 'Variable', 'A medida'],
        ['Ventana entrega', 'D+1', '<24h', 'Sin roturas'],
      ],
    },
    cultivo: {
      title: 'Ficha Foodservice: Commodities y Volumen',
      button: 'Ficha Tecnica: Origen e Industria',
      photos: ['/landing_retail_commodities.png', '/qs-espana.jpg'],
      columns: ['Referencia', 'Codigo', 'Formato', 'Detalle'],
      rows: [
        ['Champiñón base', 'Caja', '5kg', 'Servicio diario'],
        ['Portobello base', 'Caja', '5kg', 'Estándar horeca'],
        ['Pleurotus base', 'Caja', '3kg', 'Rotación alta'],
      ],
    },
    distrib: {
      title: 'Ficha Foodservice: Margen y Distribución',
      button: 'Ficha Tecnica: IV Gama Canal Distribución',
      photos: ['/qs-espana.jpg', '/qs-holanda.jpg'],
      columns: ['Referencia', 'Codigo', 'Formato', 'Detalle'],
      rows: [
        ['Entero calibrado', 'Caja', '5kg', 'Mayoristas'],
        ['Laminado', 'Bolsa', '2kg', 'Horeca'],
        ['Cuarto', 'Cubo GN', '3kg', 'Restauracion'],
      ],
    },
    silvestres: {
      title: 'Ficha Foodservice: Hub Especialidades',
      button: 'Ficha Tecnica: Portfolio Integrado',
      photos: ['/qs-procesado.png', '/champur_instalaciones.png'],
      columns: ['Referencia', 'Codigo', 'Formato', 'Detalle'],
      rows: [
        ['Mix silvestre', 'Bolsa MAP', '1kg', 'Premium carta'],
        ['Seta exotica', 'Bolsa', '1kg', 'Palet mixto'],
        ['Surtido temporada', 'Caja', '2kg', 'In/Out'],
      ],
    },
    rtc: {
      title: 'Ficha Foodservice: Estandarización IV Gama',
      button: 'Ficha Tecnica: Restauración Organizada',
      photos: ['/qs-procesado.png', '/qs-logistica1.jpg'],
      columns: ['Referencia', 'Codigo', 'Formato', 'Detalle'],
      rows: [
        ['Lamina', 'Bolsa', '2kg', 'Mise en place'],
        ['Cuarto', 'Cubo', '3kg', 'Plancha/horno'],
        ['Entero', 'Caja', '5kg', 'Produccion'],
      ],
    },
  };

  return (
    <div className="App">
      <a href="#inicio" className="back-top">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
          <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="bt-label">{t('nav.back')}</span>
      </a>

      <header>
        <div className="wrap nav">
          <nav className="navbar">
            {/* IZQUIERDA: logos de marca */}
            <div className="navbar-logos-left">
              <img src="/logo_champur.png" alt="Champur" className="nav-logo"/>
              <div className="nav-logo-divider"></div>
              <img src="/logo_dmp.jpg" alt="DMP" className="nav-logo"/>
              <div className="nav-logo-divider"></div>
              <img src="/logo_fme.png" alt="FME Group" className="nav-logo"/>
            </div>

            {/* DERECHA: certificaciones + nav */}
            <div className="navbar-right">
              <div className="navbar-certs">
                <img src="/logo_ifs.png" alt="IFS Food" className="nav-cert-logo"/>
                <img src="/logo_brc.png" alt="BRC" className="nav-cert-logo"/>
                <img src="/logo_globalgap.png" alt="Global GAP" className="nav-cert-logo"/>
              </div>
              <div className="nav-divider-vertical"></div>
              <a
                href="#nosotros"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById('nosotros');
                  if (!section) return;
                  const header = document.querySelector('header') as HTMLElement | null;
                  const headerOffset = header ? header.offsetHeight : 0;
                  const extraGap = 10;
                  const targetY = section.getBoundingClientRect().top + window.scrollY - headerOffset - extraGap;
                  window.scrollTo({ top: Math.max(targetY, 0), behavior: 'smooth' });
                }}
              >
                {t('nav.qs')}
              </a>
              <div className="nav-langs">
                {(['es', 'en', 'nl', 'fr'] as Language[]).map((l) => (
                  <a
                    key={l}
                    href="#"
                    className={`nav-lang ${lang === l ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setLang(l);
                    }}
                  >
                    {l.toUpperCase()}
                  </a>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div id="hero">
          <div className="hero-bg"></div>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1 className="hero-h1">
              {t('hero.h1a')}<br />
              <span className="hero-accent">{t('hero.h1b')}</span>
            </h1>
            <p className="hero-p">
              {t('hero.p')}
            </p>
            <a
              href="#tabs"
              className="hero-cta"
              onClick={(e) => {
                e.preventDefault();
                switchTab('retail');
              }}
            >
              Retail o Foodservice →
            </a>
          </div>
          <button className="btn-inicio" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            ↑ {t('nav.inicio')}
          </button>
        </div>
      </section>

      <div className="stats-wrap">
        <div className="stats-inner">
          <div className="stats-eyebrow">{t('stats.eyebrow')}</div>
          <div className="stats-row">
            <div className="stat"><strong>+60M€</strong><span>{t('stats.t')}</span></div>
            <div className="stat-sep"></div>
            <div className="stat"><strong>3</strong><span>{t('stats.l')}</span></div>
            <div className="stat-sep"></div>
            <div className="stat"><strong>365</strong><span>{t('stats.s')}</span></div>
            <div className="stat-sep"></div>
            <div className="stat"><strong>100%</strong><span>{t('stats.c')}</span></div>
          </div>
        </div>
      </div>

      <section className="section-trust">
        <div className="wrap">
          <div className="trust-eyebrow">{t('trust.title')}</div>
          <div className="trust-grid">
            <img src="/logo_mercadona.jpg" alt="Mercadona" />
            <img src="/logo_carrefour.jpg" alt="Carrefour" />
            <img src="/logo_aldi.jpg" alt="Aldi" />
            <img src="/logo_el_corte_ingles.png.jpg" alt="El Corte Ingles" />
            <img src="/logo_hellofresh.jpg" alt="HelloFresh" />
            <img src="/logo_consum.png" alt="Consum" />
            <img src="/logo_spar.jpg" alt="Spar" />
            <img src="/logo_colruyt.jpg" alt="Colruyt" />
            <img src="/logo_coop_norge.jpg" alt="Coop Norge" />
            <img src="/logo_bama.jpg" alt="Bama" />
            <img src="/logo_metro.jpg" alt="Metro" />
            <img src="/logo_sligro.jpg" alt="Sligro" />
          </div>
        </div>
      </section>

      <section className="tabs-section" id="tabs" onClick={(e) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.tab-btn') && !target.closest('.tab-panels-wrap')) {
          setActiveTab(null);
        }
      }}>
        <div className="wrap">
          <div className="tabs-header">
            <h2>{t('gate.h2')}</h2>
            <p>{t('gate.sub')}</p>
          </div>
          <div className="tab-btns">
            <button className={`tab-btn ${activeTab === 'retail' ? 'active' : ''}`} onClick={() => switchTab('retail')}>
              <span className="te">🛒</span>
              <div className="tl">
                <span className="tlm">{t('tab.r.main')}</span>
                <span className="tls">{t('tab.r.sub')}</span>
              </div>
            </button>
            <button className={`tab-btn ${activeTab === 'foodservice' ? 'active' : ''}`} onClick={() => switchTab('foodservice')}>
              <span className="te">👨‍🍳</span>
              <div className="tl">
                <span className="tlm">{t('tab.f.main')}</span>
                <span className="tls">{t('tab.f.sub')}</span>
              </div>
            </button>
          </div>
          <div className="tab-panels-wrap">
            {activeTab === 'retail' && (
              <div className="tab-panel active">
                <div className="section-confirm">
                  <span className="sc-icon">🛒</span>
                  <h2>
                    <em>{t('pc.retail.em')}</em>
                  </h2>
                  <p>{t('pc.retail.p')}</p>
                </div>

                <div className="solution-grid">
                  {retailCards.map((card, idx) => (
                    <React.Fragment key={card.id}>
                      <div className={`sol-card c${idx + 1}`} onClick={() => toggleDrawer(card.id)}>
                        <div className="card-body">
                          <div className="card-headline">
                            <div className="level-icon">{card.icon}</div>
                            <div className="card-kicker">{card.kicker}</div>
                            <h4>{card.title}</h4>
                          </div>
                          <div className="card-img-wrap">
                            <img src={card.img} alt={card.id} style={{width:'100%',height:'120px',objectFit:'cover',display:'block'}}/>
                          </div>
                          <div className="card-blurb">{card.body}</div>
                          <div className="card-cta">
                            <span>{t('card.more')}</span>
                            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <RetailDrawer
                        drawerId={card.id}
                        isOpen={openDrawer === card.id}
                        onClose={() => setOpenDrawer(null)}
                        t={t}
                        showFormat={showFormat}
                        canPrev={idx > 0}
                        canNext={idx < retailCards.length - 1}
                        onPrev={() => setOpenDrawer(retailCards[idx - 1]?.id ?? null)}
                        onNext={() => setOpenDrawer(retailCards[idx + 1]?.id ?? null)}
                        onOpenCatalog={(sectionId) => setTechModal(sectionId)}
                        catalogButtonLabel={techCatalogs[card.id]?.button}
                      />
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'foodservice' && (
              <div className="tab-panel active">
                <div className="section-confirm" style={{background:'linear-gradient(135deg,#E8EEF5 0%,#fff 60%)',borderColor:'#C8D8E8'}}>
                  <span className="sc-icon">🔗</span>
                  <h2>
                    <em>{t('fs.hero.em')}</em> <span>{t('fs.hero.span')}</span>
                  </h2>
                  <div className="foodservice-segments" aria-label={t('fs.segments')}>
                    <span className="foodservice-segments-label">{t('fs.segments')}</span>
                    <span className="foodservice-segments-list">
                      <span>{t('fs.segment.dist')}</span>
                      <span className="foodservice-seg-sep" aria-hidden> | </span>
                      <span>{t('fs.segment.rest')}</span>
                      <span className="foodservice-seg-sep" aria-hidden> | </span>
                      <span>{t('fs.segment.mc')}</span>
                      <span className="foodservice-seg-sep" aria-hidden> | </span>
                      <span>{t('fs.segment.ind')}</span>
                    </span>
                  </div>
                </div>

                <div className="fs-grid">
                  {foodserviceCards.map((card, idx) => (
                    <React.Fragment key={card.id}>
                      <div className={`sol-card f${idx + 1}`} onClick={() => toggleDrawer(card.id)}>
                        <div className="card-body">
                          <div className="card-headline">
                            <div className="level-icon">{card.icon}</div>
                            <div className="card-kicker">{card.kicker}</div>
                            <h4>{card.title}</h4>
                          </div>
                          <div className="card-img-wrap">
                            <img src={card.img} alt={card.id}/>
                          </div>
                          <div className="card-blurb">{card.body}</div>
                          <div className="card-cta">
                            <span>{t('card.more')}</span>
                            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <FoodserviceDrawer
                        drawerId={card.id}
                        isOpen={openDrawer === card.id}
                        onClose={() => setOpenDrawer(null)}
                        t={t}
                        canPrev={idx > 0}
                        canNext={idx < foodserviceCards.length - 1}
                        onPrev={() => setOpenDrawer(foodserviceCards[idx - 1]?.id ?? null)}
                        onNext={() => setOpenDrawer(foodserviceCards[idx + 1]?.id ?? null)}
                        onOpenCatalog={(sectionId) => setTechModal(sectionId)}
                        catalogButtonLabel={techCatalogs[card.id]?.button}
                      />
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <hr className="divider"/>

      <section className="qs-section" id="nosotros">
        <div className="wrap">
          <div className="qs-header">
            <div className="qs-badge">{t('qs.badge')}</div>
            <h2>
              <em>{t('qs.h2em')}</em> <span>{t('qs.h2rest')}</span>
            </h2>
            <p>{t('qs.sub')}</p>
          </div>
          <div className="qs-pillars">
            {[1, 2, 3].map((num) => (
              <div key={num} className="qs-pillar">
                <div className="pillar-icon">
                  <svg viewBox="0 0 32 32" fill="none">
                    {num === 1 && (
                      <>
                        <path d="M16 28V16" stroke="#5E9E28" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M16 16C16 16 10 14 8 8c4 0 7 2 8 8z" fill="#C8E8A0" stroke="#5E9E28" strokeWidth="1.5" strokeLinejoin="round"/>
                        <path d="M16 16C16 16 22 14 24 8c-4 0-7 2-8 8z" fill="#C8E8A0" stroke="#5E9E28" strokeWidth="1.5" strokeLinejoin="round"/>
                        <circle cx="16" cy="7" r="2" fill="#5E9E28"/>
                      </>
                    )}
                    {num === 2 && (
                      <>
                        <rect x="6" y="8" width="20" height="16" rx="3" stroke="#5E9E28" strokeWidth="2"/>
                        <path d="M10 16h12M10 20h7" stroke="#5E9E28" strokeWidth="2" strokeLinecap="round"/>
                        <circle cx="22" cy="11" r="2.5" fill="#C8E8A0" stroke="#5E9E28" strokeWidth="1.5"/>
                      </>
                    )}
                    {num === 3 && (
                      <>
                        <rect x="3" y="12" width="18" height="12" rx="2" stroke="#5E9E28" strokeWidth="2"/>
                        <path d="M21 16h4l4 4v4h-8V16z" stroke="#5E9E28" strokeWidth="2" strokeLinejoin="round"/>
                        <circle cx="8" cy="26" r="2" fill="#C8E8A0" stroke="#5E9E28" strokeWidth="1.5"/>
                        <circle cx="22" cy="26" r="2" fill="#C8E8A0" stroke="#5E9E28" strokeWidth="1.5"/>
                      </>
                    )}
                  </svg>
                </div>
                <h4>{t(`qs.p${num}h`)}</h4>
                <p>{t(`qs.p${num}p`)}</p>
              </div>
            ))}
          </div>

          <h3 style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '1.5rem', fontSize: '1.5rem', color: 'var(--dark)' }}>
            {lang === 'es' ? 'Nuestra Infraestructura Europea' : lang === 'en' ? 'Our European Infrastructure' : lang === 'nl' ? 'Onze Europese Infrastructuur' : 'Notre Infrastructure Européenne'}
          </h3>

          <div className="bento-gallery">
            <div className="bento-item bento-large">
              <img src="/qs-procesado.png" alt="DMP Procesado" onClick={() => showFormat('/qs-procesado.png')} />
            </div>
            <div className="bento-item bento-large">
              <img src="/qs-espana.jpg" alt="Cultivo España" onClick={() => showFormat('/qs-espana.jpg')} />
            </div>
            <div className="bento-item bento-medium">
              <img src="/qs-holanda.jpg" alt="FME Instalaciones Holanda" onClick={() => showFormat('/qs-holanda.jpg')} />
            </div>
            <div className="bento-item bento-medium">
              <img src="/qs-logistica1.jpg" alt="Camión FME" onClick={() => showFormat('/qs-logistica1.jpg')} />
            </div>
            <div className="bento-item bento-medium">
              <img src="/qs-logistica2.png" alt="Cultivo FME" onClick={() => showFormat('/qs-logistica2.png')} />
            </div>
          </div>
        </div>
      </section>

      <footer id="contacto">
        <div className="wrap">
          <div className="fg">
            <div className="fc">
              <h5>{t('ft.es.title')}</h5>
              <ul>
                <li><a href="mailto:espana@fmegroup.eu">espana@fmegroup.eu</a></li>
                <li><a href="tel:+34900000000">+34 900 000 000</a></li>
                <li>{t('ft.es.loc')}</li>
                <li>{t('ft.es.addr')}</li>
              </ul>
            </div>
            <div className="fc">
              <h5>{t('ft.nl.title')}</h5>
              <ul>
                <li><a href="mailto:nlbe@fmegroup.eu">nlbe@fmegroup.eu</a></li>
                <li>{t('ft.nl.att')}</li>
                <li>{t('ft.nl.loc')}</li>
                <li>{t('ft.nl.addr')}</li>
              </ul>
            </div>
            <div className="fc">
              <h5>{t('ft.fr.title')}</h5>
              <ul>
                <li><a href="mailto:fr@fmegroup.eu">fr@fmegroup.eu</a></li>
                <li>{t('ft.fr.att')}</li>
                <li>{t('ft.fr.loc')}</li>
                <li>{t('ft.fr.addr')}</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {lightboxImage && (
        <div
          id="format-lightbox"
          style={{
            display: 'flex',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.9)',
            zIndex: 30010,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            animation: 'overlayFadeIn 0.24s ease-out forwards'
          }}
          onClick={closeLightbox}
        >
          <div
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'flex-start',
              justifyContent: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              onClick={closeLightbox}
              style={{
                color: 'white',
                fontSize: '1.5rem',
                position: 'absolute',
                top: '8px',
                right: '10px',
                cursor: 'pointer',
                fontWeight: 'bold',
                lineHeight: 1,
                background: 'rgba(0,0,0,0.45)',
                borderRadius: '6px',
                padding: '2px 8px'
              }}
            >
              ✕
            </span>
            <img
              id="format-img"
              src={lightboxImage}
              alt="Product Formats"
              style={{
                maxWidth: '90%',
                maxHeight: '85vh',
                borderRadius: '8px',
                animation: 'techModalIn 0.28s cubic-bezier(.22,.61,.36,1) forwards'
              }}
            />
          </div>
        </div>
      )}

      {techModal && createPortal(
        <div className="tech-modal-overlay" onClick={() => setTechModal(null)}>
          <div className="tech-modal" onClick={(e) => e.stopPropagation()}>
            <button className="tech-modal-close" onClick={() => setTechModal(null)}>✕</button>
            <h3>{techCatalogs[techModal]?.title || 'Catalogo tecnico'}</h3>
            <div className="tech-photo-grid">
              {(techCatalogs[techModal]?.photos || []).map((photo) => (
                <img key={photo} src={photo} alt="Foto de producto" onClick={() => showFormat(photo)} />
              ))}
            </div>
            <table className="tech-table">
              <thead>
                <tr>
                  {(techCatalogs[techModal]?.columns || ['Referencia', 'Codigo', 'Formato', 'Detalle']).map((col) => (
                    <th key={`${techModal}-col-${col}`}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(techCatalogs[techModal]?.rows || []).map((row, idx) => (
                  <tr key={`${techModal}-${idx}`}>
                    {row.map((cell, cIdx) => (
                      <td key={`${techModal}-${idx}-${cIdx}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {techModal === 'comm' && (
              <p className="tech-note">* Podemos hacer cualquier formato adicional que no se muestre en la tabla.</p>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export default App;
