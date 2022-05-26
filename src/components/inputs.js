import React from "react"

export default function Inputs(props) {
    return (
            <form onSubmit={props.submitHandler} >
                <input  onChange={props.changeHandler} 
                        type="text"
                        className="searchBox"
                        name="searchQuery"
                        placeholder="search for a player..."
                        value={props.searchParams.searchQuery}
                />
                <button>Search</button>
                <div className="disclaimer"><b>Search results are limited to 5 players.</b></div>
            </form>
            
    )
}