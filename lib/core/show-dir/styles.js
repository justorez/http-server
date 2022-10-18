const icons = require('./icons.json');

const IMG_SIZE = 16;

let css = `
.index-title {
  margin-top: 0;
}
i.icon {
  display: block;
  width: ${IMG_SIZE}px;
  height: ${IMG_SIZE}px;
}
table tr {
  white-space: nowrap;
}
td.perms {}
td.file-size {
  padding-left: 1em;
  text-align: right;
}
td.display-name {
  padding-left: 1em;
  padding-bottom: .5em;
}
td.display-name a {
  text-decoration: none;
  color: #000;
}
td .file-info {
  margin-top: 3px;
  color: #b1adad;
  font-size: 12px;
}`;

Object.keys(icons).forEach((key) => {
  css += `
    i.icon-${key} {
      background-image: url("data:image/png;base64,${icons[key]}");
    }`;
});

exports.icons = icons;
exports.css = css;
