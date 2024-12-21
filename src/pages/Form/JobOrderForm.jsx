import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import MultiSelect from '../../components/Forms/MultiSelect';

const JobOrderForm = ({ onSubmit = () => {} }) => {
  const availablePersonnel = [
    'John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown', 'Charlie Davis'
  ];

  const { control, handleSubmit, watch, register, setValue, getValues, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      jobType: '',
      schedules: [{ startDate: '', endDate: '', expectedQuantity: '', actualQuantity: '' }],
      assignedPersonnel: [],
      assets: [],
      serviceDetails: '',
      status: 'pending',
    }
  });

  const watchJobType = watch('jobType');



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
            {...register(`schedule[${index}].startDate`, { required: 'Start date is required' })}
            className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none ${errors?.schedule?.[index]?.startDate ? 'border-red-500' : ''}`}
          />
          {errors?.schedule?.[index]?.startDate && (
            <span className="text-red-500 text-sm">{errors.schedule[index].startDate.message}</span>
          )}
        </div>
        <div>
          <label className="block text-black dark:text-white">End Date</label>
          <input
            type="date"
            {...register(`schedule[${index}].endDate`, { required: 'End date is required' })}
            className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none ${errors?.schedule?.[index]?.endDate ? 'border-red-500' : ''}`}
          />
          {errors?.schedule?.[index]?.endDate && (
            <span className="text-red-500 text-sm">{errors.schedule[index].endDate.message}</span>
          )}
        </div>

        {/* Quantities */}
        {watchJobType === 'production' && (
          <>
            <div>
              <label className="block text-black dark:text-white">Expected Quantity</label>
              <input
                type="number"
                placeholder="Expected Quantity"
                {...register(`schedule[${index}].expectedQuantity`, { required: 'Expected quantity is required' })}
                className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none ${errors?.schedule?.[index]?.expectedQuantity ? 'border-red-500' : ''}`}
              />
              {errors?.schedule?.[index]?.expectedQuantity && (
                <span className="text-red-500 text-sm">{errors.schedule[index].expectedQuantity.message}</span>
              )}
            </div>
            <div>
              <label className="block text-black dark:text-white">Actual Quantity</label>
              <input
                type="number"
                placeholder="Actual Quantity"
                {...register(`schedule[${index}].actualQuantity`, { required: 'Actual quantity is required' })}
                className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none ${errors?.schedule?.[index]?.actualQuantity ? 'border-red-500' : ''}`}
              />
              {errors?.schedule?.[index]?.actualQuantity && (
                <span className="text-red-500 text-sm">{errors.schedule[index].actualQuantity.message}</span>
              )}
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
          {...register('title', { required: 'Title is required' })}
          className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none ${errors.title ? 'border-red-500' : ''}`}
        />
        {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
      </div>

      {/* Job Description */}
      <div className="mb-4.5">
        <label className="mb-2.5 block text-black dark:text-white">Description</label>
        <textarea
          rows="4"
          placeholder="Enter job order description"
          {...register('description', { required: 'Description is required' })}
          className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none ${errors.description ? 'border-red-500' : ''}`}
        />
        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
      </div>

      {/* Job Type */}
      <div className="mb-4.5">
        <label className="mb-2.5 block text-black dark:text-white">Job Type</label>
        <select {...register('jobType', { required: 'Job type is required' })} className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none ${errors.jobType ? 'border-red-500' : ''}`}>
          <option value="">Select Job Type</option>
          <option value="service">Service</option>
          <option value="maintenance">Maintenance</option>
          <option value="production">Production</option>
        </select>
        {errors.jobType && <span className="text-red-500 text-sm">{errors.jobType.message}</span>}
      </div>

      {/* Schedule */}
      <div className="mb-4.5">
        <label className="mb-2.5 block text-black dark:text-white">Schedule</label>
        {watch('schedules').map((scheduleItem, index) => renderScheduleField(scheduleItem, index))}
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
          name="assignedPersonnel"
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
      {watchJobType === 'service' && (
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">Repair Details</label>
          <textarea
            rows="4"
            placeholder="Enter service details"
            {...register('serviceDetails', { required: 'Repair details are required for service jobs' })}
            className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none ${errors.serviceDetails ? 'border-red-500' : ''}`}
          />
          {errors.serviceDetails && <span className="text-red-500 text-sm">{errors.serviceDetails.message}</span>}
        </div>
      )}

      {/* Job Status */}
      <div className="mb-4.5">
        <label className="mb-2.5 block text-black dark:text-white">Status</label>
        <select {...register('status')} className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none">
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

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
