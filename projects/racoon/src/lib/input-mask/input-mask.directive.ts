import { Directive, ElementRef, HostListener, Input, NgModule, OnInit } from "@angular/core";

@Directive({
    selector: "[rInputMask]"
})
export class InputMaskDirective implements OnInit {
    private oldValue: string;

    constructor(private el: ElementRef) {
    }

    @Input("rInputMask")
    mask: string;

    public value: string;

    private static isNumeric(s: string) {
        if (s === " ") {
            return false;
        }
        return !isNaN(Number(s));
    }

    private static isAlpha(s: string) {
        return s.match(/^[a-z]+$/i) !== null;
    }

    @HostListener("input")
    onInput() {
        this.oldValue = this.value;
        this.value = this.el.nativeElement.value;
        this.maskValue();
    }

    ngOnInit(): void {
    }

    public maskValue() {

        // TODO Adjust caret positioning
        let maskedValue = "";
        let dif = 0;
        let caretDif = 0;

        for (let i = 0; i < this.mask.length; i++) {
            if (this.value.length === i) {
                break;
            }
            const maskChar = this.mask.charAt(i + dif);
            const valueChar = this.value.charAt(i);
            if ((maskChar !== "A" || !InputMaskDirective.isAlpha(valueChar))
                && (maskChar !== "9" || !InputMaskDirective.isNumeric(valueChar))
                && valueChar !== maskChar) {
                this.value = this.value.substring(0, i) + this.value.substring(i + 1);
                i--;
                caretDif++;
            } else if (maskChar === "9") {
                if (InputMaskDirective.isNumeric(valueChar)) {
                    maskedValue += valueChar;
                } else {
                    this.value = this.value.substring(0, i) + this.value.substring(i + 1);
                    i--;
                }
            } else if (maskChar === "A") {
                if (InputMaskDirective.isAlpha(this.value.charAt(i - dif))) {
                    maskedValue += valueChar;
                } else {
                    this.value = this.value.substring(0, i) + this.value.substring(i + 1);
                    i--;
                }
            } else if (maskChar !== valueChar && maskedValue.charAt(i + dif) !== maskChar) {
                maskedValue += maskChar;
                dif++;
                i--;
            } else {
                maskedValue += maskChar;
            }
        }
        let caretPos = this.getCaretPos();
        if (this.oldValue !== maskedValue) {
            caretPos = caretPos + dif - caretDif;
            while (caretPos < this.value.length &&
            !InputMaskDirective.isNumeric(this.value.charAt(caretPos)) &&
            !InputMaskDirective.isAlpha(this.value.charAt(caretPos))) {
                caretPos++;
            }
        } else {
            caretPos--;
        }
        this.value = maskedValue;
        this.el.nativeElement.value = this.value;
        this.el.nativeElement.selectionStart = caretPos;
        this.el.nativeElement.selectionEnd = caretPos;
    }

    public getCaretPos() {
        return this.el.nativeElement.selectionStart;
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
