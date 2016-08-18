'use strict';

// import 'memory' from './memory';
let memory = require('./memory');

// Initial start
class Array {
  constructor() {
    this.length = 0
    this._capacity = 0
    this.ptr = memory.allocate(this.length)
  }

  // If not enough space, resizes the array for new item 
  push(value) {
    if (this.length >= this._capacity) {
      // Each time you go over the capacity, you triple the size of allocated memory
      this._resize((this.length + 1) * Array.SIZE_RATIO)
    }

    memory.set(this.ptr + this.length, value)
    this.length++
  }

  // Copies old array from the old pointer to new pointer
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

  // Retrieves item and adds offset
  retrieve(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error')
    }
    return memory.get(this.ptr + index)
  }

  // Makes an extra space that will be filled at the next push
  pop() {
    if (this.length == 0) {
      throw new Error('Index error')
    }
    let value = memory.get(this.ptr + this.length - 1)
    this.length--
    return value
  }

  // Shifts all of the values after the new value back one position
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

  // Copies the values backwards to fill the space where item is removed
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
