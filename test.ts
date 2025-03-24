import { bar } from './bar';

function foo(bar: string) {
  console.log(bar);
}

bar(5, () => foo('hello'));
