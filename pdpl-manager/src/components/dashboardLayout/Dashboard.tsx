function Dashboard() {
    return (
      <div>
        <div className="bg-white p-5 rounded-lg mb-5 flex justify-between items-center shadow-sm">
          <h1 className="text-2xl text-[#1f2937]">Dashboard</h1>
          <button className="bg-[#2563eb] text-white px-4 py-2 rounded-md">
            Export Report
          </button>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="text-[#6b7280] text-sm bg-pr">Active Consents</div>
            <div className="text-4xl font-bold text-[#2563eb] my-2">2,451</div>
            <div className="text-[#6b7280] text-sm">+12% from last month</div>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="text-[#6b7280] text-sm">Data Collection Points</div>
            <div className="text-4xl font-bold text-[#2563eb] my-2">48</div>
            <div className="text-[#6b7280] text-sm">Active collectors</div>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="text-[#6b7280] text-sm">Pending Reviews</div>
            <div className="text-4xl font-bold text-[#2563eb] my-2">7</div>
            <div className="text-[#6b7280] text-sm">Requires attention</div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Dashboard;