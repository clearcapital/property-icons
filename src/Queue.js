export default class Queue {
  _reporters = []

  /*
   * @param fileQueue: array of items to process
   * @param maxSimultaneous: int for the maximum simultaneous items that can be processed
   */
  constructor (queue, maxSimultaneous = 3) {
    this.queue = queue
    this.maxSimultaneous = maxSimultaneous
  }

  listen (cb) {
    this._reporters.push(cb)
  }

  addItem (item) {
    this.queue.push(item)
  }

  report = (data) => {
    this._reporters.forEach((reporter) => {
      reporter(data)
    })
  }

  // @param processCb: function returning a promise that does the thing
  processQueue (processCb) {
    const {queue, maxSimultaneous, report} = this

    return new Promise((resolve, reject) => {
      let returnData = []
      let running = 0

      updateQueue()

      function updateQueue () {
        while (queue.length && running < maxSimultaneous) {
          processCb(queue.shift()).then(
            data => {
              returnData.push(data)
              report(data)
              checkQueue()
            },
            err => { reject(err) }
          )

          running++
        }
      }

      function checkQueue () {
        if (queue.length) {
          running--
          updateQueue()
        } else {
          resolve(returnData)
        }
      }
    })
  }
}
