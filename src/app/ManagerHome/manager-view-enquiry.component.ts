import { Component, OnInit } from '@angular/core';
import { Enquiry } from '../ManagerModel/enquiry';
import { ManagerServiceService } from '../ManagerService/manager-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-manager-view-enquiry',
  templateUrl: './manager-view-enquiry.component.html',
  styleUrl: './manager-view-enquiry.component.css'
})
export class ManagerViewEnquiryComponent  implements OnInit{
  enquiryId:number=0;
  managerId:number=0;
  isPending:boolean = false;
  needsCheque:string="No";
  EnquiryDetails:Enquiry = <Enquiry>{};
  isPopupVisible: boolean = false;


  constructor(
    public apiservices:ManagerServiceService,
    private currentRoute:ActivatedRoute,
    private router:Router,
    private Spinner:NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.Spinner.show();
    this.enquiryId = this.currentRoute.snapshot.params["enquiryId"];
    this.managerId = this.currentRoute.snapshot.params["managerId"];
    console.log(this.managerId)
  
    this.apiservices.getEnquiryDetails(this.enquiryId).subscribe(
      (data)=>{
        if(data.status=='2'){
          this.isPending=true;
        }
        if(data.wantsCheque==true){
          this.needsCheque="Yes"
        }
        if(data.accountType=='1'){
          data.accountType="Savings"
        }else{
          data.accountType="Current"
        }
        this.EnquiryDetails=data;
        this.EnquiryDetails.photo="data:image/jpeg;base64,"+data.photo
        this.EnquiryDetails.aadhaar="data:image/jpeg;base64,"+data.aadhaar
        this.EnquiryDetails.panCard="data:image/jpeg;base64,"+data.panCard
       
        while(this.EnquiryDetails.emailAddress==null){
          console.log("error"); 
        }
        this.Spinner.hide();
      }   
    )

    
  }

  onApprove():void{
    console.log("Approve button pressed");
    this.apiservices.approveEnquiry(this.enquiryId).subscribe(
      (Res)=>{
        console.log('api working');
        ManagerViewEnquiryComponent;
      }
    );
    this.router.navigate(['/manager',this.managerId])
  }
  onReject():void{
    this.isPopupVisible = true;
  }
  ResetPopup(){
    this.isPopupVisible = false;
  }
  closePopup(data: any) {
    this.isPopupVisible = false;
    // Handle data passed back from the popup if needed
    this.apiservices.rejectEnquiry(this.enquiryId,data).subscribe(
      (res)=>{
        ManagerViewEnquiryComponent;
      }
    )
    this.router.navigate(['/manager',this.managerId])
  }

  goBack(){
   
    this.router.navigate(['/manager',this.managerId]);
  }
}
