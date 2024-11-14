document.addEventListener('DOMContentLoaded', () => {
  gnbEffect()

})


function gnbEffect() {
  const gnbMain = document.querySelectorAll('#gnb_inner>li>a')
  const gnbSub = document.querySelectorAll('.gnb_sub')
  const headerWrap = document.querySelector('#header_wrap')

  let openHeight = 460
  let closeHeight = 210
  let selectedMenu = null

  gnbEvent()

  function gnbEvent() {

    for (item of gnbMain) {
      item.addEventListener('mouseenter', overGnb)
      item.addEventListener('focus', overGnb)
    }
    
    for (item of gnbSub) {
      item.addEventListener('mouseenter', overGnb)
      item.addEventListener('focus', overGnb)
      item.lastElementChild.addEventListener('focusout',inActivateGnb)
    }
    
    headerWrap.addEventListener('mouseleave', inActivateGnb)

  }


  function overGnb() {
    activateGnb(this)  
  }

  function activateGnb(menu) {
    if (selectedMenu != null && selectedMenu != menu) { // 만약 selectedMenu가 null 이 아니며, 또한 selectedMenu가  mouseenter 타겟이 아닐경우 아래의 조건을 실행한다.
      selectedMenu.parentElement.classList.remove('selected')
    }

    if (selectedMenu != menu) { // 만약 selectedMenu가 mouseenter 타겟이 아닐 경우, 아래의 조건을 실행한다.
      selectedMenu = menu
      selectedMenu.parentElement.classList.add('selected')

      gsap.set(gnbSub, { display: "block" })
      gsap.to(headerWrap, { height: openHeight, duration: 0.3 })
    }

  }

  function inActivateGnb() {
    if (selectedMenu != null) {
      selectedMenu.parentElement.classList.remove('selected')
      gsap.set(gnbSub, { display: "none" })
      gsap.to(headerWrap, { height: closeHeight, duration: 0.3 })
    }
    selectedMenu=null
  }

}


