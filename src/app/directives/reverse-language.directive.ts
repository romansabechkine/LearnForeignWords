import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Directive({
  selector: '[appReverseLanguage]'
})
export class ReverseLanguageDirective {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private formGroup: FormGroupDirective) { }

  @HostListener('click') onClick() {

    // This will not work: you should have access directly to FORM and not native DOM

    // let first_input = this.el.nativeElement.previousSibling
    // let second_input = this.el.nativeElement.nextSibling
    // let first_value = first_input.value
    // let second_value = second_input.value
    // this.renderer.setProperty(first_input, "value", second_value)
    // this.renderer.setProperty(second_input, "value", first_value)
    // console.log(first_input.value)
    // console.log(second_input.value)

    const first_input = this.el.nativeElement.previousSibling;
    const second_input = this.el.nativeElement.nextSibling;

    // Get form control names from the input elements' attributes: language1 and language2
    const first_control_name = first_input.getAttribute('formControlName');
    const second_control_name = second_input.getAttribute('formControlName');

    // Get the current form control values
    const first_value = this.formGroup.control.get(first_control_name)?.value;
    const second_value = this.formGroup.control.get(second_control_name)?.value;

    // Swap the values in the form group
    this.formGroup.control.get(first_control_name)?.setValue(second_value);
    this.formGroup.control.get(second_control_name)?.setValue(first_value);

    console.log(this.formGroup.control.value);

  }
}
