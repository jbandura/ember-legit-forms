import Ember from 'ember';

const { get, getWithDefault, isEmpty, setProperties } = Ember;

export default class {
  constructor(changeset) {
    this.changeset = changeset;
  }

  getFields() {
    return Ember.A(Object.keys(get(this.changeset, '_content')).map((name) => {
      return Ember.Object.create({
        name,
        valid: null,
        value: get(this.changeset, `_content.${name}`),
      });
    }));
  }

  validate(fields, fieldName, value) {
    const validationErrors = getWithDefault(this.changeset, `error.${fieldName}.validation`, []);
    const field = fields.findBy('name', fieldName);
    const isValid = isEmpty(validationErrors);
    setProperties(field, {
      value,
      valid: isValid,
    });
    return {
      isValid,
      messages: validationErrors,
    };
  }
}
