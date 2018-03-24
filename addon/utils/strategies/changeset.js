import { A } from '@ember/array';
import { isEmpty } from '@ember/utils';
import EmberObject, {
  setProperties,
  getWithDefault,
  get
} from '@ember/object';
import { isArray } from 'lodash/lang';

export default class {
  constructor(changeset) {
    this.changeset = changeset;
  }

  getFields() {
    return A(Object.keys(get(this.changeset, '_content')).map((name) => {
      return EmberObject.create({
        name,
        valid: null,
        value: get(this.changeset, `_content.${name}`),
      });
    }));
  }

  validate(fields, fieldName, value) {
    // Needed to generate empty error array, so that observer for force validate works correctly
    get(this.changeset, 'errors');
    const validationErrors = getWithDefault(this.changeset, `error.${fieldName}.validation`, []);
    const field = fields.findBy('name', fieldName);
    const isValid = isEmpty(validationErrors);
    setProperties(field, {
      value,
      valid: isValid,
    });
    return {
      isValid,
      messages: isArray(validationErrors) ? validationErrors : [validationErrors],
    };
  }
}
