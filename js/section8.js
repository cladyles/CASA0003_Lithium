const TARGET_COUNTRIES = [
  'China','USA','Germany','France','United Kingdom',
  'Norway','Netherlands','Sweden','Korea','Japan'
];
const lineColors = [
  '#ff0080','#00ffff','#ff00ff','#00ff80',
  '#ff8000','#8000ff','#ff0040','#40ff00',
  '#0080ff','#ffea00'
];

let rawData = [];
let combinedChart;

async function loadData() {
  const url = 'https://raw.githubusercontent.com/cladyles/CASA0003_Groupwork/main/data/ev_sales_2010_2024_top10_countries.csv';
  const text = await (await fetch(url)).text();
  rawData = d3.csvParse(text, d => ({
    year: +d.Year, country: d.Country, sales: +d.EV_Sales
  })).filter(d => TARGET_COUNTRIES.includes(d.country));
}

function processData(data) {
  const roll = d3.rollup(data, vs => d3.sum(vs,d=>d.sales), d=>d.country, d=>d.year);
  const years = Array.from(new Set(data.map(d=>d.year))).sort((a,b)=>a-b);
  const datasets = TARGET_COUNTRIES.map((c,i)=>({
    label:c,
    data:years.map(y=>roll.get(c)?.get(y)||0),
    borderColor:lineColors[i],
    backgroundColor:'transparent',
    tension:0.3,
    pointRadius:3,
    pointHoverRadius:5,
    borderWidth:2,
    borderJoinStyle:'round',
    borderCapStyle:'round'
  }));
  return { years, datasets };
}

function initChart(years,datasets){
  const ctx = document.getElementById('combinedChart').getContext('2d');
  combinedChart = new Chart(ctx,{
    type:'line',
    data:{ labels:years, datasets },
    options:{
      responsive:true,
      maintainAspectRatio:false,
      layout:{ padding:20 },
      scales:{
        x:{ grid:{ color:'rgba(255,0,255,0.1)' },
            ticks:{ color:'#0ff', font:{ family:'Orbitron' } },
            title:{ display:true, text:'Year', color:'#0ff', font:{ family:'Orbitron' } } },
        y:{ beginAtZero:true,
            grid:{ color:'rgba(0,255,255,0.1)' },
            ticks:{ color:'#0ff', font:{ family:'Orbitron' },
                    callback:v=>v>=1e6?(v/1e6)+'M':v },
            title:{ display:true, text:'EV Sales', color:'#0ff', font:{ family:'Orbitron' } } }
      },
      plugins:{
        legend:{ position:'bottom',
                 labels:{ color:'#fff', font:{ family:'Orbitron',size:12 },
                          boxWidth:20,usePointStyle:true,pointStyle:'rectRounded' } },
        tooltip:{ backgroundColor:'rgba(30,0,50,0.8)', titleColor:'#ff0', bodyColor:'#fff',
                  titleFont:{ family:'Orbitron' }, bodyFont:{ family:'Orbitron' } }
      },
      interaction:{ mode:'nearest', axis:'x', intersect:false }
    }
  });
}

function render(subset){
  const { years,datasets } = processData(subset);
  if(!combinedChart) initChart(years,datasets);
  else {
    combinedChart.data.labels=years;
    combinedChart.data.datasets=datasets;
    combinedChart.update();
  }
}

function setupControls(){
  document.querySelectorAll('#controls button').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('#controls button').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const [s,e]=btn.dataset.range.split('-').map(Number);
      render(rawData.filter(d=>d.year>=s&&d.year<=e));
    });
  });
}

function setupFlip(){
  const card=document.querySelector('.flip-card');
  document.getElementById('readMore').onclick=()=>card.classList.add('flipped');
  document.getElementById('goBack').onclick=()=>card.classList.remove('flipped');
}

(async function(){
  await loadData();
  render(rawData);
  setupControls();
  setupFlip();
})();