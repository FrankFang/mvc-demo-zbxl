import axios from "axios"
import { createElement } from "./helper"
import { compile } from 'handlebars'
import { EventEmitter } from "./event_emitter"

class Model extends EventEmitter {
  data = {
    output: '暂无数据',
  }
  setData(obj) {
    Object.assign(this.data, obj)
    this.emit('changed')
  }
}
const model = new Model()


export const view = {
  model: model,
  element: null,
  container: null,
  template: `
    <div class="module3">
      <h1>模块3</h1>
      <div><button class="btn">点击加载数据</button></div>
      <div>{{output}}</div>
    </div>
  `,
  init(container) {
    this.container = container
    this.element = this.render()
    this.mount()
    this.mock()
    this.model.on('changed', () => {
      this.update()
    })
  },
  mock() {
    axios.interceptors.response.use(undefined, (err) => {
      if (err.config?.url === '/xxx') {
        return { data: '模拟数据' + Math.random() }
      }
      throw err
    })
  },
  render() {
    const html = compile(this.template)(this.model.data)
    const element = createElement(html)
    this.bindEvents(element)
    return element
  },
  bindEvents(element) {
    const button = element.querySelector('.btn')
    button.addEventListener('click', async () => {
      // 1 axios.get...
      // 2 得到 fn = (httpResponse) => {
      //   const response = httpResponse
      //   this.model.data.output = response.data
      //   this.update()
      // }
      // 3 fn 放入微任务队列
      // 4 执行其他代码
      // ........JS 不会请求数据，C++ 去请求数据
      // ........很久很久之后，数据来了，C++ 去执行 fn(httpResponse)
      // response = httpResponse
      const response = await axios.get('/xxx')
      this.model.setData({ output: response.data })
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



