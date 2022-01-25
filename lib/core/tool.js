const path = require('path');
const fs = require('fs');
const mime = require('mime');

exports.decodePathname = (pathname) => {
  const pieces = pathname.replace(/\\/g, '/').split('/');

  const normalized = path.normalize(pieces.map((rawPiece) => {
    const piece = decodeURIComponent(rawPiece);

    if (process.platform === 'win32' && /\\/.test(piece)) {
      throw new Error('Invalid forward slash character');
    }

    return piece;
  }).join('/'));
  return process.platform === 'win32'
    ? normalized.replace(/\\/g, '/') : normalized;
};

exports.ensureUriEncoded = (text) => {
  return text;
};

// Check to see if we should try to compress a file with gzip.
exports.shouldCompressGzip = (req) => {
  const headers = req.headers;

  return headers && headers['accept-encoding'] &&
    headers['accept-encoding']
      .split(',')
      .some(el => ['*', 'compress', 'gzip', 'deflate'].indexOf(el.trim()) !== -1)
  ;
};

exports.shouldCompressBrotli = (req) => {
  const headers = req.headers;

  return headers && headers['accept-encoding'] &&
    headers['accept-encoding']
      .split(',')
      .some(el => ['*', 'br'].indexOf(el.trim()) !== -1);
};

exports.hasGzipId12 = (gzipped, cb) => {
  const stream = fs.createReadStream(gzipped, { start: 0, end: 1 });
  let buf = Buffer.from('');
  let hasBeenCalled = false;

  stream.on('data', (chunk) => {
    buf = Buffer.concat([buf, chunk], 2);
  });

  stream.on('error', (err) => {
    if (hasBeenCalled) {
      throw err;
    }

    hasBeenCalled = true;
    cb(err);
  });

  stream.on('close', () => {
    if (hasBeenCalled) {
      return;
    }

    hasBeenCalled = true;
    cb(null, buf[0] === 31 && buf[1] === 139);
  });
};

/**
 * 获取文件的 Content-Type 并特殊处理视频文件
 * @param {string} filePath 文件全路径
 * @param {string} defaultType 默认 Content-Type
 * @returns {string} 文件的 Content-Type
 */
exports.getContentType = (filePath, defaultType) => {
  const contentType = mime.getType(filePath, defaultType);
  if (!/^video/i.test(contentType)) {
    return contentType;
  }
  return /(mp4|webm)/i.test(contentType) ? contentType : 'video/mp4';
};
