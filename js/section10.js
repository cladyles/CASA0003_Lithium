/* ───── script.js ─────
   功能：点击 .readmore-btn，把 .hero-text 中原有标题/副标题/描述/按钮淡出，
        同时淡入 .short-description
*/

document.addEventListener('DOMContentLoaded', () => {
    const btn   = document.querySelector('.readmore-btn');
    const panel = document.querySelector('.hero-text');
    if (!btn || !panel) return;
  
    btn.addEventListener('click', () => {
      const isShort = panel.classList.toggle('show-short');   // true 表示现在短描述在显示
      btn.textContent = isShort ? 'Back' : 'Read More';       // 切换按钮文字
    });
  });
  
  

  