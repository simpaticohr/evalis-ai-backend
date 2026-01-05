const sessions = new Map();

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return new Response(
        "Evalis AI backend is running",
        {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }

    const { sessionId, answer } = await request.json();

    if (!sessions.has(sessionId)) {
      sessions.set(sessionId, {
        answers: [],
        totalScore: 0
      });
    }

    const session = sessions.get(sessionId);

    let score = 0;
    if (answer.length > 30) score += 20;
    if (answer.length > 80) score += 20;
    if (/example|result|learn/i.test(answer)) score += 40;

    session.answers.push(answer);
    session.totalScore += score;

    let feedback =
      score < 40
        ? "Try adding more detail or a real example."
        : score < 80
        ? "Good answer. You explained your point clearly."
        : "Excellent answer. Confident, structured, and relevant.";

    return new Response(
      JSON.stringify({
        feedback,
        answerScore: score,
        totalScore: session.totalScore,
        answersGiven: session.answers.length
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  }
};
