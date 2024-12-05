// /pages/dashboard.tsx
"use-client";
import { GetServerSideProps } from "next";

const Dashboard = ({ data }: { data: any }) => {
  if (!data) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to the Dashboard</h1>
      <p style={styles.description}>This is a protected page.</p>
      <h2 style={styles.subtitle}>User List</h2>
      <pre style={styles.pre}>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
const styles = {
  container: {
    padding: "40px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "900px",
    margin: "auto",
    fontFamily: "'Roboto', sans-serif",
  },
  title: {
    fontSize: "2.5rem",
    color: "#2c3e50",
    marginBottom: "20px",
  },
  description: {
    fontSize: "1.2rem",
    color: "#7f8c8d",
    marginBottom: "20px",
  },
  subtitle: {
    fontSize: "1.5rem",
    color: "#16a085",
    marginBottom: "10px",
  },
  pre: {
    backgroundColor: "#ecf0f1",
    padding: "20px",
    borderRadius: "8px",
    overflowX: "auto",
    fontFamily: "'Courier New', monospace",
    fontSize: "1rem",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    color: "#000",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.5rem",
    color: "#16a085",
    padding: "40px",
  },
};

// getServerSideProps hace la solicitud desde el servidor
export const getServerSideProps: GetServerSideProps = async () => {
  // Hacemos la solicitud a la API Route
  // try {
  //   const res = await fetch(
  //     "https://qa-app.cmf.com.pa/mdl03/api/Customers/GetCustomerByParam/1/8-929-2098",
  //     {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json, text/plain, */*",
  //         "Accept-Language": "es;q=0.5",
  //         Authorization:
  //           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMTZhMDIxNi1mZmI0LTQ3MTktOGZjYi02MTkzM2U0N2UzODIiLCJlbWFpbCI6ImFydXRoZXJmb3JkQGh5cGVybm92YWxhYnMuY29tIiwiaXNzIjoiQWx1ZHJhSXNzdWVyIiwiYXVkIjoiQWx1ZHJhQXVkaWVuY2UiLCJPcmlnaW4iOiJjbWYiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiUmllc2dvIiwibW90b3JSaWVzZ29QcnVlYmEiLCJBZG1pbmlzdHJhdG9yIiwiQ3VtcGxpbWllbnRvIiwiQWRtaW5pc3RyYXRpdm8gUHJvZHVjdG9zIiwiQWRtaW5pc3RyYXRpdm8gQ3LDqWRpdG8iLCJBZG1pbmlzdHJhdGl2byBCYWNrIE9mZmljZSJdLCJleHAiOjE3MzMzMzU1NjN9.tm0rgeXyprxdDGHgt16e5X5R_9bJc7XI97EWx0GKnoo", // Reemplaza con tu token válido
  //         "Cache-Control": "no-cache",
  //         Connection: "keep-alive",
  //       },
  //     }
  //   );

  //   if (!res.ok) {
  //     throw new Error("Failed to fetch data from the API");
  //   }

  //   const data = await res.json();

  //   return {
  //     props: { data },
  //   };
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  //   return {
  //     props: { data: null },
  //   };
  // }
  try {
    const res = await fetch('http://localhost:3000/api/dashboard');
    if (!res.ok) {
      throw new Error('Failed to fetch data from the API Route');
    }

    const data = await res.json();

    return {
      props: { data },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: { data: null },
    };
  }
};

export default Dashboard;
