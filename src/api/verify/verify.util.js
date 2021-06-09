export const errorsHelper = (data) => {
  const status = JSON.stringify(data);
  if (status.match('1702'))
    return {
      status: 1702,
      message:
        'Invalid URL. This means that one of the parameters was not provided or left blank.',
    };
  if (status.match('1703'))
    return {
      status: 1703,
      message: 'Invalid value in username or password field.',
    };
  if (status.match('1704'))
    return {
      status: 1704,
      message: 'Invalid message type.',
    };
  if (status.match('1705'))
    return {
      status: 1705,
      message: 'Invalid message.',
    };
  if (status.match('1706'))
    return {
      status: 1706,
      message: 'Invalid destination.',
    };
  if (status.match('1707'))
    return {
      status: 1707,
      message: 'Invalid source (Sender ID).',
    };
  if (status.match('1708'))
    return {
      status: 1708,
      message: 'Invalid dlr value.',
    };
  if (status.match('1709'))
    return {
      status: 1709,
      message: 'User validation has failed.',
    };
  if (status.match('1710'))
    return {
      status: 1710,
      message: 'Internal error.',
    };
  if (status.match('1715'))
    return {
      status: 1715,
      message: 'Response timeout.',
    };
  if (status.match('1025'))
    return {
      status: 1025,
      message: 'Insufficient credit.',
    };
  if (status.match('1032'))
    return {
      status: 1032,
      message: 'DND reject.',
    };
  if (status.match('1028'))
    return {
      status: 1028,
      message: 'Spam message.',
    };
  return {
    status: 422,
    message: 'message cant be processed!',
  };
};

export const verifyErrorsHelper = (data) => {
  const status = JSON.stringify(data);
  if (status.match('102'))
    return {
      status: 102,
      message: 'OTP has expired.',
    };
  if (status.match('103'))
    return {
      status: 103,
      message: 'Entry for OTP not found.',
    };
  if (status.match('104'))
    return {
      status: 104,
      message: 'MSISDN not found.',
    };
  if (status.match('1702'))
    return {
      status: 1702,
      message: 'One of the parameter is missing or OTP is not numeric.',
    };
  if (status.match('1706'))
    return {
      status: 1706,
      message: 'Invalid destination.',
    };
  if (status.match('1706'))
    return {
      status: 1706,
      message: 'Given destination is invalid.',
    };
  if (status.match('101'))
    return {
      status: 101,
      message: 'Success, OTP validated successfully.',
    };
  return {
    status: 101,
    message: 'Failed, OTP validation failed',
  };
};
