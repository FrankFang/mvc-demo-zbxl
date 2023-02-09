export class EventEmitter {
  constructor() {
    this.queue = {}
  }
  on(name, fn) {
    this.queue[name] = this.queue[name] || []
    this.queue[name].push(fn)
  }
  off(name, fn) {
    this.queue[name] = this.queue[name] || []
    const index = this.queue[name].indexOf(fn)
    this.queue[name].splice(index, 1)
  }
  emit(name, ...args) {
    this.queue[name] = this.queue[name] || []
    this.queue[name].forEach(fn => {
      fn(...args)
    })
  }
}

const eventEmitter = new EventEmitter()

export { eventEmitter as globalEventEmitter }
