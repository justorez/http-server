// function lastModifiedToString(stat) {
//   const t = new Date(stat.mtime);
//   return (('0' + (t.getDate())).slice(-2) + '-' +
//           t.toLocaleString('default', { month: 'short' }) + '-' +
//           t.getFullYear() + ' ' +
//           ('0' + t.getHours()).slice(-2) + ':' +
//           ('0' + t.getMinutes()).slice(-2));
// }

function lastModifiedToString(stat) {
  const t = new Date(stat.mtime);
  return t.getFullYear() + '/' +
    pad(t.getMonth() + 1) + '/' +
    pad(t.getDate()) + ' ' +
    pad(t.getHours()) + ':' +
    pad(t.getMinutes());
}

function pad(s) {
  return ('0' + s).slice(-2);
}

module.exports = lastModifiedToString;
