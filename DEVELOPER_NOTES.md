# Developer's Notes

<!-- ## LibreOffice configuration changes.
https://unix.stackexchange.com/questions/608198/changing-the-ui-font-for-libreoffice-in-linux

1. Go to the location where the configuration file is located.
    ```sh
    cd /opt/libreoffice7.4/share/registry
    ```
1. Back up the original configuration.
    ```sh
    sudo cp -a main.xcd main.xcd.bak
    ``` -->
## Check the fonts embedded in the PDF.
1. Install Poppler.  
    Poppler is a very powerful tool in PDF processing; the package name to install on Linux is poppler-utils.
    ```sh
    sudo yum -y install poppler-utils
    ```
1. Check the fonts embedded in the PDF.  
    The important column is &quot;emd&quot;. If &quot;emd&quot; is &quot;yes&quot;, the font is embedded.
    ```sh
    pdffonts sample.pdf
    # name                                 type              encoding         emb sub uni object ID
    # ------------------------------------ ----------------- ---------------- --- --- --- ---------
    # BAAAAA+IPAPGothic                    TrueType          WinAnsi          yes yes yes     19  0
    # CAAAAA+DejaVuSans                    TrueType          WinAnsi          yes yes yes     29  0
    # DAAAAA+Meiryo                        TrueType          WinAnsi          yes yes yes     64  0
    # EAAAAA+YuGothic-Regular              TrueType          WinAnsi          yes yes yes     39  0
    # FAAAAA+YuMincho-Regular              TrueType          WinAnsi          yes yes yes     34  0
    # GAAAAA+MS-Gothic                     TrueType          WinAnsi          yes yes yes     44  0
    # HAAAAA+MS-Mincho                     TrueType          WinAnsi          yes yes yes     49  0
    # IAAAAA+MS-PGothic                    TrueType          WinAnsi          yes yes yes     54  0
    # JAAAAA+MS-PMincho                    TrueType          WinAnsi          yes yes yes     59  0
    # KAAAAA+DejaVuSans-Bold               TrueType          WinAnsi          yes yes yes     24  0
    ```
