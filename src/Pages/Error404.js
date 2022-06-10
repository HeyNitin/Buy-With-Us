import { useEffect } from "react";
import { useToast } from "../Components/Toast";
import { useDocumentTitle } from "../Hooks/useDocumentTitle";

const Error404 = () => {
  const { showToast } = useToast();
  useDocumentTitle("Error404");

  useEffect(() => showToast("error", "Page doesn't exist"), []);

  return (
    <div className="error-container">
      <div className="container">Page not Found</div>
    </div>
  );
};

export default Error404;
