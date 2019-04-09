import { Directive, ElementRef, forwardRef, HostListener, Injector, Input, NgModule } from "@angular/core";
import { MaskingBase } from "../../../../base/src/lib/masking-base/masking-base";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, NgModel } from "@angular/forms";


@Directive({
    selector: "[rInputValueMask]",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputValueMaskDirective),
            multi: true,
        }
    ]
})
export class InputValueMaskDirective extends MaskingBase implements ControlValueAccessor {
    private update: boolean;
    private unmask = true;
    private onChange: (val: any) => void;
    private onTouched: any;
    public value: any;

    private set disabled(val: boolean) {
        this._disabled = val;
        if (this._disabled) {
            this._input.disable();
        } else {
            this._input.enable();
        }
    }

    private _disabled = false;


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

    @Input("rInputValueMask") set mask(value: string) {
        this.setMasks(value);
    }

    @HostListener("reset")
    onClear() {
        this.checkValue();
    }

    @HostListener("input", ["$event"])
    onInput($event: any) {
        this._deleting = $event.inputType === "deleteContentBackward";
        if (this.update) {
            this.update = false;
            return;
        }
        this.checkValue();
    }

    @HostListener("blur")
    onBlur() {
        this.blurEvent();
    }

    @HostListener("focus")
    onFocus() {
        this.checkValue(true);
    }

    updateInput(): void {
        super.updateInput();
        if (this.update) {
            this.update = false;
            return;
        }
        this.update = true;
        if (this.unmask) {
            this.value = this.removeMask(this._value);
        } else {
            this.value = this._value;
        }
        this._input.dispatchEvent(new Event("input"));
        this.onChange(this.value);
    }

    registerOnChange(fn: any): void {
        this.onChange = (val: any) => {
            fn(val);
        };
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    writeValue(obj: any): void {
        this.value = obj;
        this._value = this.value;
        if (this.value) {
            this.maskValue();
        }
    }

}

@NgModule({
    declarations: [
        InputValueMaskDirective
    ],
    exports: [
        InputValueMaskDirective
    ]

})
export class InputValueMaskModule {

}
