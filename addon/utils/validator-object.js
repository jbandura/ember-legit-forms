import Ember from 'ember';

export default Ember.Object.extend({
  arguments: null,
  fields: null,
  data: null,

  /**
   * This ember hook is used to fetch data or fields by name using `obj.get('data:insertName')` or
   * `obj.get('field:insertName')` syntax.
   * @param name
   * @return {string|undefined}
   */
  unknownProperty(name) {
    if (/field:{1}\w+/.test(name)) {
      let field = Ember.get(this, 'fields').findBy('name', name.replace('field:', ''));
      if (!field) { return null; }

      return Ember.get(field, 'value');
    }

    if (/data:{1}\w+/.test(name)) {
      let dataName = name.replace('data:', '');

      return Ember.get(this, `data.${dataName}`);
    }
  }
});
