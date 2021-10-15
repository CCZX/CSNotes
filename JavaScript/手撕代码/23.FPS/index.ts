/**
 * 计算帧率
 */

function getFPS() {
  let prevTime = performance.now()
  let frame = 0

  const loop = () => {
    const currTime = performance.now()
    frame++
    
    // 1s 计算一次
    if (currTime - prevTime > 1000) {
      const fps = (frame * 1000) / (currTime - prevTime)

      return fps
    }

    window.requestAnimationFrame(loop)
  }

  loop()
}
