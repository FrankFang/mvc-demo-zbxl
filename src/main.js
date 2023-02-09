import './style.scss'
import { view as navView } from './nav.js'
import { view as view1 } from './1.js'
import { view as view2 } from './2.js'
import { view as view3 } from './3.js'
import { view as homeView } from './home.js'

const app = document.getElementById('app')

navView.init(app)
switch (window.location.pathname) {
  case '/':
    homeView.init(app)
    break;
  case '/page1':
    view1.init(app)
    break
  case '/page2':
    view2.init(app)
    break
  case '/page3':
    view3.init(app)
    break
  default:
    break
}


