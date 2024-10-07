import { useEffect, useState } from 'react';
import { useUpdateNoteMutation, useDeleteNoteMutation } from './notesApiSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../hooks/useAuth';
import useTitle from '../../hooks/useTitle';

 

const EditNoteForm = ({ note, users }) => {
    useTitle("Edit Note Form");
    const { isManager, isAdmin } = useAuth();



    const [updateNote, {
        isLoading, isSuccess, isError, error
    }] = useUpdateNoteMutation();

    const [deleteNote, {
        isSuccess: isDelSuccess, isError: isDelError,
        error: delError
    }] = useDeleteNoteMutation();
    const navigate = useNavigate();

    const [title, setTitle] = useState(note.title);
    const [text, setText] = useState(note.text);
    const [completed, setCompleted] = useState(note.completed);
    const [userId, setUserId] = useState(note.user);

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setTitle('');
            setText('');
            setUserId('');
            navigate('/dash/notes');
        }
    }, [isSuccess, isDelSuccess, navigate]);

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleTextChange = (e) => setText(e.target.value);
    const handleCompletedChange = (e) => setCompleted(prev => !prev);
    const handleUserIdChange = (e) => setUserId(e.target.value);

    const canSave = [title, text, userId].every(Boolean) && !isLoading;

    const handleSaveNoteClicked = async (e) => {
        if (canSave) {
            await updateNote({ id: note.id, user: userId, title, text, completed });
        }
    }

    const handleDelNoteClick = async (e) => {
        await deleteNote({ id: note.id });
    }

    const created = new Date(note.createdAt).toLocaleString('en-US', {
        day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric',
        minute: 'numeric', second: 'numeric'
    });

    const updated = new Date(note.createdAt).toLocaleString('en-US', {
        day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric',
        minute: 'numeric', second: 'numeric'
    });

    const options = users.map((user) => {
        return (
            <option value={user.id} key={user.id}>
                {user.username}
            </option>
        );
    });

    const errClass = (isError || isDelError) ? 'errmsg' : 'offscreen';
    const validTitleClass = !title ? 'form__input--incomplete' : '';
    const validTextClass = !text ? 'form__input--incomplete' : '';
    const errContent = (error?.data?.message || delError?.data?.message) ?? '';

    let deleteButton = null;
    if (isManager || isAdmin) {
        deleteButton = (
            <button className="icon-button" 
            title="Delete"
            onClick={handleDelNoteClick}>
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        )
    }
    const content = (
        <>
            <p className={errClass}> {errContent} </p>
            <form className='form' onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Note #{note.ticket}</h2>
                    <div className="form__action-buttons">
                        <button className="icon-button"
                            title="Save" onClick={handleSaveNoteClicked}
                            disabled={!canSave}>
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
                    </div>
                </div>
                <label className='form__label' htmlFor='note-title'> </label>
                    <input className={`form__input ${validTitleClass}`}
                     id='note-title'
                        name='title'
                        type="text"
                        autoComplete='off'
                        value={title}
                        onChange={handleTitleChange} />

                <label htmlFor="note-text" className="form__label"> Text: </label>
                <textarea name="text" id="note-text" value={text} 
                className={`form__input form__input--text ${validTextClass}`} 
                onChange={handleTextChange} />

                <div className="form__row">
                    <div className="form__divider">
                        <label htmlFor="note-completed"
                            className="form__label form__checkbox-container">
                            WORK COMPLETE:
                            <input className='form__checkbox' type="checkbox"
                                id='note-completed' name='completed'
                                checked={completed}
                                onChange={handleCompletedChange} />
                        </label>

                        <label htmlFor="note-username"
                            className="form__label form__checkbox-container"
                        >ASSIGNED TO:</label>
                        <select name="username" id="note-username"
                            className='form__select'
                            value={userId}
                            onChange={handleUserIdChange}> {options} </select>
                    </div>
                    <div className="form__divider">
                        <p className="form__created">Created:<br /> {created} </p>
                        <p className="form__created">Updated:<br /> {updated} </p>
                    </div>
                </div>
            </form>
        </>
    )

    return content;
}



export default EditNoteForm;