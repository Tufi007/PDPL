import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetTeamByIdQuery } from "../../services/teams/teamsApi.ts";
import { useAddMemberMutation, useGetMembersQuery } from "../../services/members/memberApi.ts";
import Modal from "../../reusableComponents/Modal.tsx";

function ManageTeamOutlet() {
  const { id } = useParams();
  const { data, isLoading } = useGetTeamByIdQuery(id);
console.log(id);

  const [addMember] = useAddMemberMutation();
  const {data:members,error}=useGetMembersQuery(id);
  console.log(error);
  console.log(members);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [memberFormData, setMemberFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleAddMember = async (e) => {
    e.preventDefault;
    try {
      await addMember({
        ...memberFormData,
        teamId: [id],
      }).unwrap();
      setShowAddMemberModal(false);
      setMemberFormData({ firstName: "", lastName: "", email: "" });
      alert("Member added successfully");
    } catch (error) {
      alert("Error adding member");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const team = data.data;
console.log(team);
  return (
    <div className="p-5">
      {/* Header */}
      <div className="bg-white p-5 rounded-lg mb-5 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-2xl text-[#1f2937] capitalize">{team?.name}</h1>
          <p className="text-gray-600 mt-1">{team?.description}</p>
        </div>
        <button
          onClick={() => setShowAddMemberModal(true)}
          className="bg-[#2563eb] text-white px-4 py-2 rounded-md"
        >
          Add Member
        </button>
      </div>

      {/* Team Details */}
      <div className="grid grid-cols-2 gap-5 mb-5">
        {/* Team Fields */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-3">Team Fields</h2>
          <div className="flex flex-wrap gap-2">
            {team?.fields?.map((field, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
              >
                {field}
              </span>
            ))}
          </div>
        </div>

        {/* Team Purposes */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-3">Team Purposes</h2>
          <div className="flex flex-wrap gap-2">
            {team?.purposes?.length>0 ? team?.purposes?.map((purpose, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
              >
                {purpose}
              </span>
            )):
                <span
               
                className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
              >
                Not Specified
              </span>
             }
          </div>
        </div>
      </div>

      {/* Team Info (Created At and Updated At) */}
      <div className="bg-white p-5 rounded-lg shadow-sm mb-5">
        <h2 className="text-lg font-medium mb-3">Team Info</h2>
        <div>
          <div>
            <span className="text-gray-600">Created At:</span>
            <p>{new Date(team?.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <span className="text-gray-600">Last Updated:</span>
            <p>{new Date(team?.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="bg-white p-5 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium mb-3">Team Members</h2>
        <div className="grid grid-cols-3 gap-4">
          {members?.data?.map((member, index) => (
            <div
              key={index}
              className="p-4 bg-[#f3f4f6] rounded-lg flex items-center space-x-3"
            >
              <div className="w-10 h-10 rounded-full bg-[#e5e7eb] flex items-center justify-center">
                {member.firstName?.[0]}
                {member.lastName?.[0]}
              </div>
              <div>
                <p className="font-medium">
                  {member.firstName} {member.lastName}
                </p>
                <p className="text-sm text-gray-600">{member.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <Modal
          title="Add Team Member"
          onClose={() => setShowAddMemberModal(false)}
          onSubmit={handleAddMember}
        >
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                required
                value={memberFormData.firstName}
                onChange={(e) =>
                  setMemberFormData({
                    ...memberFormData,
                    firstName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                required
                value={memberFormData.lastName}
                onChange={(e) =>
                  setMemberFormData({
                    ...memberFormData,
                    lastName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                value={memberFormData.email}
                onChange={(e) =>
                  setMemberFormData({
                    ...memberFormData,
                    email: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ManageTeamOutlet;
