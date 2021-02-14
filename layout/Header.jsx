import { Button, Container, Row, Col } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import styles from '../styles/general.module.css'
import { logout } from '../store/employee'

export default function Header () {
  const dispatch = useDispatch()

  const userLogout = () => {
    dispatch(logout())
  }

  return (
  <div className="header">
    <Row className={styles.header}>
      <Col className={styles.format }>
        <h5>Hack News</h5>
      </Col>
      <Col>
        <Button variant="secondary" onClick={userLogout}>Logout</Button>
      </Col>
    </Row>
  </div>
  )
}
