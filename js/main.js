document.addEventListener('DOMContentLoaded', () => {
  // Инициализируем Mermaid
  if (window.mermaid) {
    window.mermaid.initialize({ startOnLoad: false, theme: 'dark' })
    window.mermaid.init()
  }

  // Генерируем дерево разделов слева
  const toc = document.getElementById('toc')
  if (toc) {
    // Ждем немного, чтобы DOM полностью загрузился
    setTimeout(() => {
      const content = document.querySelector('.content')
      console.log('Content элемент:', content) // для отладки
      
      const headings = Array.from(document.querySelectorAll('.content h2, .content h3'))
      console.log('Найдено заголовков:', headings.length) // для отладки
    
    if (headings.length > 0) {
      const nav = document.createElement('nav')
      const list = document.createElement('ul')
      
      headings.forEach(h => {
        const id = h.id || h.textContent.trim().toLowerCase().replace(/[^a-zа-я0-9]+/gi,'-')
        h.id = id
        const li = document.createElement('li')
        if (h.tagName === 'H3') {
          li.style.paddingLeft = '12px'
          li.style.fontSize = '14px'
        }
        const a = document.createElement('a')
        a.href = `#${id}`
        a.textContent = h.textContent
        li.appendChild(a)
        list.appendChild(li)
      })
      
      const title = document.createElement('h2')
      title.textContent = 'Разделы'
      toc.innerHTML = ''
      toc.appendChild(title)
      nav.appendChild(list)
      toc.appendChild(nav)
    } else {
      toc.innerHTML = '<h2>Разделы</h2><p>Заголовки не найдены</p>'
    }
    }, 100) // задержка 100мс
  }
})


