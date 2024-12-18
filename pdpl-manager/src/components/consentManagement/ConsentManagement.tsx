function ConsentManagement() {
    return (
      <div>
        <div className="bg-white p-5 rounded-lg mb-5 flex justify-between items-center shadow-sm">
          <h1 className="text-2xl text-[#1f2937]">Consent Management</h1>
          <button className="bg-[#2563eb] text-white px-4 py-2 rounded-md">
            Create Template
          </button>
        </div>
        <input 
          type="text" 
          placeholder="Search templates..." 
          className="w-[300px] p-2 border rounded-md mb-5"
        />
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg mb-2">Marketing Communications</h3>
            <p className="text-sm text-gray-500 mb-2">Last updated: 2024-03-15</p>
            <span className="bg-[#dcfce7] text-[#166534] px-2 py-1 rounded-md text-xs">
              Active
            </span>
            <button className="ml-3 bg-[#f3f4f6] text-[#4b5563] px-4 py-2 rounded-md text-sm">
              Edit Template
            </button>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg mb-2">Data Processing Agreement</h3>
            <p className="text-sm text-gray-500 mb-2">Last updated: 2024-03-10</p>
            <span className="bg-[#dcfce7] text-[#166534] px-2 py-1 rounded-md text-xs">
              Active
            </span>
            <button className="ml-3 bg-[#f3f4f6] text-[#4b5563] px-4 py-2 rounded-md text-sm">
              Edit Template
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default ConsentManagement;