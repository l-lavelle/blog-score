import { useState, useRef } from "react";

function AddTags() {
    const [counter, setCounter] = useState(0);

    const handleClick = () => {
    if (counter<5){
        setCounter(counter + 1);
    }
      
    };
    return (
      <div className="App">
        {Array.from(Array(counter)).map((c, index) => {
          return <input key={c} type="text"></input>;
        })}
         <button onClick={handleClick}>More tags</button>
      </div>
      
    );
//     const [inputFields, setInputFields] = useState([
//         {tag: ''}
//     ])
//     const handleFormChange = (index, event) => {
//         let data = [...inputFields];
//         data[index][event.target.name] = event.target.value;
//         setInputFields(data);
//     }
//     const addFields = () => {
//         let newfield = { tag: ''}
//         setInputFields([...inputFields, newfield])
//     }

//   return (
//     <>
//     <form>
//     {inputFields.map((input, index) => {
//       return (
//         <div key={index}>
//           <input
//             name='tag'
//             placeholder='tag'
//             value={input.tag}
//             onChange={event => handleFormChange(index, event)}
//           />
//         </div>
//       )
//     })}
//   </form>
//   <button onClick={addFields}>Add More..</button>
//   </>
//   );
}
export default AddTags;