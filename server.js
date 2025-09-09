const http = require('http');
const url  = require('url');

const USER = 'sajedoo';
const PASS = 'QYsfBB0Chj8ovFAJB9t5Gx80g2JT9Xx6IFNHgWx...'; // ← همان رمزت
const LINE = '30007732910609';
const API  = 'https://sms-proxy-2.termux.dev/send';

http.createServer((req, res) => {
  const q = url.parse(req.url, true).query;
  if (!q.mobile || !q.text) {
    res.writeHead(400); return res.end('ERROR: mobile or text missing');
  }
  const mob = q.mobile, txt = encodeURIComponent(q.text);
  const link = `${API}?username=${USER}&password=${PASS}&line=${LINE}&mobile=${mob}&text=${txt}`;
  require('http').get(link, (r) => {
    let b = ''; r.on('data', c => b += c); r.on('end', () => res.end(b));
  }).on('error', e => { res.writeHead(502); res.end('SMS Gateway Error'); });
}).listen(process.env.PORT || 3000);
