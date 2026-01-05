export default {
  async fetch(request) {
    return new Response("Evalis AI backend is running ✅", {
      headers: {
        "content-type": "text/plain; charset=utf-8"
      }
    });
  }
};
