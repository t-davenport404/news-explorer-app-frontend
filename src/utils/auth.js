import { handleServerResponse } from "./api";
import { BASE_URL } from "./constants";

export const register = (name, email, password) => {
  const mockUser = { name: name, email: email, id: `mock-id-${Date.now()}` };

  localStorage.setItem(`user_${email}`, JSON.stringify(mockUser));

  localStorage.setItem("active_user_email", email);

  return Promise.resolve({
    data: mockUser,
  });
};

export const authorize = (email, password) => {
  localStorage.setItem("active_user_email", email);

  return Promise.resolve({
    token: "mock-jwt-token-xyz123",
  });
};

export const checkToken = (token) => {
  const activeEmail =
    localStorage.getItem("active_user_email") || "guest@example.com";
  const savedProfile = localStorage.getItem(`user_${activeEmail}`);

  const userProfile = savedProfile
    ? JSON.parse(savedProfile)
    : {
        name: activeEmail.split("@")[0],
        email: activeEmail,
        id: `mock-id-${activeEmail.split("@")[0]}`,
      };

  return Promise.resolve({
    data: userProfile,
  });
};
