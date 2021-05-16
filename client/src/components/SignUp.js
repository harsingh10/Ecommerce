import React from 'react';
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { Col } from "react-bootstrap";

const SignUp = (props) => {

  const formFields = [
    'name',
    'emailAddress',
    'password',
  ]


  const {
    register,
    errors,
    clearError,
    setValue,
    getValues,
    handleSubmit,
  } = useForm({
    defaultValues: () => {
      const obj = {};
      formFields.forEach(function (data) {
        obj[data] = '';
      });
      return obj;
    }
  });

  return (

    <Form>
      <Form.Row>
        <Form.Group
          controlId="name"
          as={Col}
          sm="10">
          <Form.Label data-test="nameSelector">
            Name
      </Form.Label>
          <Form.Control
            type="text"
            name="name"
            // ref={register}
            {...register('name', { required: true })}
          >
          </Form.Control>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group
          controlId="email"
          as={Col}
          sm="10">
          <Form.Label data-test="emailSelector">
            Email Address
      </Form.Label>
          <Form.Control
            type="email"
            name="emailAddress"
            {...register('email', {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email Address',
              },
            })}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group
          controlId="password"
          as={Col}
          sm="10">
          <Form.Label data-test="passwordSelector">
            Password
      </Form.Label>
          <Form.Control
            type="text"
            name="password"
            // ref={register}
            {...register('passowrd', {
              required: true, pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email Address',
              }
            })}
          >
          </Form.Control>
        </Form.Group>
      </Form.Row>
    </Form>
  )
}

export default SignUp;