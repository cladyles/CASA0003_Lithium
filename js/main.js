// 初始化 Mapbox Token
mapboxgl.accessToken =
  'pk.eyJ1IjoieGltZW5nMDExNiIsImEiOiJjbTdhZGNwbzMwMzd1MmtzOG9ua2J0Znk0In0.vuk8t1UfOhoH46nE0AL2WQ';

const nav = document.getElementById('globalNav');

// PPT动画滚动设置
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });

  if (id === 'section1') {
    setTimeout(() => {
      if (typeof window.runIntro === 'function') {
        window.runIntro();
      }
    }, 800);
  }
}

//第一页
// 回到首页重播动画
let hasRunFirstIntro = false;
// 页面加载时记录首次动画已播放（与你 Intro.js 中同步）
document.addEventListener('DOMContentLoaded', () => {
  hasRunFirstIntro = true;
});

// 创建一个新的 IntersectionObserver 监听 section1 是否回到视口中
const introObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && hasRunFirstIntro) {
        // 回到第一页后触发重播
        window.runIntro?.();
      }
    });
  },
  {
    threshold: 0.8, // 当 section1 有 80% 出现在视口时才触发
  }
);

// 启动观察器（绑定第一页）
const section1 = document.getElementById('section1');
if (section1) introObserver.observe(section1);

// 全部 data-target 点击（包括导航 & 页脚）
document.querySelectorAll('[data-target]').forEach(el => {
  el.addEventListener('click', () => {
    scrollToSection(el.dataset.target);
  });
});

//标题栏section7和9时隐藏
const navBrand = document.querySelector('.nav-brand');

const brandObserver = new IntersectionObserver(entries => {
  let hide = false;

  entries.forEach(entry => {
    if (entry.isIntersecting) hide = true;
  });

  if (hide) {
    navBrand.classList.add('transparent');
  } else {
    navBrand.classList.remove('transparent');
  }
}, { threshold: 0.5 }); // 50% 进入视口时触发

['section7', 'section9'].forEach(id => {
  const sec = document.getElementById(id);
  if (sec) brandObserver.observe(sec);
});


//根据各自负责页面写入自定义效果，注意先检查是否与第一部分的公共函数重复或冲突
//第二页
/***** Section-2 卡片交互 *****/
const rqEl          = document.querySelector('#section2 .rq');
const defaultRqText = rqEl ? rqEl.textContent : '';

/* —— 切换 RQ 文本 —— */
function setRQ(text){
  if(!rqEl) return;
  rqEl.textContent = text;
}

document.querySelectorAll('#section2 .grid-item').forEach(item => {

  /* 悬停：显示该卡片的 research question */
  item.addEventListener('mouseenter', ()=>{
    setRQ(item.dataset.question || defaultRqText);
  });

  /* 移出：恢复默认文本 */
  item.addEventListener('mouseleave', ()=>{
    setRQ(defaultRqText);
  });

  /* 点击：平滑滚动到目标 section */
  item.addEventListener('click', ()=>{
    scrollToSection(item.dataset.target);
  });
});

//第三页
//点击 .readmore-btn，把 .hero-text 中原有标题/副标题/描述/按钮淡出，
document.addEventListener('DOMContentLoaded', () => {
  const readMoreBtn = document.querySelector('.readmore-btn');
  const heroText   = document.querySelector('.hero-text');
  if (readMoreBtn && heroText) {
    readMoreBtn.addEventListener('click', () => {
      const isShort = heroText.classList.toggle('show-short');
      readMoreBtn.textContent = isShort ? 'Back' : 'Read More';
    });
  }
});
//第四页
//第五页
//第六页
  document.addEventListener('DOMContentLoaded', () => {
  const view1    = document.getElementById('view1');
  const view2    = document.getElementById('view2');
  const view1Btn = document.querySelector('.view-btn[data-view="1"]');
  const view2Btn = document.querySelector('.view-btn[data-view="2"]');
  const graphDesc = document.querySelector('.graph-description');
  let current = '1';

  function switchTo(v) {
    view1.style.display = (v === '1') ? 'block' : 'none';
    view2.style.display = (v === '2') ? 'block' : 'none';

    document.querySelector('.view-btn.active').classList.remove('active');
    document.querySelector(`.view-btn[data-view="${v}"]`).classList.add('active');

    current = v;

    if (graphDesc) {
      if (v === '1') {
        graphDesc.innerHTML = `
          Today’s lithium‐ion cells consist of two electrodes: </br> a cathode and an anode. </br>
          </br>
          The cathode is the most complex component, with its mix of lithium, cobalt, manganese, iron, and other minerals determining overall performance. </br>
          </br>In a single EV battery cell, the cathode (positive) and anode (negative) are separated by a porous membrane and immersed in an electrolyte through which lithium ions migrate. During discharge, lithium ions flow from cathode to anode to produce electrical power; charging reverses this reaction, driving ions back to the cathode for storage.
        `;
      } else if (v === '2') {
        graphDesc.innerHTML = `
          Lithium-ion batteries lie at the core of the electric vehicle revolution. </br>
          </br>
          As the primary energy storage technology, they enable clean, efficient, and high-performance transportation. </br>
          From powering compact city cars to long-range electric trucks, lithium batteries are transforming how the world moves.
        `;
      }
    }
  }

  // 按钮绑定
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTo(btn.dataset.view));
  });

  // 左右箭头绑定
  document.querySelectorAll('.nav-arrow').forEach(arrow => {
    arrow.addEventListener('click', () => {
      const dir  = arrow.dataset.direction;
      const next = dir === 'next' ? (current === '1' ? '2' : '1') : (current === '2' ? '1' : '2');
      switchTo(next);
    });
  });

  // 绑定热点面板显示
  const bindPanels = container => {
    container.querySelectorAll('.ev-hotspot').forEach(hs => {
      hs.addEventListener('click', () => {
        const panel = document.getElementById('panel-' + hs.dataset.key);
        if (panel) panel.style.display = 'block';
      });
    });

    container.querySelectorAll('.info-panel .close-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        btn.closest('.info-panel').style.display = 'none';
      });
    });
  };

  bindPanels(view1);
  bindPanels(view2);

  // ✅ 默认显示初始内容
  switchTo('1');
});

//第七页 
//第八页
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