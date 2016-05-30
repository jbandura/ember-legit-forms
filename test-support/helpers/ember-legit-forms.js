/*globals fillIn, triggerEvent*/

export function fillInBlurAcceptance(selector, value, inputType = 'input') {
  fillIn(`${selector} ${inputType}`, value);
  triggerEvent(`${selector} ${inputType}`, 'blur');
}

export function fillInSelectAcceptance(selector, value) {
  fillInBlurAcceptance(selector, value, 'select');
}

export function fillInBlurIntegration(context, selector, value, inputType = 'input') {
  const $input = context.$(`${selector} ${inputType}`);
  $input.val(value);
  $input.trigger('change');
  $input.trigger('blur');
}

export function fillInSelectIntegration(context, selector, value) {
  fillInBlurIntegration(context, selector, value, 'select');
}
