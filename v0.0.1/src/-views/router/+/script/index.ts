// src\views\router\+\script\index.ts

document.addEventListener('DOMContentLoaded', () => {
  console.log('Client-side router found')
})

const router = async (): Promise<void> => {
  const path = window.location.pathname
  try {
    // const response = await fetch(`views${path}index.ejs`)
    const response = await fetch(`${path}`)
    if (!response.ok) {
      throw new Error('Page not found')
    }
    const html = await response.text()
    document.body.innerHTML = html // Replace the entire body content
  } catch {
    document.body.innerHTML = '<h1>404 - Page Not Found</h1>' // Handle 404 error
  }
}

window.addEventListener('popstate', () => {
  router().catch(console.error)
})
window.addEventListener('load', () => {
  console.log('here!!!')
  router().catch(console.error)
})

document.querySelectorAll('nav a').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    event.preventDefault()
    const href = anchor.getAttribute('href')
    history.pushState(null, '', href)
    router().catch(console.error)
  })
})
