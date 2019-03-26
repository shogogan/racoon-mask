import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { CalendarModule } from "primeng/primeng";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CrudeComponent } from "./raw/crude.component";
import { PrimengComponent } from "./primeng/primeng.component";
import { AppRouting } from "./app.routing";
import { MenuComponent } from "./menu/menu.component";
import { FormsModule } from "@angular/forms";
import { InputMaskModule } from "racoon-mask-raw";
import { PrimeNgCalendarMaskModule } from "racoon-mask-primeng";


@NgModule({
    imports: [
        FormsModule,
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
