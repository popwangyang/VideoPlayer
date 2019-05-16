
const isElectron = 'electron' in process.versions;

const electronVersion = process.versions.electron || '0.0.0';

const isUsingAsar = isElectron && process.mainModule && process.mainModule.filename.includes('app.asar');

export const fixPathForAsarUnpack = path => isUsingAsar ? path.replace('app.asar', 'app.asar.unpacked') : path;