import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} from 'vitest';

/*
  
  ROOT SETUP AND TEARDOWN

*/

beforeAll(() => {
  console.log('root setup code');
});

afterAll(() => {
  console.log('root terdown code');
});

beforeEach(() => {
  console.log('root setup for each test');
});

afterEach(() => {
  console.log('root terdown for each test');
});

/*
  
  TEST SUITE SETUP AND TEARDOWN

*/

describe('test_suite1', () => {
  beforeAll(() => {
    console.log('setup code');
  });

  afterAll(() => {
    console.log('terdown code');
  });

  beforeEach(() => {
    console.log('setup for each test');
  });

  afterEach(() => {
    console.log('terdown for each test');
  });

  it('test1', () => {
    console.log('test1');
    expect(true).to.equal(true);
  });

  it('test2', () => {
    console.log('test2');
    expect(true).to.equal(true);
  });
});
