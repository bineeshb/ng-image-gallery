import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.scss']
})
export class ViewImageComponent {
  isVisible = false;
  @Output() isImageVisibleChange = new EventEmitter();

  @Input() imageParams = null;
  @Input()
  set isImageVisible(isVisible: boolean) {
    this.isVisible = isVisible;
    this.isImageVisibleChange.emit(isVisible);
  }

  get isImageVisible(): boolean {
    return this.isVisible;
  }
}
