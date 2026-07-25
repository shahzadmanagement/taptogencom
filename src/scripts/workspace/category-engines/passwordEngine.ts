export interface PasswordAnalysis {
  entropy: number;
  strengthLabel: string;
  strengthColor: string;
  crackTime: string;
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

export function estimateCrackTime(entropy: number, isFr: boolean = true): string {
  if (entropy < 28) return isFr ? 'Instantané' : 'Instant';
  if (entropy < 36) return isFr ? 'Quelques secondes' : 'A few seconds';
  if (entropy < 50) return isFr ? 'Quelques heures' : 'A few hours';
  if (entropy < 65) return isFr ? 'Quelques mois' : 'A few months';
  if (entropy < 80) return isFr ? 'Plusieurs années' : 'Several years';
  if (entropy < 100) return isFr ? 'Des siècles' : 'Centuries';
  return isFr ? 'Plusieurs milliards d’années' : 'Billions of years';
}

export function analyzePassword(password: string, isFr: boolean = true): PasswordAnalysis {
  const entropy = calculatePasswordEntropy(password);
  let strengthLabel = isFr ? 'Très faible' : 'Very Weak';
  let strengthColor = '#ef4444'; // Red

  if (entropy >= 80) {
    strengthLabel = isFr ? 'Ultra Sécurisé' : 'Ultra Secure';
    strengthColor = '#10b981'; // Green
  } else if (entropy >= 60) {
    strengthLabel = isFr ? 'Fort' : 'Strong';
    strengthColor = '#34d399'; // Mint
  } else if (entropy >= 40) {
    strengthLabel = isFr ? 'Moyen' : 'Medium';
    strengthColor = '#f59e0b'; // Amber
  } else if (entropy >= 25) {
    strengthLabel = isFr ? 'Faible' : 'Weak';
    strengthColor = '#f97316'; // Orange
  }

  const crackTime = estimateCrackTime(entropy, isFr);
  return { entropy, strengthLabel, strengthColor, crackTime };
}

export function generateDicewarePassphrase(wordCount: number = 4): string {
  const words = [
    'chateau', 'vallee', 'soleil', 'navire', 'etoile', 'horizon', 'cristal', 'cascade',
    'lumiere', 'silence', 'tempete', 'boussole', 'voyage', 'jardin', 'orchidee', 'zenith',
    'sommet', 'torrent', 'mirage', 'refuge', 'galaxie', 'diamant', 'mystere', 'harmonie'
  ];
  const picked: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    const w = words[Math.floor(Math.random() * words.length)];
    const capitalized = w.charAt(0).toUpperCase() + w.slice(1);
    picked.push(capitalized);
  }
  const randomNum = Math.floor(Math.random() * 90 + 10);
  return picked.join('-') + '-' + randomNum;
}

export function removeAmbiguousChars(str: string): string {
  return str.replace(/[l1IO0sS5]/g, '');
}
