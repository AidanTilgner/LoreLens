import React, { FormEventHandler } from "react";
import useFetch from "../Hooks/useFetch";
import { User } from "../declarations/main";
import styles from "./Authform.module.scss";
import { useUser } from "../Contexts/User";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const { load: login } = useFetch<
    {
      email: string;
      password: string;
    },
    {
      accessToken: string;
      refreshToken: string;
      user: User;
    }
  >({
    url: "/users/login",
    method: "POST",
    body: formData,
    dependencies: [formData],
  });

  const { loadUser } = useUser();

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("Submitting form", formData);
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }
    login()
      .then((res) => {
        console.log("Login response", res);
        if (!res.data?.accessToken || !res.data?.refreshToken) {
          alert("Login failed");
          return;
        }
        localStorage.setItem("accessToken", res.data?.accessToken);
        localStorage.setItem("refreshToken", res.data?.refreshToken);
        loadUser();
      })
      .catch((err) => {
        console.log("Login error", err);
        alert("Login failed");
      });
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.form__header}>
          <h1>Login</h1>
        </div>
        <div className={styles.form__body}>
          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Your email..."
            />
          </div>
          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Your password..."
            />
          </div>
        </div>
        <div className={styles.form__footer}>
          <div className="formButtons">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          <p className="formResources">
            Don't have an account? <Link to="/signup">Sign Up</Link> instead.
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
