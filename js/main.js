console.log('Скрипт main.js загружен')

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM загружен, начинаем инициализацию')
  
  // Инициализируем Mermaid
  if (window.mermaid) {
    console.log('Mermaid найден, инициализируем')
    window.mermaid.initialize({ startOnLoad: false, theme: 'dark' })
    window.mermaid.init()
  } else {
    console.log('Mermaid НЕ найден!')
  }

  // Генерируем дерево разделов слева
  const toc = document.getElementById('toc')
  console.log('TOC элемент:', toc)
  
  if (toc) {
    // Ждем немного, чтобы DOM полностью загрузился
    setTimeout(() => {
      const content = document.querySelector('.content')
      console.log('Content элемент:', content) // для отладки
      
      const headings = Array.from(document.querySelectorAll('.content h2, .content h3'))
      console.log('Найдено заголовков:', headings.length) // для отладки
      console.log('Заголовки:', headings.map(h => h.textContent)) // для отладки
      
      if (headings.length > 0) {
        console.log('Создаем дерево разделов...')
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
        console.log('Дерево разделов создано!')
      } else {
        console.log('Заголовки не найдены, показываем сообщение об ошибке')
        toc.innerHTML = '<h2>Разделы</h2><p>Заголовки не найдены</p>'
      }
    }, 100) // задержка 100мс
  } else {
    console.log('TOC элемент НЕ найден!')
  }
})


