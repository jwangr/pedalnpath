import { getSession } from "@/lib/auth";

export async function GET() {
  const response = await getSession();
  console.log(response);
  return new Response(JSON.stringify(response), { status: 200 });
}
