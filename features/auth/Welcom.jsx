import { Link } from 'react-router-dom';

const Welcom = () => {

    const date = new Date();
    const today = new Intl.DateTimeFormat('en-IN', 
        {dateStyle: 'full', timeStyle: 'long'}
    ).format(date);

    const content = (
        <section className='welcome'>
            <p> {today}  </p>
            <h1> Welcom </h1>

            <p> <Link to='/dash/notes'> View Technotes </Link> </p>
            <p> <Link to='/dash/users'> View User Settings </Link> </p>
        </section>
    );
    return content;
}


export default Welcom;