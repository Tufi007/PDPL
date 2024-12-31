import { Link } from "react-router-dom";
import { useFetchConsentFormsQuery } from "../../services/consentsForms/consentForm";

function ConsentManagement() {
  const { data, isLoading, isError } = useFetchConsentFormsQuery();
console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading forms</div>;
  }

  return (
    <div className="p-5">
      <div className="bg-white p-5 rounded-lg mb-5 flex justify-between items-center shadow-sm">
        <h1 className="text-2xl text-[#1f2937]">Consent Management</h1>
        <Link
          to={"/createTemplateForm"}
          className="bg-[#2563eb] text-white px-4 py-2 rounded-md"
        >
          Create Template
        </Link>
      </div>
      <input
        type="text"
        placeholder="Search templates..."
        className="w-[300px] p-2 border rounded-md mb-5"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.forms?.map((form) => (
          <div
            key={form._id}
            className="bg-white p-5 rounded-lg shadow-md min-w-[300px] max-w-[350px] mx-auto"
          >
            <h3 className="text-lg font-semibold mb-2">{form.name}</h3>
            <p className="text-sm text-gray-500 mb-3">{form.description}</p>
            <p className="text-sm text-gray-400 mb-3">Version: {form.version}</p>
            <div className="mb-3">
              <h4 className="font-medium mb-1">Purposes:</h4>
              <ul className="flex flex-wrap gap-2">
                {form.purposes.map((purpose, index) => (
                  <li
                    key={index}
                    className="bg-[#e0f2fe] text-[#0369a1] px-2 py-1 rounded-md text-xs"
                  >
                    {purpose}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-3">
              <h4 className="font-medium mb-1">Fields:</h4>
              <ul className="space-y-2">
                {form.fields.slice(0, 3).map((field) => (
                  <li
                    key={field.id}
                    className="bg-[#66e5f9] text-[#0e0c10] px-3 py-2 rounded-md"
                  >
                    <span className="font-semibold">{field.label}:</span>{" "}
                    <span className="text-sm">{field.description}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between items-center">
              <span
                className={`px-2 py-1 rounded-md text-xs ${
                  form.active
                    ? "bg-[#dcfce7] text-[#166534]"
                    : "bg-[#fee2e2] text-[#991b1b]"
                }`}
              >
                {form.active ? "Active" : "Inactive"}
              </span>
              <button className="bg-[#f3f4f6] text-[#4b5563] px-4 py-2 rounded-md text-sm">
                Edit Template
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConsentManagement;
