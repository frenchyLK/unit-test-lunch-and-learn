const tests = require.context("../src", true, /spec$/);
tests.keys().forEach(tests);
