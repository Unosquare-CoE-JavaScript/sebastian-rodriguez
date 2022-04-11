import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import sinon from 'sinon';
import request from 'request';
import { getUsers } from '../src/8_test_doubles';

describe('getUsers', () => {
  let spy;

  beforeEach(() => {
    spy = sinon.spy();
    sinon.stub(request, 'get').callsFake((url, callback) => {
      callback({}, { body: '{"users": ["user1", "user2"]}' });
    });
  });

  it('should call getUsers', () => {
    getUsers(() => {});
  });

  it('should call callback', () => {
    getUsers(spy);
    expect(spy.calledOnce).to.be.true;
  });

  it('should call correct URL', () => {
    getUsers(spy);
    expect(spy.calledOnce).to.be.true;

    // Original tutorial code
    // request.get.should.have.been.calledWith('https://www.mysite.com/api/users');

    expect(request.get.calledOnce).to.be.true;
    expect(request.get.calledWith('https://www.mysite.com/api/users')).to.be
      .true;
  });

  it('should call callback with correct data', () => {
    getUsers(spy);
    expect(spy.calledOnce).to.be.true;
    expect(spy.calledWith({ users: ['user1', 'user2'] })).to.be.true;
  });

  afterEach(() => {
    sinon.restore();
  });
});
