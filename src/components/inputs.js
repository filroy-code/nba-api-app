import React from "react"

export default function Inputs(props) {
    return (
        <div className="inputs">
            <form onSubmit={props.submitHandler} >
                {/* <input
                    type="radio"
                    className="searchButton"
                    id="Player"
                    name="searchType"
                    value="Player"
                />
                <label htmlFor="searchType">Player</label>
                <br></br>
                <input
                    type="radio"
                    className="searchButton"
                    id="Team"
                    name="searchType"
                    value="Team"
                />
                <label htmlFor="searchType">Team</label>
                <br></br>
                */}
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