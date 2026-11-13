import React, { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext(null);

const toneClass = {
	success: "border-green-200 bg-green-50 text-green-800",
	error: "border-red-200 bg-red-50 text-red-700",
	info: "border-blue-200 bg-blue-50 text-blue-800",
};

export const ToastProvider = ({ children }) => {
	const [toasts, setToasts] = useState([]);

	const show = useCallback((message, tone = "success") => {
		const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
		setToasts((current) => [...current, { id, message, tone }]);
		setTimeout(() => {
			setToasts((current) => current.filter((toast) => toast.id !== id));
		}, 3500);
	}, []);

	return (
		<ToastContext.Provider value={{ show }}>
			{children}
			<div
				aria-live="polite"
				className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm"
			>
				{toasts.map((toast) => (
					<div
						key={toast.id}
						role="status"
						className={`rounded-xl border px-4 py-3 text-sm shadow-lg ${toneClass[toast.tone]}`}
					>
						{toast.message}
					</div>
				))}
			</div>
		</ToastContext.Provider>
	);
};

export const useToast = () => {
	const context = useContext(ToastContext);
	if (!context) throw new Error("useToast must be used inside ToastProvider");
	return context;
};
