import Ember from 'ember';

export default class {
  constructor(rules) {
    this.rules = rules;
  }

  getFields() {
    if (!this.rules) return [];

    return Ember.A(Object.keys(this.rules).map(name => {
      return Ember.Object.create({
        name, valid: null, value: null
      });
    }));
  }
}
