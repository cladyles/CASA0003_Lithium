// main.js

// — Mapbox 初始化
mapboxgl.accessToken = 'pk.eyJ1IjoieXVoYW53YW5nIiwiYSI6ImNtYTk3a3l3eDFjNzYya3F1cjI4OTFpZ2EifQ.cg-Y0F7OyaTc_gHfyHDKVQ';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/yuhanwang/cmacfut5t00ms01sdhfr96quz',
  center: [-67.5, -23],
  zoom: 5.5,
  pitch: 60,
  bearing: 20,
  antialias: true
});

// —— STEP 信息
const stepInfo = [
  { title:'Lithium Triangle', text:`Latin America possesses the largest lithium reserves in the world, primarily concentrated in the renowned Lithium Triangle. Situated in the southwestern corner of the Andes Mountains in South America, this lithium-rich area spans the borders of Argentina, Bolivia, and Chile, forming a geographic triangle beneath expansive salt flats.\nAccording to 2021 USGS Mineral Commodity Summary, Lithium Triangle holds approximately 58% of the world’s lithium resources. Of the globally proven lithium reserves totaling 86 million tons, Bolivia accounts for the largest portion with 21 million tons, followed by Argentina with 19.3 million tons, and Chile with 9.6 million tons.` },
  { title:'Top10 EV brands(China)', text:`The geographical distribution of these top ten power/storage battery enterprises in China shows obvious clustering characteristics, mainly concentrated in the eastern and southern coastal provinces, especially Fujian, Guangdong, and Jiangsu provinces, which account for the majority of the top six.` },
  { title:'China Overview', text:`MAs global demand for electric vehicles and energy storage surges, China has intensified its strategic engagement in the lithium industry. Among all provinces, Zhejiang, Jiangsu, and Fujian have emerged as key players, each occupying a distinct role in the lithium supply chain—from raw material import and refining to battery cell manufacturing and export.` },
  { title:'Zhejiang province(QZ)', text:`Quzhou, Zhejiang plays a pivotal role as a hub for "raw material import" and "refining and processing" in the global lithium element industry chain. As can be seen from the chart data, the import volume of lithium materials in Quzhou has been on a steady upward trend in the first half of the year, reaching a peak especially from May to June, reflecting its continuous demand for raw materials. This is closely related to the vitality of the local industry chain.` },
  { title:'Jiangsu province(CZ)', text:`Located in Jiangsu Province, Changzhou plays a central role in cathode material production, one of the most critical components in lithium-ion batteries. The pie chart shows that cathode materials account for the largest share of the city’s lithium-related output, followed by cobalt compounds and lithium salts.\n
As a national hub for advanced lithium battery materials, Changzhou is home to multiple leading manufacturers, each specializing in different segments of the cathode supply chain—including LFP (lithium iron phosphate), NCM (nickel cobalt manganese), and high-nickel chemistries. The presence of these enterprises supports both domestic demand and international exports.` },
  { title:'Fujian province(ND)', text:`Fujian Province, particularly Ningde, plays a leading role in the downstream segment of China’s lithium battery industry, focusing on battery cell manufacturing and global exports. The bar chart shows a steady month-by-month increase in battery exports from 0.8 GWh in January to over 1.3 GWh in June, reflecting the growing global demand for Chinese-made energy storage products.
At the heart of this momentum is CATL (Contemporary Amperex Technology Co. Limited), headquartered in Ningde, which is the world’s largest producer of lithium-ion batteries. CATL’s expansive manufacturing capacity and cutting-edge R&D have made Fujian a global export hub for EV and grid-scale batteries.` },
  { title:'Top10 EV Companies(Global)', text:`Concentration in East Asia: China, Japan, and South Korea host several major players, including BYD, NIO, Toyota, Hyundai, and LG Energy Solution, reflecting the region’s leadership in EV manufacturing and battery innovation.
Strong presence in Europe: Germany and Sweden contribute with legacy automakers like Volkswagen and Volvo, both of which are actively transforming their production toward electric and autonomous technologies.
North America’s innovation hub: The United States is home to Tesla, the global leader in EVs and energy storage systems, along with emerging players in California’s Silicon Valley.` }
];
const secondaryExplanations = [
  "Lithium Triangle: Global Production Capacity Center.",
  "Top 10 EV brands in China: Regional clustering in coastal provinces.",
  "China Overview: Strategic engagement in lithium trade; regional roles of Zhejiang, Jiangsu, and Fujian.",
  "Zhejiang: Raw material import and refining hub.",
  "Jiangsu: Cathode material production center.",
  "Fujian: Battery cell manufacturing and exports.",
  "The Global Distribution Map of Top 10 High-Tech Automotive Companies."
];

