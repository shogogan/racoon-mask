import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { InputMaskModule } from "../../projects/racoon/src/lib/input-mask/input-mask.directive";
import { PrimeNgCalendarMaskModule } from "../../projects/racoon/src/lib/prime-ng-calendar-mask/prime-ng-calendar-mask";
import { CalendarModule } from "primeng/primeng";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CrudeComponent } from "./crude/crude.component";
import { PrimengComponent } from "./primeng/primeng.component";
import { AppRouting } from "./app.routing";
import { MenuComponent } from "./menu/menu.component";

@NgModule({
    imports: [
        BrowserModule,
        InputMaskModule,
        PrimeNgCalendarMaskModule,
        CalendarModule,
        BrowserAnimationsModule,
        AppRouting
    ],
    declarations: [
        AppComponent,
        CrudeComponent,
        PrimengComponent,
        MenuComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
