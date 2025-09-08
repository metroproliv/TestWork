document.addEventListener('DOMContentLoaded', () => {
  // Инициализируем Mermaid
  if (window.mermaid) {
    window.mermaid.initialize({ startOnLoad: false, theme: 'dark' })
    window.mermaid.init()
  }

  // Отслеживание активного раздела при прокрутке
  const sections = document.querySelectorAll('.content section[id]')
  const tocLinks = document.querySelectorAll('#toc nav a')
  
  function updateActiveSection() {
    let current = ''
    
    sections.forEach(section => {
      const headerHeight = 80
      const extraOffset = 20
      const sectionTop = section.offsetTop - headerHeight - extraOffset
      const sectionHeight = section.offsetHeight
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id')
      }
    })
    
    // Обновляем активные ссылки
    tocLinks.forEach(link => {
      link.classList.remove('active')
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active')
      }
    })
  }
  
  // Обработчик прокрутки с throttling
  let ticking = false
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveSection()
        ticking = false
      })
      ticking = true
    }
  }
  
  // Добавляем обработчик прокрутки
  window.addEventListener('scroll', onScroll)
  
  // Плавная прокрутка к разделам
  tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const targetId = link.getAttribute('href').substring(1)
      const targetSection = document.getElementById(targetId)
      
      if (targetSection) {
        const headerHeight = 80 // высота хедера
        const extraOffset = 20 // дополнительный отступ для видимости текста
        const offsetTop = targetSection.offsetTop - headerHeight - extraOffset
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        })
      }
    })
  })
  
  // Инициализируем активный раздел
  updateActiveSection()
})


