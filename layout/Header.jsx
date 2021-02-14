import { Button, Row, Col } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import styles from '../styles/general.module.css'
import { logout } from '../store/employee'

export default function Header () {
  const dispatch = useDispatch()

  const userLogout = () => {
    dispatch(logout())
  }

  return (
  <div>
    <Row className={styles.header}>
      <Col className={styles.format }>
        <h5 className={styles.app_title}>Hack News</h5>
      </Col>
      <Col className={styles.right + ' ' + styles.format}>
        <Button variant="secondary" onClick={userLogout}>Logout</Button>
      </Col>
    </Row>
  </div>
  )
}
