import React, { useEffect } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'

import styles from '../../styles/general.module.css'
import { getAllChallenges, getAllTags, updateVotes } from '../../store/challenges'

const Index = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { employee } = useSelector(state => state.employees)
  const { challenges } = useSelector(state => state.challenges)

  useEffect(() => {
    if (!employee.id) {
      router.push('/login')
    }
    dispatch(getAllChallenges())
  }, [])

  const handleClick = (data) => {
    dispatch(updateVotes(data))
  }


  return (
    <Container>
      <Row className={styles.heading_block}>
        <Col>
          <h3>Challenge Listing</h3>
        </Col>
        <Col className={styles.right + ' ' + styles.format}>
          <Link href="/challenges/add" >
            <a className={styles.links}><strong>+</strong> Add Challenge </a>
          </Link>
        </Col>
      </Row>
      <Row className={styles.content_block}>
        <div>
          <Row>
            <Col md={1} className={styles.column_headers}><h6>Id</h6></Col>
            <Col md={2} className={styles.column_headers}><h6>Title</h6></Col>
            <Col md={5} className={styles.column_headers}><h6>Description</h6></Col>
            <Col md={1} className={styles.column_headers}>
              <h6>
                Votes
              </h6>
            </Col>
            <Col md={2} className={styles.column_headers}><h6>Created on</h6></Col>
            <Col md={1} className={styles.column_headers}><h6>Up vote</h6></Col>
          </Row>
          {
            challenges.map((data, index) => {
                return (
                  <Row key={index}>
                    <Col md={1} className={styles.center}><p>{index + 1}</p></Col>
                    <Col md={2}><p>{data.title}</p></Col>
                    <Col md={5}><p>{data.description}</p></Col>
                    <Col md={1} className={styles.center}><p>{data.votes}</p></Col>
                    <Col md={2} className={styles.center}><p>{data.created_at}</p></Col>
                    <Col md={1} className={styles.center}>
                      <Button variant="secondary" type="button" disabled={(employee.id == data.created_by)} onClick={() => handleClick(index)} className={styles.upvote}>ᐃ</Button>
                    </Col>
                  </Row>
                )
              })
            }
        </div>
      </Row>
    </Container>
  )
}

export default Index;
