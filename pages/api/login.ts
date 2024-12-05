"use-server";

import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  success: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password }: LoginRequest = req.body;

  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("username", email);
  params.append("password", password);
  params.append("client_id", "2vbplyPZfgQ1VpisME4529JT5kd2OiPR");
  params.append(
    "client_secret",
    "2sciww-DddgjYdJATtiHYXsO54uO9r4d5yFYKBxgXTrr06ceiwEkX4-vnb-MyqKl"
  );

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  try {
    const response = await axios.post<LoginResponse>(
      "https://dev-ab5tsrsfm1xzx5ga.us.auth0.com/oauth/token",
      params.toString(),
      { headers }
    );

    // Devuelve la respuesta correctamente usando res
    if (response.status === 200) {
      return res.status(200).json(response.data); // Envía el token y cualquier dato adicional
    } else {
      return res.status(response.status).json({ message: "Login failed" });
    }
  } catch (error) {
    console.error("Error connecting to the service:", error);
    return res.status(500).json({
      message: "Error connecting to the service",
      error: (error as Error).message,
    });
  }
}
