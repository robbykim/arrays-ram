// the world's worst allocator
'use strict';

let memory = new Float64Array(1024)
let head = 0

// Reserves a contiguous block of memory consisting of 'size' boxes. Returns a pointer to the first box, or null
let allocate = (size) => {
  if (head + size > memory.length) {
    return null
  }
  let start = head
  head += size
  return start
}

// Frees the block of memory reserved using allocate (not really though)
let free = (ptr) => {
}

// Copies 'size' boxes from 'from' pointer to 'to' pointer.
let copy = (to, from, size) => {
  if (from === to) {
    return
  } else if (from > to) {
    // iterate forwards
    for (var i = 0; i < size; i++) {
      set(to + i, get(from + i))
    }
  } else {
    // iterate backwards
    for (var i = size - 1; i >= 0; i--) {
      set(to + i, get(from + i))
    }
  }
}

// Returns the value stored at a certain memory address
let get = (ptr) => {
  return memory[ptr]
}

// Sets the value stored at a certain memory address
let set = (ptr, value) => {
  memory[ptr] = value
}

exports.allocate = allocate
exports.free = free
exports.copy = copy
exports.get = get
exports.set = set

// // Seattle
// [0] [1] [2] [3] [4] [5] [6]
// [ ] [ ] [ ] [ ] [ ] [ ] [ ]
// head = 0 // next available house is 0
// size = 1
