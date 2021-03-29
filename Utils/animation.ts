/**
 * 动画相关工具函数
 */

/**
 * 
 * 滚动函数
 */
export function smoothScrollTo(
  el,
  direction,
  position,
  duration = 350,
) {
  const v0 = direction === 'top' ? el.scrollTop : el.scrollLeft;
  const dScroll = position - v0;
  let t0 = 0;
  function raf(t) {
    if (t0 === 0) {
      t0 = t;
      requestAnimationFrame(raf);
      return;
    }
    const p = (t - t0) / 350;
    const v1 = v0 + Math.ceil(p * p * (3 - 2 * p) * dScroll); // Bézier
    if (direction === 'top') {
      el.scrollTop = v1;
    } else {
      el.scrollLeft = v1;
    }
    if (p < 1) {
      requestAnimationFrame(raf);
    } else {
      if (direction === 'top') {
        el.scrollTop = position;
      } else {
        el.scrollLeft = position;
      }
    }
  }
  requestAnimationFrame(raf);
}
