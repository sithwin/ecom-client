import React, { useState } from "react";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { auth, googleAuthProvider } from "../../firebase";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
          valid={email}
          autoFocus
          placeholder="user name"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
          valid={password}
          placeholder="password"
        />
      </div>

      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with email/ password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="col-md-6 offset-md-3">
        {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Login</h4>}

        {loginForm()}
        <Button
          onClick={googleLogin}
          type="danger"
          className="mb-3"
          block
          shape="round"
          icon={<GoogleOutlined />}
          size="large"
        >
          Login with google
        </Button>
      </div>
    </div>
  );
};

export default Login;
