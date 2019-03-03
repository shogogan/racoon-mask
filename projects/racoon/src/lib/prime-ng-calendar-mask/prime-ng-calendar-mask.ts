import { AfterViewChecked, Directive, ElementRef, HostListener, Input, NgModule, OnInit } from "@angular/core";
import { Calendar, CalendarModule } from "primeng/primeng";

@Directive({
    selector: "p-calendar[rPCalendarMask]",

})
export class PrimeNgCalendarMaskDirective implements OnInit, AfterViewChecked {
    private oldLength: number;

    constructor(private el: ElementRef, private host: Calendar) {

    }

    @Input() slotChar = "_";

    @Input() showPlaceholder = false;

    private firstTime = true;

    private oldValue: string;

    public caretPos: number;
    public mask = "";
    public input: ElementRef;
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

    ngOnInit(): void {
        this.input = this.host.inputfieldViewChild;
        this.setMask();
    }

    private setMask() {
        if (!this.host.timeOnly) {
            const dateFormat = this.host.dateFormat;
            for (const dateFormatItem of dateFormat) {
                if (dateFormatItem === "d" || dateFormatItem === "m" || dateFormatItem === "y") {
                    this.mask += "9";
                    if (dateFormatItem === "y") {
                        this.mask += "9";
                    }
                } else {
                    this.mask += dateFormatItem;
                }
            }
        }
        if (this.host.showTime || this.host.timeOnly) {
            if (!this.host.timeOnly) {
                this.mask += " ";
            }
            this.mask += "99:99";
            if (this.host.showSeconds) {
                this.mask += ":99";
            }
        }
    }

    @HostListener("input")
    private onInput() {
        if (this.input === null) {
            this.input = this.host.inputfieldViewChild;
        }
        this.oldValue = this.value;
        this.value = this.input.nativeElement.value;
        if (!this.value) {
            return;
        }
        this.maskValue();
    }

    public maskValue() {
        let maskedValue = "";
        let dif = 0;

        let foundPlaceholder = false;

        for (let i = 0; i < this.mask.length && this.value.length !== i; i++) {
            const maskChar = this.mask.charAt(i + dif);
            const valueChar = this.value.charAt(i);

            if (this.showPlaceholder && valueChar === this.slotChar) {
                if (foundPlaceholder) {
                    break;
                }
                foundPlaceholder = true;
            }
            if (!PrimeNgCalendarMaskDirective.isAlpha(valueChar)
                && !PrimeNgCalendarMaskDirective.isNumeric(valueChar)
                && valueChar !== maskChar) {
                this.value = this.value.substring(0, i) + this.value.substring(i + 1);
                i--;
            } else if (maskChar === "9") {
                if (PrimeNgCalendarMaskDirective.isNumeric(valueChar)) {
                    maskedValue += valueChar;
                } else {
                    this.value = this.value.substring(0, i) + this.value.substring(i + 1);
                    i--;
                }
            } else if (maskChar === "A") {
                if (PrimeNgCalendarMaskDirective.isAlpha(this.value.charAt(i - dif))) {
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
        this.oldLength = maskedValue.length;
        if (this.showPlaceholder) {
            maskedValue = this.fillWithPlaceholder(maskedValue);
            this.oldValue = this.fillWithPlaceholder(this.oldValue);
        }

        this.caretPos = this.getUpdatedCaretPos(maskedValue);
        this.value = maskedValue;
        this.updateInput();
    }

    private fillWithPlaceholder(value: string): string {
        if (!value) {
            return value;
        }
        let mask = this.mask.replace(/[9A]/g, this.slotChar);
        mask = mask.substring(value.length, mask.length);
        value = value + mask;
        return value;
    }

    private updateInput() {
        this.input.nativeElement.value = this.value;
        this.input.nativeElement.selectionStart = this.caretPos;
        this.input.nativeElement.selectionEnd = this.caretPos;
        if (this.value.length === this.mask.length) {
            try {
                const date = this.host.parseValueFromString(this.value);
                if (this.host.isSelectable(date.getDate(), date.getMonth(), date.getFullYear(), false)) {
                    this.host.updateModel(date);
                    this.host.updateUI();
                }
            } catch (err) {
                this.host.updateModel(null);
            }
        }
    }

    private getUpdatedCaretPos(maskedValue: string) {
        let caretPos = this.getCaretPos();
        if (caretPos === this.input.nativeElement.value.length || caretPos === this.oldLength) {
            caretPos = this.oldLength;
        } else if (this.oldValue !== maskedValue) {
            while (caretPos < this.value.length &&
            this.mask.charAt(caretPos) !== "9" &&
            this.mask.charAt(caretPos) !== "A") {
                caretPos++;
            }
        } else {
            caretPos--;
        }
        return caretPos;
    }

    public getCaretPos() {
        return this.input.nativeElement.selectionStart;
    }

    ngAfterViewChecked(): void {
        if (this.firstTime && this.host && this.host.inputfieldViewChild) {
            this.firstTime = false;
            this.input = this.host.inputfieldViewChild;
        }
    }

}

@NgModule({
    imports: [
        CalendarModule
    ],
    declarations: [
        PrimeNgCalendarMaskDirective
    ],
    exports: [
        PrimeNgCalendarMaskDirective
    ]
})
export class PrimeNgCalendarMaskModule {


}
