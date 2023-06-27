const { faker } = window;
const createElement = () => {
  const text = faker.random.word(2);
  return {
    text,
    completed: faker.random.boolean(),
  };
};

const repeat = (elementFactory, number) => new Array(number).fill().map(() => elementFactory());

export default () => {
  const howMany = faker.random.number(10);
  return repeat(createElement, howMany);
};
