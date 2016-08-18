'use strict';

// import 'memory' from './memory';
let memory = require('./memory');

class Array {
  constructor() {
    this.length = 0
    this._capacity = 0
    this.ptr = memory.allocate(this.length)
  }

  push(value) {
    if (this.length >= this._capacity) {
      // Each time you go over the capacity, you triple the size of allocated memory
      this._resize((this.length + 1) * Array.SIZE_RATIO)
    }

    memory.set(this.ptr + this.length, value)
    this.length++
  }

  _resize(size) {
    let oldPtr = this.ptr
    this.ptr = memory.allocate(size)
    if (this.ptr === null) {
      throw new Error('out of memory')
    }
    memory.copy(this.ptr, oldPtr, this.length)
    memory.free(oldPtr)
    this._capacity = size
  }

  retrieve(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error')
    }
    return memory.get(this.ptr + index)
  }

}

Array.SIZE_RATIO = 3;










