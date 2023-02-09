import { EventEmitter } from "./event_emitter"
import { createElement } from "./helper"
import { compile } from 'handlebars'

class Model extends EventEmitter {
  data = { name: 'frank' }
  update(name) {
    this.data.name = name
    this.emit('changed')
  }
}
const model = new Model()
console.dir(model)

export const view = {
  model: model,
  element: null,
  container: null,
  template: `
    <div class="module">
      <h1>模块2</h1>
      <div><span>用户名</span><input value="{{name}}" /></div>
      <div>你输入的是：<span id="output">{{name}}<span></div>
    </div>
  }
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
    const input = element.querySelector('input')
    input.addEventListener('input', (e) => {
      this.model.update(e.target.value)
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
