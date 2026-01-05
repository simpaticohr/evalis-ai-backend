export default {
  async fetch(request) {
    return new Response(
      "Evalis AI backend is running ✅",
      {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8"
        }
      }
    );
  }
};
