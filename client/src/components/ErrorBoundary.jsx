import React from "react";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error, info) {
		console.error("Unhandled UI error:", error, info.componentStack);
	}

	render() {
		if (!this.state.hasError) return this.props.children;

		return (
			<div className="flex flex-col items-center justify-center text-center px-6 py-32 min-h-[70vh]">
				<h1 className="font-playfair text-3xl text-gray-800">
					Something went wrong
				</h1>
				<p className="text-gray-500 mt-3 max-w-md">
					This page hit an unexpected error. Reloading usually fixes it.
				</p>
				<button
					onClick={() => window.location.reload()}
					className="mt-6 px-6 py-2.5 rounded-lg bg-primary text-white hover:bg-primary-dull transition-all cursor-pointer"
				>
					Reload page
				</button>
			</div>
		);
	}
}

export default ErrorBoundary;
