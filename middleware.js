// Content negotiation per agenti AI: Accept: text/markdown -> versione Markdown della pagina.
// Si attiva SOLO se l'header Accept contiene text/markdown: i browser non passano di qui.
export const config = {
  matcher: [
    {
      source: '/((?!_astro/|img/|video/|md/)[^.]*)',
      has: [{ type: 'header', key: 'accept', value: '(.*)text/markdown(.*)' }],
    },
  ],
};

export default function middleware(request) {
  const url = new URL(request.url);
  const p = url.pathname.replace(/\/+$/, '');
  const dest = p === '' ? '/md/index.md' : '/md' + p + '.md';
  return new Response(null, {
    headers: { 'x-middleware-rewrite': new URL(dest, request.url).toString() },
  });
}
