/* =======================================================================
   Intro.js  –  Stand-alone cover logic
   ======================================================================= */
import * as THREE             from 'three';
import { GLTFLoader }         from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/loaders/GLTFLoader.js';
import { MeshSurfaceSampler } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/math/MeshSurfaceSampler.js';

/* ——— 一站式参数 ——— */
const CFG = {
  modelPath   : './images/battery/scene.gltf',
  count       : 18000,
  flyTime     : 2,
  boomTime    : 2,
  radiusMul   : 35,
  subtitleDelay:1500,
  subtitleDur : 4000,
  idleSpin    : 0.1,
  hoverAmp    : 0.08
};

/* ——— DOM ——— */
const cvs  = document.getElementById('lithiumCanvas');
const btn  = document.getElementById('enterBtn');
const ovl  = document.getElementById('overlay');

/* ===== Three 基础 ===== */
const ren = new THREE.WebGLRenderer({canvas:cvs,antialias:true,alpha:true});
ren.setPixelRatio(devicePixelRatio);
const scene = new THREE.Scene();
const cam   = new THREE.PerspectiveCamera(45,innerWidth/innerHeight,0.1,2000);
function resize(){cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix();ren.setSize(innerWidth,innerHeight);}
resize(); addEventListener('resize',resize);

/* ===== Shader ===== */
const uni = {uP:{value:0},uS:{value:0},uSize:{value:3},uCol:{value:new THREE.Color(0x00ffff)},uA:{value:1}};
const mat = new THREE.ShaderMaterial({
  uniforms: uni,
  vertexShader:`attribute vec3 a0,a1,aDir;uniform float uP,uS,uSize;
    void main(){
      vec3 p=mix(a0,a1,uP)+aDir*uS*${CFG.radiusMul}.0;
      gl_PointSize=uSize;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);
    }`,
  fragmentShader:`uniform vec3 uCol;uniform float uA;
    void main(){if(length(gl_PointCoord-0.5)>.5)discard;gl_FragColor=vec4(uCol,uA);} `,
  transparent:true,depthWrite:false
});

/* ===== 状态 ===== */
let tFly=0,tBoom=0,fade=0,ready=false,boom=false,sub=false;
const grp=new THREE.Group();scene.add(grp);
let tgt=new THREE.Vector3(1,1,1),C,E;

/* ===== 加载模型 → 粒子 ===== */
new GLTFLoader().load(CFG.modelPath,g=>{
  g.scene.updateMatrixWorld(true);
  const box=new THREE.Box3().setFromObject(g.scene);
  C=box.getCenter(new THREE.Vector3());
  E=box.getSize(new THREE.Vector3()).length();
  build(g.scene);
  initView();
  runIntroFirstTime();
});

function build(root){
  const N=CFG.count, init=new Float32Array(N*3), targ=new Float32Array(N*3), dir=new Float32Array(N*3);
  const list=[],area=[],tmp=new THREE.Vector3(); let sum=0,i=0;
  root.traverse(m=>{
    if(m.isMesh){
      list.push({s:new MeshSurfaceSampler(m).build(),m:m.matrixWorld});
      const a=m.geometry.boundingSphere?4*Math.PI*Math.pow(m.geometry.boundingSphere.radius,2):1;
      area.push(a);sum+=a;
    }
  });
  list.forEach(({s,m},idx)=>{
    const t=Math.round(N*area[idx]/sum);
    for(let k=0;k<t&&i<N;k++,i++){
      s.sample(tmp); tmp.applyMatrix4(m);
      targ.set([tmp.x,tmp.y,tmp.z],i*3);
      const R=E*2;
      init.set([(Math.random()*2-1)*R,(Math.random()*2-1)*R,(Math.random()*2-1)*R],i*3);
      tmp.set(Math.random()*2-1,Math.random()*2-1,Math.random()*2-1).normalize();
      dir.set([tmp.x,tmp.y,tmp.z],i*3);
    }
  });
  const geo=new THREE.BufferGeometry();
  geo.setAttribute('position',new THREE.BufferAttribute(init,3));
  geo.setAttribute('a0',      new THREE.BufferAttribute(init,3));
  geo.setAttribute('a1',      new THREE.BufferAttribute(targ,3));
  geo.setAttribute('aDir',    new THREE.BufferAttribute(dir ,3));
  grp.add(new THREE.Points(geo,mat));
}

