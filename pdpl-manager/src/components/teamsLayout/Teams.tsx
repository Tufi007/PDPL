function Teams() {
    return (
      <div>
        <div className="bg-white p-5 rounded-lg mb-5 flex justify-between items-center shadow-sm">
          <h1 className="text-2xl text-[#1f2937]">Teams</h1>
          <button className="bg-[#2563eb] text-white px-4 py-2 rounded-md">
            Add Team
          </button>
        </div>
        <input 
          type="text" 
          placeholder="Search teams..." 
          className="w-[300px] p-2 border rounded-md mb-5"
        />
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg mb-3">Data Protection Team</h3>
            <div className="flex gap-2 mb-3">
              {['JD', 'SK', '+3'].map((member, index) => (
                <div 
                  key={index} 
                  className="w-8 h-8 rounded-full bg-[#e5e7eb] flex items-center justify-center"
                >
                  {member}
                </div>
              ))}
            </div>
            <button className="bg-[#f3f4f6] text-[#4b5563] px-4 py-2 rounded-md">
              Manage Team
            </button>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg mb-3">Compliance Team</h3>
            <div className="flex gap-2 mb-3">
              {['MR', 'AL', '+2'].map((member, index) => (
                <div 
                  key={index} 
                  className="w-8 h-8 rounded-full bg-[#e5e7eb] flex items-center justify-center"
                >
                  {member}
                </div>
              ))}
            </div>
            <button className="bg-[#f3f4f6] text-[#4b5563] px-4 py-2 rounded-md">
              Manage Team
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Teams;