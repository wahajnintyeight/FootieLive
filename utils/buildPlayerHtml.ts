export function buildPlayerHtml(streamUrl: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="referrer" content="always">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body { width: 100%; height: 100%; background: #000; overflow: hidden; }
          iframe { width: 100%; height: 100%; border: none; display: block; }
        </style>
      </head>
      <body>
        <iframe
          id="streamFrame"
          src="${streamUrl}"
          referrerpolicy="origin"
          allowfullscreen
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          scrolling="no"
          frameborder="0"
        ></iframe>
      </body>
    </html>
  `;
}
