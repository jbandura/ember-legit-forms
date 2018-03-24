import EmberObject from '@ember/object';

export default function(...args) {
  return EmberObject.create({
    arguments: args
  });
}
