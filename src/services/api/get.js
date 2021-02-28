'use strict';

const useGet = async (fnGet, dataParams) => {
	const res = ({ data, err }) => [data, err];

  try {
    const data = await fnGet(dataParams);

		return res({ data });
  } catch (err) {

		return res({ err });
  }
};

module.exports = {
  useGet,
};
