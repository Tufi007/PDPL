function Organization() {
    return (
      <div>
        <div className="bg-white p-5 rounded-lg mb-5 flex justify-between items-center shadow-sm">
          <h1 className="text-2xl text-[#1f2937]">Organization</h1>
          <button className="bg-[#2563eb] text-white px-4 py-2 rounded-md">
            Edit Settings
          </button>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-lg mb-4">Organization Details</h2>
          <table className="w-full">
            <tbody>
              <tr className="border-b">
                <td className="p-3">Name</td>
                <td className="p-3">TechCorp International</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Industry</td>
                <td className="p-3">Technology</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Employees</td>
                <td className="p-3">1,200+</td>
              </tr>
              <tr>
                <td className="p-3">DPO</td>
                <td className="p-3">Sarah Johnson</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
  export default Organization;