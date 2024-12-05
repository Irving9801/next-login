import axios from "axios";
import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Variables de entorno
const clientId = process.env.CLIENT_ID as string;
const clientSecret = process.env.CLIENT_SECRET as string;
const authUrl = "https://dev-ab5tsrsfm1xzx5ga.us.auth0.com/oauth/token";

const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Username and password are required");
        }

        try {
          const response = await axios.post(
            authUrl,
            new URLSearchParams({
              grant_type: "password",
              username: credentials.username,
              password: credentials.password,
              client_id: clientId,
              client_secret: clientSecret,
            }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
          );

          if (response.status === 200 && response.data.access_token) {
            console.log("🚀 ~ authorize ~ response.data.access_token:", response.data.access_token);

            // Devolver el usuario con un `accessToken` y otras propiedades necesarias
            return {
              id: "unique-id", // Aquí deberías incluir el id del usuario
              name: credentials.username, // Puedes asignar un nombre del usuario
              email: `${credentials.username}@example.com`, // Asignar un email ficticio o real
              accessToken: response.data.access_token, // Incluir el accessToken
            } as User;  // Asegúrate de devolver el objeto con el tipo `User`
          }
        } catch (error) {
          console.error("Error during login:", error);
          throw new Error("Login failed");
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Página personalizada de inicio de sesión
  },
  session: {
    strategy: "jwt" as const, // Utiliza JWT para la sesión
    maxAge: 40, // Expira la sesión después de 40 segundos
    updateAge: 30, // Actualiza la sesión cada 30 segundos
  },
};

export default NextAuth(options);
