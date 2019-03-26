export class MaskingBase {
    private oldLength: number;

    private oldValue: string;

    private caretPos: number;

    public _mask = "";

    public _slotChar = "_";

    public _showPlaceholder = false;

    public _input: any;

    public value: string;

    private focus: boolean;

    private clear: boolean;

    private static isNumeric(s: string) {
        if (s === " ") {
            return false;
        }
        return !isNaN(Number(s));
    }

    private static isAlpha(s: string) {
        return s.match(/^[a-z]+$/i) !== null;
    }


    public checkValue(onFocus = false) {
        this.oldValue = this.value;
        this.value = this._input.value;
        this.focus = onFocus;
        if (!this.value && !this.focus) {
            return;
        }
        this.maskValue();
    }


    public maskValue() {
        let maskedValue = "";
        let dif = 0;
        let foundPlaceholder = false;

        for (let i = 0; i < this._mask.length && this.value.length !== i; i++) {
            const maskChar = this._mask.charAt(i + dif);
            const valueChar = this.value.charAt(i);
            if (this._showPlaceholder && valueChar === this._slotChar) {
                if (foundPlaceholder) {
                    break;
                }
                foundPlaceholder = true;
            }
            if (!MaskingBase.isAlpha(valueChar)
                && !MaskingBase.isNumeric(valueChar)
                && valueChar !== maskChar) {
                this.value = this.value.substring(0, i) + this.value.substring(i + 1);
                i--;
            } else if (maskChar === "9") {
                if (MaskingBase.isNumeric(valueChar)) {
                    maskedValue += valueChar;
                } else {
                    this.value = this.value.substring(0, i) + this.value.substring(i + 1);
                    i--;
                }
            } else if (maskChar === "A") {
                if (MaskingBase.isAlpha(this.value.charAt(i))) {
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
        if (this._showPlaceholder) {
            maskedValue = this.fillWithPlaceholder(maskedValue);
            this.oldValue = this.fillWithPlaceholder(this.oldValue);
        }

        this.caretPos = this.getUpdatedCaretPos(maskedValue);
        this.value = maskedValue;
        this.updateInput();
    }

    public updateInput() {
        this._input.value = this.value;
        if (this.focus && this.clear) {
            this.caretPos = 0;
        }
        this._input.selectionStart = this.caretPos;
        this._input.selectionEnd = this.caretPos;
    }

    private getUpdatedCaretPos(maskedValue: string) {
        let caretPos = this.getCaretPos();
        if (caretPos === this._input.value.length || caretPos === this.oldLength) {
            caretPos = this.oldLength;
        } else if (this.oldValue !== maskedValue) {
            while (caretPos < this.value.length &&
            this._mask.charAt(caretPos) !== "9" &&
            this._mask.charAt(caretPos) !== "A") {
                caretPos++;
            }
        } else {
            caretPos--;
        }
        return caretPos;
    }

    private fillWithPlaceholder(value: string): string {
        if (value === undefined || value === null) {
            return value;
        }
        if (!value) {
            this.clear = true;
        }
        let mask = this._mask.replace(/[9A]/g, this._slotChar);
        mask = mask.substring(value.length, mask.length);
        value = value + mask;
        return value;
    }

    public blurEvent() {
        if (this.value.indexOf(this._slotChar) !== -1) {
            this.value = null;
            this.updateInput();
        }
    }

    public getCaretPos() {
        return this._input.selectionStart;
    }
}
