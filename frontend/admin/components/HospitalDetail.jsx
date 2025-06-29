import React, { useEffect, useState,useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";
import { FaPen } from "react-icons/fa";
import { AuthContext } from "../../AuthContext";

export default function HospitalDetail() {
  const { authToken } = useContext(AuthContext);
  // disable background scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const { id } = useParams();
  const [hospital, setHospital] = useState();
  const api = import.meta.env.VITE_URL;
  const [loading, setLoading] = useState(false);
  
  // Edit functionality states
  const [isEditing, setIsEditing] = useState(false);
  const [editedHospital, setEditedHospital] = useState({
    title: "",
    body: "",
    phone: "",
    email: "",
    website: "",
    address: "",
    aim: "",
    coverageArea: "",
    availableServices: {
      majorTest: [],
      surgical: []
    },
    communityServices: [],
    futurePlans: [],
    totalOPD: "",
    totalSurgery: "",
    image: null,
  });
  const [editingServiceIndex, setEditingServiceIndex] = useState(null);
  const [editingServiceType, setEditingServiceType] = useState(null);
  const [newServiceInput, setNewServiceInput] = useState("");
  const [editingCommunityIndex, setEditingCommunityIndex] = useState(null);
  const [editingFuturePlanIndex, setEditingFuturePlanIndex] = useState(null);
  const [newCommunityInput, setNewCommunityInput] = useState('');
  const [newFuturePlanInput, setNewFuturePlanInput] = useState('');

  useEffect(() => {
    const fetchHospital = async () => {
      setLoading(true);
      try {
        console.log(api);
        const res = await axios.get(`${api}/eyeHospitals/${id}`);
        console.log(res.data);
        if (res.status === 200) {
          setHospital(res.data.data);
          setLoading(false);
        } else {
          console.error("Error fetching page: Status code", res.status);
        }
      } catch (error) {
        console.error("Error fetching page:", error);
      }
    };

    fetchHospital();
  }, [api, id]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedHospital({
      title: hospital.title || "",
      body: hospital.body || "",
      phone: hospital.phone || "",
      email: hospital.email || "",
      website: hospital.website || "",
      address: hospital.address || "",
      aim: hospital.aim || "",
      coverageArea: hospital.coverageArea || "",
      availableServices: {
        majorTest: hospital.availableServices?.majorTest || [],
        surgical: hospital.availableServices?.surgical || []
      },
      communityServices: hospital.communityServices || [],
      futurePlans: hospital.futurePlans || [],
      totalOPD: hospital.totalOPD || "",
      totalSurgery: hospital.totalSurgery || "",
      image: hospital.image || null,
    });
  };

  const handleEditedHospitalChange = (e) => {
    setEditedHospital({ ...editedHospital, [e.target.name]: e.target.value });
  };

  const handleEditedHospitalImageChange = (e) => {
    setEditedHospital({ ...editedHospital, image: e.target.files[0] });
  };

  const handleArrayFieldChange = (field, value) => {
    const arrayValue = value.split(',').map(item => item.trim()).filter(item => item !== '');
    setEditedHospital({ ...editedHospital, [field]: arrayValue });
  };

  const handleServiceChange = (serviceType, value) => {
    const arrayValue = value.split(',').map(item => item.trim()).filter(item => item !== '');
    setEditedHospital({
      ...editedHospital,
      availableServices: {
        ...editedHospital.availableServices,
        [serviceType]: arrayValue
      }
    });
  };

  const handleAddServiceItem = (serviceType) => {
    if (newServiceInput.trim()) {
      const updatedServices = [...editedHospital.availableServices[serviceType], newServiceInput.trim()];
      setEditedHospital({
        ...editedHospital,
        availableServices: {
          ...editedHospital.availableServices,
          [serviceType]: updatedServices
        }
      });
      setNewServiceInput('');
    }
  };

  const handleEditServiceItem = (serviceType, index, newValue) => {
    const updatedServices = [...editedHospital.availableServices[serviceType]];
    updatedServices[index] = newValue;
    setEditedHospital({
      ...editedHospital,
      availableServices: {
        ...editedHospital.availableServices,
        [serviceType]: updatedServices
      }
    });
  };

  const handleDeleteServiceItem = (serviceType, index) => {
    const updatedServices = editedHospital.availableServices[serviceType].filter((_, i) => i !== index);
    setEditedHospital({
      ...editedHospital,
      availableServices: {
        ...editedHospital.availableServices,
        [serviceType]: updatedServices
      }
    });
  };

  const handleAddCommunityService = () => {
    if (newCommunityInput.trim()) {
      const updatedServices = [...editedHospital.communityServices, newCommunityInput.trim()];
      setEditedHospital({
        ...editedHospital,
        communityServices: updatedServices
      });
      setNewCommunityInput('');
    }
  };

  const handleEditCommunityService = (index, newValue) => {
    const updatedServices = [...editedHospital.communityServices];
    updatedServices[index] = newValue;
    setEditedHospital({
      ...editedHospital,
      communityServices: updatedServices
    });
  };

  const handleDeleteCommunityService = (index) => {
    const updatedServices = editedHospital.communityServices.filter((_, i) => i !== index);
    setEditedHospital({
      ...editedHospital,
      communityServices: updatedServices
    });
  };

  const handleAddFuturePlan = () => {
    if (newFuturePlanInput.trim()) {
      const updatedPlans = [...editedHospital.futurePlans, newFuturePlanInput.trim()];
      setEditedHospital({
        ...editedHospital,
        futurePlans: updatedPlans
      });
      setNewFuturePlanInput('');
    }
  };

  const handleEditFuturePlan = (index, newValue) => {
    const updatedPlans = [...editedHospital.futurePlans];
    updatedPlans[index] = newValue;
    setEditedHospital({
      ...editedHospital,
      futurePlans: updatedPlans
    });
  };

  const handleDeleteFuturePlan = (index) => {
    const updatedPlans = editedHospital.futurePlans.filter((_, i) => i !== index);
    setEditedHospital({
      ...editedHospital,
      futurePlans: updatedPlans
    });
  };

  const handleUpdateHospital = async () => {
    try {
      const formData = new FormData();
      formData.append("title", editedHospital.title);
      formData.append("body", editedHospital.body);
      formData.append("phone", editedHospital.phone);
      formData.append("email", editedHospital.email);
      formData.append("website", editedHospital.website);
      formData.append("address", editedHospital.address);
      formData.append("aim", editedHospital.aim);
      formData.append("coverageArea", editedHospital.coverageArea);
      formData.append("totalOPD", editedHospital.totalOPD);
      formData.append("totalSurgery", editedHospital.totalSurgery);
      
      // Handle arrays
      editedHospital.communityServices.forEach((service, index) => {
        formData.append(`communityServices[${index}]`, service);
      });
      
      editedHospital.futurePlans.forEach((plan, index) => {
        formData.append(`futurePlans[${index}]`, plan);
      });
      
      editedHospital.availableServices.majorTest.forEach((test, index) => {
        formData.append(`availableServices[majorTest][${index}]`, test);
      });
      
      editedHospital.availableServices.surgical.forEach((surgery, index) => {
        formData.append(`availableServices[surgical][${index}]`, surgery);
      });

      if (editedHospital.image && typeof editedHospital.image === 'object') {
        formData.append("image", editedHospital.image);
      }

      const response = await axios.patch(
        `${api}/eyeHospitals/edit/${id}`,
        formData,
        {
          headers: { 
           'Authorization': `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Hospital updated:", response.data);
      setIsEditing(false);
      // Refresh hospital data
      const res = await axios.get(`${api}/eyeHospitals/${id}`);
      setHospital(res.data.data);
    } catch (error) {
      console.error("Error updating hospital:", error);
    }
  };

  const handleDeleteHospital = async () => {
    if (confirm("Are you sure you want to delete this hospital?")) {
      try {
        const response = await axios.delete(`${api}/eyeHospitals/del/${id}`);
        console.log("Hospital deleted:", response.data);
        // Redirect to main page after deletion
        window.location.href = "admin/what_we_do";
      } catch (error) {
        console.error("Error deleting hospital:", error);
      }
    }
  };

  if (loading) return <Loading />;
  if (!hospital) return <p>Hospital not found</p>;

  return (
    <div className="fixed inset-0 z-50 bg-primary/50 backdrop-blur-md flex justify-center items-start overflow-auto p-4">
      <div className="bg-white rounded-lg overflow-auto max-w-4xl w-full space-y-4 p-6 relative border border-gray-200 shadow-lg">
        <Link
          to=""
          className="absolute top-4 right-4 text-gray-500 text-2xl"
        >
          ×
        </Link>
        
        {/* Edit and Delete buttons */}
        <div className="absolute top-4 left-4 flex gap-2">
          <button
            onClick={handleEdit}
            className="p-2 bg-blue-200 text-primary rounded-full hover:bg-blue-300"
          >
            <FaPen />
          </button>
          {/* <button
            onClick={handleDeleteHospital}
            className="p-2 bg-red-200 text-red-600 rounded-full hover:bg-red-300"
          >
            ×
          </button> */}
        </div>

        {!isEditing ? (
          <>
            <h1 className="text-3xl font-bold mt-12">{hospital.title}</h1>
            {hospital.image && (
              <img
                loading="lazy"
                src={`${api}/images/${hospital.image}`}
                alt={hospital.title}
                className="w-full h-64 object-cover rounded"
              />
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hospital.address && (
                <div>
                  <strong>Address:</strong> {hospital.address}
                </div>
              )}
              {hospital.phone && (
                <div>
                  <strong>Phone:</strong> {hospital.phone}
                </div>
              )}
              {hospital.email && (
                <div>
                  <strong>Email:</strong>{" "}
                  <a
                    href={`mailto:${hospital.email}`}
                    className="text-sky-600 underline"
                  >
                    {hospital.email}
                  </a>
                </div>
              )}
              {hospital.website && (
                <div>
                  <strong>Website:</strong>{" "}
                  <a
                    href={
                      hospital.website.startsWith("http")
                        ? hospital.website
                        : `https://${hospital.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-600 underline"
                  >
                    {hospital.website}
                  </a>
                </div>
              )}
            </div>

            {hospital.body && (
              <div>
                <strong>Description:</strong>
                <p className="mt-2">{hospital.body}</p>
              </div>
            )}

            {hospital.aim && (
              <div>
                <strong>Aim:</strong>
                <p className="mt-2">{hospital.aim}</p>
              </div>
            )}

            {hospital.coverageArea && (
              <div>
                <strong>Coverage Area:</strong>
                <p className="mt-2">{hospital.coverageArea}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hospital.totalOPD && (
                <div>
                  <strong>Total OPD:</strong> {hospital.totalOPD}
                </div>
              )}
              {hospital.totalSurgery && (
                <div>
                  <strong>Total Surgery:</strong> {hospital.totalSurgery}
                </div>
              )}
            </div>

            {hospital.availableServices && (
              <div>
                <strong>Available Services:</strong>
                {hospital.availableServices.majorTest && hospital.availableServices.majorTest.length > 0 && (
                  <div className="mt-2">
                    <strong className="text-sm">Major Tests:</strong>
                    <ul className="list-disc list-inside ml-4">
                      {hospital.availableServices.majorTest.map((test, index) => (
                        <li key={index}>{test}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {hospital.availableServices.surgical && hospital.availableServices.surgical.length > 0 && (
                  <div className="mt-2">
                    <strong className="text-sm">Surgical Services:</strong>
                    <ul className="list-disc list-inside ml-4">
                      {hospital.availableServices.surgical.map((surgery, index) => (
                        <li key={index}>{surgery}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {hospital.communityServices && hospital.communityServices.length > 0 && (
              <div>
                <strong>Community Services:</strong>
                <ul className="list-disc list-inside ml-4 mt-2">
                  {hospital.communityServices.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </div>
            )}

            {hospital.futurePlans && hospital.futurePlans.length > 0 && (
              <div>
                <strong>Future Plans:</strong>
                <ul className="list-disc list-inside ml-4 mt-2">
                  {hospital.futurePlans.map((plan, index) => (
                    <li key={index}>{plan}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-4 mt-12">
            <h2 className="text-2xl font-bold">Edit Hospital</h2>
            
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={editedHospital.title}
              onChange={handleEditedHospitalChange}
              className="w-full border rounded-lg p-2"
            />

            <textarea
              name="body"
              placeholder="Description"
              value={editedHospital.body}
              onChange={handleEditedHospitalChange}
              className="w-full border rounded-lg p-2"
              rows="3"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={editedHospital.address}
                onChange={handleEditedHospitalChange}
                className="w-full border rounded-lg p-2"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={editedHospital.phone}
                onChange={handleEditedHospitalChange}
                className="w-full border rounded-lg p-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={editedHospital.email}
                onChange={handleEditedHospitalChange}
                className="w-full border rounded-lg p-2"
              />
              <input
                type="text"
                name="website"
                placeholder="Website"
                value={editedHospital.website}
                onChange={handleEditedHospitalChange}
                className="w-full border rounded-lg p-2"
              />
            </div>

            <textarea
              name="aim"
              placeholder="Aim"
              value={editedHospital.aim}
              onChange={handleEditedHospitalChange}
              className="w-full border rounded-lg p-2"
              rows="2"
            />

            <textarea
              name="coverageArea"
              placeholder="Coverage Area"
              value={editedHospital.coverageArea}
              onChange={handleEditedHospitalChange}
              className="w-full border rounded-lg p-2"
              rows="2"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="totalOPD"
                placeholder="Total OPD"
                value={editedHospital.totalOPD}
                onChange={handleEditedHospitalChange}
                className="w-full border rounded-lg p-2"
              />
              <input
                type="text"
                name="totalSurgery"
                placeholder="Total Surgery"
                value={editedHospital.totalSurgery}
                onChange={handleEditedHospitalChange}
                className="w-full border rounded-lg p-2"
              />
            </div>

            {/* Replace the existing surgical services textarea with this: */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Major Tests</h4>
              <div className="space-y-2 mb-2">
                {editedHospital.availableServices.majorTest.map((test, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {editingServiceIndex === index && editingServiceType === 'majorTest' ? (
                      <input
                        type="text"
                        value={test}
                        onChange={(e) => handleEditServiceItem('majorTest', index, e.target.value)}
                        onBlur={() => {
                          setEditingServiceIndex(null);
                          setEditingServiceType(null);
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            setEditingServiceIndex(null);
                            setEditingServiceType(null);
                          }
                        }}
                        className="flex-1 border rounded px-2 py-1"
                        autoFocus
                      />
                    ) : (
                      <span 
                        className="flex-1 px-2 py-1 bg-gray-50 rounded cursor-pointer"
                        onClick={() => {
                          setEditingServiceIndex(index);
                          setEditingServiceType('majorTest');
                        }}
                      >
                        {test}
                      </span>
                    )}
                    <button
                      onClick={() => handleDeleteServiceItem('majorTest', index)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add new major test"
                  value={editingServiceType === 'majorTest' ? newServiceInput : ''}
                  onChange={(e) => {
                    setNewServiceInput(e.target.value);
                    setEditingServiceType('majorTest');
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddServiceItem('majorTest');
                    }
                  }}
                  className="flex-1 border rounded px-2 py-1"
                />
                <button
                  onClick={() => handleAddServiceItem('majorTest')}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Surgical Services</h4>
              <div className="space-y-2 mb-2">
                {editedHospital.availableServices.surgical.map((surgery, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {editingServiceIndex === index && editingServiceType === 'surgical' ? (
                      <input
                        type="text"
                        value={surgery}
                        onChange={(e) => handleEditServiceItem('surgical', index, e.target.value)}
                        onBlur={() => {
                          setEditingServiceIndex(null);
                          setEditingServiceType(null);
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            setEditingServiceIndex(null);
                            setEditingServiceType(null);
                          }
                        }}
                        className="flex-1 border rounded px-2 py-1"
                        autoFocus
                      />
                    ) : (
                      <span 
                        className="flex-1 px-2 py-1 bg-gray-50 rounded cursor-pointer"
                        onClick={() => {
                          setEditingServiceIndex(index);
                          setEditingServiceType('surgical');
                        }}
                      >
                        {surgery}
                      </span>
                    )}
                    <button
                      onClick={() => handleDeleteServiceItem('surgical', index)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add new surgical service"
                  value={editingServiceType === 'surgical' ? newServiceInput : ''}
                  onChange={(e) => {
                    setNewServiceInput(e.target.value);
                    setEditingServiceType('surgical');
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddServiceItem('surgical');
                    }
                  }}
                  className="flex-1 border rounded px-2 py-1"
                />
                <button
                  onClick={() => handleAddServiceItem('surgical')}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Community Services</h4>
              <div className="space-y-2 mb-2">
                {editedHospital.communityServices.map((service, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {editingCommunityIndex === index ? (
                      <input
                        type="text"
                        value={service}
                        onChange={(e) => handleEditCommunityService(index, e.target.value)}
                        onBlur={() => setEditingCommunityIndex(null)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            setEditingCommunityIndex(null);
                          }
                        }}
                        className="flex-1 border rounded px-2 py-1"
                        autoFocus
                      />
                    ) : (
                      <span 
                        className="flex-1 px-2 py-1 bg-gray-50 rounded cursor-pointer"
                        onClick={() => setEditingCommunityIndex(index)}
                      >
                        {service}
                      </span>
                    )}
                    <button
                      onClick={() => handleDeleteCommunityService(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add new community service"
                  value={newCommunityInput}
                  onChange={(e) => setNewCommunityInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddCommunityService();
                    }
                  }}
                  className="flex-1 border rounded px-2 py-1"
                />
                <button
                  onClick={handleAddCommunityService}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Future Plans</h4>
              <div className="space-y-2 mb-2">
                {editedHospital.futurePlans.map((plan, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {editingFuturePlanIndex === index ? (
                      <input
                        type="text"
                        value={plan}
                        onChange={(e) => handleEditFuturePlan(index, e.target.value)}
                        onBlur={() => setEditingFuturePlanIndex(null)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            setEditingFuturePlanIndex(null);
                          }
                        }}
                        className="flex-1 border rounded px-2 py-1"
                        autoFocus
                      />
                    ) : (
                      <span 
                        className="flex-1 px-2 py-1 bg-gray-50 rounded cursor-pointer"
                        onClick={() => setEditingFuturePlanIndex(index)}
                      >
                        {plan}
                      </span>
                    )}
                    <button
                      onClick={() => handleDeleteFuturePlan(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add new future plan"
                  value={newFuturePlanInput}
                  onChange={(e) => setNewFuturePlanInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddFuturePlan();
                    }
                  }}
                  className="flex-1 border rounded px-2 py-1"
                />
                <button
                  onClick={handleAddFuturePlan}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                >
                  Add
                </button>
              </div>
            </div>

            <input
              type="file"
              name="image"
              onChange={handleEditedHospitalImageChange}
              className="w-full border rounded-lg p-2"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={handleUpdateHospital}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Update
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
