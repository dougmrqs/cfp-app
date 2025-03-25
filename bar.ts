export function bar(baz: number, callback: () => void) {
  for(let i = 0; i < baz; i++) {
    callback();
  }
}
