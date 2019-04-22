export class MaskingBase {
    private oldLength: number;

    private oldValue: string;

    private caretPos: number;

    public _mask = "";

    public _slotChar = "_";

    public _showPlaceholder = false;

    public _input: any;

    public value: string;

    public focus: boolean;

    public _overwriteOnInsert = false;

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

        if (this._overwriteOnInsert && this._input.selectionStart < this._input.value.length && !this.focus) {
            let selectionStart = this._input.selectionStart;
            if (!MaskingBase.isAlpha(this.value.charAt(selectionStart)) && !MaskingBase.isNumeric(this.value.charAt(selectionStart))) {
                selectionStart++;
            }
            this.value = this.value.slice(0, selectionStart) + this.value.slice(selectionStart + 1);

        }
        if (!this.value && !this.focus) {
            return;
        }
        this.maskValue();
    }


    public maskValue() {
        let maskedValue = "";
        let dif = 0;
        let foundPlaceholder = false;
        this.value = this.removeMask(this.value);

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
            this.oldValue = this.fillWithPlaceholder(this.oldValue, true);
        }

        this.caretPos = this.getUpdatedCaretPos(maskedValue);
        this.value = maskedValue;
        this.updateInput();
    }

    public removeMask(value: string): string {
        let finalValue = value;
        const constChars = this._mask.replace(/[9A]/g, "");
        const regexpSlotChar = new RegExp(this._slotChar, "g");
        finalValue = finalValue.replace(regexpSlotChar, "");
        for (let constCharsKey of constChars) {
            constCharsKey = "\\" + constCharsKey;
            const regExp = new RegExp(constCharsKey, "g");
            finalValue = finalValue.replace(regExp, "");
        }

        return finalValue;
    }

    public updateInput() {
        this._input.value = this.value;
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
        } else  {
            while (caretPos < this.value.length &&
            this._mask.charAt(caretPos) !== "9" &&
            this._mask.charAt(caretPos) !== "A") {
                caretPos++;
            }
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
            this.clear = !value || value.length === 0;
        }
        let mask = this._mask.replace(/[9A]/g, this._slotChar);
        mask = mask.substring(value.length, mask.length);
        value = value + mask;
        return value;
    }

    public blurEvent() {
        if (this.value.indexOf(this._slotChar) !== -1) {
            this.value = "";
            this.updateInput();
        }
    }

    public getCaretPos() {
        return this._input.selectionStart;
    }
}
