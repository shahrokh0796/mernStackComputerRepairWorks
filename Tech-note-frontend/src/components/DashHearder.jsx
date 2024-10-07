import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faRightFromBracket,
    faFileCirclePlus,
    faFilePen,
    faUserGear,
    faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useSendLogoutMutation } from '../features/auth/authAPISlice';
import useAuth from '../hooks/useAuth';
import usetitle from '../hooks/useTitle';
import useTitle from '../hooks/useTitle';

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;


const DashHeader = () => {
    useTitle("Header");
    const { isManager, isAdmin } = useAuth();


    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation();

    const onLogoutClicked = async () => {
        try {
            let result = await sendLogout().unwrap();
            console.log("REsult --> ", result);

        } catch (err) {
            console.log(err, " <-- logout failed ");
        }
    };

    useEffect(() => {
        if (isSuccess) navigate('/');
    }, [isSuccess, navigate]);

    const onNewNoteClick = () => navigate('/dash/notes/new');
    const onNewUserClick = () => navigate('/dash/users/new');
    const onNotesClick = () => navigate('/dash/notes');
    const onUsersClick = () => navigate('/dash/users');

    let dashClass = null;
    if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = 'dash-header__container--small'
    }

    let newNoteButton = null;
    if (NOTES_REGEX.test(pathname)) {
        newNoteButton = (
            <button className='icon-button' title='New Note'
                onClick={onNewNoteClick}>
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        )
    }

    let newUserButton = null;
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <button className='icon-button' title='New Note'
                onClick={onNewUserClick}>
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
        )
    }

    let userButton = null;
    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <button className="icon-button"
                    title='Users' onClick={onUsersClick}>
                    <FontAwesomeIcon icon={faUserGear} />
                </button>
            )
        }
    }

    let notesButton = null;
    if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
        notesButton = (
            <button className="icon-button" title="Notes"
                onClick={onNotesClick}>
                <FontAwesomeIcon icon={faFilePen} />
            </button>
        )
    }

    const logoutButton = (
        <button className="icon-button"
            title='Logout'
            onClick={onLogoutClicked}>
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )


    const errClass = isError ? 'errmsg' : 'offscreen';

    let buttonContent;
    if (isLoading) { buttonContent =  <p>Logging Out...</p> }
    else {
        // console.error('Logout Error:', error);
        buttonContent = ( 
            <>
            {newNoteButton}
            {newUserButton}
            {notesButton}
            {userButton}
            {logoutButton}
            </>
        )
    }

    const content = (
        <>
            <p className={errClass}> {error?.data?.message} </p>
            <header className='dash-header'>
                <div className={`dash-header__container ${dashClass}`}>
                    <Link to='/dash'>
                        <h1 className='dash-header__title'>techNotes</h1>
                    </Link>
                    <nav className='dash-header__nav'>
                        {buttonContent}
                    </nav>
                </div>
            </header>
        </>
    );
    return content;
}

export default DashHeader;
