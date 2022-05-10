import React from "react"

export default function Inputs(props) {
    return (
        <div className="inputs">
            <form onSubmit={props.submitHandler} >
                <input  onChange={props.changeHandler} 
                        type="text"
                        className="searchBox"
                        name="searchQuery"
                        placeholder="search for a player..."
                        value={props.searchParams.searchQuery}
                />
                <button>Search</button>
            </form>
        </div>
    )
}