function DataCollection() {
    return (
      <div>
        <div className="bg-white p-5 rounded-lg mb-5 flex justify-between items-center shadow-sm">
          <h1 className="text-2xl text-[#1f2937]">Data Collection</h1>
          <button className="bg-[#2563eb] text-white px-4 py-2 rounded-md">
            Add Collector
          </button>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg mb-3">Web Form Collector</h3>
            <p className="text-sm mb-2">Status: Active</p>
            <p className="text-sm mb-4">Submissions today: 145</p>
            <button className="bg-[#f3f4f6] text-[#4b5563] px-4 py-2 rounded-md">
              View Details
            </button>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg mb-3">API Collector</h3>
            <p className="text-sm mb-2">Status: Active</p>
            <p className="text-sm mb-4">Requests today: 2,890</p>
            <button className="bg-[#f3f4f6] text-[#4b5563] px-4 py-2 rounded-md">
              View Details
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default DataCollection;