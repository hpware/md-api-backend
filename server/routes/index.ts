export default defineEventHandler(async (event) => {
  setHeader(event, "Content-Type", "text/html");
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>API</title>
      <!--Legacy Style Toolkit-->
      <link rel="stylesheet" href="https://old.hwtw.cc/style.css"/>
      <link rel="stylesheet" href="https://old.hwtw.cc/mobile-style.css"/>
    </head>
    <body>
      <div>
        <h1>Docs</h1>
        <p>Link: <a href="/docs">/docs</a></p>
      </div>
    </body>
  </html>
  `;
});
