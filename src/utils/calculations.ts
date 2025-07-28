export function calculateWPM(typed: string, sample: string, timeInSec: number) {
  const typedWords = typed.trim().split(/\s+/);
  const sampleWords = sample.trim().split(/\s+/);
  let correct = 0;

  for (let i = 0; i < typedWords.length; i++) {
    if (typedWords[i] === sampleWords[i]) correct++;
  }

  return {
    correctWords: correct,
    wpm: timeInSec > 0 ? Math.round((correct * 60) / timeInSec) : 0,
  };
}

export function calculateAccuracy(typed: string, sample: string) {
  const typedWords = typed.trim().split(/\s+/);
  const sampleWords = sample.trim().split(/\s+/);
  let correct = 0;

  for (let i = 0; i < typedWords.length; i++) {
    if (typedWords[i] === sampleWords[i]) correct++;
  }

  return typedWords.length > 0
    ? Math.round((correct / typedWords.length) * 100)
    : 0;
}

export function calculateErrors(typed: string, sample: string) {
  const typedWords = typed.trim().split(/\s+/);
  const sampleWords = sample.trim().split(/\s+/);
  let errors = 0;

  for (let i = 0; i < typedWords.length; i++) {
    if (typedWords[i] !== sampleWords[i]) errors++;
  }

  return errors;
}
