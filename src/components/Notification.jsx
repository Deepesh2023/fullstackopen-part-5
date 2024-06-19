const Notification = ({ notification }) => {
  if (notification.message) {
    const styles = {
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }

    if (notification.isError) {
      styles['border'] = '8px solid red'
      styles['backgroundColor'] = '#f48b95'
    } else {
      styles['border'] = '8px solid green'
      styles['backgroundColor'] = '#8cf78e'
    }
    return (
      <div style={styles} className="notification">
        <h3>{notification.message}</h3>
      </div>
    )
  }
}

export default Notification
