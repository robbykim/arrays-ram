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

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error')
    }
    return memory.get(this.ptr + index)
  }

  pop() {
    if (this.length == 0) {
      throw new Error('Index error')
    }
    let value = memory.get(this.ptr + this.length - 1)
    this.length--
    return value
  }

  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error('index error')
    }

    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO)
    }

    memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index)
    memory.set(this.ptr + index, value)
    this.length++
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error')
    }

    memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1)
    this.length--
  }
}

Array.SIZE_RATIO = 3;

// memory.copy(to, from, size)

// ptr = 3
//
// Float64Array = [-] [-] [-] [1] [2] [3] [4] [5] [6] [7] [] [] [] [] [] [] [] [] [] [] [] []
//         [ ] [ ] [ ] [x] [ ] [ ] [ ] [ ] [ ] [ ]
// Array = [0] [1] [2] [3] [4] [5] [ ] [ ] [ ]
//
// get(2)
//
// ptr + 2 = 5
// Float64Array[2] = 3

// [1,2,3,4]
