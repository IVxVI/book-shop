function generateRandomInd(length: number): number[] {
  let indexes: number[] = [];
  const getRandomIndex = () => Math.floor(Math.random() * length);
  while(indexes.length !== 7) {
    const index = getRandomIndex();
    indexes.push(index);

    indexes = [...new Set(indexes)];
  }

  
  return indexes;
}

export default generateRandomInd;
