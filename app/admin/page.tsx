import { getServerSession } from "next-auth"
import { authOptions } from "../lib/auth"; // Path to your NextAuth config
async function getUser() {
  const session =  await getServerSession(authOptions);
  return session;
}

export default async function Home() {
  const ses = await getUser();

  return (
    <div>
      {JSON.stringify(ses.user.id)}
    </div>
  );
}