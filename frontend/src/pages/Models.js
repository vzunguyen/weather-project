import ElectricityChart from "../components/ElectricityChart";
export default function ModelsPage() {
  return (
    <div className="min-h-screen pt-32">
      <h1 class="font-extrabold font-sans text-3xl">Models Page</h1>
      <h2 class="font-extrabold font-sans text-xl">Electricity Usage</h2>
      <ElectricityChart />
      <h2 class="font-extrabold font-sans text-xl">Weather Type Chart</h2>
    </div>
  );
}
