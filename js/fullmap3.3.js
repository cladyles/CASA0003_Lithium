// main.js
// — Mapbox initialization
mapboxgl.accessToken = 'pk.eyJ1IjoieXVoYW53YW5nIiwiYSI6ImNtYTk3a3l3eDFjNzYya3F1cjI4OTFpZ2EifQ.cg-Y0F7OyaTc_gHfyHDKVQ';

// ── Global battery enterprise data ──
const data = [
  { company: "CATL",     EV_2023: 308, ESS_2023:  74, TTL_2023: 382, EV_2024: 491, ESS_2024: 110, TTL_2024: 601, YoY:  57 },
  { company: "BYD",      EV_2023: 135, ESS_2023:  22, TTL_2023: 157, EV_2024: 192, ESS_2024:  27, TTL_2024: 219, YoY:  39 },
  { company: "LGES",     EV_2023: 129, ESS_2023:   8, TTL_2023: 137, EV_2024: 120, ESS_2024:   8, TTL_2024: 128, YoY:  -7 },
  { company: "CALB",     EV_2023:  34, ESS_2023:   8, TTL_2023:  42, EV_2024:  64, ESS_2024:  20, TTL_2024:  84, YoY: 100 },
  { company: "EVE",      EV_2023:  21, ESS_2023:  21, TTL_2023:  42, EV_2024:  28, ESS_2024:  40, TTL_2024:  68, YoY:  62 },
  { company: "Gotion",   EV_2023:  25, ESS_2023:   6, TTL_2023:  31, EV_2024:  50, ESS_2024:  18, TTL_2024:  68, YoY: 119 },
  { company: "Panasonic",EV_2023:  41, ESS_2023:   0, TTL_2023:  41, EV_2024:  40, ESS_2024:   2, TTL_2024:  42, YoY:   2 },
  { company: "SDI",      EV_2023:  49, ESS_2023:   9, TTL_2023:  58, EV_2024:  38, ESS_2024:  10, TTL_2024:  48, YoY: -17 },
  { company: "SK on",    EV_2023:  57, ESS_2023:   0, TTL_2023:  57, EV_2024:  31, ESS_2024:   0, TTL_2024:  31, YoY: -46 },
  { company: "Sunwoda",  EV_2023:  14, ESS_2023:   1, TTL_2023:  15, EV_2024:  21, ESS_2024:   1, TTL_2024:  22, YoY:  47 },
  { company: "Others",   EV_2023:  52, ESS_2023:  36, TTL_2023:  88, EV_2024:  82, ESS_2024:  67, TTL_2024: 149, YoY:  69 }
];

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/yuhanwang/cmacfut5t00ms01sdhfr96quz',
  center: [-67.5, -23],
  zoom: 5.5,
  pitch: 60,
  bearing: 20,
  antialias: true
});

// Glowing button click animation
document.querySelectorAll('.glow-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('active')) return;
    btn.classList.add('active');
    setTimeout(() => btn.classList.remove('active'), 2000);
  });
});

// —— STEP information
const stepInfo = [
  { title:'Lithium Triangle', text:`According to the 2021 USGS Mineral Commodity Summary, the Lithium Triangle holds about 58% of global lithium resources. Among the world's 86 - million - ton proven lithium reserves, Bolivia has 21 million tons, Argentina has 19.3 million tons, and Chile has 9.6 million tons.` },
  { title:'China Overview', text:`China serves as a pivotal link in the global lithium-battery supply chain: on one hand, it imports raw ore from the world’s leading lithium-producing countries; on the other, it conducts advanced chemical processing and battery manufacturing domestically, and ultimately exports battery cells and complete vehicles to developed markets such as Europe and North America.` },
  { title:'Three provinces', text:`Among all provinces, Zhejiang, Jiangsu, and Fujian have emerged as key players, each occupying a distinct role in the lithium supply chain—from raw material import and refining to battery cell manufacturing and export.` },
  { title:'Zhejiang province(QZ)', text:`Quzhou (Zhejiang) is primarily responsible for raw material importation and refining processes. Below is a “Leaching Rate Simulation” dashboard interface.`},
  { title:'Jiangsu province(CZ)', text:`Changzhou in Jiangsu Province is a key hub for producing cathode materials, a critical component of lithium-ion batteries. A pie chart shows cathode materials comprise the largest share of the city’s lithium-related output, followed by cobalt compounds and lithium salts.` },
  { title:'Fujian province(ND)', text:`Ningde City, Fujian Province, holds a dominant position in the downstream links of lithium batteries.` },
  { title:'Global Overview', text:`Ultimately, the products processed in China are exported to developed countries. ` }
];

