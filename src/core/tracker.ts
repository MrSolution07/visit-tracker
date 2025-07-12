import FingerprintJS from '@fingerprintjs/fingerprintjs';

export async function getVisitorId(): Promise<string> {
  const fp = await FingerprintJS.load();
  const { visitorId } = await fp.get();
  return visitorId;
}