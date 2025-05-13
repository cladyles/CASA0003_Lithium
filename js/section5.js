// 1. 原始数据（完整展开）
const raw = [
  { source: 'Australia', target: 'China', value: 1316630 },
  { source: 'Australia', target: 'Korea', value: 936554 },
  { source: 'Brazil',    target: 'China', value: 6221550 },
  { source: 'Canada',    target: 'USA', value: 5 },
  { source: 'Chile',     target: 'Argentina', value: 59000 },
  { source: 'Chile',     target: 'Australia', value: 20000 },
  { source: 'Chile',     target: 'Belgium', value: 2744900 },
  { source: 'Chile',     target: 'Bolivia', value: 218.125 },
  { source: 'Chile',     target: 'Brazil', value: 204000 },
  { source: 'Chile',     target: 'Colombia', value: 8000 },
  { source: 'Chile',     target: 'Indonesia', value: 20000 },
  { source: 'Chile',     target: 'Japan', value: 1730380 },
  { source: 'Chile',     target: 'Korea', value: 14267700 },
  { source: 'Chile',     target: 'Mexico', value: 60000 },
  { source: 'Chile',     target: 'Peru', value: 5080.208 },
  { source: 'Chile',     target: 'Poland', value: 774172 },
  { source: 'Chile',     target: 'India', value: 440000 },
  { source: 'Chile',     target: 'South Africa', value: 75000 },
  { source: 'Chile',     target: 'Thailand', value: 40000 },
  { source: 'Chile',     target: 'USA', value: 676924 },
  { source: 'Portugal',  target: 'Spain', value: 363 },
  { source: 'Zimbabwe',  target: 'South Africa', value: 100 },
  { source: 'USA',       target: 'Argentina', value: 199640 },
  { source: 'USA',       target: 'Australia', value: 15 },
  { source: 'USA',       target: 'Belgium', value: 37474 },
  { source: 'USA',       target: 'Brazil', value: 93 },
  { source: 'USA',       target: 'Canada', value: 137596 },
  { source: 'USA',       target: 'Chile', value: 1 },
  { source: 'USA',       target: 'China', value: 1038204 },
  { source: 'USA',       target: 'Colombia', value: 16000 },
  { source: 'USA',       target: 'Costa Rica', value: 700 },
  { source: 'USA',       target: 'Ecuador', value: 400 },
  { source: 'USA',       target: 'France', value: 13059 },
  { source: 'USA',       target: 'Germany', value: 456266 },
  { source: 'USA',       target: 'Guatemala', value: 600 },
  { source: 'USA',       target: 'Guyana', value: 126 },
  { source: 'USA',       target: 'Israel', value: 150 },
  { source: 'USA',       target: 'Italy', value: 8160 },
  { source: 'USA',       target: 'Japan', value: 3789790 },
  { source: 'USA',       target: 'Rep. of Korea', value: 2102970 },
  { source: 'USA',       target: 'Mexico', value: 10293 },
  { source: 'USA',       target: 'Netherlands', value: 157702 },
  { source: 'USA',       target: 'Peru', value: 6 },
  { source: 'USA',       target: 'Poland', value: 648149 },
  { source: 'USA',       target: 'Saudi Arabia', value: 18000 },
  { source: 'USA',       target: 'India', value: 38937 },
  { source: 'USA',       target: 'Singapore', value: 280 },
  { source: 'USA',       target: 'South Africa', value: 3230 },
  { source: 'USA',       target: 'Spain', value: 311 },
  { source: 'USA',       target: 'Switzerland', value: 52 },
  { source: 'USA',       target: 'Thailand', value: 23850 },
  { source: 'USA',       target: 'United Arab Emirates', value: 23 },
  { source: 'USA',       target: 'United Kingdom', value: 45210 },
  { source: 'USA',       target: 'Venezuela', value: 506 },
  { source: 'Portugal',  target: 'Spain', value: 64 },
  { source: 'Portugal',  target: 'Spain', value: 299 },
  { source: 'Canada',    target: 'USA', value: 5 }
];

// 2. 去重循环
const seen = new Set();
const data = raw.filter(d => {
  const key = `${d.source}→${d.target}`;
  const rev = `${d.target}→${d.source}`;
  if (seen.has(rev)) return false;
  seen.add(key);
  return true;
});

// 3. 构造节点 & 链路
const sources  = Array.from(new Set(data.map(d => d.source)));
const targets  = Array.from(new Set(data.map(d => d.target)));
const allNames = Array.from(new Set([...sources, ...targets]));
const nodes    = allNames.map(name => ({ name }));
const links    = data.map(d => ({ source: d.source, target: d.target, value: d.value }));

