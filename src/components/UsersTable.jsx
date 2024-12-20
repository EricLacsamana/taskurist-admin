import React from 'react';

const usersData = [
    {
        email: 'john.doe@example.com',
        username: 'john_doe',
        role: 'admin',
        createdAt: 'Jan 13, 2023',
    },
    {
        email: 'jane.smith@example.com',
        username: 'jane_smith',
        role: 'moderator',
        createdAt: 'Feb 20, 2023',
    },
    {
        email: 'michael.jones@example.com',
        username: 'michael_jones',
        role: 'user',
        createdAt: 'Mar 5, 2023',
    },
    {
        email: 'linda.lee@example.com',
        username: 'linda_lee',
        role: 'user',
        createdAt: 'Mar 18, 2023',
    },
    {
        email: 'mark.taylor@example.com',
        username: 'mark_taylor',
        role: 'admin',
        createdAt: 'Apr 2, 2023',
    },
];

const UsersTable = () => {
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
                            <th className="py-4 px-4 font-medium text-black dark:text-white" style={{ width: '25%' }}>
                                Username
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white" style={{ width: '25%' }}>
                                Email
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white" style={{ width: '25%' }}>
                                Role
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white" style={{ width: '25%' }}>
                                Joined Date
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
                            {usersData.map((user, key) => (
                                <tr key={key}>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {user.username}
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
                                            {user.role}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {user.createdAt}
                                        </p>
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
