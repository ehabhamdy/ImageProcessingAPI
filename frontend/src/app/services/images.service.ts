import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ImagesService {
  constructor(private http: HttpClient) {}

  addImage(image: File) {
    const postData = new FormData();
    postData.append('image', image);

    return this.http
      .post<{ message: string }>(
        'http://localhost:3000/api/images/uploadImage',
        postData
      );
  }
}
