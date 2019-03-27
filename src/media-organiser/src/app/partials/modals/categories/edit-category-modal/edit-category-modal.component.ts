import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../../../models/category';
import { CategoryService } from '../../../../services/category/category.service';

@Component({
  selector: 'app-edit-category-modal',
  templateUrl: './edit-category-modal.component.html',
  styleUrls: ['./edit-category-modal.component.css']
})
export class EditCategoryModalComponent implements OnInit {
  @Input() category: Category;
  public newName: string;
  constructor(private _categoryService: CategoryService) { }

  ngOnInit() {
  }

  saveCategory() {
    this._categoryService.rename(this.category, this.newName);
  }

  resetInput() {
    this.newName = '';
  }
}
