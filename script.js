let openWsBtn = document.getElementById('open-ws')
let closeWsBtn = document.getElementById('close-ws')
let form = document.getElementById('form')
let socketStatus = document.getElementById('status')
let table = document.getElementById('ul')[0]
let message = document.getElementById('message')

openWsBtn.addEventListener('click', () => {
  openWsBtn.disabled = true
  openWsBtn.style.background = 'gray'
  openWsBtn.style.pointerEvents = 'none'
  openWsBtn.textContent = 'Button Disabled'
  
  socketStatus.innerHTML = 'Connecting...'
  let url = 'ws://127.0.0.1:8080'
  let socket = new WebSocket(url)

  socket.onopen = (openEvent) => {
    table.innerHTML = ''
    socketStatus.className = 'open'
    form.className = 'show'
  }

  socket.onmessage = function(message) {
    // to be written
  }

  socket.onclose = (closeEventObject) => {
    socketStatus.className = 'closed'
    table.innerHTML = ''
    switch (closeEventObject.code) {
      case 1006: // network issue
        socketStatus.innerHTML = 'Issue with Websocket Connection'
      case 1001: // peer closes connection
        socketStatus.innerHTML = `Disconnected: ${closeEventObject.reason}`
        table.innerHTML = ''
        break
      default:
        socketStatus.innerHTML = `You have disconnected`
    }
    form.classList.remove('show')
    message.setAttribute('required', 'true')
    openWsBtn.disabled = false
    openWsBtn.style.background = ''
    openWsBtn.style.background.pointerEvents = ''
    openWsBtn.textContent = 'Open Websocket'
  }

  socket.onerror = (error) => {
    socketStatus.innerHTML = 'Error'
    socketStatus.className = 'closed'
  }
})