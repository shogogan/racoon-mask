import {Directive, NgModule} from "@angular/core";

@Directive({
    selector: "[rPCalendarMask]",

})
export class PrimeNgCalendarMaskDirective {

}

@NgModule({

    declarations: [
        PrimeNgCalendarMaskDirective
    ],
    exports: [
        PrimeNgCalendarMaskDirective
    ]
})
export class PrimeNgCalendarMaskModule {

}
