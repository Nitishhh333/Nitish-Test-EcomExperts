
document.querySelector('[name="options[Size]"]').addEventListener('change', function () {
    document.querySelector('.product-variant-id').value = ''
})


document.addEventListener('DOMContentLoaded', function () {

    //product size varian change on load
    selectreset();
    //product size varian change on load end
});
function selectreset() {
    var select = document.querySelector('select[name="options[Size]"]');
    select.value = "Unselected";
    select.text = "Unselected";
    select.dispatchEvent(new Event('change', { bubbles: true }));
    if (select.value == 'Unselected') {
        document.querySelector('.product-variant-id').value = '';
    }
}
function displayerror(msg = null) {
    var errorMessageWrapper = document.querySelector('.product-form__error-message-wrapper');
    var errorMessage = msg;
    if (!errorMessageWrapper) return;
    errorMessage = errorMessage || errorMessageWrapper.querySelector('.product-form__error-message');
    errorMessageWrapper.toggleAttribute('hidden', !errorMessage);
    if (errorMessage) {
        errorMessageWrapper.querySelector('.product-form__error-message').textContent = errorMessage;
    }
}
class CustomVariantRadios extends VariantRadios {
    constructor() {
        super();
    }
    updateOptions() {
        const fieldsets = Array.from(this.querySelectorAll('fieldset'));
        this.options = fieldsets.map((fieldset) => {
            return Array.from(fieldset.querySelectorAll('input')).find((radio) => radio.checked).value;
        });
        this.options.map((ops, index) => {

            if (index === 0) {
                var select = document.querySelector('select[name="options[Color]"]');
                select.value = ops;
                select.dispatchEvent(new Event('change', { bubbles: true }));
            } else {
                var select = document.querySelector('select[name="options[Size]"]');
                select.value = ops;
                select.dispatchEvent(new Event('change', { bubbles: true }));
            }


        })
    }
}
if (!customElements.get('custom-radiobtns')) {
    customElements.define('custom-radiobtns', CustomVariantRadios);
}


class CustomVariantSelects extends VariantSelects {
    constructor() {
        super();
    }
    updateOptions() {
        this.options = Array.from(this.querySelectorAll('select'), (select) => select.value);
        this.options.map((ops, index) => {
            if (ops) {
                if (ops == 'Unselected') {
                    document.querySelector('input[type=radio][value="' + ops + '"]').click();
                    this.toggleAddButton(true, '', false);
                    // console.log(`${this.dataset.section}`);
                    return;
                } else {

                    if (index === 0) {
                        document.querySelector('input[type=radio][value="' + ops + '"]').click();
                    } else {
                        document.querySelector('input[type=radio][value="' + ops + '"]').click();
                    }
                }
            }

        })
    }
    setInputAvailability(listOfOptions, listOfAvailableOptions) {
        listOfOptions.forEach((input) => {
            if (listOfAvailableOptions.includes(input.getAttribute('value'))) {
                input.innerText = input.getAttribute('value');
            } else {
                if (input.getAttribute('value') == 'Unselected') {
                    // this.setUnavailable();
                } else {
                    input.innerText = window.variantStrings.unavailable_with_option.replace('[value]', input.getAttribute('value'));

                }
            }
        });
    }
    updateVariantInput() {
        const productForms = document.querySelectorAll(
            `#product-form-${this.dataset.section}, #product-form-installment-${this.dataset.section}`
        );
        productForms.forEach((productForm) => {
            const input = productForm.querySelector('input[name="id"]');
            input.value = this.currentVariant.id;
            input.dataset.val = this.currentVariant.id;
            input.dispatchEvent(new Event('change', { bubbles: true }));
        });
    }

}
if (!customElements.get('custom-radioselects')) {
    customElements.define('custom-radioselects', CustomVariantSelects);
}