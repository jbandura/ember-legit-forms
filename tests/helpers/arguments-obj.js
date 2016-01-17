import Ember from 'ember';

export default function(...args) {
  return Ember.Object.create({
    arguments: args
  });
}
