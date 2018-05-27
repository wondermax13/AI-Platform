interface ITemplateProps {
  body: string;
  title: string;
  initialState: {};
  styles: string;
  mainJs: string;
  mainCss: string;
}

async function template(props: ITemplateProps) {
  const temp = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"><meta name="theme-color" content="#000000"><link rel="stylesheet" href="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-core/9.5.0/css/fabric.min.css"><link rel="manifest" href="/manifest.json"><link rel="shortcut icon" href="/favicon.ico"><title>%title%</title><link href="%mainCss%" rel="stylesheet"></head><body><noscript>You need to enable JavaScript to run this app.</noscript><style rel="stylesheet" type="text/css">%styles%</style><div id="root">%body%</div><script type="text/javascript">window.__APP_INITIAL_STATE__ = JSON.parse(\"%initialState%\");</script><script type="text/javascript" src="%mainJs%"></script></body></html>';

  const keys = Object.keys(props);
  return keys.reduce((current, key) => {
    const next = current.replace(`%${key}%`, props[key]);
    return next;
  }, temp);

  // return (`<!DOCTYPE html>
  //   <html lang="en">
  //   <head>
  //     <meta charset="utf-8">
  //     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  //     <meta name="theme-color" content="#000000">
  //     <!--
  //           manifest.json provides metadata used when your web app is added to the
  //           homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
  //         -->
  //     <link rel="manifest" href="manifest.json">
  //     <link rel="shortcut icon" href="favicon.ico">
  //     <link rel="stylesheet" href="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-core/9.5.0/css/fabric.min.css">
  //     <title>${props.title}</title>
  //     <script>window.__APP_INITIAL_STATE__ = ${JSON.stringify(props.initialState)}</script>
  //     ${props.mainCss}
  //     <style>
  //       ${props.styles}
  //     </style>
  //   </head>
  //   <body style="height:500px;position:relative">
  //     <noscript>
  //       You need to enable JavaScript to run this app.
  //     </noscript>
  //     <div id="root" style="height:500px;position:relative">${props.body}</div>
  //     <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
  //     <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  //     ${props.mainJs}
  //   </body>
  //   </html>`);
};

export { ITemplateProps, template };