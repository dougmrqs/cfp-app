import { bar } from './bar.ts';

function foo(baz: string) {
  console.log(baz);
}

bar(5, () => foo('hello'));
