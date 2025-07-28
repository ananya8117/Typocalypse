export function saveResultToHistory(result: {
  wpm: number;
  correctWords: number;
  errorCount: number;
  accuracy: number;
}) {
  const history = JSON.parse(localStorage.getItem("history") || "[]");
  const entry = { ...result, date: new Date().toISOString() };
  history.push(entry);
  localStorage.setItem("history", JSON.stringify(history));
}
