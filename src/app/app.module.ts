import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {InputMaskModule} from "../../projects/racoon/src/lib/input-mask/input-mask.directive";
import {PrimeNgCalendarMaskModule} from "../../projects/racoon/src/lib/prime-ng-calendar-mask/prime-ng-calendar-mask";
import {CalendarModule} from "primeng/primeng";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    imports: [
        BrowserModule,
        InputMaskModule,
        PrimeNgCalendarMaskModule,
        CalendarModule,
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
