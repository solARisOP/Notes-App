import React, { useState } from 'react'
import { MdLock, MdEdit } from 'react-icons/md';
import {IoMdSend} from 'react-icons/io';
import { FaArrowLeftLong } from "react-icons/fa6";
import DN from '../assets/defaultNotes.png'
import { useDispatch, useSelector } from 'react-redux';
import { addNote, removeNote, changeEditNote, changeNewNote } from '../features/groupSlice';
import { RiDeleteBin6Line } from "react-icons/ri";

function Notes({ notes, group, mobileGroupswitch }) {
	const editNote = useSelector(state=> state.editNote)
	const newNote = useSelector(state=> state.newNote)

	const dispatch = useDispatch();
	const handleFormSubmition = (e) => {
		e.preventDefault();
		if(editNote !== "")
		{
			dispatch(removeNote({Gid: group.id, Nid:editNote}));
			dispatch(changeEditNote({value:""}));
		}
		dispatch(addNote({Gid:group.id, message:newNote})); 
		dispatch(changeNewNote({value:""}));
	}
	const editNotesHandeler = (note) => {
		dispatch(changeNewNote({value:note.message})) 
		dispatch(changeEditNote({value:note.id}))
	}
	if (group == null || notes == null) return (<div className='sm:w-3/4 w-full flex flex-col bg-palatte-notes relative'>
		<div className='flex justify-center mt-16'>
			<img src={DN} alt="Notes app" />
		</div>
		<div className='text-center text-4xl'>
			Pocket Notes
		</div>
		<div className='text-center mt-5 text-xl'>
			Send and receive messages without keeping your phone online.
			<br />
			Use Pocket Notes on up to 4 linked devices and 1 mobile phone
		</div>
		<div className='flex items-center justify-center absolute bottom-6 left-0 right-0'>
			<MdLock />
			<p className='ms-2'>end-to-end encrypted</p>
		</div>
	</div>
	)

	return (
		<div className='sm:w-3/4 w-full flex flex-col'>
			{/* header */}
			<div className='p-2 flex items-center bg-palatte-others'>
				<button className='sm:pe-3 pe-2 sm:hidden block' onClick={mobileGroupswitch}>
					<FaArrowLeftLong className="text-gray-500" size={15} />
				</button>
				<div className={`sm:h-14 sm:w-14 w-9 h-9 rounded-full flex items-center justify-center ${group.color} text-white`}>
					<p className='text-md'>{group.shortName}</p>
				</div>
				<p className='sm:ms-4 sm:text-xl ms-2 text-md'>{group.name.slice(0,40)+(group.name.length > 40?"......":"")}</p>
			</div>

			{/* notes */}
			<div className='text-black bg-palatte-notes flex flex-col overflow-auto flex-1'>
				{notes.map(note => (<div key={note.id} className='w-full my-7 flex'>
					<div className='w-1/4 sm:w-1/5 flex flex-col items-center pt-1'>
						<p>{note.date}</p>
						<p>{note.time}</p>
					</div>
					<div className='w-3/4 sm:w-4/5'><p>{note.message}</p></div>
					<div className='flex flex-col justify-start items-center pe-1 sm:pe-3'>
						<button className='my-2' onClick={e=>dispatch(removeNote({Gid:group.id, Nid:note.id}))}>
						<RiDeleteBin6Line className='text-slate-600' size={20}/>
						</button>
						<button className='my-2' onClick={e=>editNotesHandeler(note)}>
						<MdEdit className='text-slate-600' size={20}/>
						</button>
					</div>
				</div>))}
			</div>

			{/* form */}
			<form className="bg-palatte-others rounded-bl-md p-2 sm:rounded-bl-xl sm:p-4 relative" onSubmit={handleFormSubmition}>
				<input type="text" className="w-full border border-gray-300 rounded-md sm:rounded-xl px-3"
				style={{ height: "150px" }} 
				placeholder="Enter your note here" 
				value={newNote}
				onChange={e=>dispatch(changeNewNote({value:e.target.value}))}
				/>
				<button className="absolute right-10 bottom-10 transform -translate-y-1/2" type='submit'>
					<IoMdSend className="text-gray-500" size={24} />
				</button>
			</form>
			<div className='p-2 hidden sm:block'></div>
		</div>
	)
}

export default Notes