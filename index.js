// Collections Functions (Array or Object)

// standardizeInput is a helper function to use with the functions that need to
// work with either objects or arrays
// It checks whether the input is an array and, if so, returns a copy of it;
// otherwise, it uses JavaScript's Object.values method to return an array that
// contains the values of the object's properties

const standardizeInput = function(collection) {
    return (collection instanceof Array) ? collection.slice() : Object.values(collection);
}
  
const myEach = function(collection, callback) {
    const newCollection = standardizeInput(collection);
  
    for (let idx = 0; idx < newCollection.length; idx++) {
        callback(newCollection[idx]);
    }
  
    return collection;
}
  
const myMap = function(collection, callback) {
    const newCollection = standardizeInput(collection);
  
    const newArray = [];
  
    for (let idx = 0; idx < newCollection.length; idx++) {
        newArray.push(callback(newCollection[idx]));
    }
  
    return newArray;
}
  
const myReduce = function(collection, callback, accumulator) {
    let newCollection = standardizeInput(collection);
  
    // The if statement below handles the case where no start value is passed in 
    // for the accumulator
    // If acc is null, it is set equal to the first value in newCollection
    // That first value is then sliced out of newCollection since it has already
    // been accounted for
    if (!accumulator) {
        accumulator = newCollection[0];
        newCollection = newCollection.slice(1);
    }
  
    const len = newCollection.length;
  
    for (let i = 0; i < len; i++) {
        accumulator = callback(accumulator, newCollection[i], newCollection);
    }
    return accumulator;
}
  
const myFind = function(collection, predicate) {
    const newCollection = standardizeInput(collection);
  
    for (let idx = 0; idx < newCollection.length; idx++) {
        if (predicate(newCollection[idx])) return newCollection[idx];
    }
  
    return undefined;
}
  
const myFilter = function(collection, predicate) {
    const newCollection = standardizeInput(collection);
  
    const newArray = [];
  
    for (let idx = 0; idx < newCollection.length; idx++) {
        if (predicate(newCollection[idx])) newArray.push(newCollection[idx]);
    }
  
    return newArray;
}
  
const mySize = function(collection) {
    const newCollection = standardizeInput(collection);
    return newCollection.length;
}
  
  // Array Functions
  
const myFirst = function(array, stop=false) {
    return (stop) ? array.slice(0, stop) : array[0];
}
  
const myLast = function(array, start=false) {
    return (start) ? array.slice(array.length-start, array.length) : array[array.length-1];
}
  
const mySortBy = function(array, callback) {
    const newArray = [...array];
    return newArray.sort(function(a, b) {
        if (callback(a) > callback(b)) {
            return 1;
        } else if (callback(b) > callback(a)) {
            return -1;
        } else {
            return 0;
        }
    });
}
  
// unpack is a helper function for myFlatten that is used when shallow is true
// It takes each element of the input array (whether it's a primitive value or
// an array) and pushes it into the output array
const unpack = function(receiver, array) {
    for (let value of array) {
        receiver.push(value);
    }
}
  
// myFlatten handles two separate cases: shallow=true and shallow=false
// For the true case, the top-level elements are simply pushed into newArray using
// the unpack helper function
// For the false case, myFlatten is called recursively for each element
const myFlatten = function(collection, shallow, newArray=[]) {
    if (shallow) {
        for (let value of collection) {
            Array.isArray(value) ? unpack(newArray, value) : newArray.push(value);
        }
    } else {
        // shallow = false (recursive case)
        for (let value of collection) {
            if (Array.isArray(value)) {
                // Below, we pass newArray as an argument when we call myFlatten recursively 
                // because we need to retain the values that were pushed in previous calls
                myFlatten(value, false, newArray);
            } else {
                newArray.push(value);
            }
        }
    }
    return newArray;
}
  
// Object Functions
  
const myKeys = function(object) {
    const keys = [];
    for (let key in object){
        keys.push(key);
    }
    return keys;
}
  
const myValues = function(object) {
    const values = [];
    for (let key in object){
        values.push(object[key]);
    }
    return values;
  
}