const secondaryExplanations = [
  "Lithium Triangle: Global Production Capacity Center.",
  "China Overview: Regional clustering in coastal provinces.",
  "Three provinces: Zhejiang, Jiangsu, and Fujian.",
  "Zhejiang: Raw material import and refining hub.",
  "Jiangsu: Cathode material production center.",
  "Fujian: Battery cell manufacturing and exports.",
  "Global Overview:Top 10 High-Tech Automotive Companies."
];


// —— Extraction Viz initialization (only once)
// main.js


let extractionInitialized = false;
function initExtractionViz() {
  if (extractionInitialized) return;
  extractionInitialized = true;

  const container = document.getElementById('extractionViz');
  container.innerHTML = `
    <section class="leach-sim">
      <h2>Leaching Rate Simulation</h2>
      <label>Acid concentration (%):
        <input id="acid"   type="range" min="5"  max="30" value="10" />
      </label>
      <label>Temperature (℃):
        <input id="temp"   type="range" min="140" max="220" value="180" />
      </label>
      <label>Time (hours):
        <input id="time"   type="range" min="6"  max="14" value="8" />
      </label>
      <label>Liquid–solid ratio:
        <input id="ratio"  type="range" min="1"  max="4"  step="0.1" value="2.5" />
      </label>
      <p class="rate-line">
        Estimated Leaching Rate: <span id="rate">--</span>%
      </p>
    </section>

    <section class="leach-radar">
      <h2>Leaching Method Comparison</h2>
      <canvas id="radarChart"></canvas>
      <p class="copyright">© 2025 Lithium Visual Labs</p>
    </section>
  `;

  // 1) Leaching rate calculation
  function updateLeachingRate() {
    const acid  = +document.getElementById('acid').value;
    const temp  = +document.getElementById('temp').value;
    const time  = +document.getElementById('time').value;
    const ratio = +document.getElementById('ratio').value;
    // Your new model, with a maximum not exceeding 99.64
    const rate = Math.min(99.64,
      70 + acid * 0.5 + (ratio - 1) * 10 - Math.abs(temp - 180) * 0.2
    );
    document.getElementById('rate').textContent = rate.toFixed(2);
  }
  ['acid','temp','time','ratio'].forEach(id =>
    document.getElementById(id).addEventListener('input', updateLeachingRate)
  );
  updateLeachingRate();

  // 2) Radar chart with 3 datasets
  const ctx = document.getElementById('radarChart').getContext('2d');
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Efficiency','Energy Use','Time','Temp Sensitivity','Control'],
      datasets: [
        {
          label: 'Hydrochloric Acid',
          data: [90, 70, 80, 85, 90],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor:     'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Ammonium Chloride',
          data: [95, 75, 85, 80, 85],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor:     'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Alkali Roasting',
          data: [93, 60, 75, 75, 95],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor:     'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: { color: '#fff', boxWidth:16, boxHeight:8, font:{ size:12 } }
        }
      },
      scales: {
        r: {
          pointLabels: { color: '#fff', font:{ size:12 } },
          grid:        { color: '#444' },
          angleLines:  { color: '#444' },
          ticks:       { color: '#fff' }
        }
      }
    }
  });
}

