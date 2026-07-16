function hashString(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  }
  return h >>> 0;
}

const variants = ['control', 'create_now', 'start_free'];
const trafficAllocation = 0.5;

for (let i = 0; i < 100; i++) {
  const userId = `user-index-${i}`;
  const seedString = `${userId}:cta_button_text_experiment`;
  const hash = hashString(seedString);
  const bucket = (hash % 100) / 100;
  
  if (bucket >= trafficAllocation) {
    console.log(`${userId} -> control (bucket: ${bucket})`);
  } else {
    const index = hash % variants.length;
    const variant = variants[index];
    console.log(`${userId} -> ${variant} (bucket: ${bucket}, index: ${index})`);
  }
}
