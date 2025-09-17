import { Bounce, ToastContainer } from 'react-toastify'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

function Main() {
    return <section >
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
        />
        <Header />
        <Outlet />

    </section>
}

export default Main