// —— Plotly Line Chart: Annual Export Value (Top Five Trading Partners)
// —— Visualization function ——
// Plotly Line Chart (step0)
d3.csv('https://raw.githubusercontent.com/cladyles/CASA0003_Groupwork/main/data/Lithium_Trade_Value_2007-2024.csv')
  .then(data => {
    // 1) Data processing
    const exportsOnly = data.filter(d =>
      d.flowDesc === 'Export' &&
      +d.refYear <= 2023
    );
    const nested = {};
    exportsOnly.forEach(d => {
      const y = +d.refYear, p = d.reporterDesc, v = +d['primaryValue(USD)'];
      nested[p] = nested[p] || {};
      nested[p][y] = (nested[p][y] || 0) + v;
    });
    const years = Array.from(new Set(exportsOnly.map(d => +d.refYear)))
      .filter(y => y <= 2023)
      .sort((a, b) => a - b);
    const top5 = Object.entries(nested)
      .map(([p, vals]) => ({ p, total: years.reduce((s,y)=>s+(vals[y]||0),0) }))
      .sort((a,b)=>b.total-a.total)
      .slice(0,5)
      .map(x=>x.p);
    // New color scheme
const palette = [
  '#4b89bf', // blue
  '#a3bfd9', // light blue
  '#fee39b', // cream-colored; beige
  '#f28157', // Coral Orange
  '#d73027'  // deep red
];
    lineTraces = top5.map((p,i)=>({
      x: years,
      y: years.map(y=>nested[p][y]||0),
      mode: 'lines+markers',
      name: p,
      line: { color: palette[i], width: 2 },
      marker: { size: 6, color: palette[i] }
    }));

    // 2) Layout configuration
// 2) Layout configuration
lineLayout = {
  title: {
    text: 'Annual Export Value by Top 5 Partners (07–23)',
    font: {
      size: 14,
      color: '#eee'
    },
    x: 0.5,
    xanchor: 'center'
  },
  paper_bgcolor: '#111',      // Overall background
  plot_bgcolor: '#111',       // The background of the drawing area
  hovermode: 'x unified',
  font: { color: '#eee' },

  xaxis: {
    title: {                 // X-axis title
      text: '',
      font: { color: '#ccc' }
    },
    showline: true,          // Display axes
    linecolor: '#555',       // Axis color
    tickfont: { color: '#ccc' },  // Scale color
    color: '#ccc',           // Spindle label color
    automargin: true         // Automatically extrude margins
  },

  yaxis: {
    title: {
      text: 'Value (USD)',
      font: { color: '#ccc' }
    },
    showline: true,
    linecolor: '#555',
    tickfont: { color: '#ccc' },
    color: '#ccc',
    automargin: true
  },

  legend: {
    orientation: 'h',
    x: 0.5,
    xanchor: 'center',
    y: -0.2,                 // Move the legend down a little more.
    yanchor: 'top',
    font: { size: 10 }
  },

  margin: {
    t: 40,                   // Leave blank at the top
    b: 120,                  // Leave blank space at the bottom to ensure there is space below both Year + the legend.
    l: 80,                   // Leave blank on the left side and widen the Y-axis title.
    r: 20                    // Leave blank on the right side
  }
};

    // 3) After the data is prepared, automatically render the line chart in the first step.
    renderLineChart();
    // （If you want to trigger the map to fly to step 0 at the same time, you can uncomment the following line.）
    // if (typeof steps !== 'undefined') steps[0]();
  })
  .catch(err => console.error('Failed to load trade data:', err));

// —— Draw a Plotly line chart (call only when the container is visible)——
function renderLineChart() {
  const gd = document.getElementById('line-chart');
  gd.style.width  = '100%';
  gd.style.height = '300px';
  Plotly.newPlot(gd, lineTraces, lineLayout, {
    displayModeBar: false,
    responsive: true,
    useResizeHandler: true
  }).then(() => {
    // Force a resize to ensure correct rendering after hiding/showing switching.
    Plotly.Plots.resize(gd);
  });
}


// —— Chart.js Configuration (except steps 0, 2, and 9)
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



// Diverging bar chart (step1)
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

