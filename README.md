![msoffice2pdf](hero.svg)

Convert Microsoft Office documents (ppt, pptx, doc, docx, xls, xlsx) to PDF.   
Click [here](CHANGELOG.md) to see the change log.

<p align="center">
  <img src="docs/img/convert.svg" width="406">
</p>

## Supported OS
- Linux
- MAC
- Windows

## Requirements
LibreOffice version 5.3 or higher is required.  
See [https://www.libreoffice.org/get-help/install-howto/](https://www.libreoffice.org/get-help/install-howto/) for installation instructions.

## Installation
```sh
npm install --save msoffice2pdf
```

## Usage
1. Load msoffice2pdf.
    ```js
    const msoffice2pdf = require('msoffice2pdf');
    ```

    in Node >v7 you can do (very pretty):
    ```js
    import msoffice2pdf from 'msoffice2pdf'
    ```
1. Convert office documents to PDF.
    ```js
    await msoffice2pdf('sample.pptx', 'sample.pdf');
    ```

    You can also specify the LibreOffice that msoffice2pdf invokes internally.   
    If libreOffice is not specified, it will It will automatically look for the following.    
    - For Linux:  
        /usr/bin/libreoffice  
        /usr/bin/soffice  
        /snap/bin/libreoffice  
    - For MAC:  
        /Applications/LibreOffice.app/Contents/MacOS/soffice
    - For WIndows:    
        C:\Program Files\LibreOffice*\program\soffice.exe  
        C:\Program Files (x86)\LibreOffice*\program\soffice.exe
    ```js
    await msoffice2pdf('sample.pptx', 'sample.pdf', {
      libreOfficeBinaryPath: '/opt/libreoffice/program/soffice'
    });
    ```

    Use the language option to specify the language of the input file.  
    Click [here](LANGUAGE-LIST.md) for available language options.
    ```js
    await msoffice2pdf('sample.pptx', 'sample.pdf', {
      language: 'ja'
    });
    ```

## msoffice2pdf API
### Syntax
```js
msoffice2pdf(inputPath, outputPath);
msoffice2pdf(inputPath, outputPath, {
  libreOfficeBinaryPath: '/opt/libreoffice/program/soffice'
});
msoffice2pdf(inputPath, outputPath, {
  language: 'ja'
});
msoffice2pdf(inputPath, outputPath, {
  libreOfficeBinaryPath: '/opt/libreoffice/program/soffice',
  language: 'ja'
});
```

### Parameters
- inputPath: string
    Paths to office documents (ppt, pptx, doc, docx, xls, xlsx).
- outputPath: string
    PDF Path.
- options.libreOfficeBinaryPath?: string
    The path to the libreOffice executable (soffice) that you installed.  
    The default is to use the file found by looking for the following file.  
    - For Linux:  
        /usr/bin/libreoffice  
        /usr/bin/soffice  
        /snap/bin/libreoffice
    - For MAC:  
        /Applications/LibreOffice.app/Contents/MacOS/soffice
    - For WIndows:  
        C:\Program Files\LibreOffice*\program\soffice.exe  
        C:\Program Files (x86)\LibreOffice*\program\soffice.exe
- options.language?: string
    Document Language. Default is undefined.  
    Click [here](LANGUAGE-LIST.md) for available language options.
    
### Return value
Promise&lt;void&gt;

### Throws
- UnsupportedOSError  
    For unsupported operating systems. msoffice2pdf supports Linux, MAC, and Windows.
- LibreOfficeNotFoundError  
    LibreOffice executable not found, please install LibreOffice.
- SpecifiedLibreOfficeNotFoundError  
    The specified LibreOffice executable cannot be found.
- InputFileNotFoundError  
    The input file to be converted cannot be found.
- UnsupportedFileError  
    An unsupported file was specified as the conversion source.  
    msoffice2pdf supports ppt, pptx, doc, docx, xls, xlsx as conversion sources.
- UnsupportedLanguageError  
    An unsupported language was specified.

## Unit testing
```sh
npm run test
# > msoffice2pdf@1.0.0 test
# > jest
# 
#  PASS  tests/case-of-exception.test.js
#   Case of exception
#     √ Should throw an error for unsupported OS (159 ms)
#     √ Should throw an error for unsupported input file (2 ms)
#     √ Should throw an error for input file not found (2 ms)
#     √ Should throw an error for LibreOffice not found (2 ms)
#     √ Should throw an error for unsupported language option (3 ms)
# 
#  PASS  tests/convert-word97-2003-to-pdf.test.js (19.745 s)
#   Convert Word97-2003 to PDF
#     √ Should convert Word97-2003 to PDF (9283 ms)
#     √ Should convert Word97-2003 to PDF using the language option (8111 ms)
# 
#  PASS  tests/convert-word-to-pdf.test.js (19.993 s)
#   Convert Word to PDF
#     √ Should convert Word to PDF (9585 ms)
#     √ Should convert Word to PDF using the language option (8199 ms)
# 
#  PASS  tests/convert-powerpoint97-2003-to-pdf.test.js (20.683 s)
#   Convert PowerPoint97-2003 to PDF
#     √ Should convert PowerPoint97-2003 to PDF (9990 ms)
#     √ Should convert PowerPoint97-2003 to PDF using the language option (8349 ms)
# 
#  PASS  tests/convert-powerpoint-to-pdf.test.js (21.484 s)
#   Convert PowerPoint to PDF
#     √ Should convert PowerPoint to PDF (10715 ms)
#     √ Should convert PowerPoint to PDF using the language option (8599 ms)
# 
#  PASS  tests/convert-excel97-2003-to-pdf.test.js (21.665 s)
#   Convert Excel97-2003 to PDF
#     √ Should convert Excel97-2003 to PDF (10967 ms)
#     √ Should convert Excel97-2003 to PDF using the language option (8539 ms)
# 
#  PASS  tests/convert-excel-to-pdf.test.js (21.985 s)
#   Convert Excel to PDF
#     √ Should convert Excel to PDF (11462 ms)
#     √ Should convert Excel to PDF using the language option (8254 ms)
# 
# Test Suites: 7 passed, 7 total
# Tests:       17 passed, 17 total
# Snapshots:   0 total
# Time:        22.716 s, estimated 24 s
# Ran all test suites.
```

## Author
**Takuya Motoshima**

* [github/takuya-motoshima](https://github.com/takuya-motoshima)
* [twitter/TakuyaMotoshima](https://twitter.com/TakuyaMotoshima)
* [facebook/takuya.motoshima.7](https://www.facebook.com/takuya.motoshima.7)

## License
[MIT](LICENSE)