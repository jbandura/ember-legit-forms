import Ember from 'ember';

const { get } = Ember;

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
}