// —— Plotly 折线图：年度出口值（前六大贸易伙伴）
d3.csv('https://raw.githubusercontent.com/cladyles/CASA0003_Groupwork/main/data/Lithium_Trade_Value_2007-2024.csv')
  .then(tradeData => {
    const exportsOnly = tradeData.filter(d => d.flowDesc === 'Export');
    const nested = {};
    exportsOnly.forEach(d => {
      const year = +d.refYear;
      const partner = d.reporterDesc;
      const value = +d['primaryValue(USD)'];
      nested[partner] = nested[partner] || {};
      nested[partner][year] = (nested[partner][year] || 0) + value;
    });

    const years = Array.from(new Set(exportsOnly.map(d => +d.refYear))).sort((a, b) => a - b);
    const topPartners = Object.keys(nested)
      .map(p => ({ partner: p, total: years.reduce((sum, y) => sum + (nested[p][y] || 0), 0) }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 6)
      .map(x => x.partner);

    const traces = topPartners.map(p => ({
      x: years,
      y: years.map(y => nested[p][y] || 0),
      mode: 'lines+markers',
      name: p,
      marker: { size: 6 }
    }));

    const layout = {
      paper_bgcolor: '#111',
      plot_bgcolor: '#111',
      font: { color: '#eee' },
      hovermode: 'x unified',
      xaxis: { title: 'Year', color: '#ccc' },
      yaxis: { title: 'Value (USD)', color: '#ccc' },
      legend: { orientation: 'h', x: 0.5, xanchor: 'center', y: -0.15, font: { size: 10 } },
      margin: { t: 40, b: 80, l: 60, r: 20 }
    };

    Plotly.newPlot('line-chart', traces, layout, { displayModeBar: false, responsive: true });
  })
  .catch(err => {
    console.error('Failed to load trade data:', err);
    alert('Cannot load CSV. Please check the URL.');
  });

// —— Chart.js 配置 (除第0,2,9步外)
const stepCharts = [
  null,
  {
    type: 'bar',
    data: {
      labels: ['Bolivia', 'Argentina', 'Chile'],
      datasets: [{
        data: [21, 19.3, 9.6],
        backgroundColor: ctx => {
          const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 200);
          g.addColorStop(0, '#ec6242');
          g.addColorStop(1, '#f0715e');
          return g;
        }
      }]
    },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: c => c.parsed.y + ' Mt' } }
      },
      scales: {
        y: { beginAtZero: true, title: { display: true, text: 'Mt' } }
      }
    }
  },
  null,
  {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        { label: 'Import', data: [0.5, 0.6, 0.7, 0.6, 0.8, 0.9], backgroundColor: '#61d4ea' },
        { label: 'Output', data: [0.4, 0.5, 0.6, 0.5, 0.7, 0.8], backgroundColor: '#f2e475' }
      ]
    },
    options: { scales: { y: { beginAtZero: true } }, plugins: { legend: { position: 'top' } } }
  },
  {
    type: 'pie',
    data: {
      labels: ['Cathode', 'Cobalt', 'Lithium Salt'],
      datasets: [{ data: [45, 30, 25], backgroundColor: ['#90c95c', '#63a454', '#285f4d'] }]
    },
    options: { plugins: { legend: { position: 'right' } } }
  },
  {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{ label: 'Exports (GWh)', data: [0.8, 0.9, 1.0, 1.1, 1.2, 1.3], backgroundColor: '#f5c142' }]
    },
    options: { scales: { y: { beginAtZero: true } } }
  },
  {
    type: 'doughnut',
    data: {
      labels: ['LFP', 'NMC', 'Other'],
      datasets: [{ data: [50, 35, 15], backgroundColor: ['#ec6242', '#5462f8', '#47454e'] }]
    },
    options: { plugins: { legend: { position: 'right' } } }
  },
  {
    type: 'bar',
    data: {
      labels: ['CATL', 'ATL', 'Others'],
      datasets: [{ label: 'Capacity (GWh)', data: [120, 80, 40], backgroundColor: ['#90c95c', '#63a454', '#285f4d'] }]
    },
    options: { scales: { y: { beginAtZero: true } } }
  },
  {
    type: 'bar',
    data: {
      labels: ['USA','Germany','France','UK','Japan','S.Korea','India','Canada','Australia','Brazil'],
      datasets: [{ label: 'Shipments (GWh)', data: [25,22,20,18,17,15,14,12,10,9], backgroundColor: '#f0715e' }]
    },
    options: {
      indexAxis: 'y',
      scales: { x: { beginAtZero: true, title: { display: true, text: 'GWh' } } },
      plugins: { legend: { display: false } }
    }
  },
  null
];

