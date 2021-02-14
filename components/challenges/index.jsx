import React, { useEffect } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'

import styles from '../../styles/general.module.css'
import { getAllChallenges, getAllTags } from '../../store/challenges'

const Index = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { employee } = useSelector(state => state.employees)
  const { challenges } = useSelector(state => state.challenges)

  useEffect(() => {
    if (!employee.id) {
      router.push('/login')
    }
    console.log(challenges);
    dispatch(getAllChallenges())
  }, [])


  return (
    <Container>
      <div>
        <p>Challenge Listing</p>
      </div>
      <div>
        <div>
          <Link href="/challenges/add">
            <a>Add Challenge <i className="fas fa-plus"></i></a>
          </Link>
        </div>
          <div>
            <Row>
              <Col>Id</Col>
              <Col>Title</Col>
              <Col>Description</Col>
              <Col>Votes</Col>
              <Col>Created</Col>
              <Col>Up vote</Col>
            </Row>
            <Row>
              Challenges here
            </Row>
          </div>
        </div>
    </Container>
  )
}

export default Index;
