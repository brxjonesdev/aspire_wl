'use client'
import React from 'react'
import { Formik, Form, useField, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup'

export default function AddWishlist() {
    return (
        <Formik
            initialValues={{ name: '', description: '' }}
            validationSchema={Yup.object({
                name: Yup.string().required('Required'),
                description: Yup.string().required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2))
                    setSubmitting(false)
                }, 400)
            }}
        >
            <Form>
                <label htmlFor="name">Name</label>
                <Field name="name" type="text" />
                <ErrorMessage name="name" />
                <label htmlFor="description">Description</label>
                <Field name="description" as="textarea" />
                <ErrorMessage name="description" />
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    )
}
