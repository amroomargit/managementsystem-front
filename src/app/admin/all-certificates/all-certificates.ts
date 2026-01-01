import { Component, inject } from '@angular/core';
import { BackendService } from '../../backend-service';
import { NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { CertificateDTO } from '../../models/certificate-dto';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { GridViewPopup } from '../../grid-view-popup/grid-view-popup';

@Component({
  selector: 'app-all-certificates',
  imports: [NgFor,NgIf],
  templateUrl: './all-certificates.html',
  styleUrl: './all-certificates.css',
})
export class AllCertificates {
  backendService = inject(BackendService);
  public certificates: Observable<CertificateDTO[]>|null=null;
  private http = inject(HttpClient);
  private dialog = inject(MatDialog);

  ngOnInit(){
    this.backendService.loadAllCertificates();
  }

   updateCertificate(certificateId:number){

   }

   deleteCertificate(certificateId:number){

   }

   printCertificate(certificateId:number){
    const dialogRef = this.dialog.open(GridViewPopup,{
      width: '2000px',
      data:{
        id:certificateId,
        title:`Printable Certificate`,
        action:"Print Certificate",
      }
    });
    dialogRef.afterClosed().subscribe();
   }

   insertCertificate(){

   }

}
