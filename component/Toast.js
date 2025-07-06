import { ToastContainer } from 'react-toastify';

import React from 'react'

const Toast = () => {
    return (
        <ToastContainer
            position="top-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition='Bounce'
        />
    )
}

export default Toast
