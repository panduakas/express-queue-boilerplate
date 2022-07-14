const xlsx = require('json-as-xlsx');
const path = require('path');
const { existsSync, mkdirSync } = require('fs');

const generateXlsx = ({
  fileName,
  xlsxDir,
  data,
}) => {
  const settings = {
    fileName: path.resolve(`${xlsxDir}/`, fileName), // Name of the resulting spreadsheet
    extraLength: 3, // A bigger number means that columns will be wider
    writeOptions: {
      // type: 'buffer',
      bookType: 'xlsx',
    },
  };

  if (!existsSync(xlsxDir)) mkdirSync(xlsxDir);

  xlsx(data, settings); // Will download the excel file

  const result = {
    pathLocalFile: path.resolve(`${xlsxDir}/`, fileName), // Name of the resulting spreadsheet
    localFileName: fileName,
  };

  return result;
};

module.exports = {
  generateXlsx,
};
