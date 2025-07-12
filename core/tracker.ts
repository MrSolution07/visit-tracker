import FingerprintJS from '@fingerprintjs/fingerprintjs';

export async function getVisitorId() {
  const fp = await FingerprintJS.load();
  const { visitorId } = await fp.get();
  return visitorId;
}