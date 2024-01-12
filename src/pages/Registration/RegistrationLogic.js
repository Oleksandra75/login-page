import { useState } from 'react'

const RegistrationLogic = (baseURL, navigate) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})
	const [err, setErr] = useState({})
	const [valid, setValid] = useState(true)

	const handleSubmit = e => {
		e.preventDefault()
		let isvalid = true
		let validationErrors = {}
		if (formData.email === '' || formData.email === 'null') {
			isvalid = false
			validationErrors.email = 'Email required'
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			isvalid = false
			validationErrors.email = 'Email is not valid'
		}
		if (formData.password === '' || formData.password === 'null') {
			isvalid = false
			validationErrors.password = 'Password required'
		} else if (formData.password.length < 6) {
			isvalid = false
			validationErrors.password =
				'Password length should be at least 6 characters'
		}
		setErr(validationErrors)
		setValid(isvalid)

		if (Object.keys(validationErrors).length === 0) {
			fetch(`${baseURL}/users`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})
				.then(response => {
					if (!response.ok) {
						throw new Error(
							`Failed to register: ${response.status} ${response.statusText}`
						)
					}
					return response.json()
				})
				.then(data => {
					alert('Registered Successfully')
					navigate('/home')
				})
				.catch(error => console.log(error))
		}
	}

	return { formData, setFormData, err, valid, handleSubmit }
}

export default RegistrationLogic
