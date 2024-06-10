import { createSlice, nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
const date = new Date()
const initialState = {
    groups: [],
    newNote: "",
    editNote: ""
}

export const groupsSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        addGroup: (state, action) => {
            const group = {
                id: nanoid(), 
                name: action.payload.name,
                shortName: action.payload.name.toUpperCase().slice(0,2),
                color: action.payload.color,
                notes:[]
            }
            state.groups.push(group);
        },
        addNote: (state, action) =>{
            let Gid = action.payload.Gid
            let text = action.payload.message
            const date2 = new Date()
            const note = {
                id: nanoid(),
                message: text,
                date: `${date2.getDate()}/${date2.getMonth()+1}/${date2.getFullYear()}`,
                time: `${date2.getHours()}:${date2.getMinutes()}`
            }
            state.groups = state.groups.map(group=>{
                if(group.id===Gid) group.notes.push(note);
                return group;
            })
        },
        removeNote: (state, action)=>{
            const Gid = action.payload.Gid;
            const Nid = action.payload.Nid;
            state.groups = state.groups.map(group=>{
                if(group.id===Gid) group.notes = group.notes.filter(note=> note.id!==Nid);
                return group;
            })
        },
        changeNewNote: (state, action)=>{
            state.newNote = action.payload.value
        },
        changeEditNote: (state, action)=>{
            state.editNote = action.payload.value
        },
        setInit : (state, action) =>{
            state.groups = action.payload.groups
        }
    }
})

export const {addGroup, addNote, removeNote, changeNewNote, changeEditNote, setInit} = groupsSlice.actions;

export default groupsSlice.reducer