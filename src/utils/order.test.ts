import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateOrderTotal,
  formatPriceFCFA,
  generateOrderReference,
  validateOrder,
} from './order.ts';
import type { OrderFormData } from '../types/index.ts';

test('calculateOrderTotal multiplies quantity by fixed price of 3 000 FCFA', () => {
  assert.equal(calculateOrderTotal(1, 3000), 3000);
  assert.equal(calculateOrderTotal(2, 3000), 6000);
  assert.equal(calculateOrderTotal(3, 3000), 9000);
  assert.equal(calculateOrderTotal(5, 3000), 15000);
  assert.equal(calculateOrderTotal(0, 3000), 0);
});

test('formatPriceFCFA formats 3000 into 3 000 FCFA', () => {
  const formatted = formatPriceFCFA(3000);
  assert.ok(formatted.includes('3'));
  assert.ok(formatted.includes('000'));
  assert.ok(formatted.endsWith('FCFA'));
});

test('generateOrderReference produces PG- prefix with 6 digits', () => {
  const ref = generateOrderReference();
  assert.match(ref, /^PG-\d{6}$/);
});

test('validateOrder detects missing required fields and zero quantity', () => {
  const invalidForm: OrderFormData = {
    fullName: '',
    contact: '',
    deliveryCity: '',
    deliveryAddress: '',
  };

  const res = validateOrder(invalidForm, 0);
  assert.equal(res.isValid, false);
  assert.ok(res.errors.quantity);
  assert.ok(res.errors.fullName);
  assert.ok(res.errors.contact);
  assert.ok(res.errors.deliveryCity);
  assert.ok(res.errors.deliveryAddress);
});

test('validateOrder accepts complete valid form and positive quantity', () => {
  const validForm: OrderFormData = {
    fullName: 'Fatou Ndiaye',
    contact: '+221 77 123 45 67',
    deliveryCity: 'Dakar',
    deliveryAddress: 'Almadies, Résidence Les Palmiers',
    notes: 'Appeler avant de livrer',
  };

  const res = validateOrder(validForm, 2);
  assert.equal(res.isValid, true);
  assert.equal(Object.keys(res.errors).length, 0);
});
