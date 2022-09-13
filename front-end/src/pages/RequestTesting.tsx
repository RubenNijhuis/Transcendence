import Axios from "axios";
import { useEffect } from "react";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import { useDataDebug } from "../utils/DebugDataContext";

const RequestTest = () => {
  const { profiles } = useDataDebug();

  // Initialize the db with user
  useEffect(() => {
    // Axios.get("/api/users/seeder").then(console.log);
  }, []);

  useEffect(() => {
    Axios.get("/api/users/").then(console.log);
  }, [profiles]);

  return (
    <Layout>
      <Heading type={2}>Test requests</Heading>
      <p>Open the console to check the response</p>
    </Layout>
  );
};

export default RequestTest;
