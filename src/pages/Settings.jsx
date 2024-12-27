import { useSelector, useDispatch } from 'react-redux';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'; // Importing react-hook-form
import userThree from '../images/user/user-03.png';
import RoleSelect from '../components/RoleSelect'; // Import RoleSelect component

const Settings = () => {
  const user = useSelector((state) => state.auth?.user); // Fetch user data from Redux
  const dispatch = useDispatch();

  // State to handle image preview and file input
  const [image, setImage] = useState(user?.photo || userThree);

  // Handle file upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the preview image
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle reset image
  const handleDeleteImage = () => {
    setImage(userThree); // Reset to default image
  };

  // Initialize react-hook-form
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

  // Set the user data when the component mounts
  useEffect(() => {
    if (user) {
      // Set user data in the form
      reset({
        fullName: user?.name || '',
        emailAddress: user?.email || '',
        password: '',  // Password will be blank initially, the user will fill it
        role: user?.role || '' // Adding the role to the form
      });
      setImage(user?.photo || userThree); // Set user image
    }
  }, [user, reset]);

  // Submit form handler
  const onSubmit = (data) => {
    console.log(data);
    // Dispatch form data here if necessary
  };

  // Static roles for the RoleSelect component
  const roles = [
    { value: 'admin', title: 'Admin' },
    { value: 'user', title: 'User' }
  ];

  return (
    <>
    <div className=""> {/* Increased the max width here */}
      <Breadcrumb pageName="Settings" />
      <div className="flex justify-center mx-auto max-w-6xl">
        <div className="w-full"> {/* Ensures full width inside the container */}
          <div className="grid gap-8">
            <div className="col-span-5 xl:col-span-3">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Personal Information
                  </h3>
                </div>
                <div className="p-7">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      <div className="w-full sm:w-1/2"> {/* Increase width to 1/2 of the row */}
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          Full Name
                        </label>
                        <div className="relative">
                          <input
                            {...register('fullName', { required: 'Full name is required' })}
                            className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="fullName"
                            id="fullName"
                            placeholder="Devid Jhon"
                          />
                          {errors.fullName && (
                            <span className="text-red-500 text-sm">{errors.fullName.message}</span>
                          )}
                        </div>
                      </div>

                      {/* Adjust Role Width */}
                      <div className="w-full sm:w-1/2"> {/* Increase width to 1/2 of the row */}
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="role"
                        >
                          Role
                        </label>
                        <RoleSelect
                          value={user?.role} // Default to user role
                          onChange={(selectedRole) => setValue('role', selectedRole)}
                          options={roles}
                        />
                        {errors.role && (
                          <span className="text-red-500 text-sm">{errors.role.message}</span>
                        )}
                      </div>
                    </div>

                    <div className="mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="emailAddress"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          {...register('emailAddress', { 
                            required: 'Email is required',
                            pattern: {
                              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                              message: 'Invalid email format'
                            }
                          })}
                          className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="email"
                          name="emailAddress"
                          id="emailAddress"
                          placeholder="devidjond45@gmail.com"
                        />
                        {errors.emailAddress && (
                          <span className="text-red-500 text-sm">{errors.emailAddress.message}</span>
                        )}
                      </div>
                    </div>

                    <div className="mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        {...register('password', { 
                          minLength: { value: 6, message: 'Password must be at least 6 characters long' }
                        })}
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Update your password"
                      />
                      {errors.password && (
                        <span className="text-red-500 text-sm">{errors.password.message}</span>
                      )}
                    </div>

                    <div className="flex justify-end gap-4.5">
                      <button
                        type="button"
                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    </>
  );
};

export default Settings;
