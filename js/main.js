async function fetchText(path) {
  const res = await fetch(path, { cache: 'no-cache' })
  if (!res.ok) throw new Error('Failed to load ' + path)
  return res.text()
}

function encode64(data) {
  return btoa(unescape(encodeURIComponent(data)))
}

async function renderPlantUml(pumlPath, target) {
  try {
    const source = await fetchText(pumlPath)
    const encoded = encode64(source)
    const url = `https://kroki.io/plantuml/svg/${encoded}`
    const svg = await fetchText(url)
    target.innerHTML = svg
  } catch (e) {
    target.innerHTML = `<article><strong>Не удалось загрузить диаграмму.</strong><br/>${e}</article>`
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Инициализируем Mermaid
  if (window.mermaid) {
    window.mermaid.initialize({ startOnLoad: true, theme: 'dark' })
  }

  // Генерируем дерево разделов слева
  const toc = document.getElementById('toc')
  if (toc) {
    const headings = Array.from(document.querySelectorAll('.content h2, .content h3'))
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
  }
})


