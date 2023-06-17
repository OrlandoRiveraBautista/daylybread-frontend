const zeroPad = (value: any, padding: number) => {
  var zeroes = new Array(padding + 1).join("0");
  return (zeroes + value).slice(-padding);
};

/**
 * Function to cluster numbers  in an array that are close together
 * This will be used to tell openai which verses are selected
 */

const clusterNumbers = (numbers: number[]): number[][] => {
  //init local values
  const clusters: number[][] = [];
  let currentCluster: number[] = [];

  // loop through the arg numbers
  for (let i = 0; i < numbers.length; i++) {
    const currentNumber = numbers[i];
    const previousNumber = numbers[i - 1];

    if (i === 0 || currentNumber === previousNumber + 1) {
      // Numbers are adjacent or it's the first number
      currentCluster.push(currentNumber);
    } else {
      // Numbers are not adjacent, start a new cluster
      clusters.push(currentCluster);
      currentCluster = [currentNumber];
    }
  }

  clusters.push(currentCluster); // Add the last cluster

  return clusters;
};

export { zeroPad, clusterNumbers };
