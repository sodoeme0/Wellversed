import jwtDecode from 'jwt-decode';

const useAuth = () => {
    const token = localStorage.getItem('token')
    // Check if a valid token exists
    if (token && (token !== "undefined")) {
        // Decode the token to extract user information
        const decoded = jwtDecode(token);
        
        // Extract email and roles from the decoded user info
        const { name, email, roles } = decoded.UserInfo;

        // Return the user's email, roles, status, and 'isUser' flag
        return { email, roles };
    }

    // Return default values if no valid token exists
    return { email: '', roles: [] };
};

export default useAuth;