let panelChart;

// —— 可视化函数 ——
// Plotly 折线图 (step0)
function renderLineChart() {
  const url = 'https://raw.githubusercontent.com/cladyles/CASA0003_Groupwork/.../Lithium_Trade_Value_2007-2024.csv';
  d3.csv(url).then(data => {
    const exp = data.filter(d => d.flowDesc === 'Export'), nest = {};
    exp.forEach(d => {
      const y = +d.refYear, p = d.reporterDesc, v = +d['primaryValue(USD)'];
      nest[p] = nest[p] || {};
      nest[p][y] = (nest[p][y] || 0) + v;
    });
    const years = Array.from(new Set(exp.map(d => +d.refYear))).sort((a,b) => a - b),
          top6 = Object.keys(nest)
            .map(p => ({ p, total: years.reduce((s,y) => s + (nest[p][y]||0), 0) }))
            .sort((a,b) => b.total - a.total).slice(0,6).map(x => x.p),
          traces = top6.map(p => ({
            x: years, y: years.map(y => nest[p][y]||0),
            mode: 'lines+markers', name: p, marker: { size: 6 }
          })),
          layout = {
            width: 340, height: 420,
            paper_bgcolor: '#111', plot_bgcolor: '#111',
            hovermode: 'x unified', font: { color: '#eee' },
            xaxis: { title:'Year', showline:true, linecolor:'#555', tickfont:{color:'#ccc'}, color:'#ccc',
                     tickvals:[2010,2015,2020,2025], range:[2009,2025.5] },
            yaxis: { title:'Value (USD)', showline:true, linecolor:'#555', tickfont:{color:'#ccc'}, color:'#ccc',
                     tickvals:[0,0.2e9,0.4e9,0.6e9,0.8e9,1.0e9,1.2e9], tickformat:'~s' },
            legend: { orientation:'h', x:0.5, xanchor:'center', y:-0.35, font:{size:10}, itemwidth:140, itemsizing:'constant' },
            margin: { t:40, b:140, l:50, r:10 }
          };
    Plotly.newPlot('line-chart', traces, layout, { displayModeBar: false, responsive: true });
  });
}

// D3 热力图 (step2)
function drawHeatmap() {
  // heatmap 的完整内容
}

// 发散条形图 (step1)
function renderDivergingChart() {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].reverse();
  const exports = [35574241636,26372704409,31767217968,30556948607,32919169701,36328355705,38102630453,41340896306,37780136245,39507339670,41223287234,43445582610].reverse();
  const imports = [1604046747,1001056407,1255859995,1344477884,1445400106,1584049305,1776987710,1335393493,1536180182,1455189969,1634666141,1237986895].reverse();
  const ctx = document.getElementById("panelChart").getContext("2d");
  if (panelChart) panelChart.destroy();
  panelChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: months,
      datasets: [
        { label: "Export(China)", data: exports.map(x => -x), backgroundColor: "#fdd835" },
        { label: "Import(China)", data: imports, backgroundColor: "#6baed6" }
      ]
    },
    options: {
      indexAxis: "y", responsive: true,
      plugins: {
        legend:{ labels:{ color:"#fff" }},
        tooltip:{ callbacks:{ label:ctx=>{
          const raw = Math.abs(ctx.raw);
          return `${ctx.dataset.label}: ¥ ${raw.toLocaleString()}`;
        }}}
      },
      scales:{
        x:{ ticks:{ color:"#ccc", callback: val=>{
          const absVal=Math.abs(val);
          if(absVal>=1e9) return (absVal/1e9).toFixed(1)+"B";
          if(absVal>=1e6) return (absVal/1e6).toFixed(1)+"M";
          return absVal;
        }}},
        y:{ ticks:{ color:"#ccc" }}
      }
    }
  });
}

