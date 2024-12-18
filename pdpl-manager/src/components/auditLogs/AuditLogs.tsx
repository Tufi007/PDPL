function AuditLogs() {
    return (
      <div>
        <div className="bg-white p-5 rounded-lg mb-5 flex justify-between items-center shadow-sm">
          <h1 className="text-2xl text-[#1f2937]">Audit Logs</h1>
          <button className="bg-[#2563eb] text-white px-4 py-2 rounded-md">
            Export Logs
          </button>
        </div>
        <table className="w-full bg-white rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-[#f8fafc]">
              <th className="p-3 text-left">Timestamp</th>
              <th className="p-3 text-left">Action</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-3">2024-03-17 14:30</td>
              <td className="p-3">Consent Updated</td>
              <td className="p-3">John Doe</td>
              <td className="p-3">Modified marketing preferences</td>
            </tr>
            <tr>
              <td className="p-3">2024-03-17 13:15</td>
              <td className="p-3">Data Access</td>
              <td className="p-3">Jane Smith</td>
              <td className="p-3">Exported customer records</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  
  export default AuditLogs;