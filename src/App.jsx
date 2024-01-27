import { useState, useCallback, useEffect, useRef } from 'react'

// --useRef-- we have to make a variable for using useRef its taking buttton reference we  are using it to make better user experiance when the they click on copy button  this is form highlight content whos gonna copy after cliking copy button


function App() {
  const [length, setLength] = useState(6)
  const [numberAllowed, setNumbersAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str +="!@#$%^&*()_+=[]{}~`"

    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1
  )
  pass += str.charAt(char)
}
setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])// these are the dependencies//here set password is for optimization, the memoization concept it will only store in cache for optimization


  // using useEffect for re rendering passwordGenerator function
   useEffect(()=>{passwordGenerator()},[length,numberAllowed, charAllowed, passwordGenerator])
  
  // using useRef
  const passRef = useRef(null)//for taking reference of any element in web page, and we are using it on line num 52

  const copyPasswordToClipBoard = useCallback(()=>{
    passRef.current?.select();// its for highlithing coping item
    passRef.current?.setSelectionRange(0,99);//it taking the range of highlighting//for selection of password length
    window.navigator.clipboard.writeText(password)// we can are taking window because we are in core reactjs it is not available in server side 
  },[password])
  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'><h1 className=' text-center text-white my-3'>Password Generator</h1>
     <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      
      {/* <div>
        <button onClick={passwordGenerator}>generate</button>
      </div> */}

      <input 
      type="text" 
      value={password} 
      className='outline-none w-full py-1 px3' placeholder='password' 
      readOnly 
      ref={passRef}
      />

      <button onClick={copyPasswordToClipBoard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-900'>Copy</button>

      </div>
       <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{setLength(e.target.value)}}
        />
        <label> Length: {length} </label>
       </div>
       <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox" 
        defaultChecked={numberAllowed}
        id='numberInput'
        onChange={()=>{
          setNumbersAllowed((prev)=> !prev) //reversing previous value
        }}
        />
        <label htmlFor="numberInput">Number</label>
       </div>
       <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox"
        defaultChecked={charAllowed}
        id='charInput'
        onChange={()=>{setCharAllowed((prev) => !prev)}}
        />
        <label htmlFor="charInput">SpecialChar</label>
       </div>
      </div>
    </>
  )
}

export default App
