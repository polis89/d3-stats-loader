// require('../sass/styles.sass')

if (process.env.NODE_ENV !== 'production') console.log('DEVELOPMENT MODE')

function component () {
  var element = document.createElement('div')
  var button = document.createElement('button')
  var br = document.createElement('br')

  button.innerHTML = 'Click me and look into console!'
  element.innerHTML = 'Hello webpack'
  element.appendChild(br)
  element.appendChild(button)

  return element
}

document.body.appendChild(component())
