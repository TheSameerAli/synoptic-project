import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { CategoryService } from '../../../services/category/category.service';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  public categories: Category[];
  constructor(private _categoryService: CategoryService, private eRef: ElementRef) { }
  public selectedCategoryIndex: number = undefined;

  ngOnInit() {
    this.categories = this._categoryService.getCategories();
  }

  updateCategoyList() {
    this.categories = this._categoryService.getCategories();
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      if (event.path[2].localName === 'thead') {
        this.resetSelectedCategory();
      }
    } else {
      this.resetSelectedCategory();
    }
  }

  selectCategory(index) {
    this.selectedCategoryIndex = index;
  }

  deleteCategory() {
    this._categoryService.delete(this.categories[this.selectedCategoryIndex]);
    this.resetSelectedCategory();
    this.updateCategoyList();
  }

  resetSelectedCategory() {
    this.selectedCategoryIndex = undefined;
  }
}
