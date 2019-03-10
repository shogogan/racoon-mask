import { Directive, ElementRef, HostListener, Input, NgModule } from "@angular/core";
import { MaskingBase } from "racoon-mask-base";


@Directive({
    selector: "[rInputMask]"
})
export class InputMaskDirective extends MaskingBase {
    private update: boolean;

    constructor(public el: ElementRef) {
        super();
        this._input = el.nativeElement;
    }

    @Input() set input(input: ElementRef) {
        this._input = input.nativeElement;
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
        if (this.update) {
            this.update = false;
            return;
        }
        this.checkValue();
    }

    updateInput(): void {
        super.updateInput();
        this.update = true;
        this._input.dispatchEvent(new Event("input"));
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
