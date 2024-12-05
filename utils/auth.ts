// /utils/auth.ts
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export function requireAuth(gssp: GetServerSideProps) {
  return async (context: GetServerSidePropsContext) => {
    const { req } = context;
    console.log("🚀 ~ return ~ req:", req);
    const token = req.cookies?.token;

    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return await gssp(context);
  };
}
