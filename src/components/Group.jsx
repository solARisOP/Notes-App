import React from 'react'

function Group({ group, handelGroupSwitch }) {
    return (<div key={group.id} id={group.id} className='sm:my-2 my-1 ms-3 sm:ms-10 p-2 flex items-center rounded-l-3xl cursor-pointer' onClick={(e)=>handelGroupSwitch(group)}>
        <div className={`sm:h-14 sm:w-14 w-9 h-9 rounded-full flex items-center justify-center ${group.color} text-white`}>
            <p className='sm:text-xl text-md'>{group.shortName}</p>
        </div>
        <div className='sm:ms-4 sm:text-lg ms-2 text-md'>
            {group.name.slice(0,30)+(group.name.length > 30?"......":"")}
        </div>
    </div>)


}

export default Group