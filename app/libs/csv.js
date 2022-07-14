const fs = require('fs');
const csv = require('@fast-csv/format');

class CsvFile {
  static write(filestream, rows, options) {
    return new Promise((res, rej) => {
      csv.writeToStream(filestream, rows, options)
        .on('error', err => rej(err))
        .on('finish', () => res());
    });
  }

  constructor(opts) {
    this.headers = opts.headers;
    this.path = opts.path;
    this.delimiter = opts.delimiter;
    this.transform = opts.transform;
    this.writeOpts = {
      headers: this.headers,
      transform: this.transform,
      includeEndRowDelimiter: true,
      delimiter: this.delimiter,
    };
  }

  create(rows) {
    return CsvFile.write(fs.createWriteStream(this.path), rows, { ...this.writeOpts });
  }

  append(rows) {
    return CsvFile.write(fs.createWriteStream(this.path, { flags: 'a' }), rows, {
      ...this.writeOpts,
      writeHeaders: false,
    });
  }

  read() {
    return new Promise((res, rej) => {
      fs.readFile(this.path, (err, contents) => {
        if (err) return rej(err);
        return res(contents);
      });
    });
  }
}

module.exports = {
  CsvFile,
};
