document.addEventListener('DOMContentLoaded', () => {
  // Инициализируем Mermaid
  if (window.mermaid) {
    window.mermaid.initialize({ startOnLoad: false, theme: 'default' })
    window.mermaid.init()
  }

  // Переменные для масштабирования диаграммы
  let diagramScale = 1
  let modalDiagramScale = 1
  const scaleStep = 0.2
  const minScale = 0.5
  const maxScale = 3

  // Функция для обновления масштаба диаграммы
  function updateDiagramScale(container, scale) {
    const mermaidElement = container.querySelector('.mermaid')
    if (mermaidElement) {
      mermaidElement.style.transform = `scale(${scale})`
      mermaidElement.style.transformOrigin = 'center center'
    }
  }

  // Обработчики для основной диаграммы
  const zoomInBtn = document.getElementById('zoom-in')
  const zoomOutBtn = document.getElementById('zoom-out')
  const zoomResetBtn = document.getElementById('zoom-reset')
  const fullscreenBtn = document.getElementById('fullscreen')
  const diagramContainer = document.getElementById('diagram-container')

  if (zoomInBtn && diagramContainer) {
    zoomInBtn.addEventListener('click', () => {
      if (diagramScale < maxScale) {
        diagramScale = Math.min(diagramScale + scaleStep, maxScale)
        updateDiagramScale(diagramContainer, diagramScale)
      }
    })
  }

  if (zoomOutBtn && diagramContainer) {
    zoomOutBtn.addEventListener('click', () => {
      if (diagramScale > minScale) {
        diagramScale = Math.max(diagramScale - scaleStep, minScale)
        updateDiagramScale(diagramContainer, diagramScale)
      }
    })
  }

  if (zoomResetBtn && diagramContainer) {
    zoomResetBtn.addEventListener('click', () => {
      diagramScale = 1
      updateDiagramScale(diagramContainer, diagramScale)
    })
  }

  // Модальное окно
  const modal = document.getElementById('diagram-modal')
  const modalDiagramContainer = document.getElementById('modal-diagram-container')
  const closeModalBtn = document.getElementById('close-modal')
  const modalZoomInBtn = document.getElementById('modal-zoom-in')
  const modalZoomOutBtn = document.getElementById('modal-zoom-out')
  const modalZoomResetBtn = document.getElementById('modal-zoom-reset')

  if (fullscreenBtn && modal) {
    fullscreenBtn.addEventListener('click', () => {
      // Копируем диаграмму в модальное окно
      const originalDiagram = diagramContainer.querySelector('.mermaid')
      if (originalDiagram && modalDiagramContainer) {
        modalDiagramContainer.innerHTML = originalDiagram.outerHTML
        modalDiagramScale = diagramScale
        updateDiagramScale(modalDiagramContainer, modalDiagramScale)
        modal.style.display = 'block'
        document.body.style.overflow = 'hidden'
      }
    })
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.style.display = 'none'
      document.body.style.overflow = 'auto'
    })
  }

  // Закрытие модального окна по клику вне его
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none'
        document.body.style.overflow = 'auto'
      }
    })
  }

  // Обработчики для модальной диаграммы
  if (modalZoomInBtn && modalDiagramContainer) {
    modalZoomInBtn.addEventListener('click', () => {
      if (modalDiagramScale < maxScale) {
        modalDiagramScale = Math.min(modalDiagramScale + scaleStep, maxScale)
        updateDiagramScale(modalDiagramContainer, modalDiagramScale)
      }
    })
  }

  if (modalZoomOutBtn && modalDiagramContainer) {
    modalZoomOutBtn.addEventListener('click', () => {
      if (modalDiagramScale > minScale) {
        modalDiagramScale = Math.max(modalDiagramScale - scaleStep, minScale)
        updateDiagramScale(modalDiagramContainer, modalDiagramScale)
      }
    })
  }

  if (modalZoomResetBtn && modalDiagramContainer) {
    modalZoomResetBtn.addEventListener('click', () => {
      modalDiagramScale = 1
      updateDiagramScale(modalDiagramContainer, modalDiagramScale)
    })
  }

  // Закрытие модального окна по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'block') {
      modal.style.display = 'none'
      document.body.style.overflow = 'auto'
    }
  })

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