// Bar Chart of Import and Export in Three Provinces (step2)
function renderProvinceImportExportCharts() {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const provinces = ["Fujian","Jiangsu","Zhejiang"];
  const colors = { Fujian:"#6baed6", Jiangsu:"#9ecae1", Zhejiang:"#c6dbef" };
  const importURL = "https://raw.githubusercontent.com/cladyles/CASA0003_Groupwork/0d1747888ee320ffd7133255cdf32a7812e41e3c/data/Three%20provinces_Imports_2024.csv";
  const exportURL = "https://raw.githubusercontent.com/cladyles/CASA0003_Groupwork/0d1747888ee320ffd7133255cdf32a7812e41e3c/data/Three%20provinces_Emports_2024.csv";

  // import
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

  // export
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

// ▶ 1) Add the initialization of Changzhou Viz after this.
let changzhouInitialized = false;
function initChangzhouViz() {
  if (changzhouInitialized) return;
  changzhouInitialized = true;

  const container = document.getElementById('changzhouViz');
  container.innerHTML = `
    <div id="cz-sunburst" style="width:100%;height:300px;"></div>

    <!-- Legend -->
    <div class="cz-legend" style="
      display:flex;
      justify-content:center;
      gap:16px;
      margin-top:8px;
      font-family: 'Space Mono', monospace;
      color:#eee;
      font-size:0.9rem;
    ">
      <div style="display:flex;align-items:center;gap:4px">
        <span style="display:inline-block;width:12px;height:12px;background:#90c95c;border-radius:2px"></span>
        Cathode
      </div>
      <div style="display:flex;align-items:center;gap:4px">
        <span style="display:inline-block;width:12px;height:12px;background:#63a454;border-radius:2px"></span>
        Cobalt
      </div>
      <div style="display:flex;align-items:center;gap:4px">
        <span style="display:inline-block;width:12px;height:12px;background:#285f4d;border-radius:2px"></span>
        Lithium Salt
      </div>
    </div>
  `;

  // Sunburst — Proportion of Cathode/Cobalt/Lithium Salt
  Plotly.newPlot('cz-sunburst', [{
    type: 'sunburst',
    labels:  ['Total','Cathode','Cobalt','Lithium Salt'],
    parents: ['','','Total','Total'],
    values:  [100,45,30,25],
    marker:  { colors:['#444','#90c95c','#63a454','#285f4d'] },
    branchvalues: 'total',
    insidetextorientation: 'radial'
  }], {
    paper_bgcolor:'#111',
    plot_bgcolor:'#111',
    margin:{l:0,r:0,b:0,t:30},
    title:{ text:'Production Breakdown（CZ)', font:{ color:'#eee' } },
    font:{ color:'#eee' }
  }, {
    displayModeBar:false,
    responsive:true
  });
}
    
// ——— Global: Initialization of Sankey Diagram in Ningde (Fujian) ———
let fujianInitialized = false;
function initFujianViz() {
  if (fujianInitialized) return;
  fujianInitialized = true;

  const container = document.getElementById('fujianViz');
  container.innerHTML = `
    <div style="text-align:center; margin-bottom:8px;">
      <label style="color:#fff; font-family:'Space Mono', monospace;">
        Year:
        <select id="fujianYear" style="
          background:#000;
          color:#fff;
          border:1px solid #444;
          padding:2px 6px;
          font-family:'Space Mono', monospace;
        ">
          <option value="2023">2023</option>
          <option value="2024" selected>2024</option>
        </select>
      </label>
    </div>
    <div id="fujian-sankey" style="width:100%; height:400px;"></div>
  `;

  // ----- Color scheme, label, link generator -----
  const labels = [
    'CATL','BYD','LGES','CALB','EVE','Gotion','Panasonic','SDI','SK on','Sunwoda','Others',
    'EV','ESS',
    'North America','Europe','Asia','Other'
  ];
  const companyColors = [
    '#636EFA','#EF553B','#00CC96','#AB63FA','#FFA15A',
    '#19D3F3','#FF6692','#B6E880','#FF97FF','#FECB52','#7F7F7F'
  ];
  const evEssColors  = ['#F5A623','#50E3C2'];
  const regionColors = ['#4A90E2','#9013FE','#D0021B','#F8E71C'];
  const nodeColors = [...companyColors, ...evEssColors, ...regionColors];

  function makeLink(year) {
    const source = [], target = [], value = [];
    const EV_idx      = labels.indexOf('EV');
    const ESS_idx     = labels.indexOf('ESS');
    const regionStart = labels.indexOf('North America');

    data.forEach((d,i) => {
      source.push(i);      target.push(EV_idx);  value.push(d[`EV_${year}`]);
      source.push(i);      target.push(ESS_idx); value.push(d[`ESS_${year}`]);
    });

    // EV/ESS is allocated to each major region
    const evTotal  = data.reduce((s,d) => s + d[`EV_${year}`], 0);
    const essTotal = data.reduce((s,d) => s + d[`ESS_${year}`], 0);
    const frac     = [0.6,0.3,0.08,0.02];
    frac.forEach((f,i) => {
      source.push(EV_idx);  target.push(regionStart + i); value.push(Math.round(evTotal * f));
      source.push(ESS_idx); target.push(regionStart + i); value.push(Math.round(essTotal * f));
    });

    return { source, target, value };
  }

  function drawSankey(year) {
    const link = makeLink(year);
    // All streams use dark gray with 60% transparency
    const greyFlows = link.source.map(()=>'rgba(169,169,169,0.6)');

    Plotly.newPlot('fujian-sankey', [{
      type: 'sankey',
      arrangement: 'snap',
      node: {
        label: labels,
        color: nodeColors,
        line:  { color: 'white', width: 1 },
        pad:       15,
        thickness: 20
      },
      link: {
        source: link.source,
        target: link.target,
        value:  link.value,
        color:  greyFlows,
        line:   { color: '#333', width: 0.5 }
      }
    }], {
      title: {
        text: `CATL & Peers: ${year} Battery Flow Simulation`,
        font: { color: 'white', size: 11 }
      },
      paper_bgcolor: 'black',
      plot_bgcolor:  'black',
      font: { color:'white', family:'Space Mono, monospace' },
      margin: { t:80, b:50, l:50, r:50 }
    }, {
      displayModeBar: false,
      responsive: true
    });
  }

  // Initial drawing + listen to the dropdown
  drawSankey('2024');
  document.getElementById('fujianYear')
    .addEventListener('change', e => drawSankey(e.target.value));
}

// —— Step 6: Global EV Interactive Chart —— 
let globalVizInitialized = false;
function initGlobalViz() {
  if (globalVizInitialized) return;
  globalVizInitialized = true;

  // 1. Insert into the container
  const container = document.getElementById('globalViz');
  container.innerHTML = `<div id="globalChart" style="width:100%;height:800px;"></div>`;

  // 2. original data
  const globalData = [
    { rank:1, company:"BYD",   hq:"CHINA",             capacity:4.0, share:0.22, price:35.09 },
    { rank:2, company:"Tesla", hq:"USA",               capacity:3.8, share:0.21, price:175.20 },
    { rank:3, company:"SAIC",  hq:"CHINA",             capacity:1.8, share:0.10, price:2.33  },
    { rank:4, company:"Volkswagen", hq:"GERMANY",      capacity:1.5, share:0.08, price:135.80},
    { rank:5, company:"Geely", hq:"CHINA",             capacity:1.2, share:0.07, price:1.41  },
    { rank:6, company:"Hyundai-Kia", hq:"SOUTH KOREA",capacity:1.1, share:0.06, price:42.30 },
    { rank:7, company:"Stellantis",  hq:"NETHERLANDS",capacity:0.9, share:0.05, price:21.75 },
    { rank:8, company:"GAC",   hq:"CHINA",             capacity:0.8, share:0.04, price:1.72  },
    { rank:9, company:"Renault-Nissan-Mitsubishi Alliance", hq:"JAPAN/FRANCE", capacity:0.7, share:0.04, price:7.20 },
    { rank:10,company:"Great Wall", hq:"CHINA",         capacity:0.6, share:0.03, price:3.55  }
  ];

  // 3. Group by "Headquarters Location"
  const categories = Array.from(new Set(globalData.map(d => d.hq)));

  // 4. Generate a trace for each headquarters.
  const traces = categories.map(hq => {
    const pts = globalData.filter(d => d.hq === hq);
    return {
      name: hq,
      x: pts.map(d => d.capacity),
      y: pts.map(d => d.share),
      text: pts.map(d => d.company),
      mode: 'markers+text',
      textposition: 'top center',
      hovertemplate:
        '%{text}<br>' +
        'Capacity: %{x} M<br>' +
        'Share: %{y}<br>' +
        'Price: $%{customdata:.2f}<extra></extra>',
      customdata: pts.map(d => d.price),
      marker: {
        size: pts.map(d => d.capacity * 50),
        sizemode: 'area',
        sizeref: 2
      }
    };
  });

  // 5. Construct a drop - down button (All + each category)
  const allVisible = categories.map(() => true);
  const buttons = [
    {
      label: 'All',
      method: 'update',
      args: [
        { visible: allVisible },
        { title: 'EV Analysis: Filter = All' }
      ]
    },
    ...categories.map((hq, i) => ({
      label: hq,
      method: 'update',
      args: [
        { visible: categories.map((_, j) => j === i) },
        { title: `EV Analysis: Filter = ${hq}` }
      ]
    }))
  ];

  // 6. Layout: Title, Drop - down Menu, Coordinate Axis, Color Scheme
  const layout = {
    title: {
      text: 'EV Analysis: Filter = All',
      font: { family: 'Space Mono, monospace', size: 15 },
      x: 0.5, xanchor: 'center'
    },
    updatemenus: [{
  buttons,
  x: 0.10,
  xanchor: 'left',
  y: 1.25,
  direction: 'down',
  showactive: true
}],
xaxis: {
  title: {
    text: '2024 Annual Capacity (Mil)',
    font: { color: '#50E3C2', family: 'Space Mono, monospace' },
    standoff: 20,        // The distance between the title and the axis
    align: 'center'      // Center the title
  },
  automargin: true,      // Automatically leave some space on both sides
  gridcolor: '#444',
  zerolinecolor: '#666',
  tickcolor: '#50E3C2'
},
    yaxis: {
      title: 'Market Share',
      gridcolor: '#444',
      zerolinecolor: '#666',
      tickcolor: '#50E3C2'
    },
    plot_bgcolor: 'black',
    paper_bgcolor: 'black',
    font: { color: '#50E3C2', family: 'Space Mono, monospace' }
  };

  // 7. render
  Plotly.newPlot('globalChart', traces, layout, {
    responsive: true,
    displayModeBar: false
  });
}


// —— map.on('load')：Draw map layers, pop-ups, steps
map.on('load', () => {
  // —— Provincial coloring & pop-up window
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

  
  // —— 3D architecture
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

  // —— GeoJSON Source & Layers
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

  // —— flight route
  map.addSource('flows',{ type:'geojson', data:{ type:'FeatureCollection', features:[] } });
  map.addLayer({
    id:'flows-layer', type:'line', source:'flows',
    layout:{ visibility:'none','line-cap':'round','line-join':'round' },
    paint:{ 'line-color':'#f5c142','line-width':['interpolate',['linear'],['get','volume'],0,1,25,8],'line-opacity':0.75 }
  });

  // —— globalTop10 pop-up window
  map.on('click','globalTop10', e => {
    const p = e.features[0].properties;
    new mapboxgl.Popup({ offset:[0,-10] })
      .setLngLat(e.lngLat)
      .setHTML(`<strong>${p.rank}. ${p.name}</strong><br/>Stock: ${p.stock_price}<br/>Market Share: ${(p.market_share*100).toFixed(1)}%`)
      .addTo(map);
  });

  
  // —— Step definition
  const steps = [
    // 0: Lithium Triangle
    () => flyTo([-65.169034, -24.968367], 5.67, 40.65, ['triangle'], 0),
    // 1: Top10 EV brands(China)
    () => flyTo([116.942744, 27.394136], 5.45, 54.668, ['brands'], 1),
    // 2: China Overview / provinces
    () => flyTo([119.678981, 28.908433], 7.06, 38.96, ['provinces','province-fill'], 2),
    // 3: Zhejiang (Quzhou)
    () => flyTo([118.875333, 28.973451], 17.66, 61.39, ['quzhou'], 3),
    // 4: Changzhou
    () => flyTo([119.611427, 31.752335], 17.61, 60.17, ['btr'], 4),
    // 5: Ningde (Fujian)
    () => flyTo([119.540352, 26.655080], 13.71, 60, ['catl'], 5),
    // 6: Global EV interactive
    () => flyTo([0, 20], 1.5, 0, ['globalTop10','flows-layer'], 6)
  ];

  let current = 0;
  document.getElementById('nextBtn').onclick = () => {
    if (current < steps.length - 1) steps[++current]();
  };
  document.getElementById('prevBtn').onclick = () => {
    if (current > 0) steps[--current]();
  };
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') document.getElementById('nextBtn').click();
    if (e.key === 'ArrowLeft')  document.getElementById('prevBtn').click();
  });

  // Start the first step
  steps[0]();
});

