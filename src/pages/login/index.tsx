import React from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import Breadcrumb from "@/components/Breadcrumb";

const Login: NextPageWithLayout = () => {
  return (
    <div>
      <Breadcrumb />
      <div>Login</div>
      {/* Render your simple form component here */}
    </div>
  );
};

export default Login;
Login.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
