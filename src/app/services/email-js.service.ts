import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailJsService {

  constructor() { }
  sendEmail(form: any) {
    return emailjs
    .send('service_rqqo71h', 'template_ivj0ckn', form, {
      publicKey: 'XMhRIDA9NRJdqCFtZ',
    })
    .then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
      },
      (err) => {
        console.log('FAILED...', err);
      },
    );
  }
}
