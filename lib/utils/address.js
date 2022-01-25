const os = require('os');

function __address() {
  const ifaces = os.networkInterfaces();
  const address = Object.keys(ifaces).reduce((r, k) => r.concat(...ifaces[k]), []);
  const all = address.filter(i => i.family === 'IPv4').map(i => i.address);
  const ip = address.find(i => i.family === 'IPv4' && !i.internal).address;
  return { all, ip };
}

module.exports = __address();
