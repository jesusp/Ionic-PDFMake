import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pdfObject: any;

  constructor(public navCtrl: NavController,
    public file: File,
    public fileOpener: FileOpener,
    public platform: Platform
  ) {

  }

  generatePDF() {

    let docDefinition = {
      content: [
        'Hello World',
      ]
    };

    this.pdfObject = pdfMake.createPdf(docDefinition);

    alert('PDF Generado');
    
  }

  openPDF() {

    if(this.platform.is('cordova' )) {
      this.pdfObject.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'hello.pdf', blob, { replace: true }).then(fileEntry => {

          this.fileOpener.open(this.file.dataDirectory + 'hello.pdf', 'application/pdf');

        });

      });

      return true;
    }

    this.pdfObject.download();
    

  }

}
