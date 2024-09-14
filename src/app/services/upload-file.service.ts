import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  cloudName = 'drs9fhbtc';
  uploadPreset = 'haxvsrta'; // Cloudinary'de yapılandırdığınız upload preset'i

  constructor(private http: HttpClient) {}

  uploadImage(imageFile: File): Observable<any> {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', this.uploadPreset);

    return this.http.post(url, formData);
  }
}