// 三省进出口柱状图 (step2)
function renderProvinceImportExportCharts() {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const provinces = ["Fujian","Jiangsu","Zhejiang"];
  const colors = { Fujian:"#6baed6", Jiangsu:"#9ecae1", Zhejiang:"#c6dbef" };
  const importURL = "https://raw.githubusercontent.com/cladyles/CASA0003_Groupwork/0d1747888ee320ffd7133255cdf32a7812e41e3c/data/Three%20provinces_Imports_2024.csv";
  const exportURL = "https://raw.githubusercontent.com/cladyles/CASA0003_Groupwork/0d1747888ee320ffd7133255cdf32a7812e41e3c/data/Three%20provinces_Emports_2024.csv";

  // 进口
  Papa.parse(importURL, {
    download: true, header: true,
    complete(results) {
      const importData = {};
      results.data.forEach(r => {
        if (!r.Province) return;
        importData[r.Province] = months.map(m => parseFloat(r[m])||0);
      });
      const ctx1 = document.getElementById('provinceImportChart').getContext('2d');
      new Chart(ctx1, {
        type: 'bar',
        data: { labels: months, datasets: provinces.map(p => ({
          label: p, data: importData[p], backgroundColor: colors[p]
        }))},
        options: {
          plugins:{ legend:{ labels:{ color:'#fff' }}},
          scales:{
            x:{ ticks:{ color:'#ccc' }},
            y:{ beginAtZero:true, ticks:{ color:'#ccc', callback: v=>v>=1e9?(v/1e9).toFixed(1)+"B":(v/1e6).toFixed(1)+"M" }}
          }
        }
      });
    }
  });

  // 出口
  Papa.parse(exportURL, {
    download: true, header: true,
    complete(results) {
      const exportData = {};
      results.data.forEach(r => {
        if (!r.Province) return;
        exportData[r.Province] = months.map(m => parseFloat(r[m])||0);
      });
      const ctx2 = document.getElementById('provinceExportChart').getContext('2d');
      new Chart(ctx2, {
        type: 'bar',
        data: { labels: months, datasets: provinces.map(p => ({
          label: p, data: exportData[p], backgroundColor: colors[p]
        }))},
        options: {
          plugins:{ legend:{ labels:{ color:'#fff' }}},
          scales:{
            x:{ ticks:{ color:'#ccc' }},
            y:{ beginAtZero:true, ticks:{ color:'#ccc', callback: v=>v>=1e9?(v/1e9).toFixed(1)+"B":(v/1e6).toFixed(1)+"M" }}
          }
        }
      });
    }
  });
}

