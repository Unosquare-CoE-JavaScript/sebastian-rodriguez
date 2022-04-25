import crypto from 'crypto';

const doHash = (cb: () => void) =>
  crypto.pbkdf2('a', 'b', 1_000_000, 512, 'sha512', cb);

export default doHash;
