const socket = io()

const messages = document.getElementById('messages')
const form = document.getElementById('form')
const input = document.getElementById('input')

form.addEventListener('submit', function (e) {
  e.preventDefault()
  if (input.value) {
    socket.emit('chat message', input.value)
    input.value = ''
  }
})

function appendMsg(text) {
  const item = document.createElement('li')
  item.textContent = text

  messages.appendChild(item)
  window.scrollTo(0, document.body.scrollHeight)
}

// events
socket.on('chat message', function (msg) {
  appendMsg(msg)
})

socket.on('welcome', function (id) {
  appendMsg(`>> ${id} is now online`)
})

socket.on('farewell', function (id) {
  appendMsg(`>> ${id} is now offline`)
})