// —— map.on('load')：画地图图层、弹窗、步骤
map.on('load', () => {
  // —— 省级填色 & 弹窗
  let importLookup = {};
  Papa.parse('https://raw.githubusercontent.com/cladyles/CASA0003_Groupwork/.../China%20Li-Ion%20Battery%20Commodity%20Imports%202024.csv', {
    download: true, header: true,
    complete(results) {
      const mths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      results.data.forEach(r => {
        const arr = mths.map(m => +r[m]);
        importLookup[r.Province] = { total:arr.reduce((a,b)=>a+b,0), monthly:arr };
      });

      map.querySourceFeatures('provinces').forEach(f => {
        map.setFeatureState({ source:'provinces', id:f.id }, { totalImport: importLookup[f.properties.name]?.total||0 });
      });

      map.addLayer({
        id:'province-fill', type:'fill', source:'provinces',
        paint:{
          'fill-color':['interpolate',['linear'],['feature-state','totalImport'],0,'#f2f0f7',500,'#cbc9e2',1000,'#9e9ac8',2000,'#6a51a3'],
          'fill-opacity':0.7
        },
        layout:{ visibility:'none' }
      }, '3d-buildings');

      map.on('click','province-fill', e => {
        const nm = e.features[0].properties.name;
        const data = importLookup[nm]?.monthly||[];
        new mapboxgl.Popup({ offset:[0,-10] })
          .setLngLat(e.lngLat)
          .setHTML(`<div style="width:260px;"><h4>${nm} 2024 Monthly Imports (GWh)</h4><canvas id="popChart"></canvas></div>`)
          .addTo(map);
        setTimeout(() => {
          new Chart(document.getElementById('popChart').getContext('2d'), {
            type:'bar',
            data:{ labels:mths, datasets:[{ label:nm, data:data, backgroundColor:'#61d4ea' }]},
            options:{ scales:{ y:{ beginAtZero:true }}, plugins:{ legend:{ display:false }}}
          });
        }, 0);
      });

      map.on('mouseenter','province-fill', () => map.getCanvas().style.cursor='pointer');
      map.on('mouseleave','province-fill', () => map.getCanvas().style.cursor='' );
    }
  });

  // —— 3D 建筑
  const layers = map.getStyle().layers; let labelLayer;
  for (let l of layers) {
    if (l.type==='symbol' && l.layout['text-field']) { labelLayer = l.id; break; }
  }
  map.addLayer({
    id:'3d-buildings', source:'composite','source-layer':'building',
    filter:['==','extrude','true'], type:'fill-extrusion', minzoom:15,
    paint:{
      'fill-extrusion-color':'#aaa',
      'fill-extrusion-height':['get','height'],
      'fill-extrusion-base':['get','min_height'],
      'fill-extrusion-opacity':0.6
    }
  }, labelLayer);

  // —— GeoJSON 源 & 图层
  const geojsons = {
    triangle: 'https://raw.githubusercontent.com/WYH-0324/CASA0003/.../lithium_triangle.geojson',
    provinces:'https://raw.githubusercontent.com/WYH-0324/CASA0003/.../china_provinces.geojson',
    brands:'https://raw.githubusercontent.com/WYH-0324/CASA0003/.../ChinaTop10_EV_Installment_Brand_sorted.geojson',
    quzhou:'https://raw.githubusercontent.com/WYH-0324/CASA0003/.../huayou_cobalt.geojson',
    btr:'https://raw.githubusercontent.com/WYH-0324/CASA0003/.../btr_changzhou.geojson',
    catl:'https://raw.githubusercontent.com/WYH-0324/CASA0003/.../catl_ningde.geojson',
    globalTop10:'https://raw.githubusercontent.com/WYH-0324/CASA0003/.../Top10_Global_ElectricVehicles_Enterprises.geojson'
  };
  for (let id in geojsons) {
    map.addSource(id, { type:'geojson', data:geojsons[id] });
    let cfg = { id, source:id, layout:{ visibility:'none' } };
    if (id==='triangle') {
      cfg.type='line';
      cfg.paint={'line-color':'#f5c142','line-width':3,'line-opacity':0.8};
    } else {
      cfg.type='circle';
      cfg.paint={
        'circle-radius': id==='globalTop10'?10:8,
        'circle-color': id==='brands'?'#ec6242': id==='globalTop10'?'#00c3ff':'#888',
        'circle-stroke-width': id==='globalTop10'?2:1,
        'circle-stroke-color': id==='globalTop10'?'#fff':'#000'
      };
    }
    map.addLayer(cfg);
  }

  // —— 航线
  map.addSource('flows',{ type:'geojson', data:{ type:'FeatureCollection', features:[] } });
  map.addLayer({
    id:'flows-layer', type:'line', source:'flows',
    layout:{ visibility:'none','line-cap':'round','line-join':'round' },
    paint:{ 'line-color':'#f5c142','line-width':['interpolate',['linear'],['get','volume'],0,1,25,8],'line-opacity':0.75 }
  });

  // —— globalTop10 弹窗
  map.on('click','globalTop10', e => {
    const p = e.features[0].properties;
    new mapboxgl.Popup({ offset:[0,-10] })
      .setLngLat(e.lngLat)
      .setHTML(`<strong>${p.rank}. ${p.name}</strong><br/>Stock: ${p.stock_price}<br/>Market Share: ${(p.market_share*100).toFixed(1)}%`)
      .addTo(map);
  });

  // —— 步骤定义
  const steps = [
    () => flyTo([-65.169034, -24.968367], 5.67, 40.65, ['triangle'], 0),
    () => flyTo([113.490773, 29.386171], 5.16, 9.97, ['brands'], 1),
    () => flyTo([119.678981, 28.908433], 7.06, 38.96, ['provinces','province-fill'], 2),
    () => flyTo([118.88, 28.97], 14, 60, ['quzhou'], 3),
    () => flyTo([119.61, 31.75], 14, 60, ['btr'], 4),
    () => flyTo([119.55, 26.65], 14, 60, ['catl'], 5),
    () => flyTo([0, 20], 1.5, 0, ['globalTop10','flows-layer'], 6)
  ];

  let current = 0;
  document.getElementById('nextBtn').onclick = () => { if (current < steps.length - 1) steps[++current](); };
  document.getElementById('prevBtn').onclick = () => { if (current > 0) steps[--current](); };
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') document.getElementById('nextBtn').click();
    if (e.key === 'ArrowLeft')  document.getElementById('prevBtn').click();
  });

  // —— 启动第一步
  steps[0]();
});  // ← 闭合 map.on('load')

