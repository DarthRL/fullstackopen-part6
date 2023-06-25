import { connect } from "react-redux"


const Notification = (props) => {
  const notification = props.notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={notification ? style : null}>
      {notification}
    </div>
  )
}

const ConnectedNotification = connect(
  state => ({notification: state.notification})
)(Notification)
export default ConnectedNotification