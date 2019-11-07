import { useState } from 'react';

// Inputs:
// 1. input name,
// 2. input type,
// 3. default value of input
// Usage:
// email = useFormInput('email', 'text', '');
// Use with spread operator:
// <input {...email} /> is the same as:
// <input name="email", type="text", value={value}, onChange={onChange}>
export function useFormInput(name, type, defaultValue) {
	const [value, setValue] = useState(defaultValue);

	const handleChange = (event) => setValue(event.target.value);

	return { name, type, value, onChange: handleChange };
}