// 4. 霓虹色板 & 渐变
const cyberpunkColors = [
  '#ff3cac', '#784ba0', '#00ffff', '#39ff14',
  '#f9f871', '#ff6ec7', '#08d9d6', '#ff4c4c'
];
const colorMap = {};
sources.forEach((s, i) => {
  const c = cyberpunkColors[i % cyberpunkColors.length];
  colorMap[s] = c;
  const t = targets[i % targets.length];
  if (!colorMap[t]) colorMap[t] = c;
});
function colorOf(name) {
  return colorMap[name] || '#555';
}
function gradientColor(src) {
  const idx = sources.indexOf(src) % cyberpunkColors.length;
  const c1 = cyberpunkColors[idx];
  const c2 = cyberpunkColors[(idx + 2) % cyberpunkColors.length];
  return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
    { offset: 0, color: c1 },
    { offset: 1, color: c2 }
  ]);
}

// 5. 初始化 Sankey & 手动布局
const chart = echarts.init(document.getElementById('chart'));
const W = chart.getWidth();
const H = chart.getHeight();
const LM = 20, RM = 20;
nodes.forEach(n => {
  if (sources.includes(n.name)) {
    const i = sources.indexOf(n.name);
    n.x = LM;
    n.y = LM + i * (H - 2 * LM) / (sources.length - 1);
  } else {
    const j = targets.indexOf(n.name);
    n.x = W - RM;
    n.y = LM + j * (H - 2 * LM) / (targets.length - 1);
  }
});

// 6. 曲线扭动效果
const period = 3, maxC = 0.98, minC = 0.02;
const phases = links.map(() => Math.random() * Math.PI * 6);
const linksStyled = links.map((l, i) => {
  const t     = (i % period) / (period - 1);
  const sine  = (Math.sin(t * Math.PI * 12 + phases[i]) + 1) / 2;
  const noise = (Math.random() - 0.5) * 0.8;
  let   curv  = minC + (maxC - minC) * sine + noise;
        curv  = Math.max(minC, Math.min(maxC, curv));
  return {
    ...l,
    lineStyle: {
      color: gradientColor(l.source),
      curveness: curv,
      opacity: 0.8,
      width: Math.max(1.5, Math.log10(l.value + 1) * 0.8)
    }
  };
});

// 7. 计算 Summary 并填充
const totalExport = data.reduce((sum,d)=>sum+d.value, 0);
const topEntry = Object.entries(
  data.reduce((m,d)=>{
    const k = `${d.source}→${d.target}`;
    m[k] = (m[k]||0) + d.value;
    return m;
  },{})
).sort((a,b)=>b[1]-a[1])[0];
const topSources = sources
  .slice().sort((a,b)=>
    data.filter(d=>d.source===b).reduce((s,d)=>s+d.value,0)
   -data.filter(d=>d.source===a).reduce((s,d)=>s+d.value,0)
  ).slice(0,3);
const topDests = targets
  .slice().sort((a,b)=>
    data.filter(d=>d.target===b).reduce((s,d)=>s+d.value,0)
   -data.filter(d=>d.target===a).reduce((s,d)=>s+d.value,0)
  ).slice(0,3);

document.getElementById('total-export').textContent =
  `Total Export: ${totalExport.toLocaleString()} t`;
document.getElementById('top-flow').textContent =
  `Top Flow: ${topEntry[0]} (${topEntry[1].toLocaleString()} t)`;
document.getElementById('top-sources').textContent =
  `Top Sources: ${topSources.join(', ')}`;
document.getElementById('top-destinations').textContent =
  `Top Destinations: ${topDests.join(', ')}`;

// 填充下拉
const sel = document.getElementById('country-select');
[...sources, ...targets].forEach(c => {
  const o = document.createElement('option');
  o.value = o.text = c;
  sel.append(o);
});

// 8. 渲染 Sankey
chart.setOption({
  backgroundColor: '#000',
  tooltip: { trigger: 'item', triggerOn: 'mousemove' },
  toolbox: {
    show: true, bottom: 10, right: 10,
    feature: { saveAsImage: { title:'Download', iconStyle:{borderColor:'#fff'} } }
  },
  series: [{
    type: 'sankey',
    layout: 'none',
    left: 100,
    right: 180,
    top: LM,
    bottom: 50,
    nodeWidth: 18,
    nodeGap: 12,
    data: nodes.map(n => ({
      name: n.name,
      x: n.x, y: n.y,
      itemStyle: { color: colorOf(n.name), borderColor:'#111', borderWidth:1 },
      label: { color:'#fff', fontSize:12 }
    })),
    links: linksStyled,
    emphasis: { focus:'adjacency' }
  }]
});

// 9. 阈值 & 国家高亮交互
function updateFilter() {
  const th = +document.getElementById('threshold').value;
  document.getElementById('threshold-value').textContent = th.toLocaleString();
  const country = sel.value;
  const fl = linksStyled.filter(l=>l.value>=th);
  const fn = nodes.map(n=>({
    name: n.name, x: n.x, y: n.y,
    itemStyle: {
      color: colorOf(n.name),
      opacity: !country || n.name===country ? 1 : 0.2
    },
    label: { color: '#fff' }
  }));
  chart.setOption({ series:[{ links: fl, data: fn }] });
}
document.getElementById('threshold').addEventListener('input', updateFilter);
sel.addEventListener('change', updateFilter);
updateFilter();

// 10. 自适应
window.addEventListener('resize', ()=>{ chart.resize(); });