import { Canceler, CancelExecutor, CancelTokenSource } from '../types'
import Cancel from './Cancel'
interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    //传入一个方法，这个方法即是 CancelToken Promise的 resolve控制权
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve as any
    })
    executor(message => {
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }
  throwIfRequested() {
    if (this.reason) {
      throw this.reason
    }
  }
  static source(): CancelTokenSource {
    // 函数内部赋值 ts无法识别
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
}
