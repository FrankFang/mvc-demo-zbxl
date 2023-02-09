import { createElement } from "./helper"
import { compile } from 'handlebars'
import { EventEmitter } from "./event_emitter"
// 最小知识原则
class Model extends EventEmitter {
  data = { count: 1 }
  add() {
    this.data.count += 1
    this.emit('changed')
  }
  minus() {
    this.data.count -= 1
    this.emit('changed')
  }
}
const model = new Model()

export const view = {
  model: model,
  element: null,
  container: null,
  template: `
    <div class="module1">
      <h1>模块1</h1>
      <div id="count">{{count}}</div>
      <div><button>+1</button></div>
      <div><button class="btn2">-1</button></div>
    </div>
  `,
  init(container) {
    this.model = model
    this.container = container
    this.element = this.render()
    this.mount()
    this.model.on('changed', () => {
      this.update()
    })
  },
  render() {
    const html = compile(this.template)(this.model.data)
    const element = createElement(html)
    this.bindEvents(element)
    return element
  },
  bindEvents(element) {
    const button = element.querySelector('button')
    button.addEventListener('click', () => {
      this.model.add()
    })
    const button2 = element.querySelector('.btn2')
    button2.addEventListener('click', () => {
      this.model.minus()
    })
  },
  mount() {
    this.container.append(this.element)
  },
  update() {
    const newElement = this.render()
    this.element.replaceWith(newElement)
    this.element = newElement
  }
}



