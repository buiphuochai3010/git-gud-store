import type { RuleObject } from "antd/es/form";
import type { FormInstance } from "rc-field-form";

export const passwordConfirmValidation = (form: Pick<FormInstance, 'getFieldValue'>): RuleObject => ({
    validator(_, value) {
        const password = form.getFieldValue('password');
        if (!value || password === value) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Mật khẩu không khớp!'));
    }
});