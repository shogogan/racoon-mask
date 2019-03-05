import { Directive, ElementRef, HostListener, Input, NgModule } from "@angular/core";
import { MaskingBase } from "@uncannyminds/racoon-mask-base";


@Directive({
    selector: "[rInputMask]"
})
export class InputMaskDirective extends MaskingBase{

    constructor(private el: ElementRef) {
        super();
        this._input = el;
    }

    @Input() set slotChar(value: string) {
        this._slotChar = value;
    }

    @Input() set showPlaceholder(value: boolean) {
        this._showPlaceholder = value;
    }

    @Input("rInputMask") set mask(value: string) {
        this._mask = value;
    }

    @HostListener("input")
    onInput() {
        this.checkValue();
    }
}

@NgModule({
    declarations: [
        InputMaskDirective
    ],
    exports: [
        InputMaskDirective
    ]

})
export class InputMaskModule {

}
