// App.jsx
import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header/header";
import axios from "./util/axios.customize";
import { useContext, useEffect } from "react";
import { AuthContext } from "./components/context/auth.context";
import { Spin } from "antd";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const { setAuth, appLoading, setAppLoading } = useContext(AuthContext);

  useEffect(() => {
    const fetchAccount = async () => {
      setAppLoading(true);
      try {
        const res = await axios.get(`/v1/api/user`);
        if (res && res.data && !res.data.message) {
          setAuth({
            isAuthenticated: true,
            user: {
              email: res.data.email,
              name: res.data.name,
            },
          });
        }
      } catch (error) {
        console.error("Failed to fetch account:", error);
      } finally {
        setAppLoading(false);
      }
    };
    fetchAccount();
  }, [setAuth, setAppLoading]);

  return (
    <div>
      {appLoading === true ? (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Spin />
        </div>
      ) : (
        <>
          <Header />
          <Outlet /> {/* This is where child routes (like ProductList) will be rendered */}
        </>
      )}
    </div>
  );
}

export default App;