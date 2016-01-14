import Ember from 'ember';
import layout from '../templates/components/lf-textarea';
import LFInput from './lf-input';

const { observer, isNone } = Ember;

export default LFInput.extend({
  layout,

  propertyDidChange: observer('property', function() {
    if (isNone(this.get('property'))) {
      this.clearValidations();
    }
  })
});
