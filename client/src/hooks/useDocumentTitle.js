import { useEffect } from "react";

const useDocumentTitle = (title) => {
	useEffect(() => {
		document.title = title ? `${title} | QuickStay` : "QuickStay Hotels";
	}, [title]);
};

export default useDocumentTitle;
