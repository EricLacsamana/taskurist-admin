import React from 'react';

// Function to map the user status to a more readable title
const getUserStatusTitle = (status) => {
    const statusMap = {
        'active': 'Active',
        'inactive': 'Inactive',
        'suspended': 'Suspended',
    };
    return statusMap[status] || 'Unknown'; // Default to 'Unknown' if status is not recognized
};

// Function to format the date
const formatDate = (dateString) => {
    const date = new Date(dateString); // Convert string to Date object
    return date.toLocaleString('en-US', { // Customize the format
        weekday: 'long', // e.g. "Monday"
        year: 'numeric', // e.g. "2024"
        month: 'long', // e.g. "December"
        day: 'numeric', // e.g. "21"
        hour: 'numeric', // e.g. "5 PM"
        minute: 'numeric', // e.g. "58"
        second: 'numeric', // e.g. "12"
        hour12: true, // 12-hour clock with AM/PM
    });
};

// Function to map user roles to more readable titles
const getRoleTitle = (role) => {
    const roleMap = {
        'user': 'User',
        'admin': 'Admin',
        'moderator': 'Moderator',
    };
    return roleMap[role] || 'Unknown'; // Default to 'Unknown' if role is not recognized
};

const UsersTable = ({ data = [] }) => {
    return (
        <div
            className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
            style={{ height: '75vh' }}
        >
            <div className="max-w-full overflow-x-auto">
                {/* Table wrapper */}
                <table className="w-full table-auto" style={{ tableLayout: 'fixed' }}>
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="py-4 px-4 font-medium text-black dark:text-white" style={{ width: '20%' }}>
                                Name
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white" style={{ width: '20%' }}>
                                Email
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white" style={{ width: '20%' }}>
                                Role
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white" style={{ width: '20%' }}>
                                Status
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white" style={{ width: '20%' }}>
                                Joined Date
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white" style={{ width: '15%' }}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                </table>

                {/* Table body with overflow scroll */}
                <div
                    style={{
                        maxHeight: 'calc(70vh - 72px)', // Subtract the header's height from the container's height
                        overflowY: 'auto',
                        display: 'block',
                    }}
                >
                    <table className="w-full table-auto" style={{ tableLayout: 'fixed' }}>
                        <tbody>
                            {data.map((user, key) => (
                                <tr key={key}>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {user.name}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {user.email}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p
                                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                                                user.role === 'admin'
                                                    ? 'bg-success text-success'
                                                    : user.role === 'moderator'
                                                    ? 'bg-warning text-warning'
                                                    : 'bg-info text-info'
                                            }`}
                                        >
                                            {getRoleTitle(user.role)} {/* Using role mapping */}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p
                                            className={`inline-flex justify-center items-center rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                                                user.status === 'active'
                                                    ? 'bg-success text-success'
                                                    : user.status === 'inactive'
                                                    ? 'bg-warning text-warning'
                                                    : 'bg-danger text-danger'
                                            }`}
                                        >
                                            {getUserStatusTitle(user.status)}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {formatDate(user.createdAt)} {/* Format the date */}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            <button className="hover:text-primary">
                                                <svg
                                                    className="fill-current"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                                    />
                                                    <path
                                                        d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                                    />
                                                </svg>
                                            </button>
                                            <button className="hover:text-primary">
                                                <svg
                                                    className="fill-current"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05972 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21918C3.50378 2.47502 2.98718 2.99162 2.98718 3.70702V14.293C2.98718 15.0084 3.50378 15.525 4.21918 15.525H13.7535C14.4689 15.525 14.9855 15.0084 14.9855 14.293V3.70702C14.9855 2.99162 14.4689 2.47502 13.7535 2.47502ZM7.90352 2.08264H10.0691C10.3699 2.08264 10.5879 2.30064 10.5879 2.60144V3.47252H7.90352V2.60144C7.90352 2.30064 8.12152 2.08264 8.42135 2.08264ZM13.7535 14.293H4.21918C3.91938 14.293 3.70138 14.111 3.70138 13.8102V4.9397C3.70138 4.6389 3.91938 4.4209 4.21918 4.4209H13.7535C14.0533 4.4209 14.2713 4.6389 14.2713 4.9397V13.8102C14.2713 14.111 14.0533 14.293 13.7535 14.293Z"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UsersTable;
