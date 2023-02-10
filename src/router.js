import { globalEventEmitter } from "./event_emitter"
import { view as view1 } from './1.js'
import { view as view2 } from './2.js'
import { view as view3 } from './3.js'
import { view as homeView } from './home.js'
import { view as notFoundView } from './not_found.js'

const content = document.getElementById('content')

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

export const router = {
  push(path, state, title) {
    history.pushState(state, title, path)
    globalEventEmitter.emit('historychange', path)
  },
  start() {
    route(location.pathname)
    globalEventEmitter.on('historychange', route)
  }
}
