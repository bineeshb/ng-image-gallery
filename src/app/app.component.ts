import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ImagesDetailsService } from './services/images-details.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy, OnInit {
  images = [];
  pagination = {
    pageNumber: 1,
    pageSize: 30,
    totalRecords: 0
  };
  apiSubscription: Subscription = null;
  isFetching = false;
  isShowImage = false;
  selectedImage = null;

  constructor(private readonly imagesDetailsService: ImagesDetailsService) {}

  ngOnInit(): void {
    this.fetchImages();
  }

  fetchImages(pageNumber = this.pagination.pageNumber, pageSize = this.pagination.pageSize): void {
    this.isFetching = true;
    this.apiSubscription = this.imagesDetailsService.getImages(pageNumber, pageSize)
      .pipe(
        finalize(() => this.isFetching = false)
      )
      .subscribe(response => {
        this.images = response.data;
        this.pagination = {
          pageNumber: response.pageNumber,
          pageSize: response.pageSize,
          totalRecords: response.total
        };
      });
  }

  goToPage({ pageNumber }): void {
    this.fetchImages(pageNumber);
  }

  showImage(imageId: string): void {
    const matchedImage = this.images.find(({ id }) => id === imageId);

    if (matchedImage) {
      this.isShowImage = true;
      this.selectedImage = {
        altDescription: matchedImage.alt_description,
        description: matchedImage.description,
        height: matchedImage.height,
        portfolioLink: matchedImage.user.portfolio_url,
        url: matchedImage.urls.full,
        user: matchedImage.user.name,
        width: matchedImage.width
      };
    }
  }

  ngOnDestroy(): void {
    this.apiSubscription.unsubscribe();
  }
}
