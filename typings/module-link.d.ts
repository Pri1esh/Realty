// https://stackoverflow.com/questions/55175445/cant-import-svg-into-next-js
import 'react';

declare module 'react' {
  interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
    hreflang?: string;
  }
}
