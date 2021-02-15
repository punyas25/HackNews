import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector} from 'react-redux'
import { useRouter } from 'next/router'

import tagsData from '../../tags.json'
import { addChallenge } from '../../store/challenges';
import styles from '../../styles/general.module.css'

const validations = {
  title: {
      required: { value: true, message: "Title is required" },
  },
  description: {
    required: {value: true, message: "Challenge description is required"}
  },
};

const AddPage = () => {
  const router = useRouter()
  const {register, handleSubmit, errors} = useForm()
  const dispatch = useDispatch();

  const { employee } = useSelector(state => state.employees)

  const saveChallenge = data => {
    let date = new Date()
    data['created_by'] = employee.id
    data['created_at'] = date
    data['votes'] = 0

    document.getElementById('addChallengeForm').reset();
    dispatch(addChallenge(data));
  }

    return (
      <Container>
        <Row className={styles.heading_block}>
        <Col>
          <h3>Add Challenge</h3>
        </Col>
        <Col className={styles.right + ' ' + styles.format}>
          <Link href="/" >
            <a className={styles.links}> <strong>←</strong> Go back </a>
          </Link>
        </Col>
      </Row>
        <div>
          <Form id="addChallengeForm" onSubmit={handleSubmit(data => saveChallenge(data))}>
            <Form.Group controlId="title">
              <Form.Label>Title: </Form.Label>
              <Form.Control type="text" name="title" placeholder="Challenge Title" ref = { register(validations.title) }/>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description: </Form.Label>
              <Form.Control as="textarea" name="description" placeholder="Enter Challenge information" ref = { register(validations.description)} rows={3} />
            </Form.Group>

            <Form.Group controlId="tags">
              <Form.Label>Tags: </Form.Label>
              <Row>
                {
                  tagsData.map((data) => {
                    return (
                      <Col md={3}>
                        <Form.Check
                          custom
                          key={data.id}
                          type= "checkbox"
                          name= {data.tag}
                          id={`custom-${data.id}`}
                          label={data.tag}
                          ref = { register() }
                        />
                      </Col>
                    )
                  })
                }
              </Row>

            </Form.Group>

            <Button variant="secondary" type="submit">Add Challenge</Button>
          </Form>
        </div>
      </Container>
    );
}

export default AddPage;
