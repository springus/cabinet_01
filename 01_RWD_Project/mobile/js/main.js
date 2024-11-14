window.addEventListener('load', () => {
  const header = document.querySelector('header')
  const gnbWrap = document.querySelector('#gnb')
  const navOpen = document.querySelector('#menu_icon')
  const navClose = document.querySelector('#close_btn')
  const gnbList = document.querySelectorAll('#gnb_inner>li>a', '#gnb_inner>li>span')
  const backLayer = document.createElement('div')
  backLayer.id = 'back_layer'

  let gnbWidth = window.innerWidth * 0.7
  let openHeight = null
  let closeHeight = 50
  let selectedMenu = null

  gsap.set(gnbWrap, { width: gnbWidth, height: window.innerHeight, left: -gnbWidth, display: "none" })

  window.addEventListener('resize', resetGnbWidth)
  navOpen.addEventListener('click', openGnb)
  navClose.addEventListener('click', closeGnb)

  for (item of gnbList) {
    item.addEventListener('click', activateGnbList)
  }

  function resetGnbWidth() {
    gnbWidth = window.innerWidth * 0.7
    gsap.set(gnbWrap, { width: gnbWidth })
  }

  function openGnb() {
    gsap.set(backLayer, { display: "block" })
    header.append(backLayer)
    gsap.set(gnbWrap, { display: "block" })
    gsap.to(gnbWrap, { left: 0, duration: 0.5, ease: "power1.out" })
    gsap.set('body, html', { overflow: "hidden" })
  }

  function closeGnb() {
    gsap.set(backLayer, { display: "none" })
    header.removeChild(backLayer)
    gsap.to(gnbWrap, {
      left: -gnbWidth, duration: 0.5, ease: "power1.out", onComplete: () => {
        gsap.set(gnbWrap, { display: "none" })
        gsap.set('body, html', { overflow: "visible" })
      }
    })
  }

  function activateGnbList() {

    // let gnbChild=selectedMenu.parentElement.children.length

    if (selectedMenu != null && selectedMenu != this) {
      gsap.to(selectedMenu.parentElement, { height: closeHeight, duration: 0.3, ease: "power1.out" })
      selectedMenu.nextElementSibling.classList.remove('selected')
    }

    if (selectedMenu != this) {
      selectedMenu = this
      openHeight = closeHeight + (closeHeight * selectedMenu.nextElementSibling.nextElementSibling.children.length)
      gsap.to(selectedMenu.parentElement, { height: openHeight, duration: 0.3, ease: "power1.out" })
      selectedMenu.nextElementSibling.classList.add('selected')
    } else if (selectedMenu != null && selectedMenu == this) {
      gsap.to(selectedMenu.parentElement, { height: closeHeight, duration: 0.3, ease: "power1.out" })
      selectedMenu.nextElementSibling.classList.remove('selected')
      selectedMenu = null
    }



    
  }





})