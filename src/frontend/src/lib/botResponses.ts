export const CRISIS_KEYWORDS = [
  "suicide",
  "kill myself",
  "end life",
  "hopeless",
];

export function isCrisisMessage(msg: string): boolean {
  const lower = msg.toLowerCase();
  return CRISIS_KEYWORDS.some((k) => lower.includes(k));
}

export function getBotResponse(msg: string): string {
  const lower = msg.toLowerCase();
  let response = "";

  if (/sad|depressed|down|low|unhappy|miserable/.test(lower)) {
    response =
      "I hear you. It's okay to feel this way. Would you like to try a breathing exercise?";
  } else if (/anxious|anxiety|worried|stress|nervous|panic/.test(lower)) {
    response = "Take a deep breath. You're safe. Let's slow down together.";
  } else if (/happy|good|great|amazing|wonderful|joy|excited/.test(lower)) {
    response =
      "That's wonderful to hear! Keep nurturing those positive moments.";
  } else if (/angry|anger|frustrated|irritated|mad/.test(lower)) {
    response =
      "It's natural to feel frustrated sometimes. Try taking a few slow breaths to center yourself.";
  } else if (/tired|exhausted|sleep|rest/.test(lower)) {
    response =
      "Rest is so important for mental well-being. Have you had a chance to practice any sleep hygiene tips?";
  } else if (/lonely|alone|isolated/.test(lower)) {
    response =
      "You're not alone — I'm here with you. Connecting with others, even briefly, can make a big difference.";
  } else if (/grateful|thankful|blessed/.test(lower)) {
    response =
      "Gratitude is a powerful practice. What are three things you appreciate about today?";
  } else {
    response =
      "Thank you for sharing. I'm here to listen. Remember, you're not alone.";
  }

  return `${response} If you're struggling, please consider speaking with a mental health professional.`;
}
