import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector} from 'react-redux'
import { useRouter } from 'next/router'

import tagsData from '../../tags.json'
import { addChallenge } from '../../store/challenges';

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
    data['created by'] = employee.id
    data['created at'] = date.toLocaleString()

    document.getElementById('addChallengeForm').reset();
    dispatch(addChallenge(data));
  }

    return (
      <div>
        <div>
          <p>Add Challenge</p>
        </div>
        <div>
          <div>
            <Link href="/">
              <a>Go back</a>
            </Link>
          </div>
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
              {
                tagsData.map((data) => {
                  return (
                    <Form.Check
                      custom
                      key={data.id}
                      type= "checkbox"
                      name= {data.tag}
                      id={`custom-${data.id}`}
                      label={data.tag}
                      ref = { register() }
                    />
                  )
                })
              }
            </Form.Group>

            <Button variant="secondary" type="submit">Add Challenge</Button>
          </Form>
        </div>
      </div>
    );
}

export default AddPage;
