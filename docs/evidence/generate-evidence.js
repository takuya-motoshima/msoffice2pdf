const fs = require('fs');
const path = require('path');
const msoffice2pdf = require('msoffice2pdf');
const pdf2thumbnail = require('pdf2thumbnail');
const {File} = require('nodejs-shared');
const {mem, cpu} = require('node-os-utils');
const {parse} = require('json2csv');

(async () => {
  async function getDump() {
    const {usedMemPercentage, usedMemMb} = await mem.info();
    const cpuUtilization = await cpu.usage();
    const lav = cpu.loadavg();
    return {usedMemPercentage, usedMemMb, cpuUtilization, lav: lav.join(',')};
  }

  function writeCsv(csvData) {
    const csv = parse(csvData, {
      fields: [
        {label: 'Document Name', value: 'fileName'},
        {label: 'File size (bytes)', value: 'fileByteSize'},
        {label: 'Processing seconds', value: 'processingSeconds'},
        {label: 'Pre CPU utilization(%)', value: 'preCpuUtilization'},
        {label: 'Post CPU utilization(%)', value: 'postCpuUtilization'},
        {label: 'Pre Memory utilization(%)', value: 'preMemoryUtilization'},
        {label: 'Post Memory utilization(%)', value: 'postMemoryUtilization'},
        {label: 'Pre Memory usage(MB)', value: 'preMemoryUsage'},
        {label: 'Post Memory usage(MB)', value: 'postMemoryUsage'},
        {label: 'Pre Load average', value: 'preLoadAverage'},
        {label: 'Post Load average', value: 'postLoadAverage'},
      ]
    });
    fs.writeFileSync(`${__dirname}/results.csv`, csv, 'utf8');
  }

  async function officeDocumentsToPdf() {
    const officePaths = File.find(`${__dirname}/source-office-documents/*.@(ppt|pptx|doc|docx)`);
    const total = officePaths.length;
    let completed = 0;
    const csvData = [];
    for (let officePath of officePaths) {
      const start = +new Date();
      const preDump = await getDump();
      const pdfPath = `${__dirname}/destination/${path.parse(officePath).name}.pdf`;
      await msoffice2pdf(officePath, pdfPath);
      const processingSeconds = Math.round((+new Date() - start) / 1000 * 10 ** 2) / 10 ** 2;
      const postDump = await getDump();
      const fileName = path.basename(officePath);
      csvData.push({
        fileName,
        fileByteSize: fs.statSync(officePath).size,
        processingSeconds: `${processingSeconds}`,
        preCpuUtilization: preDump.cpuUtilization,
        preMemoryUtilization: preDump.usedMemPercentage,
        preMemoryUsage: preDump.usedMemMb,
        preLoadAverage: preDump.lav,
        postCpuUtilization: postDump.cpuUtilization,
        postMemoryUtilization: postDump.usedMemPercentage,
        postMemoryUsage: postDump.usedMemMb,
        postLoadAverage: postDump.lav,
      });
      console.log(`${fileName} to PDF(${++completed}/${total})`);
    }
    writeCsv(csvData);
  }

  async function pdfToImage() {
    const pdfPaths = File.find(`${__dirname}/destination/*.pdf`);
    const total = pdfPaths.length;
    let completed = 0;
    for (let pdfPath of pdfPaths) {
      const tmpDir = File.makeTmpDirectory().replace(/\/$/, '');
      await pdf2thumbnail.writeThumbnails(pdfPath, tmpDir, {width: 595, offset: 30, background: '#000'});
      const basename = File.basename(pdfPath);
      File.rename(`${tmpDir}/${basename}.jpg`, `${__dirname}/destination/${basename}.jpg`);
      File.rename(`${tmpDir}/${basename}_1.jpg`, `${__dirname}/destination/${basename}_thumb.jpg`);
      console.log(`${File.basename(pdfPath, true)} to image(${++completed}/${total})`);
    }
  }
  // await officeDocumentsToPdf();
  await pdfToImage();
})();