import './style.scss'
import { view as navView } from './nav.js'
import { router } from './router'

const nav = document.getElementById('nav')

navView.init(nav)
router.start()