// … 你前面所有的初始化、renderLineChart、renderDivergingChart、renderProvinceImportExportCharts、stepCharts 等都保持 “如前” …

// flyTo + 面板/可视化切换
function flyTo(center, zoom, pitch, visibleIds, stepIdx) {
  map.flyTo({ center, zoom, pitch, bearing: 0, essential: true });

  // —— 保证在这儿就更新标题和正文 —— 
  document.getElementById('infoTitle').textContent = stepInfo[stepIdx].title;
  document.getElementById('infoText').textContent  = stepInfo[stepIdx].text;
  document.getElementById('secondaryPanel').textContent = secondaryExplanations[stepIdx];
    const imageEl = document.getElementById('stepImage');
if (stepIdx === 6) {
  imageEl.src = "https://raw.githubusercontent.com/WYH-0324/CASA0003/10dd4617ad812edef2c00607acf2c4d0fa9fd64a/picture/Ningde%20Times.jpg";
  imageEl.style.display = 'block';
} else {
  imageEl.style.display = 'none';
}
  // ……下面继续你原来的 图层显隐／图表显示控制逻辑……
  map.setLayoutProperty('3d-buildings', 'visibility', stepIdx === 6 ? 'none' : 'visible');
  // … 省略若干图层开关 …
  
  const c  = document.getElementById('panelChart'),
        d  = document.getElementById('d3viz'),
        l  = document.getElementById('line-chart'),
        pi = document.getElementById('provinceImportChart'),
        pe = document.getElementById('provinceExportChart');

  if (stepIdx === 0) {
    // Step 0: 年度出口折线图
    c.style.display  = 'none';
    d.style.display  = 'none';
    l.style.display  = 'block';
    pi.style.display = 'none';
    pe.style.display = 'none';
    renderLineChart();

  } else if (stepIdx === 1) {
    // Step 1: 发散条形图 (中国进出口对比)
    c.style.display  = 'block';
    d.style.display  = 'none';
    l.style.display  = 'none';
    pi.style.display = 'none';
    pe.style.display = 'none';
    renderDivergingChart();

  } else if (stepIdx === 2) {
    // Step 2: 三省进出口柱状图
    c.style.display  = 'none';
    d.style.display  = 'none';
    l.style.display  = 'none';
    pi.style.display = 'block';
    pe.style.display = 'block';
    renderProvinceImportExportCharts();

  } else if (stepIdx === 6) {
    // Step 6: 无可视化
    c.style.display  = 'none';
    d.style.display  = 'none';
    l.style.display  = 'none';
    pi.style.display = 'none';
    pe.style.display = 'none';

  } else {
    // 其他步骤，使用 stepCharts 里预定义好的静态图
    c.style.display  = 'block';
    d.style.display  = 'none';
    l.style.display  = 'none';
    pi.style.display = 'none';
    pe.style.display = 'none';
    if (panelChart) panelChart.destroy();
    panelChart = new Chart(c.getContext('2d'), stepCharts[stepIdx]);
  }
} // ← 记得最后这一行要闭合 flyTo 函数

// 启动第一步
steps[0]();