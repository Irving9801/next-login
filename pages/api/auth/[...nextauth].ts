import axios from "axios";
import jwt from "jsonwebtoken"; // Importamos jsonwebtoken para firmar el JWT
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Variables de entorno
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const authUrl = "https://dev-ab5tsrsfm1xzx5ga.us.auth0.com/oauth/token";
const JWT_SECRET = process.env.JWT_SECRET;  // Asegúrate de tener un JWT_SECRET en las variables de entorno

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            authUrl,
            new URLSearchParams({
              grant_type: "password",
              username: credentials?.username || "",
              password: credentials?.password || "",
              client_id: clientId,
              client_secret: clientSecret,
            }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
          );

          if (response.status === 200 && response.data.access_token) {
            console.log("🚀 ~ authorize ~ response.data.access_token:", response.data.access_token);
            // Firmamos el token con la clave secreta
            const signedToken = jwt.sign(
              { accessToken: response.data.access_token },  // El contenido que queremos guardar
              JWT_SECRET,  // Clave secreta para firmar el JWT
              { expiresIn: '40s' }  // Expira en 40 segundos
            );

            // Imprime el JWT firmado en la consola
            console.log("JWT Firmado:", signedToken);

            return { accessToken: signedToken };  // Retorna el JWT firmado
          }
        } catch (error) {
          console.error("Error during login:", error);
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Página personalizada de inicio de sesión
  },
  session: {
    strategy: "jwt", // Utiliza JWT para la sesión
    maxAge: 40, // Expira la sesión después de 40 segundos
    updateAge: 30, // Actualiza la sesión cada 30 segundos
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;

        // Verifica si el token es válido y no ha expirado
        try {
          const decoded = jwt.verify(token.accessToken, JWT_SECRET);  // Verificamos y decodificamos el token
          token.accessToken = decoded.accessToken;  // Extraemos el contenido del token decodificado
        } catch (err) {
          // Si el token está expirado o no es válido, no lo incluimos en el estado
          return null;
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Clave secreta almacenada en las variables de entorno
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      },
    },
  },
});
