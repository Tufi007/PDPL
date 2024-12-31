import React, { useState } from "react";
import { useCreateConsentFormMutation } from "../../services/consentsForms/consentForm";
import { useNavigate } from "react-router-dom"; // For navigation
import { useGetByOrganizationQuery } from "../../services/purposes/purposesAndFields";

const CreateTemplateForm = () => {
  const [createTemplateForm, { isError, isLoading, isSuccess, error }] =
    useCreateConsentFormMutation();
  const { data } = useGetByOrganizationQuery();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    version: "1.0",
  });
  const [purposes, setPurposes] = useState([]);
  const [fields, setFields] = useState([]);

  const navigate = useNavigate(); // Hook to navigate

  // Extract purposes and fields from data if available
  const availablePurposes = data?.purposes || [];
  const availableFields = data?.fields || [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePurposeToggle = (purpose) => {
    setPurposes((prev) =>
      prev.includes(purpose)
        ? prev.filter((p) => p !== purpose)
        : [...prev, purpose]
    );
  };

  const handleFieldChange = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };

  const addField = () => {
    setFields([
      ...fields,
      { id: "", label: "", type: "", description: "", required: false },
    ]);
  };

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Data:", { ...formData, purposes, fields });

    try {
      const response = await createTemplateForm({
        ...formData,
        purposes,
        fields,
      }).unwrap();
      console.log(response);
      console.log(error);
      // Reset form data after successful submission
      setFormData({ name: "", description: "", version: "1.0" });
      setPurposes([]);
      setFields([]);
      alert("Template created successfully!");
      // Redirect to previous page after submission
      navigate(-1); // Navigate back to the previous page
    } catch (err) {
      alert("Error creating template: " + (error?.message || "Unknown error"));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border border-gray-200 rounded-md shadow-md">
      <button
        onClick={() => navigate(-1)} // Go back to the previous page
        className="mt-4 px-4 py-2 text-white bg-gray-600 rounded-md"
      >
        Back
      </button>
      <h2 className="text-xl font-semibold mb-6">Create Template</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Template Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Template Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full mt-1 px-3 py-2 border rounded-md"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="w-full mt-1 px-3 py-2 border rounded-md"
          ></textarea>
        </div>

        {/* Version */}
        <div>
          <label htmlFor="version" className="block text-sm font-medium">
            Version
          </label>
          <input
            type="text"
            id="version"
            name="version"
            value={formData.version}
            onChange={handleInputChange}
            required
            className="w-full mt-1 px-3 py-2 border rounded-md"
          />
        </div>

        {/* Purposes */}
        <div>
          <label className="block text-sm font-medium mb-2">Purposes</label>
          <div className="flex flex-wrap space-x-4">
            {availablePurposes.map((purpose) => (
              <label
                key={purpose}
                className="flex items-center space-x-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={purposes.includes(purpose)}
                  onChange={() => handlePurposeToggle(purpose)}
                  className="form-checkbox"
                />
                <span>{purpose}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Fields */}
        <div>
          <label className="block text-sm font-medium mb-2">Fields</label>
          {fields.map((field, index) => (
            <div
              key={index}
              className="mb-4 p-4 border rounded-md space-y-2 bg-gray-50"
            >
              {/* ID */}
              <input
                type="text"
                placeholder="Field ID"
                value={field.id}
                onChange={(e) =>
                  handleFieldChange(index, "id", e.target.value)
                }
                className="w-full px-3 py-2 border rounded-md"
                required
              />
              {/* Label */}
              <input
                type="text"
                placeholder="Field Label"
                value={field.label}
                onChange={(e) =>
                  handleFieldChange(index, "label", e.target.value)
                }
                className="w-full px-3 py-2 border rounded-md"
                required
              />
              {/* Type */}
              <select
                value={field.type}
                onChange={(e) =>
                  handleFieldChange(index, "type", e.target.value)
                }
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select Field Type</option>
                {availableFields.map((fieldData) => (
                  <option key={fieldData.id} value={fieldData.type}>
                    {fieldData.label}
                  </option>
                ))}
              </select>
              {/* Description */}
              <textarea
                placeholder="Field Description"
                value={field.description}
                onChange={(e) =>
                  handleFieldChange(index, "description", e.target.value)
                }
                className="w-full px-3 py-2 border rounded-md"
              ></textarea>
              {/* Required */}
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) =>
                    handleFieldChange(index, "required", e.target.checked)
                  }
                  className="form-checkbox"
                />
                <span>Required</span>
              </label>
              {/* Remove Field */}
              <button
                type="button"
                onClick={() => removeField(index)}
                className="text-red-500 text-sm underline"
              >
                Remove Field
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addField}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md"
          >
            Add Field
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md"
        >
          Create Template
        </button>
      </form>
    </div>
  );
};

export default CreateTemplateForm;
