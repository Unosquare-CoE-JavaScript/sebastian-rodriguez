const fs = require('fs')

const getNum = async filename =>
  parseInt(await fs.readFile(filename, 'utf-8'), 10);

const getNumsFromFile = async () => {
  try {
    const numberPromises = [1, 2, 3].map(i => getNum(`{i}.txt`));
    const numbers = await Promise.all(numberPromises);
    console.log(numbers)
  } catch (error) {
    console.error('Something went wrong:')
    console.error(error)
  }
}

getNumsFromFile()