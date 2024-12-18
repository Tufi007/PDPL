function LegalGuardians() {
    return (
      <div>
        <div className="bg-white p-5 rounded-lg mb-5 flex justify-between items-center shadow-sm">
          <h1 className="text-2xl text-[#1f2937]">Legal Guardians</h1>
          <button className="bg-[#2563eb] text-white px-4 py-2 rounded-md">
            Add Guardian
          </button>
        </div>
        <input 
          type="text" 
          placeholder="Search guardians..." 
          className="w-[300px] p-2 border rounded-md mb-5"
        />
        <table className="w-full bg-white rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-[#f8fafc]">
              <th className="p-3 text-left">Guardian Name</th>
              <th className="p-3 text-left">Data Subject</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-3">John Smith</td>
              <td className="p-3">Amy Smith</td>
              <td className="p-3">
                <span className="bg-[#dcfce7] text-[#166534] px-2 py-1 rounded-md text-xs">
                  Verified
                </span>
              </td>
              <td className="p-3">
                <button className="bg-[#f3f4f6] text-[#4b5563] px-4 py-2 rounded-md text-sm">
                  View Details
                </button>
              </td>
            </tr>
            <tr>
              <td className="p-3">Mary Johnson</td>
              <td className="p-3">Tim Johnson</td>
              <td className="p-3">
                <span className="bg-[#fef3c7] text-[#92400e] px-2 py-1 rounded-md text-xs">
                  Pending
                </span>
              </td>
              <td className="p-3">
                <button className="bg-[#f3f4f6] text-[#4b5563] px-4 py-2 rounded-md text-sm">
                  View Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  
  export default LegalGuardians;