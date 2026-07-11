function ok(value, message) {
  if (!value) {
    throw new Error(message || `Expected truthy, got ${value}`);
  }
}

function equal(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message || `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

function deepEqual(actual, expected, message) {
  const aStr = JSON.stringify(actual);
  const eStr = JSON.stringify(expected);
  if (aStr !== eStr) {
    throw new Error(message || `Expected ${eStr}, got ${aStr}`);
  }
}

module.exports = { ok, equal, deepEqual };
