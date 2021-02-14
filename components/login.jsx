import React, { useEffect, useState }  from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector} from 'react-redux'
import { useRouter } from 'next/router'

import employeeData from '../employees.json'
import styles from '../styles/general.module.css'
import { getAllEmployees, getEmployee } from '../store/employee'

const validations = {
  empId: {
    required: {value: true, message: "Employee id is required"}
  }
}

const Login = () => {
  const router = useRouter()
  const {register, handleSubmit, errors} = useForm()
  const { employee } = useSelector(state => state.employees)
  let loginError = false

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllEmployees(employeeData))
  }, [])


  const loginUser = data => {
    dispatch(getEmployee(data))
  }

  useEffect(() => {
    if (employee.id) {
      router.push('/')
    } else {
      loginError  = true;
    }
  }, [employee])


  return (
    <Container className={styles.container}>
      <Row>
        <Col>
          <h1 className={styles.title}>
            Welcome to Hack News
          </h1>
          <p className={styles.description}>
            Get started by logging in using your employee id.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form id="loginForm" onSubmit={handleSubmit(data => loginUser(data))}>
            <Form.Group controlId="email">
              <Form.Label>Employee Id: </Form.Label>
              <Form.Control type="text" name="employee_id" placeholder="Enter your employee id" ref = { register(validations.empId) }/>
            </Form.Group>

            <Button variant="secondary" type="submit">
              Click to Login
            </Button>
          </Form>

          {
            loginError &&
            <div>
              <p>Login failed. Please try again!</p>
            </div>
          }
        </Col>
      </Row>
    </Container>
  );
}

export default Login
