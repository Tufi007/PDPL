import React, { useState } from 'react';
import { useGetOrganizationQuery, useUpdateOrganizationMutation, useDeleteOrganizationMutation, useGetAllOrganizationQuery } from '../../services/Auth/organization';

function Organization() {
  const { data: organization, isLoading, isError } = useGetOrganizationQuery();
  // const { data:allorganization } = useGetAllOrganizationQuery();
  console.log(organization);
  console.log(localStorage.getItem('user'));
  const [updateOrganization] = useUpdateOrganizationMutation();
  const [deleteOrganization] = useDeleteOrganizationMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    industry: '',
    employees: '',
    dpo: '',
  });

  const handleEditClick = () => {
    setIsEditing(true);
    setEditForm({
      name: organization?.name || '',
      industry: organization?.industry || '',
      employees: organization?.employees || '',
      dpo: organization?.dpo || '',
    });
  };

  const handleSave = async () => {
    try {
      await updateOrganization(editForm).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating organization:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this organization?')) {
      try {
        await deleteOrganization().unwrap();
        alert('Organization deleted successfully');
        // Redirect or handle UI change post-deletion
      } catch (error) {
        console.error('Error deleting organization:', error);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading organization details</div>;

  return (
    <div>
      <div className="bg-white p-5 rounded-lg mb-5 flex justify-between items-center shadow-sm">
        <h1 className="text-2xl text-[#1f2937]">Organization</h1>
        <div>
          <button
            className="bg-[#2563eb] text-white px-4 py-2 rounded-md mr-2"
            onClick={handleEditClick}
          >
            Edit Settings
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={handleDelete}
          >
            Delete Organization
          </button>
        </div>
      </div>
      {isEditing ? (
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-lg mb-4">Edit Organization</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="industry">
                Industry
              </label>
              <input
                id="industry"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                type="text"
                value={editForm.industry}
                onChange={(e) => setEditForm({ ...editForm, industry: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employees">
                Employees
              </label>
              <input
                id="employees"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                type="text"
                value={editForm.employees}
                onChange={(e) => setEditForm({ ...editForm, employees: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dpo">
                DPO
              </label>
              <input
                id="dpo"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                type="text"
                value={editForm.dpo}
                onChange={(e) => setEditForm({ ...editForm, dpo: e.target.value })}
              />
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-lg mb-4">Organization Details</h2>
          <table className="w-full">
            <tbody>
              <tr className="border-b">
                <td className="p-3">Name</td>
                <td className="p-3">{organization.name}</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Industry</td>
                <td className="p-3">{organization.industry}</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Employees</td>
                <td className="p-3">{organization.employees}</td>
              </tr>
              <tr>
                <td className="p-3">Domain</td>
                <td className="p-3">{organization.domain}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Organization;
