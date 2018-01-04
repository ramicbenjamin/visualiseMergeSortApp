import * as d3 from 'd3';

class MergeSort {
  computeSteps(items) {
    let depth = items.length.toString(2).length + 1,
      steps = [items, []];

    for (let i = 0; i < items.length; i += 2) {
      steps[1].push(this.merge([items[i]], [items[i + 1]]));
    }

    for (let i = 2; i < depth; i++) {
      steps[i] = [];

      let current = steps[i - 1];

      for (let j = 0; j < current.length; j += 2) {
        steps[i].push(this.merge(
          current[j],
          current[j + 1] ? current[j + 1] : []
        ));
      }
    }

    for (let i = 1; i < depth; i++) {
      steps[i] = d3.merge(steps[i]);
    }

    return steps;
  }

  merge(array1, array2) {
    let merged = [],
      i = 0, j = 0;

    while (i < array1.length || j < array2.length) {
      if (array1[i] < array2[j]) {
        merged.push(array1[i++]);
      } else if (array2[j] < array1[i]) {
        merged.push(array2[j++]);
      } else if (i === array1.length) {
        merged.push(array2[j++]);
      } else {
        merged.push(array1[i++]);
      }
    }

    return merged;
  }
}

export default new MergeSort
