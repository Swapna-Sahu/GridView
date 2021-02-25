import React, { useState } from 'react';

const AddTile = ({ addNewTile }) => {
    const [imgUrl, setImgUrl] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

    const handleSubmit = (e) => { 
        addNewTile([title, description, imgUrl])
        e.preventDefault();
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                Title:
                <input type='text'
                    name='title'
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                />
                </label>
                <label>
                Description:
                <input type='text'
                    name='description'
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                />
                </label>
                <label>
                Image link:
                <input type='text'
                    name='imgUrl'
                    value={imgUrl}
                    onChange={e => setImgUrl(e.target.value)}
                />
                </label>
                <input type="submit" value="Add" />
            </form>
        </>
    );
};
export default AddTile;