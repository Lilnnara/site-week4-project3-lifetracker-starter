import { useNavigate } from "react-router-dom";
import React from "react";
import apiClient from "../../services/apiClient";
import "./Registration.css";

export default function Registration({ setAppState }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const handleOnInputChange = (event) => {
    if (event.target.name === "password") {
      if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "Password's do not match",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "passwordConfirm") {
      if (form.password && form.password !== event.target.value) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "Password's do not match",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));

    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }));
      setIsLoading(false);
      return;
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }));
    }

    try {
      const { data, error, message } = await apiClient.register({
        // calls apiClient to send the request to Render server
        username: form.username,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
      });

      if (data) {
        setAppState((s) => ({ ...s, user: data.user, isAuthenticated: true }));

        localStorage.setItem("lifetracker_token", data.token);

        setIsLoading(false);
        navigate("/nutrition");
      } else {
        setErrors((e) => ({
          ...e,
          form: "Something went wrong with registration",
        }));
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setErrors((e) => ({
        ...e,
        form: message ? String(message) : String(err),
      }));
      setIsLoading(false);
    }
  };

  // errors are being handled and displayed (a few for debugging)
  return (
    <div className="css-9cjjy5">
      <div className="chakra-stack css-15xvz01">
        <span className="chakra-avatar css-11g7hql">
          <svg
            viewBox="0 0 128 128"
            className="chakra-avatar__svg css-16ite8i"
            role="img"
            aria-label=" avatar"
          >
            <path
              fill="currentColor"
              d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z"
            ></path>
            <path
              fill="currentColor"
              d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24"
            ></path>
          </svg>
        </span>
        <h2 className="chakra-heading css-3q8efk">Create an Account</h2>
        {errors.form && <span className="error">{errors.form}</span>}
        <div className="css-ebzegt">
          <form onSubmit={handleOnSubmit}>
            <div className="chakra-stack css-1opnp10">
              <div role="group" className="chakra-form-control css-1kxonj9">
                <div
                  className="chakra-input__group css-bx0blc"
                  data-group="true"
                >
                  <div className="chakra-input__left-element css-1cw84h2">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                      className="css-119zpey"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path>
                    </svg>
                  </div>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    id="field-:ri:"
                    required=""
                    aria-required="true"
                    className="chakra-input css-trvw4f"
                    value={form.email}
                    onChange={handleOnInputChange}
                  />
                </div>
                {errors.email && (
                  <div
                    id="field-:rt:-helptext"
                    className="chakra-form__helper-text css-1r5werv"
                  >
                    {errors.email}
                  </div>
                )}
              </div>
              <div role="group" className="chakra-form-control css-1kxonj9">
                <div
                  className="chakra-input__group css-bx0blc"
                  data-group="true"
                >
                  <div className="chakra-input__left-element css-1cw84h2">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                      className="css-119zpey"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z"></path>
                    </svg>
                  </div>
                  <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    id="field-:rj:"
                    required=""
                    aria-required="true"
                    className="chakra-input css-trvw4f"
                    value={form.username}
                    onChange={handleOnInputChange}
                  />
                </div>
              </div>
              <div className="css-9jay18">
                <div role="group" className="chakra-form-control css-1kxonj9">
                  <div
                    className="chakra-input__group css-bx0blc"
                    data-group="true"
                  >
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      id="field-:rk:"
                      required=""
                      aria-required="true"
                      className="chakra-input css-qz53jc"
                      value={form.firstName}
                      onChange={handleOnInputChange}
                    />
                    {errors.firstName && (
                      <span className="error">{errors.firstName}</span>
                    )}
                  </div>
                </div>
                &nbsp;
                <div role="group" className="chakra-form-control css-1kxonj9">
                  <div
                    className="chakra-input__group css-bx0blc"
                    data-group="true"
                  >
                    <input
                      name="lastName"
                      type="text"
                      placeholder="Last name"
                      id="field-:rl:"
                      required=""
                      aria-required="true"
                      className="chakra-input css-qz53jc"
                      value={form.lastName}
                      onChange={handleOnInputChange}
                    />
                    {errors.lastName && (
                      <span className="error">{errors.lastName}</span>
                    )}
                  </div>
                </div>
              </div>
              <div role="group" className="chakra-form-control css-1kxonj9">
                <div
                  className="chakra-input__group css-bx0blc"
                  data-group="true"
                >
                  <div className="chakra-input__left-element css-17ke578">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      viewBox="0 0 448 512"
                      className="css-119zpey"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path>
                    </svg>
                  </div>
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    id="field-:rm:"
                    required=""
                    aria-required="true"
                    className="chakra-input css-67vh0"
                    value={form.password}
                    onChange={handleOnInputChange}
                  />
                  {errors.password && (
                    <span className="error">{errors.password}</span>
                  )}

                  <div className="chakra-input__right-element css-1qww07b">
                    <button type="button" className="chakra-button css-18zqh0c">
                      Show
                    </button>
                  </div>
                </div>
              </div>
              <div role="group" className="chakra-form-control css-1kxonj9">
                <div
                  className="chakra-input__group css-bx0blc"
                  data-group="true"
                >
                  <div className="chakra-input__left-element css-17ke578">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      viewBox="0 0 448 512"
                      className="css-119zpey"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path>
                    </svg>
                  </div>
                  <input
                    name="passwordConfirm"
                    type="password"
                    placeholder="Confirm Password"
                    id="field-:rn:"
                    required=""
                    aria-required="true"
                    className="chakra-input css-67vh0"
                    value={form.passwordConfirm}
                    onChange={handleOnInputChange}
                  />

                  <div className="chakra-input__right-element css-1qww07b">
                    <button type="button" className="chakra-button css-18zqh0c">
                      Show
                    </button>
                  </div>
                </div>
                {errors.passwordConfirm && (
                  <div
                    id="field-:rt:-helptext"
                    className="chakra-form__helper-text css-1r5werv"
                  >
                    {errors.passwordConfirm}
                  </div>
                )}
              </div>
              <button className="chakra-button css-4lvvxn" disabled={isLoading}>
                {isLoading ? "Loading..." : "Sign up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
