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
  const container = document.getElementById('diagram-container')
  if (container) renderPlantUml('/puml/architecture.puml', container)
})


