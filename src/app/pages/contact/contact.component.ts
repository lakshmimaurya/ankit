import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
import { environment } from "../../../environments/environment";

const BACKEND_URL = environment.apiUrl + "/mail/";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private http: HttpClient) { }

  ngOnInit(): void {
    $('#main-menu').removeClass("show");

    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }



  onSendMail(){
    const mailBody = {
      email: this.contactForm.value.email,
      subject: this.contactForm.value.subject,
      message: this.contactForm.value.message + "<br /><br /> From,<br />"+ this.contactForm.value.name
    }
    this.http.post<{message: string}>(BACKEND_URL, mailBody).subscribe(result=>{
      if(result.message == "Mail Sent"){ document.getElementById("successMessage").click();}
      else{ document.getElementById("failMessage").click();}
      this.contactForm.reset();
    });
  }
}
