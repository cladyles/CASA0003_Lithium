// 初始化 Mapbox Token
mapboxgl.accessToken =
  'pk.eyJ1IjoieGltZW5nMDExNiIsImEiOiJjbTdhZGNwbzMwMzd1MmtzOG9ua2J0Znk0In0.vuk8t1UfOhoH46nE0AL2WQ';

const nav = document.getElementById('globalNav');

// 全局PPT动画滚动设置
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// 第一页ENTER按钮
document.getElementById('enterBtn').addEventListener('click', () => {
  scrollToSection('section2');
});

// 选择页点击
document.querySelectorAll('.grid-item').forEach(item => {
  item.addEventListener('click', () => {
    scrollToSection(item.dataset.target);
  });
});

// 全部 data-target 点击（包括导航 & 页脚）
document.querySelectorAll('[data-target]').forEach(el => {
  el.addEventListener('click', () => {
    scrollToSection(el.dataset.target);
  });
});

// IntersectionObserver：检测哪个 section 在视口中间，控制导航显隐
const sections = document.querySelectorAll('.section');
const io = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const idx = parseInt(e.target.id.replace('section', ''), 10);
        if (idx >= 3) nav.classList.remove('hidden');
        else nav.classList.add('hidden');
      }
    });
  },
  {
    threshold: 0.6, // 当某屏 60% 可见时触发
  }
);
sections.forEach(sec => io.observe(sec));

//根据各自负责页面写入自定义效果，注意先检查是否与第一部分的公共函数重复或冲突！
//第三页
//第四页
//第五页
//// ——— 动态按需加载 fullmap1 —— 
let fullmapLoaded = false;
const section5 = document.getElementById('section5');

const ioFullmap = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !fullmapLoaded) {
      fullmapLoaded = true;

      // 1. 加载 fullmap1.css
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'css/fullmap1.css';
      document.head.appendChild(link);

      // 2. 拉取 HTML 片段并插入
      fetch('fullmap1.html')
        .then(res => res.text())
        .then(html => {
          document.getElementById('fullmap-container').innerHTML = html;
          // 3. 加载 fullmap1.js
          const script = document.createElement('script');
          script.src = 'js/fullmap1.js';
          document.body.appendChild(script);
        });

      // 取消观察
      observer.disconnect();
    }
  });
}, {
  threshold: 0.5
});

ioFullmap.observe(section5);

//第六页
// ——— 第六页：EV 图交互 —— 
const infoData = {
  battery: {
    title: '电池系统（锂电池）',
    text: `电动车的动力核心是锂离子电池。锂离子在正负极之间往返移动，释放或储存能量，
为电动机和整车电子系统供电。相比传统电池，锂电池具有能量密度高、充电速度快、
循环寿命长等优势，是现代新能源汽车的关键材料。`
  },
  motor: {
    title: '电动机',
    text: `电动机将电池提供的电能转换为机械能，驱动车辆行驶。现代电动车多采用
永磁同步电机或异步电机，具有效率高、响应快、维护成本低的特点。`
  },
  charger: {
    title: '充电桩',
    text: `充电桩通过交流或直流方式将电网电能转为高压直流电，向电动车电池组
进行快速充电。智能充电桩还能监测电池状态并与云端通信，实现优化充电策略。`
  }
};

function showInfo(key) {
  const box = document.getElementById('ev-info');
  document.getElementById('info-title').innerText = infoData[key].title;
  document.getElementById('info-text').innerText = infoData[key].text;
  box.style.display = 'block';
}

function hideInfo() {
  document.getElementById('ev-info').style.display = 'none';
}


//第七页
//第八页
// section8 元素

//第九页
//第十页
//第十一页
//第十二页





