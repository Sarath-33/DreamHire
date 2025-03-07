
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // ✅ Import PropTypes

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return; // ✅ Waits until `user` is available
    if (user.role !== "recruiter") {
      navigate("/");
    }
  }, [user, navigate]); // ✅ Added dependencies

  if (!user) {
    return null; // ✅ Prevents rendering children while user data is loading
  }

  return <>{children}</>;
};

// ✅ Define prop types
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Ensures `children` is passed and is a valid React node
};

export default ProtectedRoute;
