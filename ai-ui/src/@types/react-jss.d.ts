
declare module "react-jss" {
  export default function injectSheet<P, S>(styles: any): (component: any) => new () => React.Component<P, S>;
}

