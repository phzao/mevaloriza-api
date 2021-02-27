const parseArr = arr =>
	(arr && Array.isArray(arr) && arr) || [];

const parseSplitPos = (str, char, position = 0) =>
	(str && str.split(char)[position]) || '';

const parseErrorMsg = (type, msg) => ({
	error: type,
	message: msg,
}) 

module.exports = {
	parseArr,
	parseSplitPos,
	parseErrorMsg,
};               
