// /pages/api/proxy.ts
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Realiza la solicitud a la API pública (ejemplo: jsonplaceholder)
    const response = await axios.get('https://jsonplaceholder.typicode.com/users'); // Ejemplo de API pública

    // Enviar la respuesta de la API pública al cliente sin exponer la solicitud en las herramientas de desarrollo
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from public API' });
  }
}
