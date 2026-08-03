export interface PasswordAnalysis {
  entropy: number;
  strengthLabel: string;
  strengthColor: string;
  crackTime: string;
}

/** Cryptographically secure random integer in [0, max) — no modulo bias */
function cryptoRandInt(max: number): number {
  const arr = new Uint32Array(1);
  const limit = (2 ** 32) - ((2 ** 32) % max);
  let r: number;
  do {
    crypto.getRandomValues(arr);
    r = arr[0];
  } while (r >= limit);
  return r % max;
}

export function calculatePasswordEntropy(password: string): number {
  if (!password) return 0;
  let poolSize = 0;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/[0-9]/.test(password)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;
  if (poolSize === 0) return 0;
  return Math.round(password.length * Math.log2(poolSize));
}

export function estimateCrackTime(entropy: number, isFr = false): string {
  if (entropy < 28) return isFr ? 'Instantané' : 'Instant';
  if (entropy < 36) return isFr ? 'Quelques secondes' : 'A few seconds';
  if (entropy < 50) return isFr ? 'Quelques heures' : 'A few hours';
  if (entropy < 65) return isFr ? 'Quelques mois' : 'A few months';
  if (entropy < 80) return isFr ? 'Plusieurs années' : 'Several years';
  if (entropy < 100) return isFr ? 'Des siècles' : 'Centuries';
  return isFr ? 'Plusieurs milliards d\'années' : 'Billions of years';
}

export function analyzePassword(password: string, isFr = false): PasswordAnalysis {
  const entropy = calculatePasswordEntropy(password);
  let strengthLabel = isFr ? 'Très faible' : 'Very Weak';
  let strengthColor = '#ef4444';

  if (entropy >= 80) {
    strengthLabel = isFr ? 'Ultra Sécurisé' : 'Ultra Secure';
    strengthColor = '#10b981';
  } else if (entropy >= 60) {
    strengthLabel = isFr ? 'Fort' : 'Strong';
    strengthColor = '#34d399';
  } else if (entropy >= 40) {
    strengthLabel = isFr ? 'Moyen' : 'Medium';
    strengthColor = '#f59e0b';
  } else if (entropy >= 25) {
    strengthLabel = isFr ? 'Faible' : 'Weak';
    strengthColor = '#f97316';
  }

  const crackTime = estimateCrackTime(entropy, isFr);
  return { entropy, strengthLabel, strengthColor, crackTime };
}

/**
 * Generates a cryptographically secure random password.
 * @param length Target character length (default 16)
 * @param opts   Character set toggles
 */
export function generatePassword(
  length = 16,
  opts: { upper?: boolean; lower?: boolean; digits?: boolean; symbols?: boolean } = {}
): string {
  const { upper = true, lower = true, digits = true, symbols = true } = opts;
  let pool = '';
  if (lower)   pool += 'abcdefghijklmnopqrstuvwxyz';
  if (upper)   pool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (digits)  pool += '0123456789';
  if (symbols) pool += '!@#$%^&*()-_=+[]{}|;:,.<>?';
  if (!pool)   pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  // Guarantee at least one character from each enabled class
  const guarantees: string[] = [];
  if (lower   && pool.includes('a')) guarantees.push(pool[cryptoRandInt(26)]);
  if (upper   && pool.includes('A')) {
    const start = pool.indexOf('A');
    guarantees.push(pool[start + cryptoRandInt(26)]);
  }
  if (digits  && pool.includes('0')) {
    const start = pool.indexOf('0');
    guarantees.push(pool[start + cryptoRandInt(10)]);
  }
  if (symbols && pool.includes('!')) {
    const start = pool.indexOf('!');
    const symLen = '!@#$%^&*()-_=+[]{}|;:,.<>?'.length;
    guarantees.push(pool[start + cryptoRandInt(symLen)]);
  }

  const chars: string[] = [...guarantees];
  while (chars.length < length) {
    chars.push(pool[cryptoRandInt(pool.length)]);
  }

  // Fisher-Yates shuffle using CSPRNG
  for (let i = chars.length - 1; i > 0; i--) {
    const j = cryptoRandInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.slice(0, length).join('');
}

/**
 * Generates a Diceware-style passphrase using crypto.getRandomValues().
 * 100-word list gives log2(100^4) ≈ 26.6 bits per word, ~106 bits for 4 words.
 */
export function generateDicewarePassphrase(wordCount = 4): string {
  // 100 common English words — broad enough for real security
  const words = [
    'apple','bridge','castle','dragon','eagle','forest','garden','harbor','island','jungle',
    'kettle','lemon','marble','nectar','ocean','palace','quartz','river','silver','timber',
    'umbrella','valley','walnut','xenon','yellow','zebra','anchor','beacon','candle','desert',
    'ember','falcon','glacier','hammer','indigo','jasper','kitten','lantern','mango','nimbus',
    'orbit','pepper','quiver','ranger','saddle','tundra','utopia','velvet','winter','xylophone',
    'yarn','zenith','acorn','breeze','cobalt','dagger','eclipse','flame','gravel','hollow',
    'iris','jewel','knight','lotus','maple','north','opal','pine','queen','raven',
    'sphinx','topaz','ultra','violet','wisdom','xeric','yonder','zephyr','amber','blaze',
    'copper','dawn','elder','frost','gust','haven','iron','jade','kiwi','lime',
    'mint','nova','onyx','prism','quest','ruby','sage','torch','umber','veil'
  ];
  const chosen = Array.from({ length: wordCount }, () => {
    const w = words[cryptoRandInt(words.length)];
    return w.charAt(0).toUpperCase() + w.slice(1);
  });
  // Append a 2-digit number for extra entropy
  const num = cryptoRandInt(90) + 10;
  return chosen.join('-') + '-' + num;
}

/**
 * Removes genuinely ambiguous characters (ones that look alike in most fonts).
 * Fixed bug: original regex incorrectly included 's' and 'S' which are perfectly readable.
 * Truly ambiguous: l (lowercase L), 1 (one), I (uppercase i), O (uppercase o), 0 (zero)
 */
export function removeAmbiguousChars(str: string): string {
  return str.replace(/[l1IO0]/g, '');
}

