var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
import { getCharacterLength } from '../common/utils';
const { prefix } = config;
const name = `${prefix}-input`;
let Input = class Input extends SuperComponent {
    constructor() {
        super(...arguments);
        this.options = {
            multipleSlots: true,
        };
        this.externalClasses = [
            `${prefix}-class`,
            `${prefix}-class-icon`,
            `${prefix}-class-label`,
            `${prefix}-class-input`,
            `${prefix}-class-clearable`,
            `${prefix}-class-suffix`,
            `${prefix}-class-suffix-icon`,
            `${prefix}-class-error-msg`,
        ];
        this.behaviors = ['wx://form-field'];
        this.properties = props;
        this.data = {
            prefix,
            classPrefix: name,
            classBasePrefix: prefix,
            characterLength: 0,
            maxchars: -1,
        };
        this.lifetimes = {
            ready() {
                const { value } = this.properties;
                this.updateValue(value);
            },
        };
        this.methods = {
            updateValue(value) {
                const { maxcharacter } = this.properties;
                const maxcharacterValue = Number(maxcharacter);
                if (maxcharacter && maxcharacter > 0 && !Number.isNaN(maxcharacter)) {
                    const { length = 0, characters, overflow } = getCharacterLength(value, maxcharacter);
                    if (length < maxcharacterValue) {
                        this.setData({
                            value,
                            characterLength: length,
                            maxchars: -1,
                        });
                    }
                    else if (!overflow) {
                        this.setData({
                            value,
                            characterLength: length,
                            maxchars: value.length,
                        });
                    }
                    else {
                        this.setData({
                            value: characters,
                            characterLength: length,
                            maxchars: value.length - 1,
                        });
                    }
                }
                else {
                    this.setData({
                        value,
                        characterLength: value ? String(value).length : 0,
                    });
                }
            },
            onInput(e) {
                const { value, cursor, keyCode } = e.detail;
                this.updateValue(value);
                this.triggerEvent('change', { value, cursor, keyCode });
            },
            onFocus(e) {
                this.triggerEvent('focus', e.detail);
            },
            onBlur(e) {
                this.triggerEvent('blur', e.detail);
            },
            onConfirm(e) {
                this.triggerEvent('enter', e.detail);
            },
            clearInput(e) {
                this.triggerEvent('clear', e.detail);
                this.setData({ value: '' });
            },
            onKeyboardHeightChange(e) {
                this.triggerEvent('keyboardheightchange', e.detail);
            },
        };
    }
};
Input = __decorate([
    wxComponent()
], Input);
export default Input;
