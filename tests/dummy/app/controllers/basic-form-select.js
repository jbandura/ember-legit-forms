import Controller from '@ember/controller';

export default Controller.extend({
  model: {
    name: null,
    group: null,
    description: null
  },
  groups: [
    { label: 'Group 1', value: 1 }
  ],
  rules: {
    sharedValidations: {
      required: ['group', 'name', 'description']
    }
  },
  actions: {
    clear() {
      this.set('model', {
        name: null,
        group: null,
        description: null
      });
    }
  }
});
