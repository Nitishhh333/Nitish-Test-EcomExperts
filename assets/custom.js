
class CustomVariantRadios extends VariantRadios {
    constructor() {
      super();
    }
    updateOptions() {
        const fieldsets = Array.from(this.querySelectorAll('fieldset'));
        this.options = fieldsets.map((fieldset) => {
        return Array.from(fieldset.querySelectorAll('input')).find((radio) => radio.checked).value;
        });
        this.options.map((ops, index)=>{
            if(index === 0){
              var select = document.querySelector('select[name="options[Color]"]');
              select.value = ops;
              select.dispatchEvent(new Event('change', { bubbles: true }));
            }else {
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
        this.options.map((ops, index)=>{
            console.log(ops)
            if(ops){
                if(index === 0){
                    document.querySelector('input[type=radio][value="'+ops+'"]').click();
                }else{
                    document.querySelector('input[type=radio][value="'+ops+'"]').click();
                }
            }
            
        })
    }
}
if (!customElements.get('custom-radioselects')) {
    customElements.define('custom-radioselects', CustomVariantSelects);
}