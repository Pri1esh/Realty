// https://stackoverflow.com/questions/55175445/cant-import-svg-into-next-js

declare module '*.svg' {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare const __EXPLORE_SHANTIGRAM__: boolean;
declare const __RECAPTCHA__: boolean;
