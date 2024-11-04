export async function GET() {
  // retrun http 400 - nextjs api route

  return Response.json(
    {
      status: 400,
      error: "Bad Request",
      message: "calendarId is required",
    },
    {
      status: 400,
    }
  );
}
