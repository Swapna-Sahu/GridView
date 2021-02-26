import React, { useState } from 'react';

const AddTile = ({ addNewTile }) => {
    const [imagePath, setImagePath] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => { 
        addNewTile({ title:title, description: description, imagePath: imagePath })
        e.preventDefault();
    };

    return (
        <>
            <form onSubmit={handleSubmit} className='form-style'>
                <label>
                Title  : 
                <input type='text'
                    name='title'
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                />
                </label>
                <label>
                Description  : 
                <input type='text'
                    name='description'
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                />
                </label>
                <label>
                Image link  : 
                <input type='text'
                    name='imagePath'
                    value={imagePath}
                    onChange={e => setImagePath(e.target.value)}
                />
                </label>
                <input type="submit" value="Add New Tile" />
            </form>
        </>
    );
};
export default AddTile;