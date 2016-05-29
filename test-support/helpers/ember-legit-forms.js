/*globals fillIn, triggerEvent*/

export function fillInAndBlurAcceptance(selector, value, inputType = 'input') {
  fillIn(`${selector} ${inputType}`, value);
  triggerEvent(`${selector} ${inputType}`, 'blur');
}
