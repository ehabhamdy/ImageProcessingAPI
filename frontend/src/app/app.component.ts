import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImagesService } from './services/images.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ImageProcessingFrontEnd';
  form: FormGroup;
  imagePreview = '';

  constructor(public imagesService: ImagesService) {}

  onImagePicked(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      image: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  onSaveImage(): void {
    if (this.form.invalid) {
      return;
    }

    const image = this.form.value.image;
    this.imagesService.addImage(image).subscribe((responseData) => {
      console.log(responseData);
    });

    this.form.reset();
  }
}
