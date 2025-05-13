/* main.js — 2025-05 fixed: sidebar buttons appear */
"use strict";

window.addEventListener("DOMContentLoaded", () => {
  /* ===== 依赖检查（保持不变） ===== */
  if (typeof mapboxgl === "undefined") {
    alert("❌ Mapbox GL JS 没有加载到，请确认 <script> 标签路径或网络。");
    return;
  }
  const [major, minor] = mapboxgl.version.split(".").map(Number);
  if (major < 2 || (major === 2 && minor < 8)) {
    alert("❌ Mapbox GL 版本过旧，需要 v2.8+ 才能使用 'naturalEarth' 投影。");
    return;
  }
  if (typeof d3 === "undefined" || typeof d3.autoType !== "function") {
    alert("❌ d3.js 未加载或版本低于 v7。请引入 https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js");
    return;
  }

  /* ===== Mapbox token & style ===== */
  mapboxgl.accessToken =
    "pk.eyJ1IjoiaGFuZ3VvMDIiLCJhIjoiY203dWdpZmVuMDBjdDJ2cXNkOWQ5NmI1bSJ9.9sz-VQqIqo6Dw1kSer5FZA";
  const styleId = "mapbox://styles/hanguo02/cma9ff7fw00if01qy8ukfdypl";
  const mapStyle = styleId;               // 有权限的自定义样式
  /* 若想临时退回官方样式：const mapStyle = "mapbox://styles/mapbox/light-v11"; */

  /* ===== 数据地址 ===== */
  const CSV_URL =
    "https://raw.githubusercontent.com/hanguo02/CASA0003_Groupwork/8f630d09842e8b9739e209e9a575a06064a31535/data/Lithium_Worldwide_Deposit.csv";
  const GLOBAL_CSV_URL =
    "https://raw.githubusercontent.com/cladyles/CASA0003_Groupwork/refs/heads/main/data/global_critical_mineral_locations.csv";

  /* ===== 颜色工具 ===== */
  const mineralColors = {
    Lithium: "#F0715E",
    Cobalt: "#FF2553",
    Nickel: "#63FD88",
    Copper: "#3262FF",
    "Rare Earth": "#A86CFF",
    Graphite: "#3EFFD4",
    Manganese: "#FC5252",
  };
  const stringToColor = (str) => {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
    return `hsl(${Math.abs(h) % 360},70%,55%)`;
  };
  const getColor = (m) => mineralColors[m] || stringToColor(m);

  /* ===== Legend（略，保持不变） ===== */
  const legend =
    document.getElementById("legend") ||
    (() => {
      const lg = document.createElement("div");
      lg.id = "legend";
      lg.className = "legend";
      document.body.appendChild(lg);
      return lg;
    })();
  function buildLegend() {
    legend.innerHTML = `<div id="legend-title">Most Critical Mineral Deposits</div>`;
    Object.entries(mineralColors).forEach(([m, c]) => {
      const row = document.createElement("div");
      row.className = "legend-item";
      row.innerHTML = `<span class="legend-color" style="background:${c}"></span>${m}`;
      legend.appendChild(row);
    });
  }
  buildLegend();

  /* ===== Map 初始化 ===== */
  const map = new mapboxgl.Map({
    container: "map",
    projection: "naturalEarth",
    style: mapStyle,
    center: [0, 12],
    zoom: 1.8,
  });

  /* ===== 数据渲染 ===== */
  let markers = [];
  function clearMarkers() {
    markers.forEach(({ marker }) => marker.remove());
    markers = [];
  }
  function loadData(csvUrl, lithiumColor) {
    clearMarkers();
    d3.csv(`${csvUrl}?v=${Date.now()}`, d3.autoType)
      .then((rows) => {
        rows.forEach((row) => {
          const lat = row.LATITUDE,
            lon = row.LONGITUDE;
          if (typeof lat !== "number" || typeof lon !== "number") return;

          const mineral = row.CRITICAL_MINERAL || "Lithium";
          const name = row.DEPOSIT_NAME || row.RESOURCE_NAME || mineral;

          const popup = new mapboxgl.Popup({
            offset: 20,
            closeButton: false,
            closeOnClick: false,
            className: "deposit-popup",
          }).setHTML(`<strong>${name}</strong><br>${mineral}`);

          let marker, el;
          if (csvUrl === GLOBAL_CSV_URL) {
            el = document.createElement("div");
            el.className = "global-marker fade-marker";
            el.style.background = getColor(mineral);
            marker = new mapboxgl.Marker({ element: el })
              .setLngLat([lon, lat])
              .addTo(map);
            requestAnimationFrame(() => el.classList.add("show"));
          } else {
            marker = new mapboxgl.Marker({ color: lithiumColor })
              .setLngLat([lon, lat])
              .addTo(map);
            el = marker.getElement();
            const base = el.style.transform;
            el.style.transform = base + " scale(.3)";
            el.style.opacity = "0";
            requestAnimationFrame(() => {
              el.style.transition =
                "opacity .9s ease-out, transform .9s ease-out";
              el.style.transform = base + " scale(1)";
              el.style.opacity = "1";
            });
          }
          el.addEventListener("mouseenter", () =>
            popup.addTo(map).setLngLat([lon, lat])
          );
          el.addEventListener("mouseleave", () => popup.remove());

          markers.push({ marker, popup });
        });
      })
      .catch((err) => console.error("❌ CSV load failed:", err));
  }

  /* ============ 侧边栏按钮 ============ */
  const sidebar   = document.getElementById("sidebar");
  const infoBox   = sidebar.querySelector(".info-box") || sidebar;   // 有 info-box 就用它，没有就用 sidebar
  const btnParent = () => {
    // 每次都保证按钮插在 info-box 之后，这样布局最稳
    const anchor = infoBox.nextElementSibling || infoBox;
    return anchor.parentNode;
  };

  function mkBtn(id, label) {
    let btn = document.getElementById(id);
    if (!btn) {
      btn = document.createElement("button");
      btn.id = id;
      btn.textContent = label;
      btn.className = "sidebar-btn";    // 统一按钮样式（你在 CSS 里写过）
      btnParent().insertBefore(btn, infoBox.nextSibling);
    }
    return btn;
  }

  const lithiumBtn = mkBtn("lithium-btn", "Lithium");
  const globalBtn  = mkBtn("global-btn",  "Global");
  const chileBtn   = mkBtn("chile-btn",   "Zoom Chile");

  /* —— 智利模式状态缓存 —— */
  let chileMode        = false;            // 是否已切到智利视图
  let savedHTML        = "";               // infoBox 备份的 HTML
  let savedCenterZoom  = null;             // { center, zoom }
  let savedActiveId    = "";               // 当时被激活按钮的 id
  let chileDialog = null;   // 对话框 DOM 引用



  /* ===== 按钮交互 ===== */
  function setActive(activeBtn, ...others) {
    activeBtn.classList.add("active");
    others.filter(b => b !== activeBtn)      // ← 把自己排除
       .forEach(b => b.classList.remove("active"));
  }

  lithiumBtn.addEventListener("click", () => {
  setActive(lithiumBtn, globalBtn, chileBtn);
  loadData(CSV_URL, "#F0715E");

  infoBox.innerHTML = `
    <p>Lithium is found only in hard-rock deposits or salares, 
    and today about 90 percent of global output is confined to Australia, Chile, China, and Argentina. </p> 
    <p>Australia, the largest producer, mined over 40 percent of the world’s lithium from hard-rock spodumene in 2023, 
    while vast salares in Argentina, Bolivia, and Chile supply most of South America’s output. China, active in both hard-rock and salar extraction, refines the bulk of Australia’s spodumene into battery-grade lithium 
    and thus wields dominant influence over the global supply chain.</p> 
  `;
});

  globalBtn.addEventListener("click", () => {
  setActive(globalBtn, lithiumBtn, chileBtn);
  loadData(GLOBAL_CSV_URL, "#4E91FF");

  infoBox.innerHTML = `
   <p>According to the USGS definition, critical minerals typically include elements such as cobalt, 
   gallium, helium, lithium, magnesium, palladium, platinum, and titanium. These materials are 
   essential to modern technologies and the transition to a green economy, 
   and are regarded as valuable strategic resources. </p>
  <p>However, the extraction of these minerals often raises serious concerns about environmental degradation,
    human rights violations, and geopolitical dependencies. 
    This map illustrates the global distribution of critical mineral deposits, 
    highlighting the complexities of resource access and international trade. </p>
  `;
});


  chileBtn.addEventListener("click", () => {

    /* ───── 还没进入智利模式 ───── */
    if (!chileMode){
  
      /* 1. 备份当前状态 */
      savedHTML       = infoBox.innerHTML;
      savedCenterZoom = { center: map.getCenter(), zoom: map.getZoom() };
      savedActiveId   = document.querySelector(".sidebar-btn.active")?.id || "";
  
      /* 2. UI：高亮按钮、改为 Reset */
      setActive(chileBtn, lithiumBtn, globalBtn);
      chileBtn.textContent = "Back to Global";
  
      /* 3. 如需切数据集，飞完再加载 */
      const needDataSwitch = !lithiumBtn.classList.contains("active");
      if (needDataSwitch) setActive(lithiumBtn, globalBtn);
  
      map.once("moveend", () => {
        if (needDataSwitch) loadData(CSV_URL, "#F0715E");

        /* ----► 创建并挂到 #map 上 --- */
        if(!chileDialog){
           chileDialog = document.createElement("div");
           chileDialog.className = "chile-dialog";
           chileDialog.innerHTML = `
           <strong>Lithium Triangle Intro</strong><br>
            <p>Latin America is the region with the largest lithium resource reserves in the world. </p><p>The famous Lithium Triangle is a lithium-rich area located at the southwestern corner of the Andes Mountains in South America, spanning the borders of Argentina, Bolivia, and Chile, forming a geographical triangle of lithium resources beneath its salt flats. 
      According to the 2021 US Geological Survey's "Mineral Commodity Summaries," about 58% of the world's lithium resources are distributed in these three countries. </p>
      <p>However, the extraction of lithium has also brought severe ecological destruction and social injustice. 
      In Latin America, lithium mining projects dominated by foreign capital often come at the expense of indigenous lands, water resources, and livelihoods, turning the hope for green energy into another form of resource plunder. 
      Although lithium is considered a key material in the fight against the climate crisis, under the current system, wealth flows to multinational companies, while local communities struggle to share in the benefits, resulting in a new form of oppression and exploitation.</p>
          `;
          /* 点击切换展开 / 收起 */
           chileDialog.addEventListener("click",()=>chileDialog.classList.toggle("expanded"));
           document.getElementById("map").appendChild(chileDialog);
        }
        chileMode = true;
  
        
      });
  
      /* 5. 飞向智利 */
      map.flyTo({
        center: [-65, -25],
        zoom:   4.5,
        duration: 3500,
        curve: 1.9,
        essential: true,
      });
  
    /* ───── 已在智利模式 → 恢复 ───── */
    } else {
  
       /* === 恢复逻辑里，替换 infoBox / 按钮文字 那段 === */
       if (chileDialog){
          chileDialog.remove();   // 把对话框从 DOM 删除
          chileDialog = null;
        }
       infoBox.innerHTML = savedHTML;      // 保持你原来的备份复原
       chileBtn.textContent = "Lithium Triangle";
       chileMode = false;

  
      /* 2. 复原激活按钮 & 数据集 */
      const prevBtn = document.getElementById(savedActiveId) || lithiumBtn;
      setActive(prevBtn, lithiumBtn, globalBtn, chileBtn);
      if (prevBtn === globalBtn) loadData(GLOBAL_CSV_URL, "#4E91FF");
  
      /* 3. 飞回原视角 */
      map.flyTo({
        center: savedCenterZoom.center,
        zoom:   savedCenterZoom.zoom,
        duration: 2500,
        curve: 1.9,
        essential: true,
      });
    }
  });
  

  /* ===== 初始视图 ===== */
  map.on("load", () => {
    setActive(lithiumBtn, globalBtn, chileBtn);
    loadData(CSV_URL, "#F0715E");
  });
});
