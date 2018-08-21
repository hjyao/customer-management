'use strict';

module.exports = {

  up(db, next) {
    db.collection('customers').insert({name: 'Hello Kitty', address: 'Tokyo, Japan', mobile: 12345678, status: 2, notes: 'note1,note2,note3'});
    db.collection('customers').insert({name: 'Heman', address: 'SF, U.S.', mobile: 22345678, status: 1, notes: 'here is a note'});
    db.collection('customers').insert({name: 'Dou dou', address: 'Beijing, China', mobile: 52345678, status: 2, notes: 'here is another note'});
    db.collection('customers').insert({name: 'Tom', address: 'Singapore', mobile: 82345678, status: 1, notes: 'note1,note2,note3,note4'});
    db.collection('customers').insert({name: 'Jerry', address: 'Hawaii', mobile: 92345678, status: 0, notes: 'note1,note2'});
    db.collection('customers').insert({name: 'Jack', address: 'Russia', mobile: 32345678, status: 0, notes: 'note1'});
    db.collection('customers').insert({name: 'Rose', address: 'North Pole', mobile: 12345678, status: 2, notes: 'not available'});
    next();
  },

  down(db, next) {
    db.collection('customers').remove({});
    next();
  }

};