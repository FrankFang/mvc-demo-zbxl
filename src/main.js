import './style.scss'
import { view as view1 } from './1.js'
import { view as view2 } from './2.js'
import { mount as mount3 } from './3.js'

const app = document.getElementById('app')

view1.init(app)
view2.init(app)
mount3(app)

