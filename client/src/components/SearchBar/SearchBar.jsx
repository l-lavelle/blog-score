import { useState } from 'react';
function SearchBar() {
    const [query, setQuery] = useState("")
    return (
    <div>
      <input placeholder="Enter Post Title" onChange={event => setQuery(event.target.value)}/>
    </div>
    )
  }

export default SearchBar