import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddNewNoteMutation } from './notesApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import useTitle from '../../hooks/useTitle';
 

const NewNoteForm = ({ users }) => {
    useTitle("New Note form");
    const [addNewNote, {
        isLoading, isSuccess, isError, error
    }] = useAddNewNoteMutation();

    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [userId, setUserId] = useState(users[0].id);

    useEffect( () => {
        if (isSuccess) {
            setTitle('');
            setText('');
            setUserId('');
            navigate('/dash/notes');
        }
    }, [isSuccess, navigate]);

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleTextChange = (e) => setText(e.target.value);
    const handleUserIdChange = (e) => setUserId(e.target.value);
    const canSave = [title, text, userId].every(Boolean) && !isLoading;
    const handleSaveNoteClick = async (e) => {
        e.preventDefault();
        if (canSave) {
            await addNewNote({ user: userId, title, text });
        }
    }

    const options = users.map( user => {
        return (
            <option key={user.id} value={user.id}>
                {user.username} </option>
        );
    });

    const errClass = isError ? 'errmsg': 'offscreen';
    const validTitleClass = !title ? 'form__input--incomplete':'';
    const validTextClass = !text ? 'form__input--incomplete':'';

    const content = (
        <>
        <p className={errClass}> {error?.data?.message} </p>
        <form className="form" onSubmit={handleSaveNoteClick}>
            <div className="form__title-row">
                <h2>New Note</h2>
                <div className="form__action-buttons">
                    <button className="icon-button" 
                    title='Save' disabled={!canSave}>
                        <FontAwesomeIcon icon={faSave} />
                    </button>
                </div>
            </div>

            <label htmlFor="title" className="form__label">
                Title: 
            </label>

            <input id='title' name='title' type="text"
            autoComplete='off' value={title} 
            className={`form__input ${validTitleClass}`}
            onChange={handleTitleChange} />

            <label htmlFor="text" className='form_label'>
                Text: 
            </label>
            <textarea value={text}
            className={`form__input form__input--text ${validTextClass}`} 
            name="text" id="text" onChange={handleTextChange} />

            <label htmlFor="username" 
            className="form__label form__checkbox-container" >
                ASSIGNED To:
            </label>

            <select name="username" id="username" 
            className='form__select' value={userId} 
            onChange={handleUserIdChange}>
                {options}
            </select>
        </form>
        </>
    )


    return content;
}



export default NewNoteForm;


