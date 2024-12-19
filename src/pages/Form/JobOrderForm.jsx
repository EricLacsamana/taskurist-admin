import React, { useState } from 'react';

const JobOrderForm = () => {
  const [jobOrder, setJobOrder] = useState({
    title: '',
    description: '',
    jobType: '',
    schedule: [{ date: '', expectedQuantity: '', actualQuantity: '' }],
    workersAssigned: [],
    assetsToRepair: [],
    inventorySku: '',
    repairDetails: '',
    jobStatus: 'pending',
    totalQuantity: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobOrder({
      ...jobOrder,
      [name]: value
    });
  };

  const handleScheduleChange = (index, e) => {
    const { name, value } = e.target;
    const newSchedule = [...jobOrder.schedule];
    newSchedule[index][name] = value;
    setJobOrder({
      ...jobOrder,
      schedule: newSchedule
    });
  };

  const handleAddSchedule = () => {
    setJobOrder({
      ...jobOrder,
      schedule: [...jobOrder.schedule, { date: '', expectedQuantity: '', actualQuantity: '' }]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(jobOrder);
  };

  return (
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              {/* Title */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter job order title"
                  value={jobOrder.title}
                  onChange={handleInputChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none"
                />
              </div>

              {/* Job Description (Updated to be a Textarea) */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Description</label>
                <textarea
                  name="description"
                  rows="4"
                  placeholder="Enter job order description"
                  value={jobOrder.description}
                  onChange={handleInputChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none"
                ></textarea>
              </div>

              {/* Job Type */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Job Type</label>
                <select
                  name="jobType"
                  value={jobOrder.jobType}
                  onChange={handleInputChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none"
                >
                  <option value="">Select Job Type</option>
                  <option value="repair">Repair</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="production">Production</option>
                </select>
              </div>

              {/* Schedule */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Schedule</label>
                {jobOrder.schedule.map((scheduleItem, index) => (
                  <div className="flex gap-4 mb-4" key={index}>
                    <input
                      type="date"
                      name="date"
                      value={scheduleItem.date}
                      onChange={(e) => handleScheduleChange(index, e)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none"
                    />
                    {jobOrder.jobType !== 'production' && (
                      <>
                        <input
                          type="number"
                          name="expectedQuantity"
                          placeholder="Expected Quantity"
                          value={scheduleItem.expectedQuantity}
                          onChange={(e) => handleScheduleChange(index, e)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none"
                        />
                        <input
                          type="number"
                          name="actualQuantity"
                          placeholder="Actual Quantity"
                          value={scheduleItem.actualQuantity}
                          onChange={(e) => handleScheduleChange(index, e)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none"
                        />
                      </>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddSchedule}
                  className="text-primary hover:underline"
                >
                  Add Another Schedule
                </button>
              </div>

              {/* Repair Details - Only visible if Job Type is not "production" */}
              {jobOrder.jobType === 'repair' && (
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">Repair Details</label>
                  <textarea
                    name="repairDetails"
                    rows="4"
                    placeholder="Enter repair details"
                    value={jobOrder.repairDetails}
                    onChange={handleInputChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none"
                  ></textarea>
                </div>
              )}

              {/* Job Status */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Job Status</label>
                <select
                  name="jobStatus"
                  value={jobOrder.jobStatus}
                  onChange={handleInputChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Total Quantity - Only visible if Job Type is "production" */}
              {jobOrder.jobType === 'production' && (
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">Total Quantity</label>
                  <input
                    type="number"
                    name="totalQuantity"
                    placeholder="Enter total quantity"
                    value={jobOrder.totalQuantity}
                    onChange={handleInputChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none"
                  />
                </div>
              )}

              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Submit Job Order
              </button>
            </div>
          </form>

  );
};

export default JobOrderForm;
