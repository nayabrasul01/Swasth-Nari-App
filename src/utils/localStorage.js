export const LS = {
  userId: "exam_userId",
  sessionId: "exam_sessionId",
  sessionToken: "exam_sessionToken",
  questionList: "exam_questionList",
  currentIndex: "exam_currentIndex",
  pendingSync: "exam_pendingSync",
};

export function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
export function getItem(key, fallback = null) {
  const v = localStorage.getItem(key);
  if (!v) return fallback;
  try {
    return JSON.parse(v);
  } catch (e) {
    return fallback;
  }
}
export function removeItem(key) {
  localStorage.removeItem(key);
}
