import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import MultiSelect from '../../components/Forms/MultiSelect';

const JobOrderForm = () => {
  const availablePersonnel = [
    'John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown', 'Charlie Davis'
  ];

  const { control, handleSubmit, watch, register, setValue, getValues } = useForm({
    defaultValues: {
      title: '',
      description: '',
      jobType: '',
      schedule: [{ startDate: '', endDate: '', expectedQuantity: '', actualQuantity: '' }],
      workersAssigned: [],
      assetsToRepair: [],
      inventorySku: '',
      repairDetails: '',
      jobStatus: 'pending',
      totalQuantity: ''
    }
  });

  const watchJobType = watch('jobType'); // Watch job type to conditionally render fields

  const onSubmit = (data) => {
    console.log(data);
  };

  const addSchedule = () => {
    const newSchedule = [...getValues('schedule'), { startDate: '', endDate: '', expectedQuantity: '', actualQuantity: '' }];
    setValue('schedule', newSchedule);
  };

  const removeSchedule = (index) => {
    const currentSchedule = getValues('schedule');
    const updatedSchedule = currentSchedule.filter((_, i) => i !== index);
    setValue('schedule', updatedSchedule);
  };

  const renderScheduleField = (scheduleItem, index) => {
    return (
      <div className="grid grid-cols-2 gap-4 mb-4" key={index}>
        {/* Start and End Date */}
        <div>
          <label className="block text-black dark:text-white">Start Date</label>
          <input
            type="date"
            {...register(`schedule[${index}].startDate`)}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none"
          />
        </div>
        <div>
          <label className="block text-black dark:text-white">End Date</label>
          <input
            type="date"
            {...register(`schedule[${index}].endDate`)}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none"
          />
        </div>

        {/* Quantities */}
        {watchJobType !== 'production' && (
          <>
            <div>
              <label className="block text-black dark:text-white">Expected Quantity</label>
              <input
                type="number"
                placeholder="Expected Quantity"
                {...register(`schedule[${index}].expectedQuantity`)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none"
              />
            </div>
            <div>
              <label className="block text-black dark:text-white">Actual Quantity</label>
              <input
                type="number"
                placeholder="Actual Quantity"
                {...register(`schedule[${index}].actualQuantity`)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none"
              />
            </div>
          </>
        )}

        {/* Remove Schedule Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => removeSchedule(index)}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6.5">
      {/* Title */}
      <div className="mb-4.5">
        <label className="mb-2.5 block text-black dark:text-white">Title</label>
        <input
          type="text"
          placeholder="Enter job order title"
          {...register('title')}
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none"
        />
      </div>

      {/* Job Description */}
      <div className="mb-4.5">
        <label className="mb-2.5 block text-black dark:text-white">Description</label>
        <textarea
          rows="4"
          placeholder="Enter job order description"
          {...register('description')}
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none"
        ></textarea>
      </div>

      {/* Job Type */}
      <div className="mb-4.5">
        <label className="mb-2.5 block text-black dark:text-white">Job Type</label>
        <select {...register('jobType')} className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none">
          <option value="">Select Job Type</option>
          <option value="repair">Repair</option>
          <option value="maintenance">Maintenance</option>
          <option value="production">Production</option>
        </select>
      </div>

      {/* Schedule */}
      <div className="mb-4.5">
        <label className="mb-2.5 block text-black dark:text-white">Schedule</label>
        {watch('schedule').map((scheduleItem, index) => renderScheduleField(scheduleItem, index))}
        <button
          type="button"
          onClick={addSchedule}
          className="text-primary hover:underline"
        >
          Add Another Schedule
        </button>
      </div>

      {/* Assigned Personnel (Crew) - Multi-select Dropdown */}
      <div className="mb-4.5">
        <label className="mb-2.5 block text-black dark:text-white">Assigned Personnel</label>
        <Controller
          name="workersAssigned"
          control={control}
          render={({ field }) => (
            <MultiSelect
              id="assignedPersonnel"
              options={availablePersonnel}
              selectedValues={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      {/* Repair Details - Only visible if Job Type is not "production" */}
      {watchJobType === 'repair' && (
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">Repair Details</label>
          <textarea
            rows="4"
            placeholder="Enter repair details"
            {...register('repairDetails')}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none"
          ></textarea>
        </div>
      )}

      {/* Job Status */}
      <div className="mb-4.5">
        <label className="mb-2.5 block text-black dark:text-white">Job Status</label>
        <select {...register('jobStatus')} className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none">
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Total Quantity - Only visible if Job Type is "production" */}
      {watchJobType === 'production' && (
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">Total Quantity</label>
          <input
            type="number"
            placeholder="Enter total quantity"
            {...register('totalQuantity')}
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
    </form>
  );
};

export default JobOrderForm;
