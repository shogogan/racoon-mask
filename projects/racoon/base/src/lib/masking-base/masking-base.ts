export class MaskingBase {
    private oldLength: number;

    private oldValue: string;

    private caretPos: number;

    public _mask = "";

    public _slotChar = "_";

    public _showPlaceholder = false;

    public _input: any;

    public _value: string;

    public focus: boolean;

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
        this.oldValue = this._value;
        this._value = this._input.value;
        this.focus = onFocus;
        if (!this._value && !this.focus) {
            return;
        }
        this.maskValue();
    }

    public getMaskedValue(value: string = this._value, mask: string = this._mask): string {
        let maskedValue = "";
        let dif = 0;
        let foundPlaceholder = false;
        for (let i = 0; i < mask.length && value.length !== i; i++) {
            const maskChar = mask.charAt(i + dif);
            const valueChar = value.charAt(i);
            if (this._showPlaceholder && valueChar === this._slotChar) {
                if (foundPlaceholder) {
                    break;
                }
                foundPlaceholder = true;
            }
            if (!MaskingBase.isAlpha(valueChar)
                && !MaskingBase.isNumeric(valueChar)
                && valueChar !== maskChar) {
                value = value.substring(0, i) + value.substring(i + 1);
                i--;
            } else if (maskChar === "9") {
                if (MaskingBase.isNumeric(valueChar)) {
                    maskedValue += valueChar;
                } else {
                    value = value.substring(0, i) + value.substring(i + 1);
                    i--;
                }
            } else if (maskChar === "A") {
                if (MaskingBase.isAlpha(value.charAt(i))) {
                    maskedValue += valueChar;
                } else {
                    value = value.substring(0, i) + value.substring(i + 1);
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
        return maskedValue;
    }

    public maskValue() {
        let maskedValue = this.getMaskedValue();
        this.oldLength = maskedValue.length;
        if (this._showPlaceholder) {
            maskedValue = this.fillWithPlaceholder(maskedValue);
            this.oldValue = this.fillWithPlaceholder(this.oldValue, true);
        }

        this.caretPos = this.getUpdatedCaretPos(maskedValue);
        this._value = maskedValue;
        this.updateInput();
    }

    public removeMask(value: string): string {
        let finalValue = value;
        const constChars = this._mask.replace(/[9A]/g, "");
        const regexpSlotChar = new RegExp(this._slotChar, "g");
        finalValue = finalValue.replace(regexpSlotChar, "");
        for (const constCharsKey of constChars) {
            const regExp = new RegExp(constCharsKey, "g");
            finalValue = finalValue.replace(regExp, "");
        }

        return finalValue;
    }

    public updateInput() {
        this._input.value = this._value;
        if (this.focus && this.clear) {
            this.caretPos = 0;
            setTimeout(() => {
                this._input.selectionStart = this.caretPos;
                this._input.selectionEnd = this.caretPos;
            }, 0);
        } else {
            this._input.selectionStart = this.caretPos;
            this._input.selectionEnd = this.caretPos;
        }
    }

    private getUpdatedCaretPos(maskedValue: string) {
        let caretPos = this.getCaretPos();
        const startCaretPos = caretPos;
        if (caretPos === this._input.value.length || caretPos === this.oldLength) {
            caretPos = this.oldLength;
        } else if (this.oldValue !== maskedValue) {
            while (caretPos < this._value.length &&
            this._mask.charAt(caretPos) !== "9" &&
            this._mask.charAt(caretPos) !== "A") {
                caretPos++;
            }
        } else {
            caretPos--;
        }
        if (this._mask.charAt(caretPos - 1) !== "9" && this._mask.charAt(caretPos - 1) !== "A" && caretPos === startCaretPos) {
            caretPos++;
        }
        return caretPos;
    }

    private fillWithPlaceholder(value: string, oldValue = false): string {
        if (value === undefined || value === null) {
            return value;
        }

        if (!oldValue && this.focus) {
            if (!value || value.length === 0) {
                this.clear = true;
            } else {
                this.clear = false;
            }
        }
        let mask = this._mask.replace(/[9A]/g, this._slotChar);
        mask = mask.substring(value.length, mask.length);
        value = value + mask;
        return value;
    }

    public blurEvent() {
        if (this._value.indexOf(this._slotChar) !== -1) {
            this._value = "";
            this.updateInput();
        }
    }

    public getCaretPos() {
        return this._input.selectionStart;
    }
}
