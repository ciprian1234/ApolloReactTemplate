import React, { useState } from "react";

export const Register = props => {
  const [values, handleChange] = useGenericForm({ email: "", password: "" });

  return (
    <div>
      <form>
        <label>Email:</label>
        <input name="email" value={values.email} onChange={handleChange} />
        <label>Password:</label>
        <input
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
      </form>
      <div>Input email:{values.email}</div>
      <div>Input pass:{values.password}</div>
    </div>
  );
};

function useGenericForm(initlialValues) {
  const [values, setValues] = useState(initlialValues);

  const handleChange = event =>
    setValues({ ...values, [event.target.name]: event.target.value });

  return [values, handleChange];
}
