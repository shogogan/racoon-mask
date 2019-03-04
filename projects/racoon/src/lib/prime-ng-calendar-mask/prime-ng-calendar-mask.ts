import { AfterViewChecked, Directive, ElementRef, HostListener, Input, NgModule, OnInit } from "@angular/core";
import { Calendar, CalendarModule } from "primeng/primeng";
import { MaskingBase } from "../masking-base/masking-base";

@Directive({
    selector: "p-calendar[rPCalendarMask]",

})
export class PrimeNgCalendarMaskDirective extends MaskingBase implements OnInit, AfterViewChecked {

    constructor(private el: ElementRef, private host: Calendar) {
        super();
    }

    @Input() set slotChar(value: string) {
        this._slotChar = value;
    }

    @Input() set showPlaceholder(value: boolean) {
        this._showPlaceholder = value;
    }

    private firstTime = true;

    ngOnInit(): void {
        this._input = this.host.inputfieldViewChild;
        this.setMask();
    }

    private setMask() {
        this._mask = "";
        if (!this.host.timeOnly) {
            const dateFormat = this.host.dateFormat;
            for (const dateFormatItem of dateFormat) {
                if (dateFormatItem === "d" || dateFormatItem === "m" || dateFormatItem === "y") {
                    this._mask += "9";
                    if (dateFormatItem === "y") {
                        this._mask += "9";
                    }
                } else {
                    this._mask += dateFormatItem;
                }
            }
        }
        if (this.host.showTime || this.host.timeOnly) {
            if (!this.host.timeOnly) {
                this._mask += " ";
            }
            this._mask += "99:99";
            if (this.host.showSeconds) {
                this._mask += ":99";
            }
        }
    }

    @HostListener("input")
    private onInput() {
        if (this._input === null) {
            this._input = this.host.inputfieldViewChild;
        }
        this.checkValue();
    }

    public updateInput() {
        super.updateInput();
        if (this.value.length === this._mask.length) {
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

    ngAfterViewChecked(): void {
        if (this.firstTime && this.host && this.host.inputfieldViewChild) {
            this.firstTime = false;
            this._input = this.host.inputfieldViewChild;
            this._input.nativeElement.type = "tel";
            this.setMask();
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
