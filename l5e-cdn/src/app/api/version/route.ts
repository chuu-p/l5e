export async function GET() {
  return new Response(JSON.stringify({ version: "1.2.0" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

