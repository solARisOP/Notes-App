import { useEffect, useState } from 'react'
import { Group, Notes } from './components'
import { useSelector, useDispatch } from 'react-redux';
import Modal from './components/Modal';
import { addGroup, setInit, changeEditNote, changeNewNote } from './features/groupSlice';


function App() {
    let data = useSelector(state => state.groups)
    const [currentGroup, setCurrentGroup] = useState(null);
    const [currentNotes, setCurrentNotes] = useState(null);
    const [groups, setGroups] = useState(data);
    const [isModalOpen, setModalOpen] = useState(false);
    const [newGrpCol, setNewGrpCol] = useState("bg-blue-400");
    const [newGrpName, setNewGrpName] = useState("");

    const dispatch = useDispatch();

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        if (currentGroup !== null) setCurrentNotes(currentGroup.notes);
    }, [currentGroup])

    useEffect(() => {
      data = JSON.parse(window.localStorage.getItem("groups"))||[];
      dispatch(setInit({groups : data}));
    }, [])
    
    useEffect(() => {
        window.localStorage.setItem("groups", JSON.stringify(data))
        setGroups(data)
        if (currentGroup !== null) {
            let x = data.length;
            for (let i = 0; i < x; i++) {
                if (data[i].id === currentGroup.id) {
                    setCurrentGroup((prev) => data[i]);
                    break;
                }
            }
        }
    }, [data])

    const mobileGroupswitch = () => {
        dispatch(changeNewNote({value:""}));
        dispatch(changeEditNote({value:""}));
        document.getElementById(currentGroup.id).classList.remove('bg-palatte-notes');
        setCurrentGroup(null)
    }

    const handelGroupSwitch = (group) => {
        dispatch(changeNewNote({value:""}));
        dispatch(changeEditNote({value:""}));
        if (currentGroup !== null) document.getElementById(currentGroup.id).classList.remove('bg-palatte-notes');
        setCurrentGroup((prev) => group)
        document.getElementById(group.id).classList.add('bg-palatte-notes');
    }

    const handelFormsubmit = (e) => {
        e.preventDefault();
        let x = newGrpName.trim()
        if (x != "") {
            dispatch(addGroup({ name: x, color: newGrpCol }))
            setNewGrpName("")
            closeModal()
        }

    }

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <form onSubmit={handelFormsubmit}>
                    <h2 className="text-2xl mb-7">Create New Notes group</h2>
                    <div className='flex justify-between items-center my-4'>
                        <label htmlFor="#groupname">Group Name</label>
                        <input type="text" id="groupname" placeholder='Enter your Group name Here...'
                            className='w-full max-w-44 sm:max-w-64 border border-slate-500 rounded-lg p-1'
                            value={newGrpName}
                            onChange={e => setNewGrpName(e.target.value)}
                        />
                    </div>
                    <div className='flex justify-between items-center my-4'>
                        <label htmlFor="#groupcolor">Choose Color</label>
                        <button type='button' className='rounded-full w-5 h-5 bg-blue-400' onClick={e => setNewGrpCol("bg-blue-400")}></button>
                        <button type='button' className='rounded-full w-5 h-5 bg-pink-300' onClick={e => setNewGrpCol("bg-pink-300")}></button>
                        <button type='button' className='rounded-full w-5 h-5 bg-yellow-500' onClick={e => setNewGrpCol("bg-yellow-500")}></button>
                        <button type='button' className='rounded-full w-5 h-5 bg-sky-300' onClick={e => setNewGrpCol("bg-sky-300")}></button>
                        <button type='button' className='rounded-full w-5 h-5 bg-orange-300' onClick={e => setNewGrpCol("bg-orange-300")}></button>
                    </div>
                    <div className='w-full flex justify-center sm:justify-end mt-4'>
                        <button type="submit" className="bg-black text-white px-3 py-1 rounded">
                            Create
                        </button>
                    </div>
                </form>
            </Modal>
            <div className='hidden sm:flex h-screen'>
                <div className='bg-white sm:w-1/4 w-full flex flex-col'>
                    <div className='my-5 ms-4'>
                        <p className='text-xl font-semibold'>Pocket Notes</p>
                    </div>
                    <div className='flex justify-center sm:p-4 p-2'>
                        <button className='bg-black text-white rounded-2xl text-xl px-10 py-1'
                            onClick={openModal}>+ Create Notes Group</button>
                    </div>
                    {groups.length>0 ? (<div className='flex-1 flex flex-col overflow-y-auto overflow-x-hidden'>
                        {groups.map(group => <Group group={group} handelGroupSwitch={handelGroupSwitch} key={group.id} />)}
                    </div>):(null)}
                </div>
                <Notes notes={currentNotes} group={currentGroup} />
            </div>
            <div className='sm:hidden h-screen w-full flex'>
                {currentGroup === null ? (
                <div className='bg-white w-full flex flex-col'>
                    <div className='my-5 ms-4'>
                        <p className='text-xl font-semibold'>Pocket Notes</p>
                    </div>
                    <div className='flex justify-center sm:p-4 p-2'>
                        <button className='bg-black text-white rounded-2xl text-xl px-10 py-1'
                            onClick={openModal}>+ Create Notes Group</button>
                    </div>
                    <div className='flex-1 flex flex-col overflow-y-auto overflow-x-hidden'>
                        {groups.map(group => <Group group={group} handelGroupSwitch={handelGroupSwitch} key={group.id} />)}
                    </div>
                </div>
                ) : (
                <Notes notes={currentNotes} group={currentGroup} mobileGroupswitch={mobileGroupswitch}/>
                )}
            </div>

        </>
    )
}

export default App
