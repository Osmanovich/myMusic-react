import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button, Checkbox, Dialog, DialogContent, DialogTitle } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import getAllSong from './api';
import deleteSongApi from './deleteApi';
import editSong from './editApi';
import addSong from './addSongApi';

function Homepage() {

    const [selectedSong, setSelectedSong] = useState({
        artistName: '',
        songName: '',
        url: '',
        favourite: true,
        rating: 0,
        dateEntered: '',
        dateLastEdited: ''
    });
    const [allSongs, setAllSongs] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [songEditDisp, setEditSongDisp] = useState({
        artistName: '',
        songName: '',
        url: '',
        favourite: true,
        rating: 1,
        dateEntered: '',
        dateLastEdited: ''
    });
    const [songToAdd, setSongToAdd] = useState({
        artistName: '',
        songName: '',
        url: '',
        favourite: true,
        rating: 1,
    });

    const openDetailsModal = (id) => {
        allSongs.forEach((song) => { song.id === id && setSelectedSong(song) });
        setModalOpen(true);
    }
    const handleClose = () => {
        setModalOpen(false);
        setSelectedSong({
            artistName: '',
            songName: '',
            url: '',
            favourite: true,
            rating: 0,
            dateEntered: '',
            dateLastEdited: ''
        })
    }
    const openAddDialog = () => {
        setAddModalOpen(true);
    }
    const handleAddModalClose = () => {
        setAddModalOpen(false);
    }

    const handleEditModalClose = () => {
        setEditModalOpen(false);
    }
    const onSubmitClose = () => {
        setAddModalOpen(false);
    }

    useEffect(() => {
        refreshData();
    }, [])

    const refreshData = () => {
        getAllSong().then((res) => {
            setAllSongs(res.data);
        })
    }

    const deleteSong = (id) => {
        deleteSongApi(id).then((res) => { refreshData() })
    }

    const openEditModal = (id) => {
        allSongs.forEach((song) => { song.id === id && setEditSongDisp(song) });
        console.log(songEditDisp);
        setEditModalOpen(true);
    }

    const handleEditChange = (event) => {
        setEditSongDisp({ ...songEditDisp, [event.target.id]: event.target.value });
    }

    const handleAddChange = (event) => {
        setSongToAdd({ ...songToAdd, [event.target.name]: event.target.value });
    }

    const handleAddFavouriteChange = (event) => {
        setSongToAdd({ ...songToAdd, [event.target.name]: event.target.checked })
    }

    const onSubmitEditSaveAndClose = () => {
        editSong(songEditDisp).then((res) => {
            setEditSongDisp({
                artistName: '',
                songName: '',
                url: '',
                favourite: true,
                rating: 1,
                dateEntered: '',
                dateLastEdited: ''
            });
            setEditModalOpen(false);
            refreshData();
        })
    }

    const onSubmitAddAndClose = () => {
        addSong(songToAdd).then((res) => {
            setSongToAdd({
                artistName: '',
                songName: '',
                url: '',
                favourite: true,
                rating: 1,
            });
            setAddModalOpen(false);
            refreshData();
        })
    }
    return (
        <div id='homepage-container'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Song name</TableCell>
                            <TableCell align="right">Artist Name</TableCell>
                            <TableCell align="right">Favorite</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allSongs.map((row, key) => (
                            <TableRow
                                key={key}

                            >
                                <div onClick={() => openDetailsModal(row.id)}>
                                    <TableCell component="th" scope="row">
                                        {row.songName}
                                    </TableCell>
                                    <TableCell align="right">{row.artistName}</TableCell>
                                    {row.favourite ? <TableCell align="right"> <FavoriteIcon /></TableCell> : <TableCell align="right"> <FavoriteBorderIcon /></TableCell>}
                                </div>
                                <TableCell><Button variant="contained" onClick={() => openEditModal(row.id)}>Edit</Button></TableCell>
                                <TableCell><Button variant="outlined" onClick={() => deleteSong(row.id)}>Delete</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" onClick={openAddDialog}>Add new song</Button>
            <Dialog open={isModalOpen} onClose={handleClose}>
                <DialogTitle>
                    SongName
                </DialogTitle>
                <DialogContent>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Song name</TableCell>
                                    <TableCell align="right">Artist Name</TableCell>
                                    <TableCell align="right">URL</TableCell>
                                    <TableCell align="right">Rating</TableCell>
                                    <TableCell align="right">Favorite</TableCell>
                                    <TableCell align="right">Date Entered</TableCell>
                                    <TableCell align="right">Date Last Edited</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow
                                    onClick={openDetailsModal}
                                >
                                    <TableCell component="th" scope="row">
                                        {selectedSong.songName}
                                    </TableCell>
                                    <TableCell align="right">{selectedSong.artistName}</TableCell>
                                    <TableCell align="right">{selectedSong.url}</TableCell>
                                    <TableCell align="right">{selectedSong.rating}</TableCell>
                                    <TableCell align="right">{selectedSong.favourite}</TableCell>
                                    <TableCell align="right">{selectedSong.dateEntered}</TableCell>
                                    <TableCell align="right">{selectedSong.dateLastEdited}</TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
            </Dialog>
            <Dialog open={isAddModalOpen} onClose={handleAddModalClose}>
                <div>
                    <TextField id="standard-basic" label="Song Name" variant="standard" value={songToAdd.songName} id="songName" name="songName" onChange={handleAddChange} />
                    <TextField id="standard-basic" label="Artist Name" variant="standard" value={songToAdd.artistName} id="artistName" name="artistName" onChange={handleAddChange} />
                    <TextField id="standard-basic" label="URL" variant="standard" value={songToAdd.url} id="url" name="url" onChange={handleAddChange} />

                    <Typography component="legend">Rating</Typography>
                    <Rating
                        name="rating"
                        value={songToAdd.rating}
                        onChange={handleAddChange}
                    />
                    <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} id='favourite' checked={songToAdd.favourite} name='favourite' label='Favourite' onChange={handleAddFavouriteChange} />
                </div>
                <Button variant="outlined" onClick={onSubmitAddAndClose}>Submit</Button>
            </Dialog>
            <Dialog open={isEditModalOpen} onClose={handleEditModalClose}>
                <div>
                    <TextField className="standard-basic" label="Song Name" variant="standard" value={songEditDisp.songName} id="songName" name="songName" onChange={handleEditChange} />
                    <TextField className="standard-basic" label="Artist Name" variant="standard" value={songEditDisp.artistName} id="artistName" name="artistName" onChange={handleEditChange} />
                    <TextField className="standard-basic" label="URL" variant="standard" value={songEditDisp.url} id="url" name="url" onChange={handleEditChange} />
                </div>
                <Button variant="outlined" onClick={onSubmitEditSaveAndClose}>Submit</Button>
            </Dialog>
        </div>
    )
}

export default Homepage;