// /pages/api/dashboard.ts
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetch(
      "https://qa-app.cmf.com.pa/mdl03/api/Customers/GetCustomerByParam/1/8-929-2098",
      {
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "es;q=0.5",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMTZhMDIxNi1mZmI0LTQ3MTktOGZjYi02MTkzM2U0N2UzODIiLCJlbWFpbCI6ImFydXRoZXJmb3JkQGh5cGVybm92YWxhYnMuY29tIiwiaXNzIjoiQWx1ZHJhSXNzdWVyIiwiYXVkIjoiQWx1ZHJhQXVkaWVuY2UiLCJPcmlnaW4iOiJjbWYiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiUmllc2dvIiwibW90b3JSaWVzZ29QcnVlYmEiLCJBZG1pbmlzdHJhdG9yIiwiQ3VtcGxpbWllbnRvIiwiQWRtaW5pc3RyYXRpdm8gUHJvZHVjdG9zIiwiQWRtaW5pc3RyYXRpdm8gQ3LDqWRpdG8iLCJBZG1pbmlzdHJhdGl2byBCYWNrIE9mZmljZSJdLCJleHAiOjE3MzMzMzU1NjN9.tm0rgeXyprxdDGHgt16e5X5R_9bJc7XI97EWx0GKnoo", // Reemplaza con tu token válido
          "Cache-Control": "no-cache",
          Connection: "keep-alive", // Si necesitas autenticación
        },
      }
    );

    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch data" });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching data" });
  }
};

export default handler;
