import { MaskGenerator } from './mask-generator';

export class MyMaskUtil {
    private static readonly ALPHA = 'A';
    private static readonly NUMERIC = '9';
    private static readonly ALPHANUMERIC = '?';
    private static readonly REGEX_MAP = new Map([
        [MyMaskUtil.ALPHA, /\w/],
        [MyMaskUtil.NUMERIC, /\d/],
        [MyMaskUtil.ALPHANUMERIC, /\w|\d/],
    ]);

    private static PHONE_SMALL = '(999) 999-9999';
    private static PHONE_BIG = '(999) 9999-9999';
    private static CPF = '999.999.999-99';
    private static CNPJ = '99.999.999/9999-99';

    public static PHONE_MASK_GENERATOR: MaskGenerator = {
        generateMask: () => MyMaskUtil.PHONE_SMALL,
    }

    public static DYNAMIC_PHONE_MASK_GENERATOR: MaskGenerator = {
        generateMask: (value: string) => {
            return MyMaskUtil.hasMoreDigits(value, MyMaskUtil.PHONE_SMALL) ?
                MyMaskUtil.PHONE_BIG :
                MyMaskUtil.PHONE_SMALL;
        },
    }

    public static CPF_MASK_GENERATOR: MaskGenerator = {
        generateMask: () => MyMaskUtil.CPF,
    }

    public static CNPJ_MASK_GENERATOR: MaskGenerator = {
        generateMask: () => MyMaskUtil.CNPJ,
    }

    public static PERSON_MASK_GENERATOR: MaskGenerator = {
        generateMask: (value: string) => {
            return MyMaskUtil.hasMoreDigits(value, MyMaskUtil.CPF) ?
                MyMaskUtil.CNPJ :
                MyMaskUtil.CPF;
        },
    }

    private static hasMoreDigits(v01: string, v02: string): boolean {
        let d01 = this.onlyDigits(v01);
        let d02 = this.onlyDigits(v02);
        let len01 = (d01 && d01.length) || 0;
        let len02 = (d02 && d02.length) || 0;
        let moreDigits = (len01 > len02);
        return moreDigits;
    }

    private static onlyDigits(value: string): string {
        let onlyDigits = (value != null) ? value.replace(/\D/g, '') : null;
        return onlyDigits;
    }



    public static cpfNumberMask(value: string): string {
        const mask: string = MyMaskUtil.CPF;
        value = value.toString();

        let len = value.length;
        let maskLen = mask.length;
        let pos = 0;
        let newValue = '';

        for (let i = 0; i < Math.min(len, maskLen); i++) {
            let maskChar = mask.charAt(i);
            let newChar = value.charAt(pos);
            let regex: RegExp = MyMaskUtil.REGEX_MAP.get(maskChar);

            if (regex) {
                pos++;

                if (regex.test(newChar)) {
                    newValue += newChar;
                } else {
                    i--;
                    len--;
                }
            } else {
                if (maskChar === newChar) {
                    pos++;
                } else {
                    len++;
                }

                newValue += maskChar;
            }
        }
        return newValue;
    }
}