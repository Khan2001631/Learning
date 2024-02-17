import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [length,setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);


  useEffect(() => {
    passwordGenerator();
  },[length, numbersAllowed, charAllowed]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numbersAllowed)
      str+= "123456789";
    if(charAllowed)
    str+= "!@#$%^&*[]{}`~+-/=?"
    for(let i=1; i<=length; i++)
    {
      let char = Math.floor(Math.random()* str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  },[length, numbersAllowed,charAllowed,setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current.select();
    passwordRef.current.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password);
  },[password])

  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
     <h1 className='text-white text-center my-3'>Password generator</h1>
     <div className="flex shadow rounded-lg overflow-hidden mb-4">
     <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
        />
         <button
         onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
     </div>
      <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={50}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numbersAllowed}
          id="numberInput"
          onChange={() => {
            setNumbersAllowed((prev) => !prev)
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={charAllowed}
          id="charInput"
          onChange={() => {
            setCharAllowed((prev) => !prev)
          }}
      />
      <label htmlFor="charInput">Characters</label>
      </div>
     </div>
     </div>
    </>
  )
}

export default App