function initView(){
  cam.position.set(C.x+E*0.4,C.y+E*0.25,C.z+E*1.8);
  cam.lookAt(C); grp.rotation.set(-0.1,0.1,-0.4);
}

cvs.addEventListener('pointermove',e=>{
  if(!ready||boom)return;
  const nx=e.clientX/innerWidth*2-1,ny=-(e.clientY/innerHeight)*2+1;
  tgt.set(1+nx*CFG.hoverAmp,1+ny*CFG.hoverAmp,1+Math.abs(nx)*CFG.hoverAmp*0.5);
});
cvs.addEventListener('pointerleave',()=>tgt.set(1,1,1));

btn.onclick=()=>{if(ready&&!boom){boom=true;tBoom=performance.now();btn.style.display='none';}};

let prev=performance.now();
function loop(now){
  const dt=(now-prev)/1000;prev=now;requestAnimationFrame(loop);

  if(tFly){
    const p=Math.min((now-tFly)/1000/CFG.flyTime,1);
    uni.uP.value=p;if(!ready&&p===1){ready=true;btn.disabled=false;btn.style.display='block';}
  }

  grp.scale.lerp(tgt,0.08); if(!boom) grp.rotation.y+=CFG.idleSpin/60;

  if(boom){
    const q=Math.min((now-tBoom)/1000/CFG.boomTime,1);
    uni.uS.value=q;
    cam.position.set(C.x,
      THREE.MathUtils.lerp(C.y+E*0.25,C.y-E*0.8,q),
      THREE.MathUtils.lerp(E*3.2,-E*2.5,q));
    cam.lookAt(C);

    if (!sub && now - tBoom > CFG.subtitleDelay) {
      sub = true;
      ovl.classList.add('show');

      // 淡出字幕
      setTimeout(() => ovl.classList.remove('show'), CFG.subtitleDur);

      // 自动滚动到第二页
      setTimeout(() => {
        document.getElementById('section2')?.scrollIntoView({ behavior: 'smooth' });
      }, CFG.subtitleDur);
    }

    if(q===1&&!fade)fade=now;
  }

  if(fade){
    const f=Math.min((now-fade)/1200,1);
    uni.uA.value=1-f;if(f===1)mat.visible=false;
  }
  ren.render(scene,cam);
}
loop(performance.now());

// ===============================
// ✅ 首次进入：粒子飞入动画
// ===============================
function runIntroFirstTime() {
  tFly = performance.now();
  tBoom = 0;
  fade = 0;
  ready = false;
  boom = false;
  sub = false;

  uni.uP.value = 0;
  uni.uS.value = 0;
  uni.uA.value = 1;
  mat.visible = true;

  tgt.set(1, 1, 1);

  btn.disabled = true;
  btn.style.display = 'block';
  ovl.classList.remove('show');
}

// ===============================
// ✅ 回到首页时重播：直接定格形态
// ===============================
window.runIntro = function () {
  tFly = 0;
  tBoom = 0;
  fade = 0;
  ready = true;
  boom = false;
  sub = false;

  uni.uP.value = 1;
  uni.uS.value = 0;
  uni.uA.value = 1;
  mat.visible = true;

  tgt.set(1, 1, 1);

  btn.disabled = false;
  btn.style.display = 'block';
  ovl.classList.remove('show');

  // ✅ 重设相机位置和朝向
  cam.position.set(C.x + E * 0.4, C.y + E * 0.25, C.z + E * 1.8);
  cam.lookAt(C);
};
