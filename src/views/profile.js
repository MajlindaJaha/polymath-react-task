import React from "react";

import UserInformation from "../components/user-information";
import ChangePasswordForm from "../components/forms/change-password-form";
import Header from "../components/header";

const ProfilePage = () => {
  return (
    <div>
      <Header />

      <div className="container mt-4 border p-5">
        <div className="row">
          <ChangePasswordForm />
          <UserInformation />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
