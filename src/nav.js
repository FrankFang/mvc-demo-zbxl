import { createElement } from "./helper"
import { compile } from 'handlebars'
import { EventEmitter, globalEventEmitter } from "./event_emitter"

export const view = {
  element: null,
  container: null,
  template: `
    <div class="moduleNav">
      <div>
        <span>导航</span>
        <a href="#/">首页</a>
        <a href="#/page1">模块1</a>
        <a href="#/page2">模块2</a>
        <a href="#/page3">模块3</a>
        <button class="test">test</button>
        <button class="test2">模块1</button>
      </div>
    </div>
  `,
  init(container) {
    this.container = container
    this.element = this.render()
    this.mount()
  },
  render() {
    const html = compile(this.template)({})
    const element = createElement(html)
    this.bindEvents(element)
    return element
  },
  bindEvents(element) {
    const btn = element.querySelector('.test')
    btn.addEventListener('click', () => {
      window.history.pushState({}, null, '/frank')
      globalEventEmitter.emit('historychange', '/frank')
    })
    const btn2 = element.querySelector('.test2')
    btn2.addEventListener('click', () => {
      window.history.pushState({}, null, '/page1')
      globalEventEmitter.emit('historychange', '/page1')
    })
  },
  mount() {
    this.container.innerHTML = ''
    this.container.append(this.element)
  },
  update() {
    const newElement = this.render()
    this.element.replaceWith(newElement)
    this.element = newElement
  }
}



