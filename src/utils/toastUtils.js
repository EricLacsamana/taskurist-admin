

export const getToastBgColor = (type) => {
  if (type === 'success') return "bg-[#04b20c]";
  if (type === 'warn') return "bg-[#eab90f]";
  if (type === 'danger') return "bg-[#e13f32]";
  return "bg-[#e13f32]";
};

export const createAlertMessage = (id, alertSetting, realValue) => {
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
