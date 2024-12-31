import React, { useState } from 'react';
import {
  useGetByOrganizationQuery,
  useAddPurposeMutation,
  useAddFieldMutation,
} from '../../services/purposes/purposesAndFields';
import Modal from '../../reusableComponents/Modal';

function PurposesAndField() {
  const { data, isLoading, isError } = useGetByOrganizationQuery();
  const [addPurpose] = useAddPurposeMutation();
  const [addField,{error}] = useAddFieldMutation();

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'purpose' or 'field'
  const [formData, setFormData] = useState({});

  const handleOpenModal = (type) => {
    setModalType(type);
    setFormData({});
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalType(null);
    setFormData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitModal = async () => {
    try {
      if (modalType === 'purpose') {
        await addPurpose({ purpose: formData.name }).unwrap();
      } else if (modalType === 'field') {
       const res= await addField({
          id: formData.id,
          label: formData.label,
          type: formData.type,
          description: formData.description || '',
          purposes: formData.purposes?.split(',').map((item) => item.trim()),
        }).unwrap();
        console.log(res);
        console.log(error);
      }
      alert('Successfully added!');
      handleCloseModal();
    } catch (error) {
      console.error('Error adding data:', error);
      alert('Failed to add data. Please try again.');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred while fetching data.</div>;

  return (
    <div>
      <div className="bg-white p-5 rounded-lg mb-5 flex justify-between items-center shadow-sm">
        <h1 className="text-2xl text-[#1f2937]">Consent Purposes</h1>
        <div className="space-x-4">
          <button
            onClick={() => handleOpenModal('purpose')}
            className="bg-[#2563eb] text-white px-4 py-2 rounded-md"
          >
            Add Purpose
          </button>
          <button
            onClick={() => handleOpenModal('field')}
            className="bg-[#10b981] text-white px-4 py-2 rounded-md"
          >
            Add Field
          </button>
        </div>
      </div>
      <input
        type="text"
        placeholder="Search Purposes..."
        className="w-[300px] p-2 border rounded-md mb-5"
      />
      <table className="w-full bg-white rounded-lg overflow-hidden shadow-sm">
        <thead>
          <tr className="bg-[#f8fafc]">
            <th className="p-3 text-left">Purpose Name</th>
            <th className="p-3 text-left">Data Fields</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.purposes.map((purpose) => (
            <tr key={purpose} className="border-b">
              <td className="p-6 text-center text-[#334155] bg-[#f0f4f8] rounded-md font-semibold">
                {purpose}
              </td>
              <td className="p-3 bg-[#fafafa]">
                <div className="flex flex-wrap gap-2">
                  {data.fields
                    .filter((field) => field.purposes.includes(purpose))
                    .map((field) => (
                      <span
                        key={field.label}
                        className="bg-[#e0f2fe] border border-[#2563eb] text-[#2563eb] rounded-full py-1 px-3 text-xs"
                      >
                        {field.label}
                      </span>
                    ))}
                </div>
              </td>
              <td className="p-3">
                <span className="bg-[#dcfce7] text-[#166534] px-2 py-1 rounded-md text-xs">
                  Active
                </span>
              </td>
              <td className="p-3">
                <button className="bg-[#f3f4f6] text-[#4b5563] px-4 py-2 rounded-md text-sm">
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding Purposes or Fields */}
      {isModalOpen && (
        <Modal
          title={`Add New ${modalType === 'purpose' ? 'Purpose' : 'Field'}`}
          onClose={handleCloseModal}
          onSubmit={handleSubmitModal}
        >
          {modalType === 'purpose' ? (
            <>
              <label className="block text-sm font-medium text-gray-700">
                Purpose Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                placeholder="Enter purpose name"
                className="w-full border p-2 rounded-md"
                required
              />
            </>
          ) : (
            <>
              <label className="block text-sm font-medium text-gray-700">
                Field ID
              </label>
              <input
                type="text"
                name="id"
                value={formData.id || ''}
                onChange={handleChange}
                placeholder="Enter field ID"
                className="w-full border p-2 rounded-md"
                required
              />
              <label className="block text-sm font-medium text-gray-700">
                Field Label
              </label>
              <input
                type="text"
                name="label"
                value={formData.label || ''}
                onChange={handleChange}
                placeholder="Enter field label"
                className="w-full border p-2 rounded-md"
                required
              />
              <label className="block text-sm font-medium text-gray-700 mt-4">
                Field Type
              </label>
              <input
              type='text'
                name="type"
                value={formData.type || ''}
                onChange={handleChange}
                placeholder="Enter field type"
                className="w-full border p-2 rounded-md"
                required
              />
                
             
              <label className="block text-sm font-medium text-gray-700 mt-4">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                placeholder="Enter description (optional)"
                className="w-full border p-2 rounded-md"
              />
              <label className="block text-sm font-medium text-gray-700 mt-4">
                Purposes (comma-separated)
              </label>
              <input
                type="text"
                name="purposes"
                value={formData.purposes || ''}
                onChange={handleChange}
                placeholder="Purpose1, Purpose2, ..."
                className="w-full border p-2 rounded-md"
              />
            </>
          )}
        </Modal>
      )}
    </div>
  );
}

export default PurposesAndField;
