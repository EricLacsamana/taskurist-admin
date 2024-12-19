import toast from 'react-hot-toast';
import dataJSON from '../../public/data.json';

const createToast = (title, msg, type) => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full ${getToastBgColor(type)} shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-white">{title}</p>
            <p className="mt-1 text-sm text-white">{msg}</p>
          </div>
        </div>
      </div>
      <div className="flex">
        <button
          onClick={() => toast.dismiss(t.id)}
          type="button"
          className="mr-2 box-content rounded-none border-none opacity-100 hover:no-underline hover:opacity-50 focus:opacity-50 focus:shadow-none focus:outline-none text-white"
          aria-label="Close"
        >
          <span className="w-[1em]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  ));
};

const getToastBgColor = (type) => {
  if (type === '0') return "bg-[#04b20c]";
  if (type === '1') return "bg-[#eab90f]";
  return "bg-[#e13f32]";
};

const getComparisonValue = (criterion, value, para, id) => {
  if (criterion === '0') {
    return value <= -1 * dataJSON[id][para];
  } else if (criterion === '1' || criterion === '3') {
    return value >= dataJSON[id][para];
  } else if (criterion === '2') {
    return value <= dataJSON[id][para];
  }
  return value === dataJSON[id][para];
};

const createAlertMessage = (id, alertSetting, realValue) => {
  const { para, criterion } = alertSetting;
  const actions = {
    '0': 'goes down by',
    '1': 'goes up by',
    '2': 'is smaller than',
    '3': 'is greater than',
    'default': 'is equal to',
  };

  const action = actions[criterion] || actions['default'];
  return `${para} of ${id} ${action} ${realValue}`;
};

const checkAndFireToast = (alertSetting) => {
  const value = isNaN(parseFloat(alertSetting.value)) ? alertSetting.value : parseFloat(alertSetting.value);
  const para = alertSetting.criterion < 2 ? "delta_" + alertSetting.para : alertSetting.para;

  if (alertSetting.id === 'ALL') {
    Object.keys(dataJSON).forEach((id) => {
      const condition = getComparisonValue(alertSetting.criterion, value, para, id);
      const realValue = alertSetting.criterion === '0' ? dataJSON[id][para] * -1 : dataJSON[id][para];

      if (condition) {
        const msg = createAlertMessage(id, alertSetting, realValue);
        createToast(id, msg, alertSetting.type);
      }
    });
  } else {
    const id = alertSetting.id;
    const condition = getComparisonValue(alertSetting.criterion, value, para, id);
    const realValue = alertSetting.criterion === '0' ? dataJSON[id][para] * -1 : dataJSON[id][para];

    if (condition) {
      const msg = createAlertMessage(id, alertSetting, realValue);
      createToast(id, msg, alertSetting.type);
    }
  }
};

const fireToast = () => {
  const alertSettings = localStorage.getItem('alertSettings');
  if (alertSettings) {
    JSON.parse(alertSettings).forEach((alertSetting) => {
      checkAndFireToast(alertSetting);
    });
  }
};

export default fireToast;
