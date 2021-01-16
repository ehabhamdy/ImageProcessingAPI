import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ImagesService {
  constructor(private http: HttpClient) {}

  addImage(image: File): Observable<{ message: string }> {
    const postData = new FormData();
    postData.append('image', image);

    return this.http.post<{ message: string }>(
      'http://localhost:3000/api/images/uploadImage',
      postData
    );
  }

  fetchImages(): Observable<{ message: string; images: string[] }> {
    return this.http.get<{ message: string; images: string[] }>(
      'http://localhost:3000/api/images/'
    );
  }
}
