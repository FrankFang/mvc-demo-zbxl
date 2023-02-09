import { createElement } from "./helper"
import { compile } from 'handlebars'
import { EventEmitter } from "./event_emitter"

export const view = {
  element: null,
  container: null,
  template: `
    <div class="moduleNav">
      <div>
        <span>导航</span>
        <a href="/">首页</a>
        <a href="/page1">模块1</a>
        <a href="/page2">模块2</a>
        <a href="/page3">模块3</a>
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



