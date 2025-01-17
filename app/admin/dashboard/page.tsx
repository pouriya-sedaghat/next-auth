import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Admin - Dashboard",
  };
}

async function Dashboard() {
  return <h2>Dashboard</h2>;
}

export default Dashboard;
