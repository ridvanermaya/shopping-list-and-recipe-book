import { LoggingService } from './../logging.service';
import { SharedModule } from './../shared/shared.module';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { FormsModule } from '@angular/forms';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    ShoppingListRoutingModule
  ],
  // providers: [LoggingService]
})
export class ShoppingListModule {

}
