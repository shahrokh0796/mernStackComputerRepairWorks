import { Link } from 'react-router-dom';
import useTitle from '../hooks/useTitle';

const Public = () => {
    useTitle("Welcom"); 
    const content = (
        <section className="public">
            <header>
                <h1>
                    Welcome to <span className="nowrap">Dan D. Repairs</span>
                </h1>

                <main className="public__main">
                    <p>
                        Located in beautiful downtown Foo City, Dan D. Repairs 
                        provides a trained staff ready to meet your tech repair needs
                    </p>

                    <address className='public__addr'>
                        Dan D. Repairs <br />
                        555 Foo Drive <br />
                        Foo City, CA 12345
                        <a href='tel:+9876543210'> (91) 9876543210 </a>
                    </address>
                    <br />
                    <p> Owner: Said Temori</p>
                </main>
            </header>
            <footer>
                <Link to='/login'>Employee Login</Link>
            </footer>
        </section>
    );
    return content
}


export default Public;