import React, { useEffect } from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import { useRouter } from 'next/router'
import styles from '../styles/general.module.css'
import {getAllChallenges } from '../store/challenges'

const Index = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { employee } = useSelector(state => state.employees)
  // const { challenges } = useSelector(state => state.challenges)


  useEffect(() => {
    if (!employee.id) {
      router.push('/login')
    }
    // dispatch(getAllChallenges())
  }, [])


  return (
    <Container>
      <Row>
        Home
      </Row>
    </Container>
  )
}

export default Index;
