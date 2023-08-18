export const setAuthDetails = (key,data)=>{
    localStorage.setItem(key,data)
}

export const getAuthDetails = (key)=>{
    return localStorage.getItem(key) || false
}

export const deleteAuthDetails = (key,data)=>{
    localStorage.clear()
}

export const getBoardDetails = ()=>{
    return JSON.parse(localStorage.getItem('board')) || false
}

export const setBoardDetails = (data)=>{
    let board_details = getBoardDetails('board')
    let  board_data = [...board_details,data]
    localStorage.setItem('board',JSON.stringify(board_data))
}

export const filterBoardDetailsById = (id)=>{
    let storedBoards = JSON.parse(localStorage.getItem('board'))
    return storedBoards.filter((item)=>item.id===parseInt(id))
}



