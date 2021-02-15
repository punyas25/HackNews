import React, { useEffect } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Cookies from 'js-cookie'

import styles from '../../styles/general.module.css'
import { getAllChallenges, sortChallenges, updateVotes } from '../../store/challenges'
import tagsData from '../../tags.json'

const Index = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { employee, employeeId } = useSelector(state => state.employees)
  const { challenges } = useSelector(state => state.challenges)
  const employee_id = Cookies.get('employee_id')

  useEffect(() => {
    if (!employee_id) {
        router.push('/login')
      }
    dispatch(getAllChallenges())
  }, [])

  useEffect(() => {
    if (!employee_id) {
      router.push('/login')
    }
  }, [employeeId])

  const handleClick = (data) => {
    dispatch(updateVotes(data))
  }

  const sortAscending = (data) => {
    let criteria = {
      'sort': 'Ascending',
      'type': data
    }
    dispatch(sortChallenges(criteria))
  }

  const sortDescending = (data) => {
    let criteria = {
      'sort': 'Descending',
      'type': data
    }
    dispatch(sortChallenges(criteria))
  }

  return (
    <Container className={styles.container}>
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
        <div className={styles.full_width}>
          <Row>
            <Col md={2} className={styles.column_headers}><h6>Tags</h6></Col>
            <Col md={2} className={styles.column_headers}><h6>Title</h6></Col>
            <Col md={4} className={styles.column_headers}><h6>Description</h6></Col>
            <Col md={1} className={styles.column_headers}>
              <h6>
                <Button type="button" className={styles.sortbutton} onClick={() => sortAscending('vote')}>ᐃ</Button>
                Votes
                <Button type="button" className={styles.sortbutton} onClick={() => sortDescending('vote')}>ᐁ</Button>
              </h6>
            </Col>
            <Col md={2} className={styles.column_headers}>
              <h6>
                <Button type="button" className={styles.sortbutton} onClick={() => sortAscending('date')}>ᐃ</Button>
                Created on
                <Button type="button" className={styles.sortbutton} onClick={() => sortDescending('date')}>ᐁ</Button>
              </h6>
            </Col>
            <Col md={1} className={styles.column_headers}><h6>Up vote</h6></Col>
          </Row>
          {
            challenges.map((data, index) => {
              let tags = ''
              tagsData.map((t, i) => {
                if (data[t.tag]) {
                  tags = t.tag + ', ' + tags;
                }
              })
              tags = tags.trim().slice(0, -1)
                return (
                  <Row key={index} className={styles.challenge_block}>
                    <Col md={2}><p>{tags}</p></Col>
                    <Col md={2} className={styles.center}><p>{data.title}</p></Col>
                    <Col md={4}><p>{data.description}</p></Col>
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
