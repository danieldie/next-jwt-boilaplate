import * as React from 'react';
import Header from '../../components/head';
const css = require('./index.scss');

import GlobalStatus from '../../components/globalStatus';

import { Field, Form, Formik, FormikActions } from 'formik';
import authService from '../../services/auth.service';
import { IRegisterIn } from '../../types/auth.types';
import { IGlobalStatus } from '../../types/global.types';

interface IProps {
	globalStatus: IGlobalStatus;
}

function Register(props: IProps) {
	const { globalStatus } = props;
	return (
		<div>
			<Header />
			<div>
				<Formik
					initialValues={{
						firstName: '',
						lastName: '',
						email: '',
						password: ''
					}}
					onSubmit={(
						values: IRegisterIn,
						{ setSubmitting }: FormikActions<IRegisterIn>
					) => {
						authService
							.registerUser(
								values.firstName,
								values.lastName,
								values.email,
								values.password
							)
							.then(resp => {
								setSubmitting(false);
								if (resp.success) {
									globalStatus.addMessage('You have registered!');
								} else {
									globalStatus.addMessage(resp.message);
								}
							})
							.catch();
					}}
					render={() => (
						<Form>
							<label htmlFor="firstName">First Name</label>
							<Field id="firstName" name="firstName" placeholder="" type="text" />

							<label htmlFor="lastName">Last Name</label>
							<Field id="lastName" name="lastName" placeholder="" type="text" />

							<label htmlFor="email">Email</label>
							<Field id="email" name="email" placeholder="" type="email" />

							<label htmlFor="password">Password</label>
							<Field id="password" name="password" placeholder="" type="password" />

							<button type="submit" style={{ display: 'block' }}>
								Submit
							</button>
						</Form>
					)}
				/>
			</div>
		</div>
	);
}

export default GlobalStatus(Register);
