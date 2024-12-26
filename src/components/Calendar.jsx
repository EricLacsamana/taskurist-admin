import React from 'react';
import useJobOrders from '../hooks/useJobOrders';

const Calendar = () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  
  const finalParams = {
    created_at_gte: startOfMonth.toISOString(),
    schedules_startDate_gte: startOfMonth.toISOString(),  // Include start date filter
    schedules_endDate_lte: endOfMonth.toISOString(),      // Include end date filter
  };

  const { data } = useJobOrders(finalParams);
  const jobOrders = data?.data;

  // Function to check if a schedule is on a particular day
  const isScheduleOnDate = (schedule, day) => {
    const scheduleStart = new Date(schedule.startDate);
    const scheduleEnd = new Date(schedule.endDate);
    const targetDay = new Date(now.getFullYear(), now.getMonth(), day);

    // Check if the schedule starts or ends on the target day
    return scheduleStart <= targetDay && scheduleEnd >= targetDay;
  };

  return (
    <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <table className="w-full">
          <thead>
            <tr className="grid grid-cols-7 rounded-t-sm bg-primary text-white">
              <th className="flex h-15 items-center justify-center rounded-tl-sm p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Sunday </span>
                <span className="block lg:hidden"> Sun </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Monday </span>
                <span className="block lg:hidden"> Mon </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Tuesday </span>
                <span className="block lg:hidden"> Tue </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Wednesday </span>
                <span className="block lg:hidden"> Wed </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Thursday </span>
                <span className="block lg:hidden"> Thur </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Friday </span>
                <span className="block lg:hidden"> Fri </span>
              </th>
              <th className="flex h-15 items-center justify-center rounded-tr-sm p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Saturday </span>
                <span className="block lg:hidden"> Sat </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Loop through each week */}
            {Array.from({ length: 5 }).map((_, weekIndex) => (
              <tr key={weekIndex} className="grid grid-cols-7">
                {Array.from({ length: 7 }).map((_, dayIndex) => {
                  const day = weekIndex * 7 + dayIndex + 1; // calculate the current day of the month
                  if (day > endOfMonth.getDate()) return null; // skip days beyond the current month

                  const jobForDay = jobOrders?.filter(jobOrder =>
                    jobOrder.schedules?.some(schedule => isScheduleOnDate(schedule, day))
                  );

                  return (
                    <td key={day} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                      <span className="font-medium text-black dark:text-white">{day}</span>
                      <div className="group h-16 w-full flex-grow cursor-pointer py-1 md:h-30">
                        {jobForDay && jobForDay.length > 0 && (
                          <div className="event invisible absolute left-2 z-99 mb-1 flex w-full flex-col rounded-sm border-l-[3px] border-primary bg-gray px-3 py-1 text-left opacity-0 group-hover:visible group-hover:opacity-100 dark:bg-meta-4 md:visible md:w-full md:opacity-100">
                            {jobForDay.map((jobOrder, index) => (
                              <div key={index} className="truncate">
                                <span className="event-name text-sm font-semibold text-black dark:text-white">
                                  {jobOrder.title}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default Calendar;
