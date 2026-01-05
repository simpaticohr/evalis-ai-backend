export default {
  async fetch(request, env, ctx) {
    return new Response("Backend is live from GitHub!");
  },
};

