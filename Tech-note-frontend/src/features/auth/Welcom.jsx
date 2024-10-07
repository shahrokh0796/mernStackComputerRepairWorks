import { Link } from 'react-router-dom';
import  useAuth  from '../../hooks/useAuth';
import useTitle from '../../hooks/useTitle' ;
 
const Welcom = () => {
    useTitle("Welcom");
    const { username, isManager, isAdmin } = useAuth();


    const date = new Date();
    const today = new Intl.DateTimeFormat('en-IN', 
        {dateStyle: 'full', timeStyle: 'long'}
    ).format(date);

    const content = (
        <section className='welcome'>
            <p> {today}  </p>
            <h1> Welcom { username } </h1>

            <p> <Link to='/dash/notes'> View Technotes </Link> </p>
            <p> <Link to='/dash/notes/new'> Add new techNotes </Link> </p>
            {(isManager || isAdmin) && <p> <Link to='/dash/users'> View User Settings </Link> </p>}
            {(isManager || isAdmin ) && <p> <Link to='/dash/users/new'> Add New User </Link> </p>}
        </section>
    );
    return content;
}


export default Welcom;