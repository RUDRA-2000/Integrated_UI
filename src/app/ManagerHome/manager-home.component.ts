import { Component } from '@angular/core';
import { EnquiryDisplay } from '../ManagerModel/enquiry-display';
import { ManagerServiceService } from '../ManagerService/manager-service.service';
import { ActivatedRoute } from '@angular/router';
import { EnquiryUrlData } from '../ManagerModel/enquiry-url-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styleUrl: './manager-home.component.css'
})
export class ManagerHomeComponent {
  enquiriesPending: EnquiryDisplay[] = [];
  enquiriesApproved: EnquiryDisplay[] = [];
  enquiriesRejected: EnquiryDisplay[] = [];
  id:number=0;



  urlData: EnquiryUrlData | undefined;


  constructor(
    private managerService: ManagerServiceService,
    private currentRoute:ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    
    this.id = this.currentRoute.snapshot.params["id"];
    window.sessionStorage.setItem('managerId',this.id.toString());
    this.fetchEnquiries(this.id);
  }



  fetchEnquiries(id:number)
  {

     
    this.managerService.getPendingList(id)
      .subscribe(enquiries => {
        this.enquiriesPending = enquiries
      })
    this.managerService.getApprovedList(id)
      .subscribe(enquiries => {
        this.enquiriesApproved = enquiries
      })
    this.managerService.getRejectedList(id)
      .subscribe(enquiries => {
        this.enquiriesRejected = enquiries
      })
  }

  onManagerId(enquiryId : number){
    this.urlData = new EnquiryUrlData(enquiryId,this.id);  
    var obj = JSON.stringify(this.urlData)
    this.router.navigate(['/manager-enquiry' , enquiryId,this.id])
  }
}
