import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ToastNotification() {

  const toastDark = () => toast.dark('This is Toast Notification for Dark');
  const toastInfo = () => toast.info('This is Toast Notification for Info');
  const toastSuccess = () => toast.success('This is Toast Notification for Success');
  const toastWarn = () => toast.warn('This is Toast Notification for Warn');
  const toastError = () => toast.error('This is Toast Notification for Error');

  return (
    <div className="App">
      <h3>Toast Notification in React </h3>
      <button className="btn" onClick={toastDark}>Toast Notification for  - Dark</button>
      <button className="btn" onClick={toastInfo}>Toast Notification for  - Info</button>
      <button className="btn" onClick={toastSuccess}>Toast Notification for  - Success</button>
      <button className="btn" onClick={toastWarn}>Toast Notification for  - Warn</button>
      <button className="btn" onClick={toastError}>Toast Notification for  - Error</button>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

    </div>
  );
}
export default ToastNotification;