// —— flyTo + Panel/Visualization Switch
function flyTo(center, zoom, pitch, visibleIds, stepIdx) {
  // Map Flight
  map.flyTo({ center, zoom, pitch, bearing: 0, essential: true });

  // Update the information panel
  document.getElementById('infoTitle').textContent      = stepInfo[stepIdx].title;
  document.getElementById('infoText').textContent       = stepInfo[stepIdx].text;
  document.getElementById('secondaryPanel').textContent = secondaryExplanations[stepIdx];

  // Hide all visual containers
  [
    'line-chart','panelChart','provinceImportChart','provinceExportChart',
    'extractionViz','changzhouViz','fujianViz','globalViz'
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  // Display the corresponding visualization according to stepIdx
  switch(stepIdx) {
    case 0:
      document.getElementById('line-chart').style.display = 'block';
      renderLineChart();
      break;
    case 1:
      document.getElementById('panelChart').style.display = 'block';
      renderDivergingChart();
      break;
    case 2:
      document.getElementById('provinceImportChart').style.display = 'block';
      document.getElementById('provinceExportChart').style.display = 'block';
      renderProvinceImportExportCharts();
      break;
    case 3:
      document.getElementById('extractionViz').style.display = 'block';
      initExtractionViz();
      break;
    case 4:
      document.getElementById('changzhouViz').style.display = 'block';
      initChangzhouViz();
      break;
    case 5:
      document.getElementById('fujianViz').style.display = 'block';
      initFujianViz();
      break;
    case 6:
      document.getElementById('globalViz').style.display = 'block';
      initGlobalViz();
      break;
  }
}