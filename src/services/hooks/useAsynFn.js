'use strict';

const res = ({ data, err }) => [data, err];

const useAsyncFn = async (fnAsync, params) => {
  try {
	  const data = await fnAsync(params);

		return res({ data });

	} catch (err) {
    console.log('errrrr', err);
		return res({ err });
	}
};


module.exports = {
	useAsyncFn,
};
