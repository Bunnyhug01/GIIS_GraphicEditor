import Point from "../objects/Point";

export default function makeIterator(array: Point[]) {
    var nextIndex = 0;
  
    return {
      next: function () {
        return nextIndex < array.length
          ? { value: array[nextIndex++], done: false }
          : { done: true };
      },
    };
}