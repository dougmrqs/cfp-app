import { sayHello } from '../src/index'

describe("Hello World", () => {
  it("shows Hello World", () => {
    const message = sayHello();

    expect(message).toBe("Hello World");
  });
});
