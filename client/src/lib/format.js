export const toDay = (value) => String(value).slice(0, 10);

export const todayIso = () => toDay(new Date().toISOString());

export const formatDay = (value, options = {}) =>
	new Date(value).toLocaleDateString("en-US", {
		timeZone: "UTC",
		month: "short",
		day: "numeric",
		year: "numeric",
		...options,
	});

export const formatCurrency = (value) =>
	`$${Number(value).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
