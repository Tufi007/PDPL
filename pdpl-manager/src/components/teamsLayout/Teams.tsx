import React, { useState } from "react";
import { useGetTeamsQuery, useCreateTeamMutation } from "../../services/teams/teamsApi.ts";
import Modal from "../../reusableComponents/Modal.tsx"; // Reusable modal component
import dataFields from "../../store/dataFeilds.ts";
import { Link } from "react-router-dom";
import { useGetByOrganizationQuery } from "../../services/purposes/purposesAndFields.ts";

function Teams() {
  const [createTeam, { isLoading: addTeamLoading,error:createTeamerror }] = useCreateTeamMutation();
  const { data, isLoading:purposesLoading, isError } = useGetByOrganizationQuery();
  const organizationId = localStorage.getItem("organizationId");
  const userId = localStorage.getItem("_id");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    active: true,
    purposes: [],
    fields: [],
  });

  const [showAddTeamModal, setShowAddTeamModal] = useState(false);

  const handleAddField = (fieldName, fieldType) => {
    setFormData((prev) => ({
      ...prev,
      fields: Array.from(new Set([...prev.fields, fieldName])),
      purposes: Array.from(new Set([...prev.purposes, fieldType])),
    }));
  };

  const handleRemoveField = (fieldName, fieldType) => {
    setFormData((prev) => ({
      ...prev,
      fields: prev.fields.filter((field) => field !== fieldName),
      purposes: prev.purposes.filter((type) => {
        // Remove the type only if no other fields depend on it
        const remainingFields = prev.fields.filter((field) => field !== fieldName);
        return dataFields.some((df) => remainingFields.includes(df.name) && df.type === fieldType);
      }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault;
    const payload = {
      ...formData,
      organizationId,
      createdBy: userId,
      updatedBy: userId,
    };
    try {
      console.log(payload);
      const res = await createTeam(payload).unwrap();
      console.log(res);
      alert("Team created successfully");
      setShowAddTeamModal(false);
    } catch (error) {
      alert("Error creating team");
    }
  };

  const { data: teams, isLoading } = useGetTeamsQuery();
console.log(createTeamerror);
  return (
    <div>
      {/* Header */}
      <div className="bg-white p-5 rounded-lg mb-5 flex justify-between items-center shadow-sm">
        <h1 className="text-2xl text-[#1f2937]">Teams</h1>
        <button
          onClick={() => setShowAddTeamModal(true)}
          className="bg-[#2563eb] text-white px-4 py-2 rounded-md"
        >
          Add Team
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search teams..."
        className="w-[300px] p-2 border rounded-md mb-5"
      />

      {/* Teams List */}
      <div className="grid grid-cols-2 gap-5">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          teams?.teams?.map((team) => (
            <div key={team._id} className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="text-lg mb-3 capitalize">{team.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{team.description}</p>
              
              {/* Show up to 3 members */}
              <div className="flex space-x-2 mb-3">
                {team.members?.slice(0, 3).map((member, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full bg-[#e5e7eb] flex items-center justify-center"
                  >
                    {member.firstName?.[0]}{member.lastName?.[0]}
                  </div>
                ))}
              </div>

              {/* Fields Section */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Fields</label>
                <div className="flex flex-wrap gap-2 bg-blue-50 p-3 rounded-md">
                  {team.fields?.slice(0, 3).map((field, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </div>

              {/* Purposes Section */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Purposes</label>
                <div className="flex flex-wrap gap-2 bg-green-50 p-3 rounded-md">
                  {team.purposes?.slice(0, 3).map((purpose, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
                    >
                      {purpose}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                to={`/manageTeam/${team._id}`}
                className="bg-[#f3f4f6] text-[#4b5563] px-4 py-2 rounded-md"
              >
                Manage Team
              </Link>
            </div>
          ))
        )}
      </div>

      {/* Add Team Modal */}
      {showAddTeamModal && (
        <Modal
          title="Add Team"
          onClose={() => setShowAddTeamModal(false)}
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Team Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Available Fields</label>
            <div className="h-40 overflow-y-auto border p-2 rounded-md">
              {dataFields.map((field, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <span>{field.name} ({field.type})</span>
                  {formData.fields.includes(field.name) ? (
                    <button
                      type="button"
                      onClick={() => handleRemoveField(field.name, field.type)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleAddField(field.name, field.type)}
                      className="text-blue-500 hover:underline text-sm"
                    >
                      Add
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">Added Fields</label>
              <div className="flex flex-wrap items-center gap-2 border p-2 rounded-md">
                {formData.fields.map((field, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 px-2 py-1 bg-gray-100 border rounded-md"
                  >
                    <span>{field}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveField(field, dataFields.find((f) => f.name === field)?.type)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                {formData.fields.length === 0 && (
                  <span className="text-gray-400 text-sm">No fields added</span>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Teams;
