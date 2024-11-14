window.addEventListener('load', () => {
  const visualWrap = document.querySelector('#visual_wrap')
  const visualLi = document.querySelectorAll('#visual_inner>li')
  const dot = document.querySelectorAll('#banner_dot>li')
  const nextBtn = document.querySelector('#next_btn')
  const prevBtn = document.querySelector('#prev_btn')
  const visualTitle = document.querySelectorAll('.visual_title')
  const visualText = document.querySelectorAll('.visual_text')

  let visualWidth = visualWrap.offsetWidth
  let visualLength = visualLi.length
  let selectedDot = dot[0]
  let currentIndex = 0
  let nextIndex = null
  let timer = setInterval(addVisualIndex, 4000)

  gsap.set(visualLi, { width: visualWidth, opacity: 0, scale: 2 })
  gsap.set(visualLi[0], { left: 0, opacity: 1, scale: 1 })
  gsap.set(visualTitle[0], { bottom: 160, opacity: 1 })
  gsap.set(visualText[0], { bottom: 90, opacity: 1 })

  window.addEventListener('resize', () => {
    visualWidth = visualWrap.offsetWidth
    gsap.set(visualLi, {width:visualWidth})
  })

  visualWrap.addEventListener('mouseenter', () => {
    clearInterval(timer)
  })

  for (item of dot) {
    item.addEventListener('mouseenter', overDot)
  }

  nextBtn.addEventListener('click', addVisualIndex)
  prevBtn.addEventListener('click', () => {
    nextIndex = currentIndex - 1
    if (nextIndex < 0) {
      nextIndex = visualLength - 1
    }
    slidePrevVisual(nextIndex)
    activateDot(nextIndex)
  })

  function overDot() {
    nextIndex = getIndex(this)
    // alert(nextIndex)
    activateDot(nextIndex)
    if (nextIndex > currentIndex) {
      slideNextVisual(nextIndex)
    } else if (nextIndex < currentIndex) {
      slidePrevVisual(nextIndex)
    }
  }

  function addVisualIndex() {
    nextIndex = currentIndex + 1
    if (nextIndex >= visualLength) {
      nextIndex = 0;
    }
    slideNextVisual(nextIndex)
    activateDot(nextIndex)
    timer()
  }

  function getIndex(checkMenu) {
    let selectedIndex = 0
    while ((checkMenu = checkMenu.previousElementSibling) != null) {
      selectedIndex++
    }
    return selectedIndex
  }

  function activateDot(index) {
    if (selectedDot != null && selectedDot != dot[index]) {
      selectedDot.classList.remove('selected')
    }

    if (selectedDot != dot[index]) {
      selectedDot = dot[index]
      selectedDot.classList.add('selected')
    }
  }

  function slideNextVisual(index) {
    gsap.to(visualLi[currentIndex], { left: -visualWidth, opacity: 0, duration: 0.5, ease: "power1.out" })
    gsap.set(visualTitle[currentIndex], { bottom: 0, opacity: 0 })
    gsap.set(visualText[currentIndex], { bottom: 0, opacity: 0 })
    gsap.set(visualLi[index], { left: visualWidth, opacity: 0, scale: 2 })
    gsap.to(visualLi[index], {
      left: 0, opacity: 1, duration: 0.5, ease: "power1.out", onComplete: () => {
        gsap.to(visualLi[index], {
          scale: 1, duration: 0.5, ease: "power1.out", onComplet: () => {
            gsap.to(visualTitle[index], { bottom: 160, opacity: 1, duration: 0.5, ease: "power1.out" })
            gsap.to(visualText[index], { bottom: 90, opacity: 1, duration: 1, ease: "power1.out" })
          }
        })
      }
    })
    currentIndex = index
  }

  function slidePrevVisual(index) {
    gsap.to(visualLi[currentIndex], { left: visualWidth, opacity: 0, duration: 0.5, ease: "power1.out" })
    gsap.set(visualTitle[currentIndex], { bottom: 0, opacity: 0 })
    gsap.set(visualText[currentIndex], { left: 0, opacity: 0 })
    gsap.set(visualLi[index], { left: -visualWidth, opacity: 0, scale: 2 })
    gsap.to(visualLi[index], {
      left: 0, opacity: 1, duration: 0.5, ease: "power1.out", onComplete: () => {
        gsap.to(visualLi[index], {
          scale: 1, duration: 0.5, ease: "power1.out", onComplete: () => {
            gsap.to(visualTitle[index], { bottom: 160, opacity: 1, duration: 0.5, ease: "power1.out" })
            gsap.to(visualText[index], { bottom: 90, opacity: 1, duration: 1, ease: "power1.out" })
          }
        })
      }
    })
    currentIndex = index
  }
})