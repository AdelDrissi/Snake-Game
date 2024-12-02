export const generateFood = () => {
  const x = Math.floor(Math.random() * 20);
  const y = Math.floor(Math.random() * 20);
  return [[x, y]];
};
