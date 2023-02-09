import './style.scss'
import { view as navView } from './nav.js'
import { view as view1 } from './1.js'
import { view as view2 } from './2.js'
import { view as view3 } from './3.js'
import { view as homeView } from './home.js'
import { view as notFoundView } from './not_found.js'
import { globalEventEmitter } from './event_emitter'

const nav = document.getElementById('nav')
const content = document.getElementById('content')

navView.init(nav)

const route = (path) => {
  switch (path) {
    case '/':
      homeView.init(content)
      break;
    case '/page1':
      view1.init(content)
      break
    case '/page2':
      view2.init(content)
      break
    case '/page3':
      view3.init(content)
      break
    default:
      notFoundView.init(content)
      break
  }
}

route(window.location.pathname)
globalEventEmitter.on('historychange', (path) => {
  route(path)
})



